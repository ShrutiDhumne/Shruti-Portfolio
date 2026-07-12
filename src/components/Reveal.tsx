"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * The site's only entrance animation: a 14px lift and a fade, once, on scroll.
 *
 * The hidden-until-revealed state lives in CSS behind the `js` class (see
 * globals.css), so a visitor without JavaScript gets the finished page rather
 * than a blank one. This component's only job is to add `.is-in` when the
 * element comes into view — and then to stop watching it.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger, in ms. Keep it small — 60 to 90 reads as considered, 300 reads as slow. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already past it (deep link, refresh mid-page, restored scroll): don't make
    // the visitor scroll back up to un-hide content they can already see.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
