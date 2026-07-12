import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { experience, projects, type Project } from "@/content/resume";

const byId = (id: string): Project | undefined => projects.find((p) => p.id === id);

/* The Veritas projects belong here rather than in Work: an ML system that cut a
   regression suite's failure rate only means something next to the eighteen-hour
   suite it was cutting. */
const NESTED: Record<string, string[]> = {
  veritas: ["suite-recommender", "etrack", "car-reporting", "car-portal"],
};

export function Experience() {
  return (
    <section
      id="experience"
      className="border-y border-[var(--rule)] bg-[var(--paper-2)]"
    >
      <div className="wrap section">
        {/* The shared header well: label + h2 on columns 1–5 of the page's one
            12-column grid, with a 24px gutter. Same measure in every section. */}
        <div className="grid md:grid-cols-12 md:gap-x-6">
          <Reveal className="md:col-span-5">
            <SectionLabel>Experience</SectionLabel>
            <h2 className="display t-h2 mt-5 text-[var(--ink)]">Where I&apos;ve worked.</h2>
          </Reveal>
        </div>

        <div className="mt-16">
          {experience.map((role, ri) => {
            const nested = (NESTED[role.id] ?? []).map(byId).filter(Boolean) as Project[];

            return (
              <Reveal
                key={role.id}
                delay={ri * 90}
                className="grid gap-y-8 border-t border-[var(--rule)] py-12 md:grid-cols-12 md:gap-x-6"
              >
                {/* The rail. Sticky, so the company name tracks its own bullets
                    instead of stranding 300px of empty column beside them. */}
                <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
                  <div className="flex items-baseline gap-3">
                    <span className="t-meta">{role.period}</span>
                    {role.current && (
                      <span className="inline-flex translate-y-px items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-deep)]" />
                        <span className="t-meta text-[var(--accent-deep)]">Current</span>
                      </span>
                    )}
                  </div>
                  <h3 className="display t-h3 mt-4 text-[var(--ink)]">{role.company}</h3>
                  {/* Prose, so it is set in the sans face — not tracked mono caps. */}
                  <p className="mt-2 text-sm leading-normal text-[var(--ink-muted)]">
                    {role.title}
                  </p>
                </div>

                {/* the substance */}
                <div className="md:col-span-8">
                  <p className="t-body">{role.blurb}</p>

                  <ul className="mt-8 space-y-3">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.7em] h-px w-3 shrink-0 bg-[var(--accent)]"
                        />
                        <span className="t-body">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* The nested project cards sit on the full 12 columns, so their
                    left edge and their width match the Work cards above rather
                    than inventing a third card measure inside the right column.
                    Subgrid pins title / kicker / metrics across every card, so a
                    two-line kicker can't shove one card's metrics out of line. */}
                {nested.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2 sm:grid-rows-[auto_auto_1fr] md:col-span-12">
                    {nested.map((p) => (
                      <div
                        key={p.id}
                        className="grid gap-0 rounded-md border border-[var(--rule)] bg-[var(--card)] p-8 sm:row-span-3 sm:grid-rows-subgrid"
                      >
                        <h4 className="text-base font-medium leading-snug text-[var(--ink)]">
                          {p.name}
                        </h4>
                        <p className="mt-1.5 text-sm leading-snug text-[var(--ink-muted)]">
                          {p.kicker}
                        </p>
                        {/* The same metric language as the Work cards: accent
                            figure in a fixed column, label in the sans face,
                            so a wrapping label can never reflow underneath it. */}
                        <dl className="mt-6 space-y-2 self-start">
                          {p.impact.slice(0, 2).map((i) => (
                            <div key={i.label} className="flex items-baseline gap-3">
                              <dt className="w-24 shrink-0 text-sm font-semibold leading-snug tracking-tight text-[var(--accent)]">
                                {i.metric}
                              </dt>
                              <dd className="min-w-0 text-sm leading-snug text-[var(--ink-soft)]">
                                {i.label}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
