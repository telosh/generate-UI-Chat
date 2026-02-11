"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Experience } from "@/app/lib/data/resume-data";
import { copy } from "@/app/lib/ui/copy";

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.experience.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={`${item.company}-${item.period}`}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="relative border-l pl-4"
          >
            <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary" />
            <p className="font-medium">{item.role}</p>
            <p className="text-sm text-muted-foreground">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  {item.company}
                </a>
              ) : (
                item.company
              )}{" "}
              · {item.period}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
