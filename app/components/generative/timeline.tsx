"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TimelineItem = {
  title: string;
  subtitle: string;
  points?: string[];
};

type TimelineProps = {
  title?: string | null;
  items: TimelineItem[];
};

export function Timeline({ title, items }: TimelineProps) {
  const reducedMotion = useReducedMotion();

  if (!items.length) return null;

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={`${item.title}-${index}`}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="relative border-l pl-4"
          >
            <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary" />
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            {item.points && item.points.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {item.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
