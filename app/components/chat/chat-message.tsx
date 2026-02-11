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
import { PhaseIndicator } from "@/app/components/chat/phase-indicator";

type AnyMessage = {
  id: string;
  role: "user" | "assistant" | string;
  parts: Array<Record<string, unknown>>;
};

const TOOL_LOADING_KEYS = [
  "googleSearch",
  "urlContext",
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

        <div
          className={cn(
            "flex w-full flex-col",
            isUser ? "gap-3" : "gap-0",
          )}
        >
          {isUser ? (
            // ユーザー: 各パートを個別のバブルで表示
            message.parts.map((part, index) =>
              renderPart(part, message, index, isUser, showStreamingCursor),
            )
          ) : (
            // アシスタント: 全パートを1つの応答ブロックとして統合表示
            <div className="space-y-4 rounded-2xl bg-muted/80 px-4 py-3">
              {message.parts.map((part, index) =>
                renderAssistantPart(part, message, index, showStreamingCursor),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** ユーザーメッセージ用: 各パートを MessageBubble でラップ */
function renderPart(
  part: Record<string, unknown>,
  message: AnyMessage,
  index: number,
  isUser: boolean,
  showStreamingCursor: boolean,
): React.ReactNode {
  const type = part.type;

  if (type === "text" && typeof part.text === "string") {
    const isLastPart = index === message.parts.length - 1;
    const showCursor = showStreamingCursor && !isUser && isLastPart;

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

  return null;
}

/** アシスタントメッセージ用: 統合ブロック内にコンテンツのみ（MessageBubble なし） */
function renderAssistantPart(
  part: Record<string, unknown>,
  message: AnyMessage,
  index: number,
  showStreamingCursor: boolean,
): React.ReactNode {
  const type = part.type;

  // フェーズインジケーター（検索中…、UI生成中…）
  if (type === "data-phase" && part.data && typeof part.data === "object") {
    const data = part.data as {
      phase?: "searching" | "generating-ui" | "complete";
      label?: string;
    };
    return (
      <PhaseIndicator
        key={(part.id as string) ?? `${message.id}-phase-${index}`}
        data={data}
      />
    );
  }

  if (type === "text" && typeof part.text === "string") {
    const isLastPart = index === message.parts.length - 1;
    const showCursor = showStreamingCursor && isLastPart;

    return (
      <div
        key={`${message.id}-text-${index}`}
        className="prose prose-sm last:mb-0 dark:prose-invert"
      >
        <ReactMarkdown>{part.text}</ReactMarkdown>
        {showCursor && (
          <span
            className="ml-0.5 inline-block h-4 w-0.5 animate-cursor-blink bg-current"
            aria-hidden
          />
        )}
      </div>
    );
  }

  // ツールパート: AI SDK の tool-<name> + state パターンで統一レンダリング
  if (typeof type === "string" && type.startsWith("tool-")) {
    return renderToolPart(part, type, `${message.id}-${type}-${index}`);
  }

  return null;
}

/** ツールパート共通: loading / error / output を state に応じて描画 */
function renderToolPart(
  part: Record<string, unknown>,
  toolType: string,
  key: string,
): React.ReactNode {
  const label = getToolLoadingLabel(toolType);

  if (part.state === "input-streaming" || part.state === "input-available") {
    return (
      <div key={key}>
        <ToolLoading label={label} />
      </div>
    );
  }
  if (part.state === "output-error") {
    return (
      <div key={key}>
        <ToolError errorText={String(part.errorText ?? "")} />
      </div>
    );
  }
  if (part.state === "output-available" && part.output) {
    const renderer = TOOL_OUTPUT_RENDERERS[toolType];
    if (renderer) {
      return (
        <div key={key} className={renderer.wrapperClass ?? "w-full min-w-0"}>
          {renderer.render(part.output as Record<string, unknown>)}
        </div>
      );
    }
  }
  return null;
}

/** ツール名 → 出力描画関数のマップ（AI SDK の tool-<name> 形式に合わせる） */
const TOOL_OUTPUT_RENDERERS: Record<
  string,
  {
    render: (output: Record<string, unknown>) => React.ReactNode;
    wrapperClass?: string;
  }
> = {
  "tool-showCards": {
    render: (o) => (
      <CardGrid
        title={(o.title as string | null) ?? undefined}
        cards={(o.cards as { id: string; title: string; description: string; badges?: string[]; links?: { label: string; url: string }[] }[]) ?? []}
      />
    ),
  },
  "tool-showChart": {
    render: (o) => (
      <BarChart
        title={(o.title as string | null) ?? undefined}
        items={(o.items as { name: string; value: number; subtitle?: string }[]) ?? []}
      />
    ),
  },
  "tool-showTimeline": {
    render: (o) => (
      <Timeline
        title={(o.title as string | null) ?? undefined}
        items={(o.items as { title: string; subtitle: string; points?: string[] }[]) ?? []}
      />
    ),
  },
  "tool-showProfile": {
    render: (o) => (
      <ProfileCard
        name={(o.name as string) ?? ""}
        role={(o.role as string | null) ?? undefined}
        summary={(o.summary as string | null) ?? undefined}
        links={(o.links as { label: string; url: string }[]) ?? []}
      />
    ),
  },
  "tool-showTable": {
    wrapperClass: "w-full min-w-0 overflow-x-auto",
    render: (o) => (
      <DataTable
        title={(o.title as string | null) ?? undefined}
        columns={(o.columns as string[]) ?? []}
        rows={(o.rows as (string | number)[][]) ?? []}
      />
    ),
  },
  "tool-showStats": {
    render: (o) => (
      <StatsGrid
        title={(o.title as string | null) ?? undefined}
        items={(o.items as { label: string; value: string | number }[]) ?? []}
      />
    ),
  },
  "tool-showList": {
    render: (o) => (
      <StyledList
        title={(o.title as string | null) ?? undefined}
        items={(o.items as string[]) ?? []}
        style={(o.style as "bulleted" | "numbered" | "checklist") ?? "bulleted"}
      />
    ),
  },
  "tool-showComparison": {
    render: (o) => (
      <ComparisonCard
        title={(o.title as string | null) ?? undefined}
        items={(o.items as { name: string; pros: string[]; cons?: string[] }[]) ?? []}
      />
    ),
  },
  "tool-showSteps": {
    render: (o) => (
      <StepsGuide
        title={(o.title as string | null) ?? undefined}
        steps={(o.steps as { step: number; title: string; description: string }[]) ?? []}
      />
    ),
  },
  "tool-showQuote": {
    render: (o) => (
      <QuoteCard
        text={(o.text as string) ?? ""}
        source={(o.source as string | null) ?? undefined}
        variant={(o.variant as "default" | "info" | "success" | "warning") ?? "default"}
      />
    ),
  },
};
