/**
 * @file components/sections/final-cta.tsx
 * @description Final CTA aligned with ORAX positioning.
 */
"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { t } from "@/i18n";

export default function FinalCTA(): React.JSX.Element {
  const { locale: l } = useLocale();

  return (
    <section id="cta-final" className="cta-final-section">
      <div aria-hidden="true" className="cta-final-glow" />
      <div aria-hidden="true" className="cta-final-grid" />
      <div aria-hidden="true" className="cta-final-line" />

      <div className="container">
        <div className="cta-final-inner">
          <div
            className="label"
            style={{ justifyContent: "center", marginBottom: 24 }}
          >
            {t("cta.label", l)}
          </div>

          <h2 className="h-display h-lg" style={{ marginBottom: 24 }}>
            {t("cta.line1", l)}
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--brand)",
                WebkitTextFillColor: "var(--brand)",
              }}
            >
              {t("cta.line2", l)}
            </em>
          </h2>

          <p className="cta-final-sub">{t("cta.sub", l)}</p>

          <div className="cta-final-actions">
            <a href="#features" className="btn btn-glow btn-lg">
              {t("cta.btn1", l)}
            </a>

            <a href="#pricing" className="btn btn-ghost btn-lg">
              {t("cta.btn2", l)}
            </a>
          </div>

          <p className="cta-final-note">{t("cta.note", l)}</p>
        </div>
      </div>
    </section>
  );
}
