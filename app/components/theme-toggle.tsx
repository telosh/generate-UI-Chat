"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { copy } from "@/app/lib/ui/copy";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      className="touch-manipulation"
    >
      {resolvedTheme === "dark" ? copy.themeToggle.light : copy.themeToggle.dark}
    </Button>
  );
}
