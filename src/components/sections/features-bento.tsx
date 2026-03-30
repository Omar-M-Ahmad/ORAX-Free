/**
 * @file components/sections/features-bento.tsx
 * @description Features Bento Grid. Responsive and animation-safe.
 */

"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { t, type TKey } from "@/i18n";

const cards: {
  id: string;
  spanClass: string;
  lKey: TKey;
  tKey: TKey;
  dKey: TKey;
  visual: string;
  tags?: string[];
}[] = [
  {
    id: "rtl",
    spanClass: "span-8",
    lKey: "feat.rtl.label",
    tKey: "feat.rtl.title",
    dKey: "feat.rtl.desc",
    visual: "rtl",
    tags: ['dir="rtl"', "next-intl", "Cairo Font"],
  },
  {
    id: "perf",
    spanClass: "span-4",
    lKey: "feat.perf.label",
    tKey: "feat.perf.title",
    dKey: "feat.perf.desc",
    visual: "perf",
  },
  {
    id: "theme",
    spanClass: "span-4",
    lKey: "feat.theme.label",
    tKey: "feat.theme.title",
    dKey: "feat.theme.desc",
    visual: "theme",
  },
  {
    id: "anim",
    spanClass: "span-8",
    lKey: "feat.anim.label",
    tKey: "feat.anim.title",
    dKey: "feat.anim.desc",
    visual: "anim",
  },
  {
    id: "dx",
    spanClass: "span-5",
    lKey: "feat.dx.label",
    tKey: "feat.dx.title",
    dKey: "feat.dx.desc",
    visual: "code",
  },
  {
    id: "tokens",
    spanClass: "span-7",
    lKey: "feat.tokens.label",
    tKey: "feat.tokens.title",
    dKey: "feat.tokens.desc",
    visual: "tokens",
  },
];

export default function FeaturesBento(): React.JSX.Element {
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: (i % 3) * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      });

      cleanup = () => ctx.revert();
    };

    void init();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <section id="features" aria-labelledby="features-heading">
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 64,
          }}
        >
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
              <div className="bento-card-label">{t(card.lKey, l)}</div>
              <div className="bento-card-title">{t(card.tKey, l)}</div>
              <div className="bento-card-desc">{t(card.dKey, l)}</div>
              <CardVisual type={card.visual} tags={card.tags} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardVisual({
  type,
  tags,
}: {
  type: string;
  tags?: string[];
}): React.JSX.Element | null {
  if (type === "rtl") {
    return (
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {[
            ["100%", "100%"],
            ["70%", "65%"],
            ["85%", "80%"],
          ].map(([ltr, rtl], i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 8, alignItems: "center" }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: "var(--text-3)",
                  fontFamily: "var(--font-mono)",
                  width: 28,
                  flexShrink: 0,
                }}
              >
                {i === 0 ? "LTR" : i === 1 ? "RTL" : "↔"}
              </span>

              <div
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--border)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: i === 1 ? rtl : ltr,
                    borderRadius: 999,
                    background:
                      i === 1
                        ? "linear-gradient(to left,var(--brand),var(--violet))"
                        : "linear-gradient(to right,var(--brand),var(--violet))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {tags && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map((tag, i) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: `1px solid ${
                    i === 0
                      ? "rgba(99,102,241,0.3)"
                      : i === 1
                        ? "rgba(124,111,255,0.3)"
                        : "rgba(255,140,66,0.3)"
                  }`,
                  background:
                    i === 0
                      ? "var(--brand-dim)"
                      : i === 1
                        ? "rgba(124,111,255,0.1)"
                        : "rgba(255,140,66,0.1)",
                  color:
                    i === 0
                      ? "var(--brand)"
                      : i === 1
                        ? "var(--violet)"
                        : "var(--amber)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (type === "perf") {
    return (
      <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 100, height: 100 }}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--border)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40 * 0.97} ${2 * Math.PI * 40}`}
              strokeDashoffset={2 * Math.PI * 40 * 0.25}
              style={{ filter: "drop-shadow(0 0 6px rgba(99,102,241,0.6))" }}
            />
          </svg>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 800,
              color: "var(--text-1)",
            }}
          >
            97
          </div>
        </div>
      </div>
    );
  }

  if (type === "theme") {
    return (
      <div
        style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        {[
          {
            bg: "#04050a",
            bc: "rgba(255,255,255,0.1)",
            label: "DARK",
            tc: "var(--text-2)",
          },
          {
            bg: "#f8faff",
            bc: "rgba(0,0,0,0.1)",
            label: "LIGHT",
            tc: "#475569",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              flex: "1 1 180px",
              padding: "10px 14px",
              borderRadius: 10,
              background: s.bg,
              border: `1px solid ${s.bc}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--brand)",
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: s.tc,
                letterSpacing: "0.1em",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (type === "anim") {
    return (
      <div
        style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}
      >
        {[
          { c: "var(--brand)", s: 48, d: "0s" },
          { c: "var(--violet)", s: 36, d: "0.3s" },
          { c: "var(--amber)", s: 28, d: "0.6s" },
          { c: "var(--brand)", s: 20, d: "0.9s" },
        ].map((o, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              width: o.s,
              height: o.s,
              borderRadius: "50%",
              background: o.c,
              opacity: 0.7,
              filter: `blur(${o.s * 0.15}px)`,
              animation: `pulse-orb 3s ease-in-out ${o.d} infinite`,
            }}
          />
        ))}

        <style>{`
          @keyframes pulse-orb {
            0%,100% { transform:scale(1) translateY(0); opacity:.7; }
            50% { transform:scale(1.15) translateY(-6px); opacity:1; }
          }
        `}</style>
      </div>
    );
  }

  if (type === "code") {
    return (
      <div
        style={{
          marginTop: 20,
          background: "var(--bg-0)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: "14px 16px",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          lineHeight: 1.8,
          overflowX: "auto",
        }}
      >
        {[
          [
            { t: "import", c: "#818CF8" },
            { t: " { Hero } ", c: "var(--text-2)" },
            { t: "from", c: "#818CF8" },
            { t: " '@/components'", c: "var(--amber)" },
          ],
          [],
          [
            { t: "export default", c: "var(--violet)" },
            { t: " function ", c: "#818CF8" },
            { t: "Page", c: "var(--brand)" },
            { t: "() {", c: "var(--text-2)" },
          ],
          [
            { t: "  return ", c: "var(--violet)" },
            { t: "<", c: "var(--text-2)" },
            { t: "Hero", c: "var(--brand)" },
          ],
          [
            { t: "    rtl={", c: "var(--text-2)" },
            { t: "false", c: "var(--violet)" },
            { t: "} />", c: "var(--text-2)" },
          ],
          [{ t: "}", c: "var(--text-2)" }],
        ].map((line, i) => (
          <div key={i} style={{ display: "flex", minWidth: 220 }}>
            <span
              style={{
                color: "var(--text-3)",
                marginRight: 16,
                userSelect: "none",
                minWidth: 12,
              }}
            >
              {i + 1}
            </span>

            {line.map((p, j) => (
              <span key={j} style={{ color: p.c }}>
                {p.t}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === "tokens") {
    return (
      <div style={{ marginTop: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 8,
          }}
        >
          {[
            { c: "var(--brand)", l: "Brand" },
            { c: "var(--violet)", l: "Violet" },
            { c: "var(--amber)", l: "Amber" },
            { c: "var(--green)", l: "Success" },
            { c: "var(--red)", l: "Error" },
          ].map((tk) => (
            <div
              key={tk.l}
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              <div
                style={{
                  height: 32,
                  borderRadius: 8,
                  background: tk.c,
                  boxShadow: `0 0 12px ${tk.c}55`,
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  color: "var(--text-3)",
                  fontFamily: "var(--font-mono)",
                  textAlign: "center",
                  letterSpacing: "0.06em",
                }}
              >
                {tk.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
