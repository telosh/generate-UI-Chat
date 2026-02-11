"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type QuoteCardProps = {
  text: string;
  source?: string | null;
  variant?: "default" | "info" | "success" | "warning";
};

const variantStyles = {
  default: "border-l-primary bg-muted/30",
  info: "border-l-blue-500 bg-blue-500/10",
  success: "border-l-green-500 bg-green-500/10",
  warning: "border-l-amber-500 bg-amber-500/10",
};

export function QuoteCard({ text, source, variant = "default" }: QuoteCardProps) {
  const reducedMotion = useReducedMotion();

  if (!text) return null;

  return (
    <motion.blockquote
      initial={reducedMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-r-lg border-l-4 px-4 py-3",
        variantStyles[variant],
      )}
    >
      <p className="text-sm font-medium italic leading-relaxed text-foreground">
        &ldquo;{text}&rdquo;
      </p>
      {source && (
        <p className="mt-2 text-xs text-muted-foreground">— {source}</p>
      )}
    </motion.blockquote>
  );
}
