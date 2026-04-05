/**
 * @file components/sections/hero.tsx
 * @description ORAX landing hero section.
 * All user-facing text comes from i18n messages.
 */

"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { t } from "@/i18n";

import DemoToastLink from "../shared/demo-toast-link";

type HeroStat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export default function HeroSection(): React.JSX.Element {
  const { locale } = useTheme();
  const l = locale;
  const isAr = l === "ar";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stats = useMemo<HeroStat[]>(
    () => [
      {
        id: "rtl",
        value: Number(t("hero.stats.rtl.value", l)),
        suffix: t("hero.stats.rtl.suffix", l),
        label: t("hero.stats.rtl.label", l),
      },
      {
        id: "i18n",
        value: Number(t("hero.stats.i18n.value", l)),
        suffix: t("hero.stats.i18n.suffix", l),
        label: t("hero.stats.i18n.label", l),
      },
      {
        id: "arch",
        value: Number(t("hero.stats.arch.value", l)),
        suffix: t("hero.stats.arch.suffix", l),
        label: t("hero.stats.arch.label", l),
      },
      {
        id: "editions",
        value: Number(t("hero.stats.editions.value", l)),
        suffix: t("hero.stats.editions.suffix", l),
        label: t("hero.stats.editions.label", l),
      },
    ],
    [l],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resizeCanvas = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < 40; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.35 + 0.08,
      });
    }

    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${particle.opacity})`;
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    let killed = false;

    const runAnimation = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      if (killed) return;

      gsap.set(".hero-badge", { opacity: 0, y: 20 });
      gsap.set(".hero-title .line-inner", { opacity: 0, y: "100%" });
      gsap.set(".hero-sub", { opacity: 0, y: 20 });
      gsap.set(".hero-cta", { opacity: 0, y: 20 });
      gsap.set(".hero-stats", { opacity: 0 });

      const timeline = gsap.timeline({ delay: 0.1 });

      timeline
        .to(".hero-badge", {
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
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.1,
          },
          "-=0.25",
        )
        .to(
          ".hero-sub",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .to(
          ".hero-cta",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .to(
          ".hero-stats",
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.25",
        );

      timeline.add(() => {
        document
          .querySelectorAll<HTMLElement>(".stat-counter")
          .forEach((el) => {
            const target = Number(el.dataset.target ?? "0");
            const proxy = { value: 0 };

            gsap.to(proxy, {
              value: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate() {
                el.textContent = Math.round(proxy.value).toString();
              },
            });
          });
      }, "-=0.2");
    };

    void runAnimation();

    return () => {
      killed = true;
    };
  }, [l]);

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient-1" />
        <div className="hero-gradient-2" />
        <div className="hero-grid" />
      </div>

      <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          <span>{t("hero.badge", l)}</span>
        </div>

        <h1
          className="hero-title"
          id="hero-heading"
          style={{
            lineHeight: isAr ? 1.2 : 1.02,
            paddingBottom: isAr ? "0.15em" : 0,
          }}
        >
          <span className="line line-1">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t("hero.line1", l)}
            </span>
          </span>

          <span className="line line-2">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t("hero.line2", l)}
            </span>
          </span>

          <span className="line line-3">
            <span
              className="line-inner"
              style={{ paddingBottom: isAr ? "0.1em" : 0 }}
            >
              {t("hero.line3", l)}
            </span>
          </span>
        </h1>

        <p className="hero-sub">{t("hero.sub", l)}</p>

        <div className="hero-cta">
          <a href="#features" className="btn btn-glow btn-lg">
            {t("hero.cta1", l)}
          </a>

          <DemoToastLink className="btn btn-ghost btn-lg">
            {t("hero.cta2", l)}
          </DemoToastLink>
        </div>

        <div className="hero-stats" role="list">
          {stats.map((stat) => (
            <div key={stat.id} role="listitem" style={{ textAlign: "center" }}>
              <div className="hero-stat-val">
                <span className="stat-counter" data-target={stat.value}>
                  0
                </span>
                {stat.suffix}
              </div>

              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
