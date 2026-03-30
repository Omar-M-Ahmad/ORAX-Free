/**
 * @file src/i18n/index.ts
 * @description Core translation utilities for ORAX.
 */

import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import type { Locale, TKey, TranslateParams } from "@/i18n/types";

const messages = {
  en,
  ar,
} as const;

function interpolate(text: string, params?: TranslateParams): string {
  if (!params) return text;

  return text.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = params[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export function t(
  key: TKey | string,
  locale: Locale,
  params?: TranslateParams,
): string {
  const raw = messages[locale][key as keyof (typeof messages)[Locale]];

  if (typeof raw !== "string") {
    return String(key);
  }

  return interpolate(raw, params);
}

export type { Locale, TKey, TranslateParams };
