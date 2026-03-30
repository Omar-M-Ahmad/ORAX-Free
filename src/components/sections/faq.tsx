/**
 * @file components/sections/faq.tsx
 * @description FAQ accordion. All text from @/lib/i18n.
 */
"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { t, type TKey } from "@/i18n";

const faqs: { q: TKey; a: TKey }[] = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
];

export default function FAQ(): React.JSX.Element {
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const init = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        "#faq .faq-sticky",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: "#faq", start: "top 80%" },
        },
      );
      gsap.fromTo(
        "#faq .faq-list",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: "#faq", start: "top 80%" },
        },
      );
    };
    init();
  }, [l]);

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
            <p
              style={{
                color: "var(--text-2)",
                marginTop: 16,
                fontSize: 15,
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: 300,
              }}
            >
              {t("faq.sub", l)}
            </p>
            <div style={{ marginTop: 28 }}>
              <a href="mailto:hello@orax.dev" className="btn btn-ghost">
                {t("faq.contact", l)}
              </a>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpen((p) => (p === i ? null : i))}
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
                    maxHeight: open === i ? "300px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s var(--ease)",
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
      <style>{`.faq-layout{display:grid;grid-template-columns:320px 1fr;gap:80px;align-items:start}.faq-sticky{position:sticky;top:120px}.faq-list{border-top:1px solid var(--border)}@media(max-width:900px){.faq-layout{grid-template-columns:1fr;gap:40px}.faq-sticky{position:static}}`}</style>
    </section>
  );
}
