import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { skillGroups } from "@/content/resume";

/**
 * Grouped, not graded. A proficiency bar that says "React 70%" is a number nobody
 * can check and nobody believes — these are just the things she reaches for, sorted
 * by what they're for.
 *
 * Two columns, not three. Five groups in a three-column grid leaves an empty cell
 * and — because each group carries its own top rule — a hairline that stops dead
 * two-thirds of the way across the page. Two columns with the last group spanning
 * both fills the grid exactly: every rule runs edge to edge, and no cell is a hole.
 */
export function Skills() {
  return (
    <section id="skills" className="wrap section">
      <div className="grid md:grid-cols-12 md:gap-x-6">
        <Reveal className="md:col-span-5">
          <SectionLabel>Toolkit</SectionLabel>
          <h2 className="display t-h2 mt-5 text-[var(--ink)]">What I reach for.</h2>
        </Reveal>
      </div>

      {/* Subgrid: title / blurb / chips share row tracks, so a two-line blurb in one
          group can't push its chip list below its neighbour's. */}
      <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:grid-rows-[auto_auto_1fr]">
        {skillGroups.map((g, i) => (
          <Reveal
            key={g.id}
            delay={(i % 2) * 80}
            className={`grid gap-0 border-t border-[var(--rule)] pt-6 sm:row-span-3 sm:grid-rows-subgrid${
              i === skillGroups.length - 1 ? " sm:col-span-2" : ""
            }`}
          >
            <h3 className="display text-[1.375rem] leading-tight text-[var(--ink)]">{g.title}</h3>
            <p className="mt-2 text-sm leading-normal text-[var(--ink-muted)]">{g.blurb}</p>
            {/* content-start / items-start: without them the ul is stretched by the
                subgrid row and every chip grows into a tall hollow box. */}
            <ul className="mt-6 flex flex-wrap content-start items-start gap-2 self-start">
              {g.skills.map((s) => (
                <li key={s.name} className="tag">
                  {s.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
