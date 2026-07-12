"use client";

import { Fragment, useEffect, useRef, type ElementType } from "react";

/**
 * The masked heading reveal: each word rises out from behind a clip, staggered.
 *
 * This is the single move that separates a page that feels designed from one that
 * feels assembled — and it is also the easiest one to get wrong. Three details:
 *
 *  - The mask has bottom padding and an equal negative margin. Without it,
 *    `overflow: hidden` guillotines the descenders of g, y, p — and Instrument
 *    Serif has long ones. This is why most implementations of this look subtly
 *    broken.
 *  - Words, not characters. Character-by-character shredding of a serif headline
 *    destroys word shape and reads as a gimmick; word-level keeps it legible.
 *  - The whole thing is CSS, gated on the `js` class. Without JavaScript there is
 *    no mask, no transform, and the heading is simply a heading. The text is never
 *    hidden behind an animation that can't run.
 */
export function RevealHeading({
  text,
  accent,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  text: string;
  /** A substring set in the accent colour and italic. Must appear in `text`. */
  accent?: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Split into words, marking which of them fall inside the accent phrase. The
     accent is matched as a phrase rather than word-by-word so "take a beating"
     stays one italic run rather than three.

     Offsets are derived up front rather than accumulated inside the map — a
     running counter mutated from a callback is exactly the pattern React's
     immutability lint exists to catch, and it would break under StrictMode's
     double-invocation anyway. */
  const words = text.split(" ");
  const start = accent ? text.indexOf(accent) : -1;
  const end = start >= 0 && accent ? start + accent.length : -1;

  const offsets = words.reduce<number[]>((acc, w, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + words[i - 1].length + 1);
    return acc;
  }, []);

  const marked = words.map((word, i) => ({
    word,
    inAccent: start >= 0 && offsets[i] >= start && offsets[i] < end,
  }));

  return (
    <Tag ref={ref} className={`rv ${className}`.trim()}>
      {marked.map((m, i) => (
        <Fragment key={`${m.word}-${i}`}>
          <span className="rv-mask">
            <span
              className={m.inAccent ? "rv-word italic text-[var(--accent)]" : "rv-word"}
              style={{ "--rv-i": i, "--rv-delay": `${delay}ms` } as React.CSSProperties}
            >
              {m.word}
            </span>
          </span>
          {/* The space MUST live outside the mask. Inside it, the mask is an
              inline-block with overflow:hidden, and a trailing space in an
              inline-block is collapsed away — every word ran together into
              "Ibuildbackendsthattakeabeating." As a direct child of the heading
              it is a normal word space again. */}
          {i < marked.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
