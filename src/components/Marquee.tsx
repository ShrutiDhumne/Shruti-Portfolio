import { Fragment } from "react";

const WORDS = [
  "Python",
  "FastAPI",
  "LLM Pipelines",
  "Supabase",
  "Async",
  "XGBoost",
  "Docker",
  "AI Agents",
];

/**
 * The ghosted band: oversized words drifting past at very low contrast.
 *
 * It is decorative and it says so — aria-hidden, because every one of these words
 * already appears as real, readable text in the Skills section. A screen reader
 * gains nothing from hearing the stack twice, and a marquee is a miserable thing
 * to be read aloud.
 *
 * CSS-only: one keyframe translating a duplicated track. No JS, no rAF, no
 * IntersectionObserver — and it stops dead under prefers-reduced-motion.
 */
export function Marquee() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-[var(--rule)] py-8 select-none"
    >
      {/* The track is duplicated so the loop is seamless: when copy A has scrolled
          exactly its own width, copy B is sitting where A started. */}
      <div className="marquee flex w-max items-center gap-10 md:gap-16">
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {WORDS.map((w) => (
              <Fragment key={`${copy}-${w}`}>
                <span className="display whitespace-nowrap text-5xl text-[var(--marquee)] md:text-7xl">
                  {w}
                </span>
                <span
                  className="shrink-0 text-2xl text-[var(--accent)] opacity-30 md:text-3xl"
                >
                  ✦
                </span>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>

      {/* Feathered edges, so the words fade out rather than being guillotined by
          the viewport. Paper-coloured, not a gradient to transparent — Safari
          renders transparent-to-colour gradients with a grey cast. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32"
        style={{ background: "linear-gradient(to right, var(--paper), rgba(250,249,247,0))" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32"
        style={{ background: "linear-gradient(to left, var(--paper), rgba(250,249,247,0))" }}
      />
    </div>
  );
}
