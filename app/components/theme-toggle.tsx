"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { copy } from "@/app/lib/ui/copy";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const nextThemeLabel =
    nextTheme === "dark" ? copy.themeToggle.dark : copy.themeToggle.light;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(nextTheme)}
      aria-label={copy.themeToggle.ariaLabel(nextThemeLabel)}
      className="touch-manipulation"
    >
      {resolvedTheme === "dark" ? copy.themeToggle.light : copy.themeToggle.dark}
    </Button>
  );
}
