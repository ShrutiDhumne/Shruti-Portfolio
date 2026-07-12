"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * A number that counts up when it scrolls into view.
 *
 * The decimals are preserved from the source string, so "9.64" counts through
 * 9.64 rather than snapping to 10 — a CGPA that rounds itself off on the way in
 * is worse than no animation at all.
 *
 * The final value is rendered on the server, so no-JS and reduced-motion both see
 * the real number immediately. This only ever animates *toward* what's already there.
 */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || done.current) return;

    const target = parseFloat(value);
    if (Number.isNaN(target)) return;

    const decimals = value.includes(".") ? (value.split(".")[1] ?? "").length : 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();

        const DURATION = 1400;
        let start = 0;
        let raf = 0;

        // Ease-out cubic: fast off the line, settling gently. A linear count-up
        // reads like a loading spinner.
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);

        const step = (now: number) => {
          if (!start) start = now;
          const t = Math.min((now - start) / DURATION, 1);
          setDisplay((target * ease(t)).toFixed(decimals));
          if (t < 1) raf = requestAnimationFrame(step);
        };

        setDisplay((0).toFixed(decimals));
        raf = requestAnimationFrame(step);

        // If the component unmounts mid-count, stop.
        cleanup = () => cancelAnimationFrame(raf);
      },
      { threshold: 0.6 },
    );

    let cleanup = () => {};
    io.observe(el);

    return () => {
      io.disconnect();
      cleanup();
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`.trim()}>
      {reduced ? value : display}
    </span>
  );
}
