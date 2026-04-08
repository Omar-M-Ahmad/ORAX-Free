/**
 * @file app/[locale]/layout.tsx
 * @description Root layout for localized routes.
 */

import type { Metadata } from "next";
import { Bricolage_Grotesque, Cairo } from "next/font/google";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";
import "@/app/styles/globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: "%s | ORAX",
  },

  description: siteConfig.description,

  keywords: [
    "SaaS starter",
    "Next.js SaaS",
    "RTL support",
    "Arabic SaaS",
    "bilingual SaaS",
    "Next.js starter",
    "clean architecture SaaS",
  ],

  authors: [{ name: "Omar Mahmoud Ahmad" }],
  creator: "Omar Mahmoud Ahmad",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "ORAX SaaS Starter System",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@omar_m_ahmad",
  },

  icons: {
    icon: "/icon.svg",
  },
};

function isSupportedLocale(locale: string): locale is "en" | "ar" {
  return locale === "en" || locale === "ar";
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;
  const resolvedLocale = isSupportedLocale(locale) ? locale : "en";
  const dir = resolvedLocale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={resolvedLocale}
      dir={dir}
      data-theme="dark"
      suppressHydrationWarning
      className={`${bricolage.variable} ${cairo.variable}`}
    >
      <body suppressHydrationWarning>
        <LocaleProvider locale={resolvedLocale}>
          <ThemeProvider>{children}</ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
