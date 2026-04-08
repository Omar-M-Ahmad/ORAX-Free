/**
 * @file src/i18n/index.ts
 * @description Core translation utilities for ORAX.
 */

import ar from "./messages/ar.json";
import en from "./messages/en.json";
import type { Locale, TKey, TranslateParams } from "./types";

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

function getNestedValue(obj: Record<string, unknown>, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }

    return undefined;
  }, obj);
}

export function t(
  key: TKey | string,
  locale: Locale,
  params?: TranslateParams,
): string {
  const dictionary = messages[locale];

  if (!dictionary) {
    return String(key);
  }

  const raw = getNestedValue(
    dictionary as Record<string, unknown>,
    String(key),
  );

  if (typeof raw !== "string") {
    return String(key);
  }

  return interpolate(raw, params);
}

export type { Locale, TKey, TranslateParams };
