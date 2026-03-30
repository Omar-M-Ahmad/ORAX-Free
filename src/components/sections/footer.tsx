/**
 * @file components/sections/footer.tsx
 * @description Footer with next/link for internal navigation.
 */
"use client";
import Link from "next/link";
import { Zap } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { t, type TKey } from "@/i18n";

/* Internal routes use Link, anchor links (#) use <a> */
const cols: {
  headingKey: TKey;
  links: { labelKey: TKey; href: string; internal?: boolean }[];
}[] = [
  {
    headingKey: "footer.product",
    links: [
      { labelKey: "footer.features", href: "#features" },
      { labelKey: "footer.pricing", href: "#pricing" },
      { labelKey: "footer.howitworks", href: "#how" },
      { labelKey: "footer.faq", href: "#faq" },
    ],
  },
  {
    headingKey: "footer.resources",
    links: [
      { labelKey: "footer.docs", href: "#" },
      { labelKey: "footer.quickstart", href: "#" },
      { labelKey: "footer.rtlguide", href: "#" },
      { labelKey: "footer.changelog", href: "#" },
    ],
  },
  {
    headingKey: "footer.legal",
    links: [
      { labelKey: "footer.license", href: "#" },
      { labelKey: "footer.privacy", href: "#" },
      { labelKey: "footer.terms", href: "#" },
      { labelKey: "footer.refund", href: "#" },
    ],
  },
];

const linkStyle: React.CSSProperties = {
  fontSize: 14,
  color: "var(--text-2)",
  textDecoration: "none",
  transition: "color 0.2s",
};

export default function Footer(): React.JSX.Element {
  const { locale, mounted, toggleLocale } = useTheme();
  const l = mounted ? locale : "en";

  return (
    <footer
      id="footer"
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: 72,
        paddingBottom: 40,
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "var(--brand)",
                  boxShadow: "0 0 16px rgba(99,102,241,0.45)",
                }}
              >
                <Zap size={13} fill="white" color="white" />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "var(--text-1)",
                  letterSpacing: "-0.04em",
                }}
              >
                ORAX
              </span>
            </Link>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-3)",
                lineHeight: 1.75,
                maxWidth: 280,
              }}
            >
              {t("footer.tagline", l)}
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {[
                { label: "Twitter", symbol: "𝕏", href: "#" },
                { label: "GitHub", symbol: "⌥", href: "#" },
                { label: "Discord", symbol: "◈", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-3)",
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "border-color 0.2s,color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-glow)";
                    e.currentTarget.style.color = "var(--brand)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-3)";
                  }}
                >
                  {s.symbol}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.headingKey}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-3)",
                  marginBottom: 20,
                }}
              >
                {t(col.headingKey, l)}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    {/* Anchor links stay as <a>, future internal pages can use Link */}
                    <a
                      href={link.href}
                      style={linkStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--text-1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-2)";
                      }}
                    >
                      {t(link.labelKey, l)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider" style={{ marginBottom: 32 }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text-3)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {t("footer.copy", l)}{" "}
            <span style={{ color: "var(--brand)", fontWeight: 600 }}>
              {t("footer.author", l)}
            </span>
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {["Next.js 16", "TypeScript", "Tailwind v4"].map((b) => (
              <span
                key={b}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: 4,
                  border: "1px solid var(--border)",
                  color: "var(--text-3)",
                  letterSpacing: "0.06em",
                }}
              >
                {b}
              </span>
            ))}
            <button
              onClick={toggleLocale}
              type="button"
              className="nav-toggle-btn"
              style={{ fontSize: 11 }}
            >
              {t("footer.switchLang", l)}
            </button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){#footer .container>div:first-child{grid-template-columns:1fr 1fr!important}}@media(max-width:560px){#footer .container>div:first-child{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
