"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/app/lib/data/resume-data";
import { copy } from "@/app/lib/ui/copy";

export function ProjectCard({ projects }: { projects: Project[] }) {
  const reducedMotion = useReducedMotion();

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-sm text-muted-foreground">
          {copy.projectCard.noMatch}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <motion.article
          key={project.id}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{project.impact}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    {copy.projectCard.github}
                  </a>
                </Button>
                {project.liveUrl ? (
                  <Button asChild size="sm">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      {copy.projectCard.liveDemo}
                    </a>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </motion.article>
      ))}
    </div>
  );
}
