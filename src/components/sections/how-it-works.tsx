/**
 * @file components/sections/how-it-works.tsx
 * @description How It Works. All text from @/lib/i18n.
 */
"use client";
import { useEffect } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { t, type TKey } from "@/i18n";

const steps: {
  num: string;
  numAr: string;
  tagKey: TKey;
  titleKey: TKey;
  descKey: TKey;
  code: string;
  afterKey: TKey;
}[] = [
  {
    num: "01",
    numAr: "٠١",
    tagKey: "how.s1.tag",
    titleKey: "how.s1.title",
    descKey: "how.s1.desc",
    code: "pnpm install",
    afterKey: "how.s1.after",
  },
  {
    num: "02",
    numAr: "٠٢",
    tagKey: "how.s2.tag",
    titleKey: "how.s2.title",
    descKey: "how.s2.desc",
    code: ".env.example → .env.local",
    afterKey: "how.s2.after",
  },
  {
    num: "03",
    numAr: "٠٣",
    tagKey: "how.s3.tag",
    titleKey: "how.s3.title",
    descKey: "how.s3.desc",
    code: "globals.css",
    afterKey: "how.s3.after",
  },
  {
    num: "04",
    numAr: "٠٤",
    tagKey: "how.s4.tag",
    titleKey: "how.s4.title",
    descKey: "how.s4.desc",
    code: "vercel deploy",
    afterKey: "how.s4.after",
  },
];

export default function HowItWorks(): React.JSX.Element {
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";

  useEffect(() => {
    const init = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        ".how-sticky",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "#how", start: "top 80%" },
        },
      );
      gsap.utils.toArray<HTMLElement>(".how-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => step.classList.add("active"),
          onLeave: () => step.classList.remove("active"),
          onEnterBack: () => step.classList.add("active"),
          onLeaveBack: () => step.classList.remove("active"),
        });
      });
    };
    init();
  }, [l]);

  return (
    <section id="how" aria-labelledby="how-heading">
      <div className="container">
        <div className="how-wrapper">
          <div className="how-sticky">
            <div className="label">{t("how.label", l)}</div>
            <h2 className="h-display h-lg" id="how-heading">
              {t("how.heading", l)}
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--brand)",
                  WebkitTextFillColor: "var(--brand)",
                }}
              >
                {t("how.italic", l)}
              </em>
            </h2>
            <p
              style={{
                color: "var(--text-2)",
                fontSize: 16,
                lineHeight: 1.75,
                marginTop: 20,
                fontWeight: 300,
                maxWidth: 360,
              }}
            >
              {t("how.sub", l)}
            </p>
            <div style={{ marginTop: 36 }}>
              <a href="#pricing" className="btn btn-primary btn-lg">
                {t("how.cta", l)}
              </a>
            </div>
          </div>
          <div className="how-steps">
            {steps.map((step, i) => (
              <div key={step.num} className="how-step" style={{ opacity: 0 }}>
                <div className="step-num-wrap">
                  <div className="step-num">
                    {l === "ar" ? step.numAr : step.num}
                  </div>
                  {i < steps.length - 1 && <div className="step-connector" />}
                </div>
                <div className="step-content">
                  <div className="step-tag">{t(step.tagKey, l)}</div>
                  <div className="step-title">{t(step.titleKey, l)}</div>
                  <div className="step-desc">
                    {t(step.descKey, l)}{" "}
                    <code
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "var(--brand)",
                        background: "var(--brand-dim)",
                        padding: "2px 8px",
                        borderRadius: 5,
                        border: "1px solid var(--brand-glow)",
                      }}
                    >
                      {step.code}
                    </code>{" "}
                    {t(step.afterKey, l)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`.how-wrapper{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}.how-sticky{position:sticky;top:120px}.how-steps{display:flex;flex-direction:column;gap:0}.how-step{display:flex;gap:28px;padding:32px 0;transition:opacity .3s}.how-step.active .step-num{background:var(--brand);color:#fff;box-shadow:0 0 24px rgba(99,102,241,0.45);border-color:var(--brand)}.how-step.active .step-title{color:var(--text-1)}.step-num-wrap{display:flex;flex-direction:column;align-items:center;flex-shrink:0}.step-num{width:52px;height:52px;border-radius:14px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:16px;font-weight:800;color:var(--text-3);letter-spacing:-0.03em;transition:all .35s var(--ease);flex-shrink:0}.step-connector{width:1px;flex:1;min-height:40px;background:linear-gradient(to bottom,var(--border),transparent);margin:8px 0}.step-content{padding-top:10px;padding-bottom:32px}.step-tag{font-family:var(--font-mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--brand);margin-bottom:8px}.step-title{font-family:var(--font-display);font-size:20px;font-weight:700;letter-spacing:-0.025em;color:var(--text-2);margin-bottom:12px;line-height:1.25;transition:color .3s}.step-desc{font-size:15px;color:var(--text-2);line-height:1.75;font-weight:300}@media(max-width:900px){.how-wrapper{grid-template-columns:1fr;gap:40px}.how-sticky{position:static}}`}</style>
    </section>
  );
}
