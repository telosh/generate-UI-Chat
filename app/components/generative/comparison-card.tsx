"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ComparisonCardProps = {
  title?: string | null;
  items: Array<{
    name: string;
    pros: string[];
    cons?: string[];
  }>;
};

export function ComparisonCard({ title, items }: ComparisonCardProps) {
  const reducedMotion = useReducedMotion();

  if (!items.length) return null;

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="rounded-lg border border-border/60 bg-muted/20 p-4"
            >
              <h4 className="font-semibold text-foreground">{item.name}</h4>
              <div className="mt-3 space-y-2">
                {item.pros.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      メリット
                    </p>
                    <ul className="mt-1 space-y-1 text-sm">
                      {item.pros.map((p, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-primary">+</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.cons && item.cons.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      デメリット
                    </p>
                    <ul className="mt-1 space-y-1 text-sm">
                      {item.cons.map((c, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-destructive">−</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
