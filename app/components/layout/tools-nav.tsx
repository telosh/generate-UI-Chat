"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, List } from "lucide-react";
import { copy } from "@/app/lib/ui/copy";

/**
 * ヘッダー左のナビゲーション。sticky のためスクロール時も追従。
 */
export function ToolsNav() {
  const pathname = usePathname();
  const isDetailPage = pathname?.startsWith("/tools/") && pathname !== "/tools";

  return (
    <nav className="flex items-center gap-1" aria-label="ナビゲーション">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {copy.tools.backToChat}
      </Link>
      {isDetailPage && (
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <List className="size-4" aria-hidden />
          {copy.tools.backToList}
        </Link>
      )}
    </nav>
  );
}
