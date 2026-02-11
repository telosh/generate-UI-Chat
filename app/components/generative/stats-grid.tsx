"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatsGridProps = {
  title?: string | null;
  items: Array<{ label: string; value: string | number }>;
};

export function StatsGrid({ title, items }: StatsGridProps) {
  const reducedMotion = useReducedMotion();

  if (!items.length) return null;

  return (
    <Card className="border-border/50">
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="rounded-xl border border-border/40 bg-muted/20 p-4 transition-colors hover:bg-muted/30"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
