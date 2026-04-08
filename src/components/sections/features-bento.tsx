/**
 * @file components/sections/features-bento.tsx
 * @description ORAX system capabilities section.
 */

"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { type TKey, t } from "@/i18n";

type Card = {
  id: string;
  spanClass: string;
  labelKey: TKey;
  titleKey: TKey;
  descKey: TKey;
  visual: "rtl" | "structure" | "free" | "pro" | "design" | "positioning";
};

const cards: Card[] = [
  {
    id: "rtl",
    spanClass: "span-8",
    labelKey: "feat.rtl.label",
    titleKey: "feat.rtl.title",
    descKey: "feat.rtl.desc",
    visual: "rtl",
  },
  {
    id: "structure",
    spanClass: "span-4",
    labelKey: "feat.structure.label",
    titleKey: "feat.structure.title",
    descKey: "feat.structure.desc",
    visual: "structure",
  },
  {
    id: "free",
    spanClass: "span-4",
    labelKey: "feat.free.label",
    titleKey: "feat.free.title",
    descKey: "feat.free.desc",
    visual: "free",
  },
  {
    id: "pro",
    spanClass: "span-8",
    labelKey: "feat.pro.label",
    titleKey: "feat.pro.title",
    descKey: "feat.pro.desc",
    visual: "pro",
  },
  {
    id: "design",
    spanClass: "span-5",
    labelKey: "feat.design.label",
    titleKey: "feat.design.title",
    descKey: "feat.design.desc",
    visual: "design",
  },
  {
    id: "positioning",
    spanClass: "span-7",
    labelKey: "feat.positioning.label",
    titleKey: "feat.positioning.title",
    descKey: "feat.positioning.desc",
    visual: "positioning",
  },
];

export default function FeaturesBento(): React.JSX.Element {
  const { locale: l } = useLocale();

  return (
    <section id="features" aria-labelledby="features-heading">
      <div className="container">
        <div className="features-header">
          <div>
            <div className="label">{t("features.label", l)}</div>

            <h2 className="h-display h-lg" id="features-heading">
              {t("features.heading", l)}
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--brand)",
                  WebkitTextFillColor: "var(--brand)",
                }}
              >
                {t("features.headingItalic", l)}
              </em>
            </h2>
          </div>

          <a href="#pricing" className="btn btn-ghost">
            {t("features.link", l)}
          </a>
        </div>

        <div className="bento">
          {cards.map((card) => (
            <article key={card.id} className={`bento-card ${card.spanClass}`}>
              <div className="bento-card-label">{t(card.labelKey, l)}</div>
              <div className="bento-card-title">{t(card.titleKey, l)}</div>
              <div className="bento-card-desc">{t(card.descKey, l)}</div>
              <CardVisual type={card.visual} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardVisual({
  type,
}: {
  type: Card["visual"];
}): React.JSX.Element | null {
  if (type === "rtl") {
    return (
      <div className="cap-rtl">
        <div className="cap-rtl-row">
          <span>LTR</span>
          <div className="cap-bar">
            <div className="cap-bar-fill cap-bar-fill-ltr" />
          </div>
        </div>
        <div className="cap-rtl-row">
          <span>RTL</span>
          <div className="cap-bar">
            <div className="cap-bar-fill cap-bar-fill-rtl" />
          </div>
        </div>
        <div className="cap-tags">
          <span>dir="rtl"</span>
          <span>Arabic UI</span>
          <span>Layout aware</span>
        </div>
      </div>
    );
  }

  if (type === "structure") {
    return (
      <div className="cap-structure">
        <div>Landing</div>
        <div>Shared</div>
        <div>App</div>
      </div>
    );
  }

  if (type === "free") {
    return (
      <div className="cap-stack">
        <span className="cap-pill">Landing</span>
        <span className="cap-pill">Auth UI</span>
        <span className="cap-pill">Dashboard UI</span>
        <span className="cap-pill">Settings UI</span>
      </div>
    );
  }

  if (type === "pro") {
    return (
      <div className="cap-flow">
        <span>Auth</span>
        <span className="cap-arrow">→</span>
        <span>Routes</span>
        <span className="cap-arrow">→</span>
        <span>API</span>
        <span className="cap-arrow">→</span>
        <span>DB</span>
      </div>
    );
  }

  if (type === "design") {
    return (
      <div className="cap-swatches">
        <span style={{ background: "var(--brand)" }} />
        <span style={{ background: "var(--violet)" }} />
        <span style={{ background: "var(--amber)" }} />
        <span style={{ background: "var(--green)" }} />
      </div>
    );
  }

  if (type === "positioning") {
    return (
      <div className="cap-code">
        <div>Arabic credibility</div>
        <div>RTL-first thinking</div>
        <div>System-level structure</div>
      </div>
    );
  }

  return null;
}
