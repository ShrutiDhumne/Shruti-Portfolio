import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { projects, type Project } from "@/content/resume";

/* Etherwise work leads; the Veritas projects live inside the Experience timeline,
   where their enterprise context actually means something. */
const FEATURED = ["radar", "automatic-ads", "voice-agents"];
const SECONDARY = ["automations", "scrapers"];

const pick = (ids: string[]) =>
  ids.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p));

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      as="article"
      delay={index * 90}
      className="card group flex flex-col p-8 md:p-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="t-meta text-[var(--accent)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="t-meta">{project.period}</span>
      </div>

      <h3 className="display t-h3 mt-6 text-[var(--ink)]">{project.name}</h3>
      <p className="t-meta mt-2 normal-case tracking-normal">{project.kicker}</p>

      <p className="t-body mt-6 grow">{project.summary}</p>

      {/* Only what survived fact-checking against the résumé.
          Not every impact is a number — "Self-hosted" is a claim, not a quantity —
          so the metric is set in the sans face at a modest size. Rendering a word
          as a giant serif numeral just makes it look like a broken statistic. */}
      <dl className="mt-8 space-y-2.5 border-t border-[var(--rule)] pt-6">
        {project.impact.slice(0, 3).map((i) => (
          <div key={i.label} className="flex items-baseline gap-3">
            <dd className="w-[5.5rem] shrink-0 text-[0.9375rem] font-semibold tracking-tight text-[var(--accent)]">
              {i.metric}
            </dd>
            <dt className="t-body text-[0.875rem] leading-snug">{i.label}</dt>
          </div>
        ))}
      </dl>

      <ul className="mt-7 flex flex-wrap gap-2">
        {project.stack.slice(0, 6).map((s) => (
          <li key={s} className="tag">
            {s}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function CompactCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal as="article" delay={index * 90} className="card flex flex-col p-8">
      {/* The kicker wraps. It used to be `shrink-0`, which meant a long one
          ("Large-scale product data extraction") simply pushed itself off the
          right edge of a phone and took the page's horizontal scroll with it. */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="display text-2xl text-[var(--ink)]">{project.name}</h3>
        <span className="t-meta min-w-0 sm:text-right">{project.kicker}</span>
      </div>
      <p className="t-body mt-4 grow text-[0.9375rem]">{project.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((s) => (
          <li key={s} className="tag">
            {s}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Work() {
  const featured = pick(FEATURED);
  const secondary = pick(SECONDARY);

  return (
    <section id="work" className="wrap section">
      <div className="max-w-2xl">
        <Reveal>
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="display t-h2 mt-5 text-[var(--ink)]">
            Systems that had to hold up.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="t-lead mt-6">
            Built at Etherwise, in production, with real money and real customers on the other end
            of them.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {featured.map((p, i) => (
          <FeaturedCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {secondary.map((p, i) => (
          <CompactCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
