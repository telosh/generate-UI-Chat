import { Button } from "@/components/ui/button";

const prompts = [
  "Show your frontend skills",
  "Show projects built with Next.js",
  "What impact have you created?",
  "How can I contact you?",
];

export function SuggestedPrompts({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <Button
          key={prompt}
          variant="outline"
          size="sm"
          className="touch-manipulation"
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
