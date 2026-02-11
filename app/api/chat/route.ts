import { google } from "@ai-sdk/google";
import { googleTools } from "@ai-sdk/google/internal";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateText,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import {
  DEFAULT_GEMINI_MODEL,
  isValidGeminiModel,
} from "@/app/lib/ai/models";
import { buildSystemPrompt } from "@/app/lib/ai/system-prompt";
import { chatTools } from "@/app/lib/ai/tools";
import { getRateLimitClient } from "@/app/lib/ratelimit";

/** toUIMessageStream 用: クライアントに返すエラーメッセージの整形 */
function formatStreamError(err: unknown): string {
  if (err instanceof Error && err.message.includes("tool")) {
    return "ツール呼び出し中にエラーが発生しました。";
  }
  return "応答の生成中にエラーが発生しました。もう一度お試しください。";
}

const providerOptions = {
  google: {
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ],
  },
};

export const runtime = "edge";

function getClientIp(request: Request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function getLastUserMessageText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== "user" || !Array.isArray(msg.parts)) continue;
    for (const p of msg.parts) {
      const part = p as Record<string, unknown>;
      if (part?.type === "text" && typeof part.text === "string") {
        return part.text;
      }
    }
  }
  return "";
}

export async function POST(request: Request) {
  try {
    const { messages, toolMode, model: modelParam, searchMode } = (await request.json()) as {
      messages: UIMessage[];
      toolMode?: "single" | "multiple";
      model?: string;
      searchMode?: boolean;
    };

    const model =
      modelParam && isValidGeminiModel(modelParam)
        ? modelParam
        : DEFAULT_GEMINI_MODEL;

    const ratelimit = getRateLimitClient();
    if (ratelimit) {
      const ip = getClientIp(request);
      const { success, reset } = await ratelimit.limit(ip);
      if (!success) {
        const retryAfter = reset ? Math.ceil((reset - Date.now()) / 1000) : 60;
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please try again later.",
            reset,
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(Math.max(1, retryAfter)),
            },
          },
        );
      }
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(
        JSON.stringify({
          error:
            "Missing GOOGLE_GENERATIVE_AI_API_KEY. Add it to .env.local.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const modelMessages = await convertToModelMessages(messages);
    const useSearch = searchMode === true;
    const PHASE_ID = "phase-indicator";

    const stream = createUIMessageStream({
      originalMessages: messages,
      onError: (error) => {
        if (error instanceof Error) {
          if (error.message.includes("rate limit") || error.message.includes("quota")) {
            return "リクエストが多すぎます。しばらくしてから再試行してください。";
          }
          if (error.message.includes("API key") || error.message.includes("Invalid")) {
            return "API設定に問題があります。管理者にご連絡ください。";
          }
        }
        return "処理中にエラーが発生しました。もう一度お試しください。";
      },
      execute: async ({ writer }) => {
        if (useSearch) {
          // Phase 1: 検索中を表示
          writer.write({
            type: "data-phase",
            id: PHASE_ID,
            data: { phase: "searching" as const },
          });

          const searchResult = await generateText({
            model: google(model),
            system: buildSystemPrompt(true, "search"),
            messages: modelMessages,
            tools: {
              googleSearch: googleTools.googleSearch({}),
              urlContext: googleTools.urlContext({}),
            },
            stopWhen: stepCountIs(5),
            providerOptions,
          });

          const searchText = searchResult.text;
          if (!searchText?.trim()) {
            writer.write({
              type: "data-phase",
              id: PHASE_ID,
              data: { phase: "complete" as const },
            });
            writer.write({
              type: "error",
              errorText: "検索結果を取得できませんでした。",
            });
            return;
          }

          // Phase 2: UI生成中に更新
          writer.write({
            type: "data-phase",
            id: PHASE_ID,
            data: { phase: "generating-ui" as const },
          });

          const lastUserContent = getLastUserMessageText(messages);
          const phase2Messages = [
            ...modelMessages,
            { role: "assistant" as const, content: searchText },
            {
              role: "user" as const,
              content:
                `上の検索結果を、ユーザーが求めた形式（チャート・表・カード・指標など）でUIツールを使って表示してください。\n元の質問: ${lastUserContent}`,
            },
          ];

          const result = streamText({
            model: google(model),
            system: buildSystemPrompt(true, "searchToUI"),
            messages: phase2Messages,
            tools: chatTools,
            stopWhen: stepCountIs(1),
            providerOptions,
            onFinish: () => {
              writer.write({
                type: "data-phase",
                id: PHASE_ID,
                data: { phase: "complete" as const },
              });
            },
          });

          writer.merge(
            result.toUIMessageStream({
              sendReasoning: false,
              onError: formatStreamError,
            }),
          );
        } else {
          // UI生成モード: 生成中を表示
          writer.write({
            type: "data-phase",
            id: PHASE_ID,
            data: { phase: "generating-ui" as const },
          });

          const maxSteps = toolMode === "multiple" ? 5 : 1;
          const result = streamText({
            model: google(model),
            system: buildSystemPrompt(false),
            messages: modelMessages,
            tools: chatTools,
            stopWhen: stepCountIs(maxSteps),
            providerOptions,
            onFinish: () => {
              writer.write({
                type: "data-phase",
                id: PHASE_ID,
                data: { phase: "complete" as const },
              });
            },
          });

          writer.merge(
            result.toUIMessageStream({
              sendReasoning: false,
              onError: formatStreamError,
            }),
          );
        }
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Unexpected server error in /api/chat." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
