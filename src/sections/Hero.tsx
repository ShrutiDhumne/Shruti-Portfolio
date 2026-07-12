import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/resume";

const STACK = ["Python", "FastAPI", "Supabase", "LLM pipelines", "Docker", "XGBoost"];

export function Hero() {
  return (
    <section id="top" className="wrap pt-16 pb-24 md:pt-28 md:pb-36">
      <Reveal>
        <p className="t-meta mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-[var(--accent)]" />
          {profile.role} · {profile.location}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="display t-hero max-w-[19ch] text-[var(--ink)]">
          I build backends that <em className="italic text-[var(--accent)]">take a beating</em>.
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <p className="t-lead mt-10 max-w-[54ch]">
          Event ingestion, identity resolution, and async pipelines that push a hundred jobs
          through a rate-limited API and still finish. Three years of it — mostly on the half of
          the product nobody demos.
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href="#work"
            className="inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-7 text-sm font-medium text-[var(--paper)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[var(--accent)]"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            View selected work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-12 items-center rounded-full border border-[var(--rule-strong)] px-7 text-sm font-medium text-[var(--ink)] transition-colors duration-300 hover:border-[var(--ink)]"
          >
            {profile.email}
          </a>
        </div>
      </Reveal>

      <Reveal delay={320}>
        <div className="mt-20 border-t border-[var(--rule)] pt-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {STACK.map((s) => (
              <li key={s} className="t-meta">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
