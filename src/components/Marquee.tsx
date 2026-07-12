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
      {/* The track is duplicated so the loop is seamless — but ONLY if the two
          copies are exactly equal. A flex `gap` on the track is not: 32 children
          produce 31 gaps, not 32, so `translateX(-50%)` landed 32px short of
          copy B's first word and the band jumped sideways every cycle. The
          spacing therefore lives INSIDE each item as a right margin, which makes
          copy A and copy B identical to the pixel. */}
      <div className="marquee flex w-max items-center">
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {WORDS.map((w) => (
              <Fragment key={`${copy}-${w}`}>
                {/* Sized BELOW the section h2s (64px). A ghosted, aria-hidden
                    decoration was previously the largest type on the page after
                    the hero — it out-typeset every heading it drifted past. */}
                <span className="display mr-10 whitespace-nowrap text-4xl text-[var(--marquee)] md:mr-16 md:text-6xl">
                  {w}
                </span>
                {/* Committed, not ghosted: a small accent mark at full opacity
                    reads as a separator. At 30% it read as a rendering artifact. */}
                <span className="mr-10 shrink-0 text-lg text-[var(--accent)] md:mr-16 md:text-xl">
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
