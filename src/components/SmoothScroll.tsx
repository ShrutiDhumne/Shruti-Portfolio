"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The buttery scroll. Lenis interpolates the scroll position toward the target
 * each frame instead of jumping to it, which is what makes a page feel expensive.
 *
 * Three rules keep it from becoming the usual smooth-scroll disaster:
 *
 *  1. It is OFF under prefers-reduced-motion. Hijacking scroll is exactly the
 *     kind of motion that makes people ill, and it is the first thing to go.
 *  2. It is OFF on touch. Mobile browsers already have momentum scrolling tuned
 *     to the device; overriding it makes a phone feel broken and laggy.
 *  3. Anchor links are handed to Lenis explicitly, so `#work` still lands in the
 *     right place with the header offset honoured — a smooth-scroll library that
 *     silently breaks in-page navigation is worse than no smooth scroll.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // A long, decaying tail — the curve does most of the "premium" work.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Keep in-page navigation working, and keep the 7rem scroll-margin honoured.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      // No offset here. Lenis already honours the section's CSS scroll-margin-top
      // (7rem, set in globals.css to clear the fixed header) — passing our own
      // -112 on top of it applied the header clearance twice and every jump
      // overshot by exactly 112px.
      lenis.scrollTo(target);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
