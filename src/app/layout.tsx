/**
 * @file app/layout.tsx
 * @description Root layout.
 *
 * Anti-flash strategy (Next.js 16 App Router compatible):
 * - CSS: body starts with opacity: 0, transition to opacity: 1
 * - ThemeProvider: after applying real theme, sets data-ready on <html>
 * - CSS: [data-ready] body { opacity: 1 }
 * - Result: no flash — content appears only after correct theme is applied
 */

import type { Metadata } from "next";
import { Bricolage_Grotesque, Cairo } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";
import "./styles/globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bricolage.variable} ${cairo.variable}`}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
