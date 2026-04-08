/**
 * @file components/sections/footer.tsx
 * @description Minimal ORAX footer with social media links.
 */
"use client";

import { Zap } from "lucide-react";
import Link from "next/link";

import { useLocale } from "@/components/providers/locale-provider";
import { SocialIcons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n";

const navLinks = [
  { key: "footer.capabilities" as const, href: "#features" },
  { key: "footer.editions" as const, href: "#pricing" },
  { key: "footer.faq" as const, href: "#faq" },
  { key: "footer.nextStep" as const, href: "#cta-final" },
];

const socialLinks = [
  {
    key: "footer.x" as const,
    href: siteConfig.links.twitter,
    icon: SocialIcons.X,
    label: "X",
    color: "#000000",
  },
  {
    key: "footer.github" as const,
    href: siteConfig.links.github,
    icon: SocialIcons.GitHub,
    label: "GitHub",
    color: "#24292e",
  },
  {
    key: "footer.linkedin" as const,
    href: siteConfig.links.linkedin,
    icon: SocialIcons.LinkedIn,
    label: "LinkedIn",
    color: "#0077b5",
  },
];

export default function Footer(): React.JSX.Element {
  const { locale, setLocale } = useLocale();
  const l = locale;

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    setLocale(nextLocale);
  };

  return (
    <footer id="footer" className="footer-root">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <Link href="/" className="footer-brand">
              <span className="footer-brand-icon" aria-hidden="true">
                <Zap size={14} fill="white" color="white" />
              </span>
              <span className="footer-brand-text">ORAX</span>
            </Link>

            <p className="footer-tagline">{t("footer.tagline", l)}</p>

            <div className="footer-social-list">
              {socialLinks.map((link) => {
                if (!link.href) return null;

                return (
                  <a
                    key={link.key}
                    href={link.href}
                    className="footer-social-icon-link"
                    style={
                      { "--platform-color": link.color } as React.CSSProperties
                    }
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                  >
                    {link.icon && <link.icon />}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-nav-block">
            <p className="footer-heading">{t("footer.navigation", l)}</p>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="footer-link">
                    {t(link.key, l)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider footer-divider" />

        <div className="footer-bottom">
          <div className="footer-bottom-info">
            <p className="footer-copy">
              {t("footer.copy", l)}{" "}
              <span className="footer-author">{t("footer.author", l)}</span>
            </p>
          </div>

          <div className="footer-actions">
            <span className="footer-stack-label">
              {t("footer.stackLabel", l)}
            </span>

            <div className="footer-tech-list">
              {["Next.js", "TypeScript", "Tailwind CSS"].map((item) => (
                <span key={item} className="footer-tech-pill">
                  {item}
                </span>
              ))}
            </div>

            <button
              onClick={toggleLocale}
              type="button"
              className="nav-toggle-btn footer-lang-btn"
            >
              <span style={{ fontSize: 13, marginRight: 6 }}>🌐</span>
              {t("footer.switchLang", l)}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
