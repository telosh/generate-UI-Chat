import { tool } from "ai";
import { z } from "zod";

export const chatTools = {
  showCards: tool({
    description:
      "Show a grid of cards. Use for プロジェクト、作品、事例、おすすめ、カード一覧など.",
    inputSchema: z.object({
      title: z.string().optional().describe("Section title."),
      cards: z
        .array(
          z.object({
            id: z.string().describe("Unique ID."),
            title: z.string().describe("Card title."),
            description: z.string().describe("Card description."),
            badges: z.array(z.string()).optional().describe("Tags or tech stack."),
            links: z
              .array(
                z.object({
                  label: z.string(),
                  url: z.string(),
                }),
              )
              .optional()
              .describe("Links (e.g. GitHub, Demo)."),
          }),
        )
        .describe("Cards to display."),
    }),
    execute: async ({ title, cards }) => ({
      title: title ?? null,
      cards: cards ?? [],
    }),
  }),
  showChart: tool({
    description:
      "Show a bar chart. Use for スキル、比較、ランキング、割合、レベルなど.",
    inputSchema: z.object({
      title: z.string().optional().describe("Chart title."),
      items: z
        .array(
          z.object({
            name: z.string().describe("Item label."),
            value: z.number().describe("Value 0-100 for bar width."),
            subtitle: z.string().optional().describe("Additional info."),
          }),
        )
        .describe("Chart items."),
    }),
    execute: async ({ title, items }) => ({
      title: title ?? null,
      items: items ?? [],
    }),
  }),
  showTimeline: tool({
    description:
      "Show a timeline. Use for 経歴、履歴、年表、イベント、ストーリーなど.",
    inputSchema: z.object({
      title: z.string().optional().describe("Timeline title."),
      items: z
        .array(
          z.object({
            title: z.string().describe("Event title."),
            subtitle: z.string().describe("Subtitle (e.g. company, period)."),
            points: z.array(z.string()).optional().describe("Bullet points."),
          }),
        )
        .describe("Timeline items."),
    }),
    execute: async ({ title, items }) => ({
      title: title ?? null,
      items: items ?? [],
    }),
  }),
  showProfile: tool({
    description:
      "Show a profile/contact card. Use for 連絡先、プロフィール、問い合わせ先など.",
    inputSchema: z.object({
      name: z.string().describe("Name."),
      role: z.string().optional().describe("Role or title."),
      summary: z.string().optional().describe("Short description."),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.string(),
          }),
        )
        .optional()
        .describe("Contact links."),
    }),
    execute: async ({ name, role, summary, links }) => ({
      name: name ?? "",
      role: role ?? null,
      summary: summary ?? null,
      links: links ?? [],
    }),
  }),
  showTable: tool({
    description:
      "Show a data table. Use for 表、テーブル、一覧、データ、天気、降水量など.",
    inputSchema: z.object({
      title: z.string().optional().describe("Table title."),
      columns: z.array(z.string()).describe("Column headers."),
      rows: z
        .array(z.array(z.union([z.string(), z.number()])))
        .describe("Row data."),
    }),
    execute: async ({ title, columns, rows }) => ({
      title: title ?? null,
      columns: columns ?? [],
      rows: rows ?? [],
    }),
  }),
  showStats: tool({
    description:
      "Show key metrics in a grid. Use for サマリー、指標、KPI、数値のまとめなど.",
    inputSchema: z.object({
      title: z.string().optional().describe("Section title."),
      items: z
        .array(
          z.object({
            label: z.string(),
            value: z.union([z.string(), z.number()]),
          }),
        )
        .describe("Stats to display."),
    }),
    execute: async ({ title, items }) => ({
      title: title ?? null,
      items: items ?? [],
    }),
  }),
  showList: tool({
    description:
      "Show a styled list. Use for 一覧、箇条書き、チェックリスト、やることなど.",
    inputSchema: z.object({
      title: z.string().optional().describe("List title."),
      items: z.array(z.string()).describe("List items."),
      style: z
        .enum(["bulleted", "numbered", "checklist"])
        .default("bulleted")
        .describe("List style."),
    }),
    execute: async ({ title, items, style }) => ({
      title: title ?? null,
      items: items ?? [],
      style: style ?? "bulleted",
    }),
  }),
  showComparison: tool({
    description:
      "Show side-by-side comparison. Use for 比較、vs、メリットデメリットなど.",
    inputSchema: z.object({
      title: z.string().optional().describe("Comparison title."),
      items: z
        .array(
          z.object({
            name: z.string(),
            pros: z.array(z.string()),
            cons: z.array(z.string()).optional(),
          }),
        )
        .describe("Items to compare."),
    }),
    execute: async ({ title, items }) => ({
      title: title ?? null,
      items: items ?? [],
    }),
  }),
  showSteps: tool({
    description:
      "Show step-by-step guide. Use for 手順、ステップ、やり方、流れなど.",
    inputSchema: z.object({
      title: z.string().optional().describe("Guide title."),
      steps: z
        .array(
          z.object({
            step: z.number(),
            title: z.string(),
            description: z.string(),
          }),
        )
        .describe("Ordered steps."),
    }),
    execute: async ({ title, steps }) => ({
      title: title ?? null,
      steps: steps ?? [],
    }),
  }),
  showQuote: tool({
    description:
      "Show a highlighted quote. Use for 名言、メッセージ、ポイント、一言など.",
    inputSchema: z.object({
      text: z.string().describe("Quote text."),
      source: z.string().optional().describe("Attribution."),
      variant: z
        .enum(["default", "info", "success", "warning"])
        .default("default")
        .describe("Visual variant."),
    }),
    execute: async ({ text, source, variant }) => ({
      text: text ?? "",
      source: source ?? null,
      variant: variant ?? "default",
    }),
  }),
};

export type ChatTools = typeof chatTools;
