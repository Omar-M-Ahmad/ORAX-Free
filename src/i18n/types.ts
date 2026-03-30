/**
 * @file src/i18n/types.ts
 * @description Shared i18n types for ORAX.
 */

import en from "@/messages/en.json";

export type Locale = "en" | "ar";
export type MessagesShape = typeof en;
export type TKey = keyof MessagesShape;
export type TranslateParams = Record<string, string | number>;
