/**
 * @file components/sections/hero.tsx
 * @description ORAX landing hero section.
 * Lightweight client component for locale-aware content without heavy runtime effects.
 */

"use client";

import { useMemo } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";

type HeroStat = {
  id: string;
  value: string;
  suffix: string;
  label: string;
};

export default function HeroSection(): React.JSX.Element {
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";
  const isAr = l === "ar";

  const stats = useMemo<HeroStat[]>(
    () => [
      {
        id: "rtl",
        value: t("hero.stats.rtl.value", l),
        suffix: t("hero.stats.rtl.suffix", l),
        label: t("hero.stats.rtl.label", l),
      },
      {
        id: "i18n",
        value: t("hero.stats.i18n.value", l),
        suffix: t("hero.stats.i18n.suffix", l),
        label: t("hero.stats.i18n.label", l),
      },
      {
        id: "arch",
        value: t("hero.stats.arch.value", l),
        suffix: t("hero.stats.arch.suffix", l),
        label: t("hero.stats.arch.label", l),
      },
      {
        id: "editions",
        value: t("hero.stats.editions.value", l),
        suffix: t("hero.stats.editions.suffix", l),
        label: t("hero.stats.editions.label", l),
      },
    ],
    [l],
  );

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient-1" />
        <div className="hero-gradient-2" />
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          <span>{t("hero.badge", l)}</span>
        </div>

        <h1
          className="hero-title"
          id="hero-heading"
          style={{
            lineHeight: isAr ? 1.18 : 1.02,
            paddingBottom: isAr ? "0.15em" : 0,
          }}
        >
          <span className="line line-1">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t("hero.line1", l)}
            </span>
          </span>

          <span className="line line-2">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t("hero.line2", l)}
            </span>
          </span>

          <span className="line line-3">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t("hero.line3", l)}
            </span>
          </span>
        </h1>

        <p className="hero-sub">{t("hero.sub", l)}</p>

        <div className="hero-cta">
          <a href="#features" className="btn btn-glow btn-lg">
            {t("hero.cta1", l)}
          </a>

          <a href="#pricing" className="btn btn-ghost btn-lg">
            {t("hero.cta2", l)}
          </a>
        </div>

        <div className="hero-showcase" aria-hidden="true">
          <div className="hero-showcase-card hero-showcase-main">
            <div className="hero-showcase-top">
              <span className="hero-showcase-pill">ORAX Free</span>
              <span className="hero-showcase-status" />
            </div>

            <div className="hero-showcase-lines">
              <span className="hero-line hero-line-lg" />
              <span className="hero-line hero-line-md" />
              <span className="hero-line hero-line-sm" />
            </div>

            <div className="hero-showcase-grid">
              <div className="hero-mini-card" />
              <div className="hero-mini-card" />
              <div className="hero-mini-card" />
            </div>
          </div>

          <div className="hero-showcase-card hero-showcase-side hero-showcase-pro">
            <span className="hero-showcase-pill hero-showcase-pill-muted">
              Pro
            </span>
            <span className="hero-side-line hero-side-line-1" />
            <span className="hero-side-line hero-side-line-2" />
          </div>

          <div className="hero-showcase-card hero-showcase-side hero-showcase-rtl">
            <span className="hero-showcase-pill hero-showcase-pill-brand">
              RTL
            </span>
            <div className="hero-rtl-bars">
              <span className="hero-rtl-bar hero-rtl-bar-full" />
              <span className="hero-rtl-bar hero-rtl-bar-medium" />
              <span className="hero-rtl-bar hero-rtl-bar-short" />
            </div>
          </div>
        </div>

        <div className="hero-stats" role="list">
          {stats.map((stat) => (
            <div key={stat.id} role="listitem" className="hero-stat-item">
              <div className="hero-stat-val">
                <span>{stat.value}</span>
                {stat.suffix}
              </div>

              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
