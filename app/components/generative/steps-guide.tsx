"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StepsGuideProps = {
  title?: string | null;
  steps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
};

export function StepsGuide({ title, steps }: StepsGuideProps) {
  const reducedMotion = useReducedMotion();

  if (!steps.length) return null;

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-2">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={reducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-sm font-semibold tabular-nums">
                {s.step}
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="font-medium text-foreground">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
