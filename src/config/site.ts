/**
 * @file src/config/site.ts
 * @description Central SEO and site configuration for ORAX.
 */

export const siteConfig = {
  name: "ORAX",
  title:
    "ORAX - A serious SaaS starter system build for Arabic and RTL products",
  description:
    "ORAX is a modern SaaS starter system with real RTL support, bilingual foundation (Arabic + English), and clean architecture.for building scalable products.",
  url: "http://localhost:3000/", // "https://orax-free.vercel.app",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://x.com/omar_m_ahmad",
    github: "https://github.com/Omar-M-Ahmad",
  },
} as const;
