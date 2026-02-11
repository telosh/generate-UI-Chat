"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  disabled: boolean;
  onSubmit: (value: string) => void;
};

export function ChatInput({ disabled, onSubmit }: ChatInputProps) {
  const [input, setInput] = useState("");

  const submit = () => {
    const value = input.trim();
    if (!value) return;
    onSubmit(value);
    setInput("");
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="flex gap-2"
    >
      <label htmlFor="chat-input" className="sr-only">
        Ask about skills or projects
      </label>
      <Input
        id="chat-input"
        value={input}
        disabled={disabled}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Ask about projects, skills, or impact..."
        autoComplete="off"
        spellCheck={false}
        className="h-11 text-base"
      />
      <Button type="submit" disabled={disabled} className="h-11 min-w-[92px]">
        Send{disabled ? "..." : ""}
      </Button>
    </form>
  );
}
