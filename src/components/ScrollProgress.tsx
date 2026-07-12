"use client";

import { useEffect, useRef } from "react";

/**
 * A 2px accent line across the very top, tracking how far down the page you are.
 *
 * Written straight to the DOM via a ref and a scaleX transform — no React state,
 * so it costs zero renders and stays on the compositor. A progress bar that
 * re-renders the tree sixty times a second is a progress bar that makes the page
 * it's measuring feel slower.
 *
 * Kept even under reduced-motion: it isn't animation, it's an indicator. It just
 * follows the scroll position, and the scroll position is something the user is
 * already moving themselves.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let queued = false;
    const measure = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        ref={ref}
        className="h-full origin-left bg-[var(--accent)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
