import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { copy } from "@/app/lib/ui/copy";

export const metadata = {
  title: "生成できるUI一覧 | genUIAI",
  description:
    "AIが動的に生成するUIの一覧。カード、チャート、タイムライン、表など10種類のUIをチャットで試せます。",
};

export default function ToolsPage() {
  return (
    <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-2">
            {copy.tools.title}
          </h1>
          <p className="text-muted-foreground">{copy.tools.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {copy.tools.items.map((item) => (
            <Link
              key={item.slug}
              href={`/tools/${item.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="flex flex-1 flex-col">
                <h2 className="text-lg font-medium mb-1.5 group-hover:text-primary transition-colors">
                  {item.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-3 flex-1">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  例: 「{item.example}」
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {copy.tools.sampleLabel}
                  <ChevronRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
