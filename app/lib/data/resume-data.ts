export type SkillCategory = "frontend" | "backend" | "cloud";

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
  companyUrl?: string;
  role: string;
  period: string;
  highlights: string[];
};

export const resumeData = {
  profile: {
    name: "Terumi",
    alias: "telosh",
    role: "Web Application Engineer",
    summary:
      "フロントエンドをメイン領域としつつ、GCP Professional 3資格を保持するクラウドエンジニア。東京からフルリモートで活動中。最近はAI駆動開発に注力。",
    location: "Tokyo, Japan",
    origin: "Miyazaki, Japan",
    contact: {
      email: "terumi.contact.web@gmail.com",
      website: "https://telosh.xyz",
      github: "https://github.com/telosh",
      linkedin: "https://www.linkedin.com/in/terumi-kawano-651790360/",
      x: "https://x.com/TellM1_",
    },
  },
  skills: {
    frontend: [
      { name: "React", level: 82, years: 3 },
      { name: "Next.js", level: 80, years: 3 },
      { name: "TypeScript", level: 82, years: 3 },
      { name: "Tailwind CSS", level: 78, years: 3 },
      { name: "Angular", level: 55, years: 1 },
      { name: "Gatsby", level: 55, years: 1 },
      { name: "SCSS", level: 60, years: 1 },
      { name: "Bootstrap", level: 55, years: 1 },
    ] satisfies SkillItem[],
    backend: [
      { name: "Node.js", level: 72, years: 2 },
      { name: "Express.js", level: 70, years: 2 },
      { name: "PHP", level: 65, years: 2 },
      { name: "Laravel", level: 65, years: 2 },
      { name: "PostgreSQL", level: 65, years: 2 },
      { name: "MySQL", level: 65, years: 2 },
      { name: "Firebase", level: 70, years: 2 },
      { name: "Hono", level: 50, years: 1 },
      { name: "Redis", level: 45, years: 1 },
    ] satisfies SkillItem[],
    cloud: [
      { name: "Google Cloud", level: 88, years: 2 },
      { name: "Docker", level: 70, years: 2 },
      { name: "Vercel", level: 75, years: 2 },
    ] satisfies SkillItem[],
  } satisfies Record<SkillCategory, SkillItem[]>,
  certifications: [
    "Google Cloud Professional Cloud Architect",
    "Google Cloud Professional Cloud Security Engineer",
    "Google Cloud Professional Cloud Developer",
  ],
  projects: [
    {
      id: "gen-ui-resume",
      title: "AI Generative Resume",
      description:
        "AIチャットで経歴・スキルをインタラクティブに探索できるポートフォリオサイト。",
      impact:
        "自然言語でスキルやプロジェクトを質問するだけで、リッチなUIカードやチャートが動的に表示される体験を実現。",
      techStack: [
        "Next.js",
        "AI SDK",
        "TypeScript",
        "Tailwind CSS",
        "Vercel",
      ],
      githubUrl: "https://github.com/telosh/genUIAI",
      liveUrl: "",
    },
  ] satisfies Project[],
  experience: [
    {
      company: "クラウドエース株式会社",
      companyUrl: "https://cloud-ace.jp/",
      role: "シニアアソシエイト",
      period: "2024/04 - Present",
      highlights: [
        "建材企業向け社内AIチャットアプリケーションの開発・保守を担当。",
        "小売店向け従業員用QR認証システムを設計・実装。",
        "病院関係の商品注文システムの開発に従事。",
      ],
    },
  ] satisfies Experience[],
};

export type ResumeData = typeof resumeData;
