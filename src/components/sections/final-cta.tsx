/**
 * @file components/sections/final-cta.tsx
 * @description Final CTA. All text from @/lib/i18n.
 */
"use client";
import { useEffect } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";
import DemoToastLink from "../shared/demo-toast-link";

export default function FinalCTA(): React.JSX.Element {
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";

  useEffect(() => {
    const init = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        "#cta-final .cta-inner",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#cta-final",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    };
    init();
  }, [l]);

  return (
    <section
      id="cta-final"
      style={{ position: "relative", overflow: "hidden", padding: "120px 0" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, rgba(124,111,255,0.06) 35%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 100% at 50% 50%,black 0%,transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)",
        }}
      />
      <div className="container">
        <div
          className="cta-inner"
          style={{
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto",
            opacity: 0,
          }}
        >
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
          <p
            style={{
              color: "var(--text-2)",
              fontSize: 17,
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: 560,
              margin: "0 auto 48px",
            }}
          >
            {t("cta.sub", l)}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 32,
            }}
          >
            <a href="#pricing" className="btn btn-glow btn-lg">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              {t("cta.btn1", l)}
            </a>
            <DemoToastLink className="btn btn-ghost btn-lg">
              {t("cta.btn2", l)}
            </DemoToastLink>
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-3)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
            }}
          >
            {t("cta.note", l)}
          </p>
        </div>
      </div>
    </section>
  );
}
