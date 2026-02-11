/**
 * Gemini API モデル定義
 * https://ai.google.dev/gemini-api/docs/models
 */

export const GEMINI_MODELS = [
  {
    id: "gemini-3-pro-preview",
    label: "3 Pro",
    description: "最先端・多モーダル",
    disabled: false,
  },
  {
    id: "gemini-3-flash-preview",
    label: "3 Flash",
    description: "先進バランス・高速",
    disabled: false,
  },
  {
    id: "gemini-2.5-pro",
    label: "2.5 Pro",
    description: "高精度・推論・Search対応",
    disabled: false,
  },
  {
    id: "gemini-2.5-flash",
    label: "2.5 Flash",
    description: "バランス・Search対応",
    disabled: false,
  },
  {
    id: "gemini-2.5-flash-lite",
    label: "2.5 Flash-Lite",
    description: "最速・コスト効率",
    disabled: false,
  },
  {
    id: "gemini-2.0-flash",
    label: "2.0 Flash",
    description: "2026/3まで利用可",
    disabled: false,
  },
  {
    id: "gemini-2.0-flash-lite",
    label: "2.0 Flash-Lite",
    description: "2026/3まで利用可",
    disabled: false,
  },
] as const;

export type GeminiModelId = (typeof GEMINI_MODELS)[number]["id"];

export const DEFAULT_GEMINI_MODEL: GeminiModelId = "gemini-2.5-flash-lite";

export function isValidGeminiModel(id: string): id is GeminiModelId {
  return GEMINI_MODELS.some((m) => m.id === id);
}
