"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatInput } from "@/app/components/chat/chat-input";
import { ChatMessage } from "@/app/components/chat/chat-message";
import { SuggestedPrompts } from "@/app/components/chat/suggested-prompts";
import { AppHeader } from "@/app/components/layout/app-header";
import { useQuotaRetryCountdown } from "@/app/hooks/use-quota-retry-countdown";
import {
  DEFAULT_GEMINI_MODEL,
  GEMINI_MODELS,
  type GeminiModelId,
} from "@/app/lib/ai/models";
import { copy } from "@/app/lib/ui/copy";
import { formatChatError } from "@/app/lib/chat/format-error";

export function ChatLayout() {
  const reducedMotion = useReducedMotion();
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    [],
  );

  const { messages, sendMessage, setMessages, status, error, clearError } =
    useChat<UIMessage>({
      transport,
    });

  const [toolMode, setToolMode] = useState<"single" | "multiple">("single");
  const [model, setModel] = useState<GeminiModelId>(DEFAULT_GEMINI_MODEL);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { remainingSeconds, totalSeconds } = useQuotaRetryCountdown({
    error,
    clearError,
  });

  const handlePromptSelect = (prompt: string) => {
    sendMessage(
      { parts: [{ type: "text", text: prompt }] },
      { body: { toolMode, model } }
    );
  };

  const currentModelLabel =
    GEMINI_MODELS.find((m) => m.id === model)?.label ?? model;

  const handleNewChat = () => {
    setMessages([]);
  };

  // ストリーミング中は最新コンテンツへ自動スクロール
  useEffect(() => {
    if (status !== "streaming") return;
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, [status, messages]);

  return (
    <div className="relative flex h-dvh max-h-dvh flex-col overflow-hidden">
      <AppHeader onNewChat={handleNewChat} showNewChat />

      {/* チャット表示領域: 画面全体を占有、スクロール可能（入力エリアの下まで描画） */}
      <main id="main-content" className="flex flex-1 min-h-0 flex-col overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="scrollbar-chat flex-1 overflow-y-auto overflow-x-hidden"
        >
          <div className="mx-auto w-full max-w-3xl px-4 py-6 pb-32 sm:px-6 sm:py-8 sm:pb-36">
            {/* チャットヘッダー: メッセージあり時のみ表示 */}
            {messages.length > 0 ? (
              <div className="flex shrink-0 items-center justify-between gap-2 pb-4">
                <h1 className="text-lg font-semibold tracking-tight truncate">
                  {copy.chat.title}
                </h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNewChat}
                  className="shrink-0 gap-1.5 touch-manipulation min-h-[44px] sm:min-h-0"
                  aria-label={copy.chat.newChat}
                >
                  <Plus className="size-4" aria-hidden />
                  <span className="hidden sm:inline">{copy.chat.newChat}</span>
                </Button>
              </div>
            ) : null}

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-12 text-center">
                  <p className="max-w-md text-muted-foreground text-pretty">
                    {copy.chat.emptyState}
                  </p>
                  <div className="w-full max-w-xl space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {copy.chat.startPrompt}
                    </p>
                    <SuggestedPrompts
                      onSelect={handlePromptSelect}
                      className="justify-center"
                    />
                  </div>
                </div>
              ) : (
                messages.map((message, index) => {
                  const isLastMessage = index === messages.length - 1;
                  const isLastAssistant =
                    isLastMessage && message.role === "assistant";

                  return (
                    <motion.div
                      key={message.id}
                      initial={
                        reducedMotion ? false : { opacity: 0, y: 6 }
                      }
                      animate={
                        reducedMotion ? {} : { opacity: 1, y: 0 }
                      }
                      transition={{
                        duration: 0.2,
                        delay: index * 0.03,
                      }}
                    >
                      <ChatMessage
                        message={message as never}
                        showStreamingCursor={
                          status === "streaming" && isLastAssistant
                        }
                      />
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 入力フォーム: ボトムにオーバーレイ、透過でチャットが透ける */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-4 pt-4">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {copy.model.label}:{" "}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    className="gap-1.5 min-w-28 justify-between"
                    aria-label={copy.model.ariaLabel}
                    aria-haspopup="listbox"
                  >
                    <span className="truncate">{currentModelLabel}</span>
                    <ChevronDown className="size-3 shrink-0 opacity-60" aria-hidden />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-48">
                  {GEMINI_MODELS.map((m) => (
                    <DropdownMenuItem
                      key={m.id}
                      disabled={m.disabled}
                      onClick={() => !m.disabled && setModel(m.id)}
                      className="flex flex-col items-start gap-0.5 py-2"
                    >
                      <span className="font-medium">{m.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {m.disabled ? "調整中" : m.description}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {copy.toolMode.label}:{" "}
              </span>
              <div
                className="inline-flex rounded-lg border border-border/60 bg-muted/30 p-0.5"
                role="group"
                aria-label={copy.toolMode.label}
              >
              <Button
                type="button"
                variant={toolMode === "single" ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setToolMode("single")}
                className="rounded-md"
                aria-pressed={toolMode === "single"}
                aria-label={copy.toolMode.singleDesc}
              >
                {copy.toolMode.single}
              </Button>
              <Button
                type="button"
                variant={toolMode === "multiple" ? "secondary" : "ghost"}
                size="xs"
                onClick={() => setToolMode("multiple")}
                className="rounded-md"
                aria-pressed={toolMode === "multiple"}
                aria-label={copy.toolMode.multipleDesc}
              >
                {copy.toolMode.multiple}
              </Button>
            </div>
            </div>
          </div>
          {error ? (
            <div
              className="mb-3 space-y-2"
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm text-destructive">
                {remainingSeconds !== null && remainingSeconds > 0
                  ? copy.chat.quotaErrorRetryIn(remainingSeconds)
                  : formatChatError(error)}
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
              sendMessage(
                { parts: [{ type: "text", text: value }] },
                { body: { toolMode, model } }
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
