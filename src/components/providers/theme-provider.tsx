/**
 * @file components/providers/theme-provider.tsx
 * @description ORAX Theme + Locale provider.
 *
 * Anti-flash technique:
 * 1. body starts hidden via CSS (opacity: 0) — defined in globals.css
 * 2. useEffect reads localStorage, sets real theme/locale
 * 3. Sets data-ready on <html> → CSS shows body (opacity: 1 with transition)
 * 4. Result: user sees ONLY the correct theme — zero flash
 */

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type Theme = "dark" | "light";
export type Locale = "en" | "ar";
export type Dir = "ltr" | "rtl";

interface ThemeContextValue {
  theme: Theme;
  locale: Locale;
  dir: Dir;
  mounted: boolean;
  toggleTheme: () => void;
  toggleLocale: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  /* Server defaults — always match SSR output */
  const [theme, setTheme] = useState<Theme>("dark");
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  const dir: Dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    /* Read saved preferences */
    const savedTheme = localStorage.getItem("orax-theme") as Theme | null;
    const savedLocale = localStorage.getItem("orax-locale") as Locale | null;

    const theme = savedTheme ?? "dark";
    const locale = savedLocale ?? "en";

    /* Apply to state */
    setTheme(theme);
    setLocale(locale);

    /* Apply to DOM */
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    html.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    html.setAttribute("lang", locale);

    /* Signal ready — CSS will fade in body */
    html.setAttribute("data-ready", "true");

    setMounted(true);
  }, []);

  /* Sync DOM + localStorage on user toggle */
  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    html.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    html.setAttribute("lang", locale);
    localStorage.setItem("orax-theme", theme);
    localStorage.setItem("orax-locale", locale);
  }, [theme, locale, mounted]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );
  const toggleLocale = useCallback(
    () => setLocale((l) => (l === "en" ? "ar" : "en")),
    [],
  );

  return (
    <ThemeContext.Provider
      value={{ theme, locale, dir, mounted, toggleTheme, toggleLocale }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
