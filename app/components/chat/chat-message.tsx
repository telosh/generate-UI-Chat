"use client";

import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { copy } from "@/app/lib/ui/copy";
import { User, Bot } from "lucide-react";
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

function ToolLoading() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-20 w-full" />
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

export function ChatMessage({ message }: { message: AnyMessage }) {
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
              return (
                <MessageBubble key={`${message.id}-text-${index}`} isUser={isUser}>
                  <div
                    className={cn(
                      "prose prose-sm last:mb-0",
                      isUser ? "prose-invert" : "dark:prose-invert",
                    )}
                  >
                    <ReactMarkdown>{part.text}</ReactMarkdown>
                  </div>
                </MessageBubble>
              );
            }

            if (type === "tool-showCards") {
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-cards-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-chart-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-timeline-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-profile-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-table-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-stats-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-list-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-comparison-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-steps-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
              if (part.state === "input-available") {
                return (
                  <MessageBubble key={`${message.id}-quote-loading-${index}`} isUser={false}>
                    <ToolLoading />
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
