import { copy } from "@/app/lib/ui/copy";

/** クォータエラーから再試行までの秒数を抽出。該当しない場合は null */
export function parseQuotaRetrySeconds(error: unknown): number | null {
  const message =
    error instanceof Error ? error.message : String(error ?? "");
  const retryMatch = message.match(/retry\s+in\s+([\d.]+)\s*s/i);
  if (retryMatch) {
    const seconds = parseFloat(retryMatch[1]);
    return !Number.isNaN(seconds) ? Math.ceil(seconds) : null;
  }
  return null;
}

/** Gemini API のクォータエラーを検出し、ユーザー向けメッセージに変換 */
export function formatChatError(error: unknown): string {
  const message =
    error instanceof Error ? error.message : String(error ?? "Unknown error");

  // "Please retry in 51.640974349s" のような形式を検出
  const retryMatch = message.match(/retry\s+in\s+([\d.]+)\s*s/i);
  if (retryMatch) {
    const seconds = parseFloat(retryMatch[1]);
    if (!Number.isNaN(seconds)) {
      return copy.chat.quotaErrorRetryIn(seconds);
    }
  }

  // クォータ・レート制限系のキーワード
  if (
    /quota|rate limit|exceeded|制限|リミット/i.test(message) &&
    /retry|再試行|please/i.test(message)
  ) {
    return copy.chat.quotaError;
  }

  return message;
}
