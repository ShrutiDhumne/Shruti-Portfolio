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
        <div className="max-w-2xl">
          <Reveal>
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
                className="grid gap-8 border-t border-[var(--rule)] py-12 md:grid-cols-12 md:gap-12"
              >
                {/* the rail */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <span className="t-meta">{role.period}</span>
                    {role.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-deep)]" />
                        <span className="t-meta text-[var(--accent-deep)]">Current</span>
                      </span>
                    )}
                  </div>
                  <h3 className="display t-h3 mt-4 text-[var(--ink)]">{role.company}</h3>
                  <p className="t-meta mt-2 normal-case tracking-normal">{role.title}</p>
                </div>

                {/* the substance */}
                <div className="md:col-span-8">
                  <p className="t-body">{role.blurb}</p>

                  <ul className="mt-7 space-y-3">
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

                  {nested.length > 0 && (
                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                      {nested.map((p) => (
                        <div
                          key={p.id}
                          className="rounded-md border border-[var(--rule)] bg-[var(--card)] p-5"
                        >
                          <h4 className="text-[0.9375rem] font-medium text-[var(--ink)]">
                            {p.name}
                          </h4>
                          <p className="t-meta mt-1.5 normal-case tracking-normal">{p.kicker}</p>
                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                            {p.impact.slice(0, 2).map((i) => (
                              <span key={i.label} className="t-mono text-[var(--accent)]">
                                {i.metric}
                                <span className="ml-1.5 text-[var(--ink-muted)]">{i.label}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
