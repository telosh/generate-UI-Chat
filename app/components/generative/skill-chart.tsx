"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillCategory, SkillItem } from "@/app/lib/data/resume-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SkillChartProps = {
  category: SkillCategory;
  skills: SkillItem[];
};

export function SkillChart({ category, skills }: SkillChartProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{category} Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{skill.name}</span>
              <span className="font-mono tabular-nums text-muted-foreground">
                {skill.level} / 100
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={reducedMotion ? false : { width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <p className="text-xs text-muted-foreground">{skill.years} years</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
