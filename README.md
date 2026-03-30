# ORAX-Free

ORAX-Free is the public free edition of ORAX — a premium Next.js landing page starter built for modern SaaS websites.

It focuses on the public-facing experience only:

- premium landing page UI
- dark / light theme
- Arabic / English support
- RTL / LTR support
- polished interactions
- clean project structure

This version is intended for developers who want a beautiful bilingual landing page foundation without authentication, dashboard, billing, or backend complexity.

---

## Features

- Next.js 16
- TypeScript
- Premium SaaS landing page
- Dark / Light mode
- Arabic / English translations
- RTL / LTR support
- Responsive layout
- Custom 404 page
- Scroll progress UI
- Toast feedback for demo links
- Clean reusable sections

---

## Included in ORAX-Free

- Public landing page
- Navigation bar
- Hero section
- Features section
- Pricing section
- FAQ section
- CTA section
- Footer
- Theme provider
- Toast provider
- Translation system
- Shared UI helpers
- Custom 404 page

---

## Not Included in ORAX-Free

- Authentication
- OAuth
- Dashboard
- Billing system
- API routes
- Database
- Email system
- Protected routes
- User settings
- Password reset flow

---

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Lucide React
- GSAP
- Framer Motion

---

## Project Structure

```txt
src/
  app/
    globals.css
    layout.tsx
    page.tsx
    not-found.tsx

  components/
    providers/
      theme-provider.tsx
      toast-provider.tsx
    sections/
      navbar.tsx
      hero.tsx
      logos-ticker.tsx
      features-bento.tsx
      how-it-works.tsx
      pricing.tsx
      faq.tsx
      cta.tsx
      footer.tsx
    shared/
      custom-cursor.tsx
      scroll-ui.tsx
      demo-toast-link.tsx

  config/
    site.ts

  i18n/
    index.ts
    routing.ts
    types.ts

  messages/
    en.json
    ar.json
```

---

## Getting Started

Install dependencies

```bach
pnpm install
```

Run the development server:

```bach
pnpm dev
```

The open:

```bach
http://localhost:3000
```

---

## Customization

You can customize ORAX-Free from these places:

- `src/config/site.ts` → site name, description, pricing values
- `src/messages/en.json` → English text
- `src/messages/ar.json` → Arabic text
- `src/app/globals.css` → colors, tokens, spacing, global styles
- `src/components/sections/*` → landing page sections

---

## Use Cases

ORAX-Free is suitable for:

- SaaS landing pages
- product showcase websites
- startup marketing pages
- bilingual public websites
- Arabic-first landing pages

---

## Upgrade Path

If you need more than the public landing page, upgrade to a higher ORAX edition:

- **Starter** → expanded public structure and more reusable sections

- **Pro** → authentication, dashboard, billing UI, database foundation

- **Complete** → payments, subscriptions, webhooks, production-ready SaaS flows

---

## License

ORAX-Free is intended for learning, personal projects, and public demo usage.

Commercial redistribution of this free version as a competing template package is not allowed.
