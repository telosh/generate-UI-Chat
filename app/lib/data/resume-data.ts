export type SkillCategory = "frontend" | "backend" | "design";

export type SkillItem = {
  name: string;
  level: number;
  years: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  impact: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export const resumeData = {
  profile: {
    name: "Terum",
    role: "Frontend Engineer",
    summary:
      "I build fast, accessible, and AI-native web experiences with modern React and Next.js.",
    location: "Tokyo, Japan",
    contact: {
      email: "hello@example.com",
      website: "https://example.dev",
      github: "https://github.com/example",
      linkedin: "https://www.linkedin.com/in/example",
    },
  },
  skills: {
    frontend: [
      { name: "React", level: 95, years: 6 },
      { name: "Next.js", level: 92, years: 4 },
      { name: "TypeScript", level: 90, years: 5 },
      { name: "Tailwind CSS", level: 88, years: 3 },
      { name: "Accessibility", level: 86, years: 4 },
    ] satisfies SkillItem[],
    backend: [
      { name: "Node.js", level: 82, years: 4 },
      { name: "PostgreSQL", level: 76, years: 3 },
      { name: "Prisma", level: 75, years: 3 },
      { name: "REST API", level: 85, years: 5 },
      { name: "Edge Functions", level: 80, years: 2 },
    ] satisfies SkillItem[],
    design: [
      { name: "Design Systems", level: 82, years: 3 },
      { name: "Motion Design", level: 78, years: 3 },
      { name: "Information Architecture", level: 80, years: 4 },
      { name: "UX Writing", level: 72, years: 2 },
      { name: "Figma", level: 84, years: 4 },
    ] satisfies SkillItem[],
  } satisfies Record<SkillCategory, SkillItem[]>,
  projects: [
    {
      id: "gen-ui-resume",
      title: "Interactive Generative Resume",
      description:
        "AI-native portfolio where natural language triggers rich UI cards, charts, and timelines.",
      impact:
        "Reduced recruiter discovery time by making key achievements explorable in under 2 minutes.",
      techStack: [
        "Next.js",
        "AI SDK",
        "TypeScript",
        "Tailwind CSS",
        "Vercel",
      ],
      githubUrl: "https://github.com/example/generative-resume",
      liveUrl: "https://generative-resume.vercel.app",
    },
    {
      id: "commerce-ux",
      title: "Edge Commerce Experience",
      description:
        "Global e-commerce storefront optimized with edge rendering and streaming interactions.",
      impact:
        "Improved conversion by 14 percent and reduced LCP from 2.9s to 1.6s in key markets.",
      techStack: ["Next.js", "Vercel Edge", "PostgreSQL", "Stripe", "Redis"],
      githubUrl: "https://github.com/example/edge-commerce",
      liveUrl: "https://edge-commerce-demo.vercel.app",
    },
    {
      id: "design-system",
      title: "Multi-Brand Design System",
      description:
        "Component library and tokens pipeline for three product lines with shared primitives.",
      impact:
        "Cut feature delivery time by 30 percent through consistent UI and stronger code reuse.",
      techStack: ["React", "TypeScript", "Storybook", "Tokens", "CI/CD"],
      githubUrl: "https://github.com/example/multi-brand-design-system",
      liveUrl: "https://design-system.example.dev",
    },
  ] satisfies Project[],
  experience: [
    {
      company: "Acme Inc.",
      role: "Senior Frontend Engineer",
      period: "2023 - Present",
      highlights: [
        "Led migration to Next.js App Router and server components.",
        "Built AI-assisted onboarding flows with tool-driven UI.",
        "Introduced performance budgets and reduced JS payload by 22 percent.",
      ],
    },
    {
      company: "Northstar Labs",
      role: "Frontend Engineer",
      period: "2020 - 2023",
      highlights: [
        "Created accessible component system adopted by 4 teams.",
        "Implemented end-to-end testing strategy with Playwright.",
        "Collaborated with design to improve mobile completion rates.",
      ],
    },
  ] satisfies Experience[],
};

export type ResumeData = typeof resumeData;
