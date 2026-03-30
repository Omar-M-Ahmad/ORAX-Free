/**
 * @file components/shared/custom-cursor.tsx
 * @description Custom cursor — dot + ring.
 * Works on ALL pages (placed in root layout).
 * Only activates on desktop (pointer: fine).
 * Reattaches event listeners on route change via pathname.
 */

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor(): null {
  const pathname = usePathname();

  useEffect(() => {
    /* Skip touch devices */
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    /* Show cursor elements */
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let animId: number;
    let visible = false;

    const onMove = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      /* Dot follows instantly */
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    /* Ring follows with smooth lerp */
    const animate = (): void => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      animId = requestAnimationFrame(animate);
    };

    /* Expand on interactive elements */
    const expand = (): void => document.body.classList.add("cursor-hover");
    const collapse = (): void => document.body.classList.remove("cursor-hover");

    /* Attach to all current interactive elements */
    const attachListeners = (): void => {
      document
        .querySelectorAll('a, button, [role="button"], input, textarea, select')
        .forEach((el) => {
          el.addEventListener("mouseenter", expand);
          el.addEventListener("mouseleave", collapse);
        });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animate();
    attachListeners();

    /* Re-attach after DOM changes (SPA navigation) */
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.body.classList.remove("cursor-hover");
    };
  }, [pathname]); /* Re-run on every route change */

  return null;
}
