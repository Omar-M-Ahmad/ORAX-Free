/**
 * @file components/sections/footer.tsx
 * @description Minimal ORAX footer with social media links.
 */
"use client";

import Link from "next/link";
import { GitBranch, LinkIcon, X, Zap } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
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
    icon: X,
    label: "X",
  },
  {
    key: "footer.github" as const,
    href: siteConfig.links.github,
    icon: GitBranch,
    label: "GitHub",
  },
  {
    key: "footer.linkedin" as const,
    href: siteConfig.links.linkedin,
    icon: LinkIcon,
    label: "LinkedIn",
  },
];

export default function Footer(): React.JSX.Element {
  const { locale, mounted, toggleLocale } = useTheme();
  const l = mounted ? locale : "en";

  return (
    <footer id="footer" className="footer-root">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <Link href="/" className="footer-brand">
              <span className="footer-brand-icon" aria-hidden="true">
                <Zap size={13} fill="white" color="white" />
              </span>

              <span className="footer-brand-text">ORAX</span>
            </Link>

            <p className="footer-tagline">{t("footer.tagline", l)}</p>
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

        <div className="footer-nav-block">
          <p className="footer-heading">{t("footer.social", l)}</p>

          <ul className="footer-nav-list">
            {socialLinks.map((link) => {
              if (!link.href) return null;

              return (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="footer-link footer-social-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.icon && <link.icon />}
                    <span>{t(link.key, l)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="divider footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            {t("footer.copy", l)}{" "}
            <span className="footer-author">{t("footer.author", l)}</span>
          </p>

          <div className="footer-actions">
            <span className="footer-stack-label">
              {t("footer.stackLabel", l)}
            </span>

            {["Next.js", "TypeScript", "Tailwind CSS"].map((item) => (
              <span key={item} className="footer-tech-pill">
                {item}
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
    </footer>
  );
}
