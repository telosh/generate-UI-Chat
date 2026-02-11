"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BarChartProps = {
  title?: string | null;
  items: Array<{
    name: string;
    value: number;
    subtitle?: string;
  }>;
};

export function BarChart({ title, items }: BarChartProps) {
  const reducedMotion = useReducedMotion();

  if (!items.length) return null;

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{item.name}</span>
              <span className="font-mono tabular-nums text-muted-foreground">
                {item.value}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={reducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: Math.min(100, item.value) / 100 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="h-full w-full origin-left rounded-full bg-primary"
              />
            </div>
            {item.subtitle && (
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
