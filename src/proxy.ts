/**
 * @file src/proxy.ts
 * @description Proxy file for ORAX locale routes.
 */

import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ["en", "ar"] as const;
const DEFAULT_LOCALE = "en";
const LOCALE_COOKIE_NAME = "orax-locale";

type Locale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ar";
}

function getLocaleFromCookie(request: NextRequest): Locale {
  const cookieValue = request.cookies.get(LOCALE_COOKIE_NAME)?.value;

  if (isSupportedLocale(cookieValue)) {
    return cookieValue;
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const locale = getLocaleFromCookie(request);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}
