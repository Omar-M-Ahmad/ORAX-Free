/**
 * @file src/i18n/types.ts
 * @description Shared i18n types for ORAX.
 */

import type en from "./messages/en.json";

export type Locale = "en" | "ar";
export type MessagesShape = typeof en;

/** Recursively extracts every dot-separated path from a nested object type. */
type DotPaths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? DotPaths<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & string];

export type TKey = DotPaths<MessagesShape>;
export type TranslateParams = Record<string, string | number>;
