/**
 * @file app/layout.tsx
 * @description Root layout.
 *
 * Anti-flash strategy (Next.js 16 App Router compatible):
 * - CSS: body starts with opacity:0, transition to opacity:1
 * - ThemeProvider: after applying real theme, sets data-ready on <html>
 * - CSS: [data-ready] body { opacity: 1 }
 * Result: no flash — content appears only after correct theme is applied
 */

import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, DM_Mono, Cairo } from "next/font/google";

import { ToastProvider } from "@/components/providers/toast-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import CustomCursor from "@/components/shared/custom-cursor";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORAX — Next.js SaaS Starter Kit",
  description:
    "Production-ready Next.js starter kit with bilingual Arabic/English support, RTL layout, auth, payments, and dark mode.",
  keywords: ["Next.js", "SaaS", "Starter Kit", "RTL", "Arabic", "TypeScript"],
  authors: [{ name: "Omar Mahmoud Ahmad" }],
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
      className={`${bricolage.variable} ${dmSans.variable} ${dmMono.variable} ${cairo.variable}`}
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
