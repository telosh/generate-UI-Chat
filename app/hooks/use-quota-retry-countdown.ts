"use client";

import { useEffect, useRef, useState } from "react";
import { parseQuotaRetrySeconds } from "@/app/lib/chat/format-error";

type UseQuotaRetryCountdownOptions = {
  error: Error | undefined;
  clearError: () => void;
};

export type QuotaRetryState = {
  remainingSeconds: number | null;
  totalSeconds: number | null;
};

/** クォータエラー時のカウントダウンと再試行可能時の自動クリア */
export function useQuotaRetryCountdown({
  error,
  clearError,
}: UseQuotaRetryCountdownOptions): QuotaRetryState {
  const [state, setState] = useState<QuotaRetryState>({
    remainingSeconds: null,
    totalSeconds: null,
  });
  const clearErrorRef = useRef(clearError);

  useEffect(() => {
    clearErrorRef.current = clearError;
  }, [clearError]);

  useEffect(() => {
    if (!error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- error 変更時のクリアは effect で同期
      setState({ remainingSeconds: null, totalSeconds: null });
      return;
    }

    const seconds = parseQuotaRetrySeconds(error);
    if (seconds === null || seconds <= 0) {
       
      setState({ remainingSeconds: null, totalSeconds: null });
      return;
    }

     
    setState({ remainingSeconds: seconds, totalSeconds: seconds });

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.remainingSeconds === null || prev.remainingSeconds <= 1) {
          clearInterval(interval);
          clearErrorRef.current();
          return { remainingSeconds: null, totalSeconds: null };
        }
        return {
          ...prev,
          remainingSeconds: prev.remainingSeconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [error]);

  return state;
}
