import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
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

export const runtime = "edge";

function getClientIp(request: Request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const { messages, toolMode, model: modelParam } = (await request.json()) as {
      messages: UIMessage[];
      toolMode?: "single" | "multiple";
      model?: string;
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

    const maxSteps = toolMode === "multiple" ? 5 : 1;

    const result = streamText({
      model: google(model),
      system: buildSystemPrompt(),
      messages: modelMessages,
      tools: chatTools,
      stopWhen: stepCountIs(maxSteps),
      providerOptions: {
        google: {
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
          ],
        },
      },
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: false,
    });
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
