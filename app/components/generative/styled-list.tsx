"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

type StyledListProps = {
  title?: string | null;
  items: string[];
  style: "bulleted" | "numbered" | "checklist";
};

export function StyledList({ title, items, style }: StyledListProps) {
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
        <ul className="space-y-2">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={reducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="flex items-start gap-3 text-sm"
            >
              {style === "bulleted" && (
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              )}
              {style === "numbered" && (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium tabular-nums">
                  {i + 1}
                </span>
              )}
              {style === "checklist" && (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              )}
              {style === "bulleted" && <span className="flex-1">{item}</span>}
              {(style === "numbered" || style === "checklist") && (
                <span className="flex-1">{item}</span>
              )}
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
