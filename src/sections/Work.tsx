import { Reveal } from "@/components/Reveal";
import { RevealHeading } from "@/components/RevealHeading";
import { SectionLabel } from "@/components/SectionLabel";
import { projects, type Project } from "@/content/resume";

/* Etherwise work leads; the Veritas projects live inside the Experience timeline,
   where their enterprise context actually means something.

   Radar carries the longest summary, so it takes the wide (8-column) card and the
   other four sit on 4-column cards. Every vertical edge in the section therefore
   lands on the same 12-column track the section header uses. */
const LEAD = ["radar"];
const ROW_A = ["automatic-ads"];
const ROW_B = ["voice-agents", "automations", "scrapers"];

const pick = (ids: string[]) =>
  ids.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p));

/**
 * ONE card. There is no second anatomy.
 *
 * Every project renders the same six zones in the same order — index + period,
 * title, kicker, summary, metrics, stack — and the cards in a row share their row
 * tracks via `grid-rows-subgrid`, so those zones line up across the row whatever
 * the copy does. The tag list is `self-start` because a stretched grid item makes
 * `flex-wrap` stretch its line box, which turns the chips into empty towers.
 */
function ProjectCard({
  project,
  index,
  className = "",
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  return (
    <Reveal
      as="article"
      delay={(index % 3) * 80}
      className={`card grid grid-rows-[auto_auto_auto_auto_auto_1fr_auto] gap-0 p-8 lg:row-span-7 lg:grid-rows-subgrid ${className}`.trim()}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="t-meta text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
        <span className="t-meta">{project.period}</span>
      </div>

      {/* 24px for every card title. Two sizes for one object is two objects. */}
      <h3 className="display mt-6 text-2xl leading-tight text-[var(--ink)]">{project.name}</h3>

      {/* The kicker is prose, not metadata: sans, sentence case, untracked. Set in
          `.t-meta` it rendered as "AD TRACKING & ATTRIBUTION PLATFORM" — tracked
          mono caps at sentence length destroys word-shape. No `.t-*` class here on
          purpose: those are unlayered, so a Tailwind size/case override loses. */}
      <p className="mt-2 text-sm leading-snug text-[var(--ink-muted)]">{project.kicker}</p>

      <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-relaxed text-[var(--ink-soft)] [text-wrap:pretty]">
        {project.summary}
      </p>

      {/* Not all of these are quantities — "Self-hosted" is a claim — so they are
          set in the sans face at a modest size, not as giant serif numerals
          pretending to be statistics. The metric column sizes itself to its
          content instead of a hard-coded 100px that forced every label to wrap. */}
      <dl className="mt-8 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 border-t border-[var(--rule)] pt-6">
        {project.impact.slice(0, 3).map((i) => (
          <div key={i.label} className="contents">
            <dt className="text-sm font-semibold leading-snug tracking-tight text-[var(--accent)]">
              {i.metric}
            </dt>
            <dd className="min-w-0 text-sm leading-snug text-[var(--ink-soft)]">{i.label}</dd>
          </div>
        ))}
      </dl>

      {/* Cards in a row are the same height, and the slack has to go somewhere.
          Pooled here — one deliberate gap above the stack — rather than inside a
          paragraph or a metric list, where it reads as a hole punched in the card. */}
      <div aria-hidden className="min-h-8" />

      <ul className="flex flex-wrap content-start items-start gap-2 self-start">
        {project.stack.slice(0, 6).map((s) => (
          <li key={s} className="tag">
            {s}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Work() {
  const lead = pick(LEAD);
  const rowA = pick(ROW_A);
  const rowB = pick(ROW_B);

  return (
    <section id="work" className="wrap section">
      {/* The same header well as every other section: rail on columns 1–5, lead on
          7–12. Not `max-w-2xl`, which floated free of the grid it was heading. */}
      <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-5">
          <Reveal>
            <SectionLabel>Selected work</SectionLabel>
            <RevealHeading
              as="h2"
              className="display t-h2 mt-5 text-[var(--ink)]"
              text="Systems that had to hold up."
            />
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={80}>
            <p className="t-lead">
              Built at Etherwise, in production, with real money and real customers on the other end
              of them.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto_auto_auto_1fr_auto]">
        {lead.map((p) => (
          <ProjectCard key={p.id} project={p} index={0} className="lg:col-span-8" />
        ))}
        {rowA.map((p) => (
          <ProjectCard key={p.id} project={p} index={1} className="lg:col-span-4" />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto_auto_auto_1fr_auto]">
        {rowB.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i + 2} className="lg:col-span-4" />
        ))}
      </div>
    </section>
  );
}
