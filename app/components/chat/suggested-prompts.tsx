import { Button } from "@/components/ui/button";
import { copy } from "@/app/lib/ui/copy";
import { cn } from "@/lib/utils";

export function SuggestedPrompts({
  onSelect,
  className,
}: {
  onSelect: (prompt: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {copy.prompts.map((prompt) => (
        <Button
          key={prompt}
          variant="outline"
          size="sm"
          className="touch-manipulation min-h-[44px] sm:min-h-0 transition-colors duration-200"
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
