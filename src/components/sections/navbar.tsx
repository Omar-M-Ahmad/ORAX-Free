/**
 * @file components/sections/navbar.tsx
 * @description ORAX public navbar for the free version.
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";
import DemoToastLink from "@/components/shared/demo-toast-link";

const navLinks = [
  { tKey: "nav.features" as const, href: "#features" },
  { tKey: "nav.pricing" as const, href: "#pricing" },
  { tKey: "nav.faq" as const, href: "#faq" },
];

export default function Navbar(): React.JSX.Element {
  const { theme, locale, mounted, toggleTheme, toggleLocale } = useTheme();
  const l = mounted ? locale : "en";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={scrolled ? "scrolled" : ""}
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <div className="nav-logo-dot" aria-hidden="true" />
          ORAX
        </Link>

        <ul className="nav-links" role="list">
          {navLinks.map(({ tKey, href }) => (
            <li key={tKey}>
              <a href={href}>{t(tKey, l)}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <LangPill locale={l} onToggle={toggleLocale} />

          <button
            className="nav-toggle-btn"
            onClick={toggleTheme}
            type="button"
            aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <Link
            href="#pricing"
            className="nav-desktop-link"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text-2)",
              padding: "6px 10px",
              whiteSpace: "nowrap",
            }}
          >
            {t("nav.signin", l)}
          </Link>

          <DemoToastLink
            className="btn btn-primary nav-desktop-cta"
            style={{ padding: "9px 20px", fontSize: 14 }}
          >
            {t("nav.cta", l)}
          </DemoToastLink>

          <button
            className="nav-toggle-btn hamburger-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            type="button"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          style={{
            padding: "12px 24px 20px",
            background: "var(--bg-0)",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {navLinks.map(({ tKey, href }) => (
            <a
              key={tKey}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "10px 0",
                fontSize: 15,
                fontWeight: 500,
                color: "var(--text-2)",
              }}
            >
              {t(tKey, l)}
            </a>
          ))}

          <div
            style={{ height: 1, background: "var(--border)", margin: "8px 0" }}
          />

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <LangPill locale={l} onToggle={toggleLocale} />
            <button
              className="nav-toggle-btn"
              onClick={toggleTheme}
              type="button"
            >
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>

          <DemoToastLink
            className="btn btn-glow"
            style={{ marginTop: 8, justifyContent: "center" }}
          >
            {t("nav.cta", l)}
          </DemoToastLink>
        </div>
      )}

      <style>{`
        .hamburger-btn { display: none; }

        @media (max-width: 768px) {
          .hamburger-btn { display: flex !important; }
          .nav-links { display: none !important; }
          .nav-desktop-link,
          .nav-desktop-cta { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

function LangPill({
  locale,
  onToggle,
}: {
  locale: "en" | "ar";
  onToggle: () => void;
}): React.JSX.Element {
  const isEn = locale === "en";

  const pill = (
    active: boolean,
    extra?: React.CSSProperties,
  ): React.CSSProperties => ({
    padding: "4px 14px",
    borderRadius: "999px",
    fontSize: 12,
    fontWeight: active ? 700 : 400,
    color: active ? "#fff" : "var(--text-3)",
    background: active ? "var(--brand)" : "transparent",
    transition: "all 0.25s",
    whiteSpace: "nowrap",
    letterSpacing: "0.04em",
    boxShadow: active ? "0 0 10px rgba(99,102,241,0.35)" : "none",
    ...extra,
  });

  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label={isEn ? "Switch to Arabic" : "Switch to English"}
      style={{
        display: "flex",
        alignItems: "center",
        padding: 3,
        borderRadius: "999px",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        cursor: "pointer",
        transition: "border-color 0.25s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <span style={pill(isEn)}>EN</span>

      <span
        style={{
          width: 1,
          height: 14,
          background: "var(--border)",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      <span
        style={pill(!isEn, { fontFamily: "var(--font-cairo, sans-serif)" })}
      >
        عربي
      </span>
    </button>
  );
}
