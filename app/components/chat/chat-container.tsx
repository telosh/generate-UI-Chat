"use client";

import { useMemo, useRef, useEffect } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatInput } from "@/app/components/chat/chat-input";
import { ChatMessage } from "@/app/components/chat/chat-message";
import { useQuotaRetryCountdown } from "@/app/hooks/use-quota-retry-countdown";
import { formatChatError } from "@/app/lib/chat/format-error";
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

  const { messages, sendMessage, status, error, clearError } =
    useChat<UIMessage>({
      transport,
    });

  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const { remainingSeconds, totalSeconds } = useQuotaRetryCountdown({
    error,
    clearError,
  });

  useEffect(() => {
    if (status !== "streaming") return;
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [status, messages]);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="space-y-3">
        <CardTitle id="chat-heading">Interactive Generative Resume</CardTitle>
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
              <>
                {messages.map((message, index) => {
                  const isLastAssistant =
                    index === messages.length - 1 &&
                    message.role === "assistant";

                  return (
                    <motion.div
                      key={message.id}
                      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                      <ChatMessage
                        message={message as never}
                        showStreamingCursor={
                          status === "streaming" && isLastAssistant
                        }
                      />
                    </motion.div>
                  );
                })}
                <div ref={scrollAnchorRef} aria-hidden />
              </>
            )}
          </div>
        </ScrollArea>
        {error ? (
          <div className="space-y-2" role="alert" aria-live="polite">
            <p className="text-sm text-destructive">
              {formatChatError(error)}
            </p>
            {remainingSeconds !== null &&
              totalSeconds !== null &&
              totalSeconds > 0 && (
                <div
                  className="h-1.5 overflow-hidden rounded-full bg-muted"
                  aria-hidden
                >
                  <motion.div
                    className="h-full rounded-full bg-primary/60"
                    initial={{ width: "100%" }}
                    animate={{
                      width: `${(remainingSeconds / totalSeconds) * 100}%`,
                    }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 1, ease: "linear" }
                    }
                  />
                </div>
              )}
          </div>
        ) : null}
        <ChatInput
          disabled={
            status === "streaming" ||
            status === "submitted" ||
            (error !== undefined &&
              remainingSeconds !== null &&
              remainingSeconds > 0)
          }
          retrySeconds={remainingSeconds}
          onSubmit={(value) =>
            sendMessage({ parts: [{ type: "text", text: value }] })
          }
        />
      </CardContent>
    </Card>
  );
}
