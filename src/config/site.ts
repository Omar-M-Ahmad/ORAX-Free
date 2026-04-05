/**
 * @file src/config/site.ts
 * @description Central SEO and site configuration for ORAX.
 */

export const siteConfig = {
  name: "ORAX",
  title: "ORAX - Arabic Ready SaaS Starter System",
  description:
    "ORAX is a modern SaaS starter system with real RTL support, bilingual foundation (Arabic + English), and clean architecture.for building scalable products.",
  url: "http://localhost:3000/", // "https://orax-free.vercel.app",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://x.com/omar_m_ahmad",
    linkedin: "https://www.linkedin.com/in/omar-mahmoud-ahmad",
    github: "https://github.com/Omar-M-Ahmad",
  },
} as const;
