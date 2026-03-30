/**
 * @file components/sections/testimonials.tsx
 * @description Testimonials grid. Labels from @/lib/i18n.
 * Quote/name/role data stays inline — it's content, not UI text.
 */
"use client";
import { useEffect } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";

const items = {
  en: [
    {
      initials: "AK",
      gradient: "linear-gradient(135deg,#6366f1,#818cf8)",
      name: "Ahmed Khalid",
      role: "Full-Stack Developer, Dubai",
      text: "This saved me two weeks on my last SaaS project. The RTL support alone is worth the price — every Arabic client has been thrilled.",
    },
    {
      initials: "SR",
      gradient: "linear-gradient(135deg,#ff8c42,#7c6fff)",
      name: "Sarah Rodriguez",
      role: "Freelance Designer, Madrid",
      text: "The animations are genuinely impressive without being distracting. My clients always ask how I built the scroll effects.",
    },
    {
      initials: "MH",
      gradient: "linear-gradient(135deg,#22c55e,#6366f1)",
      name: "Marcus Henriksson",
      role: "Agency Owner, Stockholm",
      text: "Finally a template that doesn't look like every other SaaS site. The Bento grid feature section is stunning.",
    },
    {
      initials: "LT",
      gradient: "linear-gradient(135deg,#6366f1,#22c55e)",
      name: "Lena Tanaka",
      role: "Indie Hacker, Tokyo",
      text: "Launched my SaaS landing page in a single weekend. TypeScript types are clean, components are well-documented.",
    },
    {
      initials: "YA",
      gradient: "linear-gradient(135deg,#818cf8,#ff8c42)",
      name: "Youssef Al-Rashid",
      role: "Product Manager, Riyadh",
      text: "We needed both Arabic and English versions. The RTL switching is seamless — our Arabic users can't believe it was built by one developer.",
    },
    {
      initials: "DM",
      gradient: "linear-gradient(135deg,#7c6fff,#6366f1)",
      name: "David Martinez",
      role: "CTO, SaaS Startup, NYC",
      text: "The code quality is exceptional. Strict TypeScript, Biome configured, components under 150 lines. Exactly how I want my codebase.",
    },
  ],
  ar: [
    {
      initials: "أ.خ",
      gradient: "linear-gradient(135deg,#6366f1,#818cf8)",
      name: "أحمد خالد",
      role: "مطور Full-Stack، دبي",
      text: "وفّر لي أسبوعين من العمل. دعم RTL وحده يستحق السعر — كل عميل عربي أصبح سعيداً بالنتيجة.",
    },
    {
      initials: "س.ر",
      gradient: "linear-gradient(135deg,#ff8c42,#7c6fff)",
      name: "سارة رودريغيز",
      role: "مصممة ومطورة مستقلة، مدريد",
      text: "الانيميشن رائع دون أن يكون مزعجاً. عملائي يسألون دائماً كيف بنيت تأثيرات التمرير.",
    },
    {
      initials: "م.ه",
      gradient: "linear-gradient(135deg,#22c55e,#6366f1)",
      name: "ماركوس هنريكسون",
      role: "مالك وكالة، ستوكهولم",
      text: "أخيراً قالب لا يبدو مثل كل مواقع SaaS الأخرى. قسم المميزات بتصميم Bento رائع.",
    },
    {
      initials: "ل.ت",
      gradient: "linear-gradient(135deg,#6366f1,#22c55e)",
      name: "لينا تاناكا",
      role: "Indie Hacker، طوكيو",
      text: "أطلقت صفحة الهبوط في عطلة نهاية أسبوع واحدة. أنواع TypeScript نظيفة، المكونات موثقة جيداً.",
    },
    {
      initials: "ي.ر",
      gradient: "linear-gradient(135deg,#818cf8,#ff8c42)",
      name: "يوسف الراشد",
      role: "مدير منتج، الرياض",
      text: "احتجنا نسختين عربية وإنجليزية. التبديل بين RTL و LTR سلس تماماً — مستخدمونا العرب لا يصدقون.",
    },
    {
      initials: "د.م",
      gradient: "linear-gradient(135deg,#7c6fff,#6366f1)",
      name: "ديفيد مارتينيز",
      role: "CTO، شركة SaaS، نيويورك",
      text: "جودة الكود استثنائية. TypeScript strict، Biome مهيأ، مكونات أقل من 150 سطر. بالضبط كيف أريد قاعدة الكود.",
    },
  ],
};

export default function Testimonials(): React.JSX.Element {
  const { locale, mounted } = useTheme();
  const l = mounted ? locale : "en";

  useEffect(() => {
    const init = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        ".testi-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: { amount: 0.5 },
          scrollTrigger: {
            trigger: "#testimonials",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    };
    init();
  }, [l]);

  return (
    <section id="testimonials" aria-labelledby="testi-heading">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="label" style={{ justifyContent: "center" }}>
            {t("testi.label", l)}
          </div>
          <h2 className="h-display h-lg" id="testi-heading">
            {t("testi.heading", l)}{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--brand)",
                WebkitTextFillColor: "var(--brand)",
              }}
            >
              {t("testi.italic", l)}
            </em>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
          }}
        >
          {items[l].map((item, i) => (
            <article
              key={i}
              className="testi-card"
              style={{
                opacity: 0,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "border-color 0.3s,transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-glow)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{ color: "#F59E0B", fontSize: 14, letterSpacing: 2 }}
                aria-label="5 stars"
              >
                ★★★★★
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                  flex: 1,
                }}
              >
                "{item.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: item.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {item.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-1)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-3)",
                      marginTop: 2,
                    }}
                  >
                    {item.role}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){#testimonials .container>div:last-child{grid-template-columns:1fr!important}}@media(min-width:640px) and (max-width:900px){#testimonials .container>div:last-child{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}
