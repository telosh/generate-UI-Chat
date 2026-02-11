import { Button } from "@/components/ui/button";
import { copy } from "@/app/lib/ui/copy";
import { cn } from "@/lib/utils";

export function SuggestedPrompts({
  onSelect,
  className,
  disabled = false,
  searchMode = false,
}: {
  onSelect: (prompt: string) => void;
  className?: string;
  /** ストリーミング中・送信中等は true にして二重送信を防止 */
  disabled?: boolean;
  /** 検索モード時は検索向けプロンプトを表示 */
  searchMode?: boolean;
}) {
  const prompts = searchMode ? copy.searchPrompts : copy.prompts;
  return (
    <div className={cn("flex flex-wrap gap-2 justify-center", className)}>
      {prompts.map((prompt) => (
        <Button
          key={prompt}
          variant="outline"
          size="sm"
          disabled={disabled}
          className="touch-manipulation min-h-[44px] sm:min-h-0 transition-all duration-200 hover:border-primary/30 hover:bg-muted/30 rounded-xl px-4"
          onClick={() => !disabled && onSelect(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
