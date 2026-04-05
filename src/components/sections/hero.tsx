/**
 * @file components/sections/hero.tsx
 * @description ORAX landing hero section.
 * Server-rendered for better landing-page performance.
 */

import { t } from "@/i18n";
import type { Locale } from "@/i18n/types";

type HeroStat = {
  id: string;
  value: string;
  suffix: string;
  label: string;
};

const DEFAULT_LOCALE: Locale = "en";

export default function HeroSection(): React.JSX.Element {
  const locale = DEFAULT_LOCALE;
  const isAr = locale === "ar";

  const stats: HeroStat[] = [
    {
      id: "rtl",
      value: t("hero.stats.rtl.value", locale),
      suffix: t("hero.stats.rtl.suffix", locale),
      label: t("hero.stats.rtl.label", locale),
    },
    {
      id: "i18n",
      value: t("hero.stats.i18n.value", locale),
      suffix: t("hero.stats.i18n.suffix", locale),
      label: t("hero.stats.i18n.label", locale),
    },
    {
      id: "arch",
      value: t("hero.stats.arch.value", locale),
      suffix: t("hero.stats.arch.suffix", locale),
      label: t("hero.stats.arch.label", locale),
    },
    {
      id: "editions",
      value: t("hero.stats.editions.value", locale),
      suffix: t("hero.stats.editions.suffix", locale),
      label: t("hero.stats.editions.label", locale),
    },
  ];

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient-1" />
        <div className="hero-gradient-2" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          <span>{t("hero.badge", locale)}</span>
        </div>

        <h1
          className="hero-title"
          id="hero-heading"
          style={{
            lineHeight: isAr ? 1.2 : 1.02,
            paddingBottom: isAr ? "0.15em" : 0,
          }}
        >
          <span className="line line-1">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t("hero.line1", locale)}
            </span>
          </span>

          <span className="line line-2">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t("hero.line2", locale)}
            </span>
          </span>

          <span className="line line-3">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t("hero.line3", locale)}
            </span>
          </span>
        </h1>

        <p className="hero-sub">{t("hero.sub", locale)}</p>

        <div className="hero-cta">
          <a href="#features" className="btn btn-glow btn-lg">
            {t("hero.cta1", locale)}
          </a>

          <a href="#pricing" className="btn btn-ghost btn-lg">
            {t("hero.cta2", locale)}
          </a>
        </div>

        <div className="hero-stats" role="list">
          {stats.map((stat) => (
            <div key={stat.id} role="listitem" style={{ textAlign: "center" }}>
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
