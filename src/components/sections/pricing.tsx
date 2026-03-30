/**
 * @file components/sections/pricing.tsx
 * @description Pricing section. All text from @/lib/i18n.
 */
"use client";
import { useEffect } from "react";
import { Check, Minus } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { t, type TKey } from "@/i18n";
import DemoToastLink from "../shared/demo-toast-link";

type FeatureKey = TKey;
interface Tier {
  nameKey: TKey;
  price: number;
  descKey: TKey;
  ctaKey: TKey;
  featured: boolean;
  features: { key: FeatureKey; included: boolean }[];
}

const tiers: Tier[] = [
  {
    nameKey: "pricing.t1.name",
    price: 39,
    descKey: "pricing.t1.desc",
    ctaKey: "pricing.t1.cta",
    featured: false,
    features: [
      { key: "pricing.t1.only", included: true },
      { key: "pricing.f.landing", included: true },
      { key: "pricing.f.darkmode", included: true },
      { key: "pricing.f.source", included: true },
      { key: "pricing.f.updates6", included: true },
      { key: "pricing.f.rtl", included: false },
      { key: "pricing.f.auth", included: false },
      { key: "pricing.f.payments", included: false },
    ],
  },
  {
    nameKey: "pricing.t2.name",
    price: 99,
    descKey: "pricing.t2.desc",
    ctaKey: "pricing.t2.cta",
    featured: true,
    features: [
      { key: "pricing.t2.all", included: true },
      { key: "pricing.f.rtl", included: true },
      { key: "pricing.f.auth", included: true },
      { key: "pricing.f.dashboard", included: true },
      { key: "pricing.f.settings", included: true },
      { key: "pricing.f.lifetime", included: true },
      { key: "pricing.f.payments", included: false },
      { key: "pricing.f.email", included: false },
    ],
  },
  {
    nameKey: "pricing.t3.name",
    price: 179,
    descKey: "pricing.t3.desc",
    ctaKey: "pricing.t3.cta",
    featured: false,
    features: [
      { key: "pricing.t3.all", included: true },
      { key: "pricing.f.payments", included: true },
      { key: "pricing.f.email", included: true },
      { key: "pricing.f.webhooks", included: true },
      { key: "pricing.f.db", included: true },
      { key: "pricing.f.docs", included: true },
      { key: "pricing.f.lifetime", included: true },
      { key: "pricing.f.support", included: true },
    ],
  },
];

export default function Pricing(): React.JSX.Element {
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";

  useEffect(() => {
    const init = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "#pricing",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    };
    init();
  }, [l]);

  return (
    <section id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="label" style={{ justifyContent: "center" }}>
            {t("pricing.label", l)}
          </div>
          <h2 className="h-display h-lg" id="pricing-heading">
            {t("pricing.heading", l)}{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--brand)",
                WebkitTextFillColor: "var(--brand)",
              }}
            >
              {t("pricing.italic", l)}
            </em>
          </h2>
          <p
            style={{
              color: "var(--text-3)",
              fontSize: 14,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
              marginTop: 16,
            }}
          >
            {t("pricing.note", l)}
          </p>
        </div>
        <div className="pricing-grid">
          {tiers.map((tier) => (
            <div
              key={tier.nameKey}
              className={`pricing-card${tier.featured ? " featured" : ""}`}
              style={{ opacity: 0 }}
            >
              {tier.featured && (
                <div className="pricing-badge">{t("pricing.popular", l)}</div>
              )}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: tier.featured ? "var(--brand)" : "var(--text-3)",
                  marginBottom: 16,
                }}
              >
                {t(tier.nameKey, l)}
              </p>
              <div className="pricing-price">
                <sup>$</sup>
                {tier.price}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-3)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 12,
                }}
              >
                {t("pricing.period", l)}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-2)",
                  marginBottom: 28,
                  lineHeight: 1.6,
                }}
              >
                {t(tier.descKey, l)}
              </p>
              <div
                style={{
                  height: 1,
                  background: "var(--border)",
                  marginBottom: 24,
                }}
              />
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 32,
                }}
              >
                {tier.features.map((f) => (
                  <li key={f.key} className="pricing-feature">
                    {f.included ? (
                      <Check
                        size={14}
                        className="pricing-check"
                        aria-label="Included"
                      />
                    ) : (
                      <Minus
                        size={14}
                        className="pricing-x"
                        aria-label="Not included"
                      />
                    )}
                    <span style={{ opacity: f.included ? 1 : 0.4 }}>
                      {t(f.key, l)}
                    </span>
                  </li>
                ))}
              </ul>
              <DemoToastLink
                className={`btn ${tier.featured ? "btn-glow" : "btn-ghost"}`}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {t(tier.ctaKey, l)}
              </DemoToastLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
