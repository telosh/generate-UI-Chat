import { AppHeader } from "@/app/components/layout/app-header";
import { ToolsNav } from "@/app/components/layout/tools-nav";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader leftContent={<ToolsNav />} showNewChat={false} />
      <main
        className="flex-1 overflow-y-auto scrollbar-thin bg-background"
        id="main-content"
      >
        {children}
      </main>
    </div>
  );
}
