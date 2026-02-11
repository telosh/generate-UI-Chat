"use client";

import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { copy } from "@/app/lib/ui/copy";
import { User, Bot, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardGrid } from "@/app/components/generative/card-grid";
import { BarChart } from "@/app/components/generative/bar-chart";
import { Timeline } from "@/app/components/generative/timeline";
import { ProfileCard } from "@/app/components/generative/profile-card";
import { DataTable } from "@/app/components/generative/data-table";
import { StatsGrid } from "@/app/components/generative/stats-grid";
import { StyledList } from "@/app/components/generative/styled-list";
import { ComparisonCard } from "@/app/components/generative/comparison-card";
import { StepsGuide } from "@/app/components/generative/steps-guide";
import { QuoteCard } from "@/app/components/generative/quote-card";

type AnyMessage = {
  id: string;
  role: "user" | "assistant" | string;
  parts: Array<Record<string, unknown>>;
};

const TOOL_LOADING_KEYS = [
  "showCards",
  "showChart",
  "showTimeline",
  "showProfile",
  "showTable",
  "showStats",
  "showList",
  "showComparison",
  "showSteps",
  "showQuote",
] as const;

function getToolLoadingLabel(toolType: string): string {
  const key = toolType.replace("tool-", "") as (typeof TOOL_LOADING_KEYS)[number];
  return TOOL_LOADING_KEYS.includes(key)
    ? copy.toolLoading[key]
    : copy.toolLoading.default;
}

function ToolLoading({ label }: { label: string }) {
  return (
    <div className="space-y-2" role="status" aria-live="polite">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}

function ToolError({ errorText }: { errorText: string }) {
  return (
    <div
      className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3"
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium text-destructive">{copy.toolError}</p>
        <p className="text-xs text-muted-foreground">{errorText}</p>
      </div>
    </div>
  );
}

function MessageBubble({
  children,
  isUser,
}: {
  children: React.ReactNode;
  isUser: boolean;
}) {
  return (
    <div
      className={cn(
        "space-y-3 rounded-2xl px-4 py-3",
        isUser
          ? "bg-primary text-primary-foreground [&_a]:text-primary-foreground [&_a]:underline"
          : "bg-muted/80",
      )}
    >
      {children}
    </div>
  );
}

type ChatMessageProps = {
  message: AnyMessage;
  /** ストリーミング中でこのメッセージが最後のアシスタントメッセージのとき、テキストにカーソル表示 */
  showStreamingCursor?: boolean;
};

export function ChatMessage({ message, showStreamingCursor = false }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
        aria-hidden
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-2",
          isUser ? "max-w-[85%] items-end sm:max-w-[75%]" : "items-start",
        )}
      >
        <span className="text-xs font-medium text-muted-foreground">
          {isUser ? copy.message.you : copy.message.assistant}
        </span>

        <div className="flex w-full flex-col gap-3">
          {message.parts.map((part, index) => {
            const type = part.type;

            if (type === "text" && typeof part.text === "string") {
              const isLastPart = index === message.parts.length - 1;
              const showCursor =
                showStreamingCursor && !isUser && isLastPart;

              return (
                <MessageBubble key={`${message.id}-text-${index}`} isUser={isUser}>
                  <div
                    className={cn(
                      "prose prose-sm last:mb-0",
                      isUser ? "prose-invert" : "dark:prose-invert",
                    )}
                  >
                    <ReactMarkdown>{part.text}</ReactMarkdown>
                    {showCursor && (
                      <span
                        className="ml-0.5 inline-block h-4 w-0.5 animate-cursor-blink bg-current"
                        aria-hidden
                      />
                    )}
                  </div>
                </MessageBubble>
              );
            }

            if (type === "tool-showCards") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-cards-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-cards-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  title?: string | null;
                  cards: Array<{
                    id: string;
                    title: string;
                    description: string;
                    badges?: string[];
                    links?: Array<{ label: string; url: string }>;
                  }>;
                };
                return (
                  <CardGrid
                    key={`${message.id}-cards-${index}`}
                    title={output.title ?? undefined}
                    cards={output.cards ?? []}
                  />
                );
              }
            }

            if (type === "tool-showChart") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-chart-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-chart-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  title?: string | null;
                  items: Array<{ name: string; value: number; subtitle?: string }>;
                };
                return (
                  <BarChart
                    key={`${message.id}-chart-${index}`}
                    title={output.title ?? undefined}
                    items={output.items ?? []}
                  />
                );
              }
            }

            if (type === "tool-showTimeline") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-timeline-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-timeline-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  title?: string | null;
                  items: Array<{ title: string; subtitle: string; points?: string[] }>;
                };
                return (
                  <Timeline
                    key={`${message.id}-timeline-${index}`}
                    title={output.title ?? undefined}
                    items={output.items ?? []}
                  />
                );
              }
            }

            if (type === "tool-showProfile") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-profile-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-profile-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  name: string;
                  role?: string | null;
                  summary?: string | null;
                  links?: Array<{ label: string; url: string }>;
                };
                return (
                  <ProfileCard
                    key={`${message.id}-profile-${index}`}
                    name={output.name ?? ""}
                    role={output.role ?? undefined}
                    summary={output.summary ?? undefined}
                    links={output.links ?? []}
                  />
                );
              }
            }

            if (type === "tool-showTable") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-table-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-table-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  title?: string | null;
                  columns: string[];
                  rows: (string | number)[][];
                };
                return (
                  <DataTable
                    key={`${message.id}-table-${index}`}
                    title={output.title ?? undefined}
                    columns={output.columns ?? []}
                    rows={output.rows ?? []}
                  />
                );
              }
            }

            if (type === "tool-showStats") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-stats-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-stats-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  title?: string | null;
                  items: Array<{ label: string; value: string | number }>;
                };
                return (
                  <StatsGrid
                    key={`${message.id}-stats-${index}`}
                    title={output.title ?? undefined}
                    items={output.items ?? []}
                  />
                );
              }
            }

            if (type === "tool-showList") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-list-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-list-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  title?: string | null;
                  items: string[];
                  style: "bulleted" | "numbered" | "checklist";
                };
                return (
                  <StyledList
                    key={`${message.id}-list-${index}`}
                    title={output.title ?? undefined}
                    items={output.items ?? []}
                    style={output.style ?? "bulleted"}
                  />
                );
              }
            }

            if (type === "tool-showComparison") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-comparison-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-comparison-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  title?: string | null;
                  items: Array<{ name: string; pros: string[]; cons?: string[] }>;
                };
                return (
                  <ComparisonCard
                    key={`${message.id}-comparison-${index}`}
                    title={output.title ?? undefined}
                    items={output.items ?? []}
                  />
                );
              }
            }

            if (type === "tool-showSteps") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-steps-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-steps-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  title?: string | null;
                  steps: Array<{ step: number; title: string; description: string }>;
                };
                return (
                  <StepsGuide
                    key={`${message.id}-steps-${index}`}
                    title={output.title ?? undefined}
                    steps={output.steps ?? []}
                  />
                );
              }
            }

            if (type === "tool-showQuote") {
              if (
                part.state === "input-streaming" ||
                part.state === "input-available"
              ) {
                return (
                  <MessageBubble key={`${message.id}-quote-loading-${index}`} isUser={false}>
                    <ToolLoading label={getToolLoadingLabel(type)} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-error") {
                return (
                  <MessageBubble key={`${message.id}-quote-error-${index}`} isUser={false}>
                    <ToolError errorText={String(part.errorText ?? "")} />
                  </MessageBubble>
                );
              }
              if (part.state === "output-available" && part.output) {
                const output = part.output as {
                  text: string;
                  source?: string | null;
                  variant?: "default" | "info" | "success" | "warning";
                };
                return (
                  <QuoteCard
                    key={`${message.id}-quote-${index}`}
                    text={output.text ?? ""}
                    source={output.source ?? undefined}
                    variant={output.variant ?? "default"}
                  />
                );
              }
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
