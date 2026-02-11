"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  LayoutGrid,
  Plus,
  BarChart3,
  LayoutList,
  Table,
  List,
  Quote,
  User,
  GitCompare,
  ListOrdered,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { copy } from "@/app/lib/ui/copy";

const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  cards: LayoutGrid,
  chart: BarChart3,
  timeline: ListOrdered,
  profile: User,
  table: Table,
  stats: Sparkles,
  list: List,
  comparison: GitCompare,
  steps: LayoutList,
  quote: Quote,
};

type AppHeaderProps = {
  onNewChat?: () => void;
  showNewChat?: boolean;
  /** 左側スロット（例: ToolsNav）。省略時は空 */
  leftContent?: React.ReactNode;
};

export function AppHeader({
  onNewChat,
  showNewChat = true,
  leftContent,
}: AppHeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
      aria-label={copy.header.navLabel}
    >
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0" aria-hidden={!leftContent}>
          {leftContent}
        </div>
        <Link
          href="/"
          className="flex justify-self-center items-center gap-2 font-semibold tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        >
          <span className="hidden sm:inline">{copy.sidebar.title}</span>
          <span className="sm:hidden">{copy.header.mobileTitle}</span>
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 touch-manipulation min-h-[44px] sm:min-h-0"
                aria-label={copy.header.menuOpen}
              >
                <ChevronDown className="size-4" aria-hidden />
                <span className="hidden sm:inline">{copy.header.menu}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {showNewChat && onNewChat && (
                <>
                  <DropdownMenuItem onClick={onNewChat} className="gap-2">
                    <Plus className="size-4" aria-hidden />
                    {copy.sidebar.newChat}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                {copy.tools.linkLabel}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/tools" className="gap-2">
                  <LayoutGrid className="size-4" aria-hidden />
                  {copy.header.toolsList}
                </Link>
              </DropdownMenuItem>
              {copy.tools.items.map((item) => {
                const Icon = toolIcons[item.slug];
                const isActive = pathname === `/tools/${item.slug}`;
                return (
                  <DropdownMenuItem key={item.slug} asChild>
                    <Link
                      href={`/tools/${item.slug}`}
                      className={`gap-2 ${isActive ? "bg-accent" : ""}`}
                    >
                      {Icon ? (
                        <Icon className="size-4 shrink-0" aria-hidden />
                      ) : null}
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <ThemeToggle />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
