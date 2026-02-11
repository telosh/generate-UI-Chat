/**
 * Gemini API モデル定義
 * https://ai.google.dev/gemini-api/docs/models
 */

export const GEMINI_MODELS = [
  {
    id: "gemini-2.5-flash-lite",
    label: "Flash-Lite",
    description: "最速・コスト効率",
    disabled: false,
  },
  {
    id: "gemini-2.5-flash",
    label: "Flash",
    description: "バランス（推奨）",
    disabled: true,
  },
  {
    id: "gemini-2.5-pro",
    label: "Pro",
    description: "高精度・推論",
    disabled: true,
  },
  {
    id: "gemini-3-flash-preview",
    label: "3 Flash",
    description: "先進バランス",
    disabled: true,
  },
  {
    id: "gemini-3-pro-preview",
    label: "3 Pro",
    description: "最先端",
    disabled: true,
  },
] as const;

export type GeminiModelId = (typeof GEMINI_MODELS)[number]["id"];

export const DEFAULT_GEMINI_MODEL: GeminiModelId = "gemini-2.5-flash-lite";

export function isValidGeminiModel(id: string): id is GeminiModelId {
  return GEMINI_MODELS.some((m) => m.id === id);
}
