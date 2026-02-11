import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { buildSystemPrompt } from "@/app/lib/ai/system-prompt";
import { chatTools } from "@/app/lib/ai/tools";
import { resumeData } from "@/app/lib/data/resume-data";
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
    const { messages } = (await request.json()) as {
      messages: UIMessage[];
    };

    const ratelimit = getRateLimitClient();
    if (ratelimit) {
      const ip = getClientIp(request);
      const { success, reset } = await ratelimit.limit(ip);
      if (!success) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please try again later.",
            reset,
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json" },
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

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: buildSystemPrompt(resumeData),
      messages: modelMessages,
      tools: chatTools,
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
