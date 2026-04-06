/**
 * @file components/providers/theme-provider.tsx
 * @description ORAX theme provider.
 *
 * Responsibility:
 * - Manage theme only
 * - Apply theme to <html>
 * - Prevent theme flash on first load
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("orax-theme") as Theme | null;
    const nextTheme = savedTheme ?? "dark";

    setTheme(nextTheme);

    const html = document.documentElement;
    html.setAttribute("data-theme", nextTheme);
    html.setAttribute("data-ready", "true");

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("orax-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return ctx;
}
