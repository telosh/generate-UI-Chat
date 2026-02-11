"use client";

import { useMemo } from "react";
import {
  DefaultChatTransport,
  type UIMessage,
} from "ai";
import { useChat } from "@ai-sdk/react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatInput } from "@/app/components/chat/chat-input";
import { ChatMessage } from "@/app/components/chat/chat-message";
import { SuggestedPrompts } from "@/app/components/chat/suggested-prompts";

export function ChatContainer() {
  const reducedMotion = useReducedMotion();
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    [],
  );

  const { messages, sendMessage, status, error } = useChat<UIMessage>({
    transport,
  });

  return (
    <Card className="rounded-2xl">
      <CardHeader className="space-y-3">
        <CardTitle>Interactive Generative Resume</CardTitle>
        <SuggestedPrompts
          onSelect={(prompt) => sendMessage({ parts: [{ type: "text", text: prompt }] })}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[460px] pr-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Ask me about skills, architecture decisions, projects, or hiring fit.
              </p>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <ChatMessage message={message as never} />
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
        {error ? (
          <p className="text-sm text-destructive" aria-live="polite">
            {error.message}
          </p>
        ) : null}
        <ChatInput
          disabled={status === "streaming" || status === "submitted"}
          onSubmit={(value) => sendMessage({ parts: [{ type: "text", text: value }] })}
        />
      </CardContent>
    </Card>
  );
}
