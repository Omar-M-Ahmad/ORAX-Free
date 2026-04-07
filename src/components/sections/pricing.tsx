/**
 * @file components/sections/pricing.tsx
 * @description ORAX editions section.
 * Replaces old pricing tiers with Free / Pro positioning.
 */

"use client";

import { Check } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { type TKey, t } from "@/i18n";

type EditionFeature = {
  key: TKey;
};

type Edition = {
  id: "free" | "pro";
  nameKey: TKey;
  badgeKey: TKey;
  descKey: TKey;
  noteKey: TKey;
  ctaKey: TKey;
  featured?: boolean;
  features: EditionFeature[];
};

const editions: Edition[] = [
  {
    id: "free",
    nameKey: "editions.free.name",
    badgeKey: "editions.free.badge",
    descKey: "editions.free.desc",
    noteKey: "editions.free.note",
    ctaKey: "editions.free.cta",
    features: [
      { key: "editions.feature.ui" },
      { key: "editions.feature.authUi" },
      { key: "editions.feature.dashboardUi" },
      { key: "editions.feature.settingsUi" },
      { key: "editions.feature.rtl" },
      { key: "editions.feature.design" },
    ],
  },
  {
    id: "pro",
    nameKey: "editions.pro.name",
    badgeKey: "editions.pro.badge",
    descKey: "editions.pro.desc",
    noteKey: "editions.pro.note",
    ctaKey: "editions.pro.cta",
    featured: true,
    features: [
      { key: "editions.feature.rtl" },
      { key: "editions.feature.authReal" },
      { key: "editions.feature.routes" },
      { key: "editions.feature.backend" },
      { key: "editions.feature.api" },
      { key: "editions.feature.db" },
      { key: "editions.feature.arch" },
    ],
  },
];

export default function Pricing(): React.JSX.Element {
  const { locale: l } = useLocale();

  return (
    <section id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        <div className="editions-header">
          <div className="label" style={{ justifyContent: "center" }}>
            {t("editions.label", l)}
          </div>

          <h2 className="h-display h-lg" id="pricing-heading">
            {t("editions.heading", l)}{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--brand)",
                WebkitTextFillColor: "var(--brand)",
              }}
            >
              {t("editions.italic", l)}
            </em>
          </h2>

          <p className="editions-sub">{t("editions.sub", l)}</p>
        </div>

        <div className="editions-grid">
          {editions.map((edition) => (
            <article
              key={edition.id}
              className={`edition-card${edition.featured ? " featured" : ""}`}
            >
              <div className="edition-top">
                <span className="edition-badge">{t(edition.badgeKey, l)}</span>

                <h3 className="edition-title">{t(edition.nameKey, l)}</h3>

                <p className="edition-desc">{t(edition.descKey, l)}</p>
              </div>

              <ul className="edition-features">
                {edition.features.map((feature) => (
                  <li key={feature.key} className="edition-feature">
                    <Check size={14} className="edition-check" />
                    <span>{t(feature.key, l)}</span>
                  </li>
                ))}
              </ul>

              <div className="edition-footer">
                <p className="edition-note">{t(edition.noteKey, l)}</p>

                <a
                  href={edition.id === "free" ? "#features" : "#cta-final"}
                  className={`btn ${
                    edition.featured ? "btn-glow" : "btn-ghost"
                  }`}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {t(edition.ctaKey, l)}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
