"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { copy } from "@/app/lib/ui/copy";

type ChatInputProps = {
  disabled: boolean;
  onSubmit: (value: string) => void;
  /** クォータエラー時のカウントダウン秒数。0より大きいときボタンに表示 */
  retrySeconds?: number | null;
};

export function ChatInput({
  disabled,
  onSubmit,
  retrySeconds = null,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const submit = () => {
    const value = input.trim();
    if (!value) return;
    onSubmit(value);
    setInput("");
  };

  const isCountdown = retrySeconds !== null && retrySeconds > 0;
  const buttonLabel = isCountdown
    ? copy.chat.quotaCountdown(retrySeconds)
    : disabled
      ? copy.chat.sending
      : copy.chat.send;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/20 backdrop-blur-sm px-5 py-4 shadow-sm transition-[border-color,box-shadow] duration-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20"
    >
      <label htmlFor="chat-input" className="sr-only">
        {copy.chat.inputLabel}
      </label>
      <Input
        id="chat-input"
        value={input}
        disabled={disabled}
        onChange={(event) => setInput(event.target.value)}
        placeholder={copy.chat.placeholder}
        autoComplete="off"
        spellCheck={false}
        className="min-h-[48px] sm:min-h-[44px] h-auto border-0 bg-transparent px-4 py-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        type="submit"
        disabled={disabled}
        size="sm"
        className="shrink-0 gap-1.5 rounded-xl touch-manipulation min-h-[44px] sm:min-h-0 px-4"
        aria-label={buttonLabel}
        aria-busy={disabled && !isCountdown}
        aria-live={isCountdown ? "polite" : undefined}
      >
        <Send className="size-4 shrink-0" aria-hidden />
        <span>{buttonLabel}</span>
      </Button>
    </form>
  );
}
