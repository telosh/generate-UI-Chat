import { tool } from "ai";
import { z } from "zod";
import { resumeData, type SkillCategory } from "@/app/lib/data/resume-data";

const normalize = (value: string) => value.toLowerCase().trim();

export const chatTools = {
  showProjects: tool({
    description:
      "Show project cards when user asks for projects, case studies, or portfolio examples.",
    inputSchema: z.object({
      filter: z
        .string()
        .optional()
        .describe("Optional technology or keyword filter."),
    }),
    execute: async ({ filter }: { filter?: string }) => {
      const query = filter ? normalize(filter) : "";
      const projects = query
        ? resumeData.projects.filter((project) => {
            const inTitle = normalize(project.title).includes(query);
            const inDescription = normalize(project.description).includes(query);
            const inStack = project.techStack.some((tech) =>
              normalize(tech).includes(query),
            );
            return inTitle || inDescription || inStack;
          })
        : resumeData.projects;

      return { projects, filter: filter ?? null };
    },
  }),
  showSkills: tool({
    description: "Show a skills chart when user asks about tech stack or strengths.",
    inputSchema: z.object({
      category: z
        .enum(["frontend", "backend", "design"])
        .default("frontend")
        .describe("The skills domain to visualize."),
    }),
    execute: async ({ category }: { category: SkillCategory }) => {
      return { category, skills: resumeData.skills[category] };
    },
  }),
  showExperience: tool({
    description:
      "Show timeline details when user asks about work history or achievements.",
    inputSchema: z.object({
      focus: z
        .string()
        .optional()
        .describe("Optional role, company, or keyword focus."),
    }),
    execute: async ({ focus }: { focus?: string }) => {
      const query = focus ? normalize(focus) : "";
      const items = query
        ? resumeData.experience.filter((item) => {
            const inCompany = normalize(item.company).includes(query);
            const inRole = normalize(item.role).includes(query);
            const inHighlight = item.highlights.some((h) =>
              normalize(h).includes(query),
            );
            return inCompany || inRole || inHighlight;
          })
        : resumeData.experience;

      return { items, focus: focus ?? null };
    },
  }),
  showContact: tool({
    description:
      "Show contact card when user asks how to get in touch, social links, or hiring info.",
    inputSchema: z.object({}),
    execute: async () => {
      return { profile: resumeData.profile };
    },
  }),
};

export type ChatTools = typeof chatTools;
