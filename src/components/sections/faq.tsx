/**
 * @file components/sections/faq.tsx
 * @description ORAX FAQ section aligned with the Free / Pro positioning.
 */
"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { type TKey, t } from "@/i18n";

const faqs: { q: TKey; a: TKey }[] = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
];

export default function FAQ(): React.JSX.Element {
  const { locale: l } = useLocale();

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="faq-layout">
          <div className="faq-sticky">
            <div className="label">{t("faq.label", l)}</div>

            <h2 className="h-display h-md" id="faq-heading">
              {t("faq.heading", l)}{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--brand)",
                  WebkitTextFillColor: "var(--brand)",
                }}
              >
                {t("faq.italic", l)}
              </em>
            </h2>

            <p className="faq-side-copy">{t("faq.sub", l)}</p>

            <div style={{ marginTop: 28 }}>
              <a href="#cta-final" className="btn btn-ghost">
                {t("faq.contact", l)}
              </a>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                className={`faq-item${open === i ? " open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpen((prev) => (prev === i ? null : i))}
                  aria-expanded={open === i}
                  type="button"
                >
                  {t(item.q, l)}
                  <div className="faq-icon" aria-hidden="true">
                    +
                  </div>
                </button>

                <div
                  className="faq-answer"
                  style={{
                    maxHeight: open === i ? "320px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.35s var(--ease)",
                    display: "block",
                    paddingBottom: open === i ? "24px" : "0",
                  }}
                >
                  {t(item.a, l)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
