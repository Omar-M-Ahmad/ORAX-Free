/**
 * @file components/sections/hero.tsx
 * @description ORAX Hero — full-viewport with GSAP entrance,
 * particle canvas, stats counters (0 → target), and RTL support.
 */

"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import DemoToastLink from "../shared/demo-toast-link";

const statsData = [
  {
    value: 95,
    suffix: "+",
    labelEn: "Lighthouse Score",
    labelAr: "درجة Lighthouse",
  },
  { value: 12, suffix: "", labelEn: "Page Sections", labelAr: "قسم كامل" },
  {
    value: 2,
    suffix: "x",
    labelEn: "RTL + LTR Ready",
    labelAr: "دعم RTL + LTR",
  },
  { value: 5, suffix: "m", labelEn: "Setup Time", labelAr: "وقت الإعداد" },
];

const content = {
  en: {
    badge: "Next.js 16 · TypeScript · Tailwind v4 · RTL Native",
    line1: "Build SaaS",
    line2: "That converts.",
    line3: "Ship faster.",
    sub: "The only SaaS starter kit with native RTL support, cinematic animations, and zero-config deployment. From install to live in minutes.",
    cta1: "Get the Kit — $179",
    cta2: "Watch Demo",
  },
  ar: {
    badge: "Next.js 16 · TypeScript · Tailwind v4 · دعم RTL أصيل",
    line1: "ابنِ تطبيقك",
    line2: "الذي يبيع.",
    line3: "أطلق أسرع.",
    sub: "الكيت الوحيد الجاهز للإنتاج مع دعم RTL أصيل، وانيميشن سينمائي، ونشر بدون إعداد. من التثبيت إلى الإنتاج في دقائق.",
    cta1: "احصل على الكيت — $179",
    cta2: "شاهد العرض",
  },
};

export default function HeroSection(): React.JSX.Element {
  const { locale } = useTheme();
  const t = content[locale];
  const isAr = locale === "ar";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Particle Canvas ──────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── GSAP Entrance ────────────────────────────────────── */
  useEffect(() => {
    let killed = false;

    const run = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      if (killed) return;

      // Reset initial states
      gsap.set(".hero-badge", { opacity: 0, y: 20 });
      gsap.set(".hero-title .line-inner", { opacity: 0, y: "100%" });
      gsap.set(".hero-sub", { opacity: 0, y: 20 });
      gsap.set(".hero-cta", { opacity: 0, y: 20 });
      gsap.set(".hero-stats", { opacity: 0 });
      gsap.set(".hero-scroll", { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(".hero-badge", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          ".hero-title .line-inner",
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.1,
          },
          "-=0.3",
        )
        .to(
          ".hero-sub",
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          ".hero-cta",
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          ".hero-stats",
          { opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .to(".hero-scroll", { opacity: 1, duration: 0.4 }, "-=0.2");

      // ✅ Counter: counts UP from 0 → target
      tl.add(() => {
        document
          .querySelectorAll<HTMLElement>(".stat-counter")
          .forEach((el) => {
            const target = parseInt(el.dataset.target ?? "0", 10);
            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate() {
                el.textContent = Math.round(proxy.val).toString();
              },
            });
          });
      }, "-=0.4");
    };

    run();
    return () => {
      killed = true;
    };
  }, [locale]);

  /* ── Render ───────────────────────────────────────────── */
  return (
    <section id="hero" aria-labelledby="hero-heading">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient-1" />
        <div className="hero-gradient-2" />
        <div className="hero-grid" />
      </div>
      <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          <span>{t.badge}</span>
        </div>

        {/* Title — overflow:hidden per line clips the slide-up */}
        <h1
          className="hero-title"
          id="hero-heading"
          style={{
            /* Arabic needs more line-height for diacritics */
            lineHeight: isAr ? 1.2 : 1.0,
            /* Extra bottom padding so Arabic descenders don't clip */
            paddingBottom: isAr ? "0.15em" : 0,
          }}
        >
          <span className="line line-1">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t.line1}
            </span>
          </span>
          <span className="line line-2">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t.line2}
            </span>
          </span>
          <span className="line line-3">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t.line3}
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p className="hero-sub">{t.sub}</p>

        {/* CTAs */}
        <div className="hero-cta">
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
            {t.cta1}
          </a>
          <DemoToastLink className="btn btn-ghost btn-lg">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            {t.cta2}
          </DemoToastLink>
        </div>

        {/* Stats */}
        <div className="hero-stats" role="list">
          {statsData.map((stat) => (
            <div
              key={stat.labelEn}
              role="listitem"
              style={{ textAlign: "center" }}
            >
              <div className="hero-stat-val">
                <span className="stat-counter" data-target={stat.value}>
                  0
                </span>
                {stat.suffix}
              </div>
              <div className="hero-stat-label">
                {isAr ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll line */}
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
