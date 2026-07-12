import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { skillGroups } from "@/content/resume";

/**
 * Grouped, not graded. A proficiency bar that says "React 70%" is a number nobody
 * can check and nobody believes — these are just the things she reaches for, sorted
 * by what they're for.
 */
export function Skills() {
  return (
    <section id="skills" className="wrap section">
      <div className="max-w-2xl">
        <Reveal>
          <SectionLabel>Toolkit</SectionLabel>
          <h2 className="display t-h2 mt-5 text-[var(--ink)]">What I reach for.</h2>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.id} delay={(i % 3) * 80}>
            <div className="border-t border-[var(--rule)] pt-6">
              <h3 className="text-base font-medium text-[var(--ink)]">{g.title}</h3>
              <p className="t-body mt-1.5 text-sm">{g.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    className="tag"
                    style={
                      s.note === "primary"
                        ? {
                            borderColor: "var(--accent)",
                            color: "var(--accent)",
                            background: "var(--accent-soft)",
                          }
                        : undefined
                    }
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
