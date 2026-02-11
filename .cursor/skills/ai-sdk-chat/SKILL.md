---
name: ai-sdk-chat
description: Build streaming chat, tool calls, and generative UI with Vercel AI SDK. Use when implementing or modifying chat APIs, useChat hooks, streamText, tools, or UIMessage streaming in genUIAI.
---

# AI SDK Chat for genUIAI

## Quick Reference

- **Packages**: `ai`, `@ai-sdk/react`, `@ai-sdk/google`
- **API**: `app/api/chat/route.ts` (Edge runtime)
- **Tools**: `app/lib/ai/tools.ts`
- **System prompt**: `app/lib/ai/system-prompt.ts`

## Server: streamText + Tools

```ts
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, stepCountIs } from "ai";

const result = streamText({
  model: google("gemini-2.5-flash-lite"),
  system: buildSystemPrompt(),
  messages: await convertToModelMessages(messages),
  tools: chatTools,
  stopWhen: stepCountIs(maxSteps), // 1 or 5
});

return result.toUIMessageStreamResponse({ sendReasoning: false });
```

## Client: useChat + sendMessage

```tsx
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";

const transport = new DefaultChatTransport({ api: "/api/chat" });
const { messages, sendMessage, status, error } = useChat<UIMessage>({
  transport,
});

// 動的パラメータは body で送信
sendMessage(
  { parts: [{ type: "text", text: prompt }] },
  { body: { toolMode, model } },
);
```

## Tool Definition Pattern

```ts
import { tool } from "ai";
import { z } from "zod";

export const chatTools = {
  showCards: tool({
    description:
      "Show a grid of cards. Use for プロジェクト、作品、おすすめなど.",
    inputSchema: z.object({
      title: z.string().optional(),
      cards: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          badges: z.array(z.string()).optional(),
        }),
      ),
    }),
    execute: async ({ title, cards }) => ({
      title: title ?? null,
      cards: cards ?? [],
    }),
  }),
};
```

## Key Patterns

- **UIMessage**: Use `type UIMessage` for useChat generic
- **convertToModelMessages**: Required before passing to streamText
- **stepCountIs**: Control tool iterations (1 = single, 5 = multiple)
- **body**: Pass model, toolMode, etc. via sendMessage second arg

## Generative UI

Tool results are streamed as custom UI parts. Match tool names (`showCards`, `showChart`, etc.) to components in `app/components/generative/`.
