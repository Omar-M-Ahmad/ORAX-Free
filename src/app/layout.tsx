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

import { ToastProvider } from "@/components/providers/toast-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import CustomCursor from "@/components/shared/custom-cursor";
import { siteConfig } from "@/config/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Next.js SaaS Starter Kit`,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author }],
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: `${siteConfig.name} — Next.js SaaS Starter Kit`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Next.js SaaS Starter Kit`,
    description: siteConfig.description,
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
        <div id="cursor-dot" aria-hidden="true" />
        <div id="cursor-ring" aria-hidden="true" />
        <ThemeProvider>
          <ToastProvider>
            <CustomCursor />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
