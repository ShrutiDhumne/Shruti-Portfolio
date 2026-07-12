import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { education, achievements } from "@/content/resume";

/**
 * Two parallel two-item lists. They share row tracks via `grid-rows-subgrid`, so
 * the sub-label, the first entry and the second entry line up across both columns
 * — without it the two columns' dividers land 30px apart and the section reads as
 * misaligned, which it was.
 */
export function Recognition() {
  return (
    <section
      id="recognition"
      className="border-t border-[var(--rule)] bg-[var(--paper-2)]"
    >
      <div className="wrap section">
        {/* Every other section opens label → h2. This one used to open with two
            mono labels and no heading at all, which broke the page's rhythm. */}
        <div className="grid md:grid-cols-12 md:gap-x-6">
          <Reveal className="md:col-span-5">
            <SectionLabel>Background</SectionLabel>
            <h2 className="display t-h2 mt-5 text-[var(--ink)]">Where it started.</h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-y-12 md:grid-cols-2 md:grid-rows-[auto_auto_auto] md:gap-x-6">
          {/* ── education ── */}
          <div className="grid gap-0 md:row-span-3 md:grid-rows-subgrid">
            <p className="t-meta">Education</p>

            {education.map((e, i) => (
              <Reveal key={e.id} delay={80 + i * 80} className="mt-8 border-t border-[var(--rule)] pt-6">
                {/* items-baseline, not items-start: the 30px score and the 24px
                    heading sit on one baseline instead of 6px apart. */}
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="display text-2xl text-[var(--ink)]">{e.qualification}</h3>
                  <span className="display shrink-0 text-3xl text-[var(--accent)]">{e.score}</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between gap-6">
                  <p className="text-base text-[var(--ink-soft)]">{e.field}</p>
                  <p className="t-meta shrink-0">{e.scoreLabel}</p>
                </div>
                {/* Institution and period on separate lines, so the range can't
                    break across a line and orphan a year. */}
                <p className="mt-4 text-sm leading-normal text-[var(--ink-muted)]">
                  {e.institution}
                </p>
                <p className="t-meta mt-1.5 whitespace-nowrap">{e.period}</p>
              </Reveal>
            ))}
          </div>

          {/* ── achievements ── */}
          <div className="grid gap-0 md:row-span-3 md:grid-rows-subgrid">
            <p className="t-meta">Recognition</p>

            {achievements.map((a, i) => (
              <Reveal key={a.id} delay={80 + i * 80} className="mt-8 border-t border-[var(--rule)] pt-6">
                <div className="flex items-baseline gap-5">
                  <span className="display shrink-0 text-3xl text-[var(--accent)]">
                    {a.placement.replace(" Place", "")}
                  </span>
                  <h3 className="display text-2xl text-[var(--ink)]">{a.title}</h3>
                </div>
                <p className="t-meta mt-4">
                  <span className="whitespace-nowrap">{a.date}</span>
                </p>
                <p className="t-body mt-3">{a.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
