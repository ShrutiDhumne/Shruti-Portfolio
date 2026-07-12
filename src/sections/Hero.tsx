import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { RevealHeading } from "@/components/RevealHeading";
import { SectionLabel } from "@/components/SectionLabel";
import { profile } from "@/content/resume";

const SOCIALS = [
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, external: false },
];

/** The one arrow on the site. A glyph inherits a font's metrics and its stroke
 *  weight; an SVG inherits currentColor and nothing else, so it can actually be
 *  aligned to the cap-height beside it. */
function Arrow() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className="shrink-0 -translate-y-px stroke-current transition-transform duration-300 group-hover:-translate-y-[3px] group-hover:translate-x-0.5"
      strokeWidth="1.25"
    >
      <path d="M2.5 7.5L7.5 2.5M7.5 2.5H3.5M7.5 2.5V6.5" />
    </svg>
  );
}

export function Hero() {
  return (
    /* On the section scale (96/144), not on two one-off values. The top pad
       clears the 80px fixed header. */
    <section id="top" className="wrap pt-28 pb-24 md:pt-36 md:pb-36">
      {/* the greeting — the same marker the six section labels use */}
      <Reveal>
        <SectionLabel>Hello, I&apos;m Shruti</SectionLabel>
      </Reveal>

      {/* The headline — the one loud thing on the page, and now the one that
          announces itself: the words rise out from behind a mask, in sequence.
          Not wrapped in <Reveal>, which would fade the whole block in at once
          and fight the per-word stagger underneath it. */}
      <RevealHeading
        as="h1"
        className="display t-hero mt-8 max-w-[17ch] text-[var(--ink)]"
        text="I build scalable backends and intelligent AI systems."
        accent="intelligent AI systems."
        delay={120}
      />

      {/* Rule left, description right. The whole point is that the rule sits ON
          the description's first line — one horizontal move, not two unrelated
          objects. `items-start` + a first-baseline offset does that; the old
          `items-center` stranded the hairline in the vertical middle of a void.
          The 12-col grid and its 24px gutter are the page grid, so the right
          column starts on the same x as About, Contact and Recognition. */}
      <div className="mt-16 grid items-start gap-8 md:grid-cols-12 md:gap-x-6">
        <Reveal delay={160} className="hidden md:col-span-6 md:block">
          <div className="h-px w-full bg-[var(--rule-strong)] md:mt-[0.78em]" />
        </Reveal>
        <Reveal delay={200} className="md:col-span-6 md:col-start-7">
          <p className="t-body max-w-[46ch]">
            Three years building AI-powered tools, agent-based platforms and automation pipelines
            for product and enterprise teams — event ingestion, identity resolution, and async
            systems built to hold at scale.
          </p>
        </Reveal>
      </div>

      {/* socials left, CTA right */}
      <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <Reveal delay={260}>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  /* .t-meta, like every other piece of metadata on the page —
                     these were the only tracked-uppercase strings set in Inter. */
                  className="t-meta group inline-flex min-h-11 items-center gap-1.5 text-[var(--ink-soft)] transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  {s.label}
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={320}>
          <Magnetic>
            <a
              href="#work"
              className="inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-7 text-sm font-medium text-[var(--paper)] transition-colors duration-300 hover:bg-[var(--accent)]"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              See my work
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
