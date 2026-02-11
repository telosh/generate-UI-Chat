"use client";

import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/app/components/generative/project-card";
import { SkillChart } from "@/app/components/generative/skill-chart";
import { ExperienceTimeline } from "@/app/components/generative/experience-timeline";
import { ContactCard } from "@/app/components/generative/contact-card";
import { GithubRepos } from "@/app/components/generative/github-repos";

type AnyMessage = {
  id: string;
  role: "user" | "assistant" | string;
  parts: Array<Record<string, unknown>>;
};

function ToolLoading() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

export function ChatMessage({ message }: { message: AnyMessage }) {
  return (
    <article className="space-y-3 rounded-xl border p-4">
      <header className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {message.role === "user" ? "You" : "Assistant"}
      </header>
      <div className="space-y-3">
        {message.parts.map((part, index) => {
          const type = part.type;

          if (type === "text" && typeof part.text === "string") {
            return (
              <div key={`${message.id}-text-${index}`} className="prose prose-sm dark:prose-invert">
                <ReactMarkdown>{part.text}</ReactMarkdown>
              </div>
            );
          }

          if (type === "tool-showProjects") {
            if (part.state === "input-available") {
              return <ToolLoading key={`${message.id}-projects-loading-${index}`} />;
            }
            if (part.state === "output-available" && part.output) {
              const output = part.output as {
                projects: Array<{
                  id: string;
                  title: string;
                  description: string;
                  impact: string;
                  techStack: string[];
                  githubUrl: string;
                  liveUrl: string;
                }>;
              };

              return (
                <div key={`${message.id}-projects-${index}`} className="space-y-3">
                  <ProjectCard projects={output.projects ?? []} />
                  <GithubRepos projects={output.projects ?? []} />
                </div>
              );
            }
          }

          if (type === "tool-showSkills") {
            if (part.state === "input-available") {
              return <ToolLoading key={`${message.id}-skills-loading-${index}`} />;
            }
            if (part.state === "output-available" && part.output) {
              const output = part.output as {
                category: "frontend" | "backend" | "design";
                skills: Array<{ name: string; level: number; years: number }>;
              };
              return (
                <SkillChart
                  key={`${message.id}-skills-${index}`}
                  category={output.category}
                  skills={output.skills}
                />
              );
            }
          }

          if (type === "tool-showExperience") {
            if (part.state === "input-available") {
              return <ToolLoading key={`${message.id}-exp-loading-${index}`} />;
            }
            if (part.state === "output-available" && part.output) {
              const output = part.output as {
                items: Array<{
                  company: string;
                  role: string;
                  period: string;
                  highlights: string[];
                }>;
              };
              return (
                <ExperienceTimeline
                  key={`${message.id}-exp-${index}`}
                  items={output.items ?? []}
                />
              );
            }
          }

          if (type === "tool-showContact") {
            if (part.state === "input-available") {
              return <ToolLoading key={`${message.id}-contact-loading-${index}`} />;
            }
            if (part.state === "output-available" && part.output) {
              const output = part.output as {
                profile: {
                  name: string;
                  role: string;
                  summary: string;
                  location: string;
                  contact: {
                    email: string;
                    website: string;
                    github: string;
                    linkedin: string;
                  };
                };
              };

              return (
                <ContactCard key={`${message.id}-contact-${index}`} profile={output.profile} />
              );
            }
          }

          return null;
        })}
      </div>
      <Separator />
    </article>
  );
}
