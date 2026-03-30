/**
 * @file components/shared/scroll-ui.tsx
 * @description ORAX Scroll UI — three features in one component:
 *
 * 1. Progress Bar — thin indigo line at top, fills as user scrolls
 * 2. Back to Top — floating button appears after scrolling 400px
 * 3. Smooth Nav — intercepts navbar anchor clicks for smooth scroll
 *
 * RTL-aware: Progress bar direction respects document direction.
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function ScrollUI(): React.JSX.Element {
  const [progress, setProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [topBtnHover, setTopBtnHover] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const pathname = usePathname();

  /* ── Track scroll progress with RAF for smoother updates ── */
  useEffect(() => {
    let frameId = 0;

    const checkRTL = (): void => {
      const dir = document.documentElement.getAttribute("dir");
      setIsRTL(dir === "rtl");
    };

    const updateScrollUI = (): void => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(Math.min(Math.max(pct, 0), 100));
      setShowTopBtn(scrollTop > 400);

      frameId = window.requestAnimationFrame(updateScrollUI);
    };

    checkRTL();
    frameId = window.requestAnimationFrame(updateScrollUI);

    const observer = new MutationObserver(checkRTL);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [pathname]);

  /* ── Smooth scroll for navbar anchors ── */
  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href?.startsWith("#")) return;

      const section = document.querySelector(href);
      if (!section) return;

      e.preventDefault();

      const navH = 72;
      const top = section.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  /* ── Scroll to top ── */
  const scrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ── Progress Bar ── */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
        style={{
          position: "fixed",
          top: 0,
          insetInlineStart: 0,
          width: "100%",
          height: "3px",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isRTL
              ? "linear-gradient(-90deg, #6366f1 0%, #818cf8 60%, #a5b4fc 100%)"
              : "linear-gradient(90deg, #6366f1 0%, #818cf8 60%, #a5b4fc 100%)",
            boxShadow: "0 0 12px rgba(99,102,241,0.7)",
            transform: `scaleX(${progress / 100})`,
            transformOrigin: isRTL ? "right center" : "left center",
            willChange: "transform",
            borderRadius: isRTL ? "2px 0 0 2px" : "0 2px 2px 0",
          }}
        >
          {progress > 2 && progress < 99 && (
            <div
              style={{
                position: "absolute",
                insetInlineEnd: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#a5b4fc",
                boxShadow: "0 0 8px 2px rgba(165,180,252,0.9)",
                animation: "pulse-tip 1.2s ease-in-out infinite",
              }}
            />
          )}
        </div>
      </div>

      {/* ── Back to Top Button ── */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          position: "fixed",
          bottom: 32,
          insetInlineEnd: 28,
          zIndex: 998,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid var(--border-glow)",
          background: topBtnHover ? "var(--brand)" : "var(--surface)",
          backdropFilter: "blur(12px)",
          color: topBtnHover ? "#fff" : "var(--brand)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: topBtnHover
            ? "0 0 24px rgba(99,102,241,0.55)"
            : "0 4px 20px rgba(0,0,0,0.3)",
          opacity: showTopBtn ? 1 : 0,
          transform: showTopBtn
            ? topBtnHover
              ? "translateY(-3px) scale(1.08)"
              : "translateY(0) scale(1)"
            : "translateY(16px) scale(0.85)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          pointerEvents: showTopBtn ? "all" : "none",
        }}
        onMouseEnter={() => setTopBtnHover(true)}
        onMouseLeave={() => setTopBtnHover(false)}
      >
        <ArrowUp
          size={18}
          style={{
            transition: "transform 0.3s",
            transform: topBtnHover ? "translateY(-1px)" : "translateY(0)",
          }}
        />
      </button>

      <style>{`
        @keyframes pulse-tip {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateY(-50%) scale(1.4); }
        }
      `}</style>
    </>
  );
}
