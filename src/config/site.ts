/**
 * @file src/config/site.ts
 * @description Site-wide configuration for ORAX.
 */

export const siteConfig = {
  name: "ORAX",
  description: "Premium Next.js SaaS Starter Kit with RTL support.",
  url: "http://localhost:3000",
  author: "Omar Mahmoud Ahmad",
  keywords: ["Next.js", "SaaS", "Starter Kit", "RTL", "Arabic", "TypeScript"],
  pricing: {
    starter: 39,
    pro: 99,
    complete: 179,
  },
} as const;
