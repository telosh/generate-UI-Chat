"use client";

import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { copy } from "@/app/lib/ui/copy";

type PhaseData = {
  phase?: "searching" | "generating-ui" | "complete";
  label?: string;
};

function getPhaseLabel(data: PhaseData): string {
  if (data.label) return data.label;
  switch (data.phase) {
    case "searching":
      return copy.phase.searching;
    case "generating-ui":
      return copy.phase.generatingUi;
    default:
      return copy.phase.default;
  }
}

export function PhaseIndicator({ data }: { data: PhaseData }) {
  if (data.phase === "complete") return null;

  const label = getPhaseLabel(data);

  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Loader2
        className="h-5 w-5 shrink-0 animate-spin text-muted-foreground"
        aria-hidden
      />
      <div className="min-w-0 flex-1 space-y-2">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <div className="space-y-2">
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}
