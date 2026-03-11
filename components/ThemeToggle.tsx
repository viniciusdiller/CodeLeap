"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors w-10 h-10 overflow-hidden cursor-pointer"
      title="Toggle Dark Mode"
    >
      <Sun
        size={24}
        className={`absolute text-white transition-all duration-500 ease-in-out ${
          isDark
            ? "rotate-90 opacity-0 scale-50"
            : "rotate-0 opacity-100 scale-100"
        }`}
      />
      <Moon
        size={24}
        className={`absolute text-white transition-all duration-500 ease-in-out ${
          isDark
            ? "rotate-0 opacity-100 scale-100"
            : "-rotate-90 opacity-0 scale-50"
        }`}
      />
    </button>
  );
}
