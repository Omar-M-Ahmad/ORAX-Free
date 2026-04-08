/**
 * @file components/providers/locale-provider.tsx
 * @description ORAX locale provider.
 *
 * Responsibility:
 * - Manage locale only
 * - Apply locale to <html>
 * - Prevent locale flash on first load
 */

"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useMemo } from "react";

export type Locale = "en" | "ar";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const LOCALE_COOKIE_NAME = "orax-locale";

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const value = useMemo<LocaleContextValue>(() => {
    return {
      locale,
      setLocale(nextLocale) {
        document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000`;

        const segments = pathname.split("/").filter(Boolean);

        if (
          segments.length > 0 &&
          (segments[0] === "en" || segments[0] === "ar")
        ) {
          segments[0] = nextLocale;
        } else {
          segments.unshift(nextLocale);
        }

        router.push(`/${segments.join("/")}`);
        router.refresh();
      },
    };
  }, [locale, pathname, router]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
