/**
 * @file components/sections/logos-ticker.tsx
 * @description Infinite logo ticker. Label from @/lib/i18n.
 */
"use client";
import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";

const logos = [
  {
    name: "Next.js",
    d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.918 14.618L9.29 7H7v9.5h1.786v-7.1l7.046 9.736c.36-.17.705-.365 1.036-.58z",
  },
  { name: "Vercel", d: "M12 2L2 19.5h20L12 2z" },
  { name: "Supabase", d: "M12 2l10 6.5v7L12 22 2 15.5v-7z" },
  {
    name: "Stripe",
    d: "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z",
  },
  {
    name: "Drizzle",
    path: (
      <path
        d="M3 7h18M3 12h18M3 17h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    name: "Resend",
    d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  },
  {
    name: "Auth.js",
    path: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path
          d="M7 11V7a5 5 0 0 1 10 0v4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </>
    ),
  },
  {
    name: "Tailwind",
    d: "M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.664 1.715 1.209C13.24 10.39 14.4 11.6 17 11.6c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.664-1.715-1.209C15.76 7.21 14.6 6 12 6zm-4.5 6C5.1 12 3.6 13.2 3 15.6c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.664 1.715 1.209C8.74 16.39 9.9 17.6 12.5 17.6c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.664-1.715-1.209C11.26 13.21 10.1 12 7.5 12z",
  },
];

export default function LogosTicker(): React.JSX.Element {
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";

  return (
    <div id="logos" aria-label="Technology partners">
      <p className="ticker-label">{t("logos.label", l)}</p>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            insetBlock: 0,
            left: 0,
            width: 120,
            zIndex: 2,
            background: "linear-gradient(to right, var(--bg-0), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            insetBlock: 0,
            right: 0,
            width: 120,
            zIndex: 2,
            background: "linear-gradient(to left, var(--bg-0), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          className="ticker-track"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "running";
          }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="ticker-item"
              aria-hidden={i >= logos.length}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: 18, height: 18 }}
              >
                {logo.path ?? <path d={logo.d} />}
              </svg>
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
