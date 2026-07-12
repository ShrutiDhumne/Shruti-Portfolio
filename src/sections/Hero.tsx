import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/resume";

const SOCIALS = [
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, external: false },
];

export function Hero() {
  return (
    <section id="top" className="wrap pt-36 pb-24 md:pt-44 md:pb-32">
      {/* the greeting */}
      <Reveal>
        <p className="flex items-center gap-2.5 text-[0.9375rem] text-[var(--ink-soft)]">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]"
          />
          Hello, I&apos;m Shruti.
        </p>
      </Reveal>

      {/* the headline — the one loud thing on the page */}
      <Reveal delay={90}>
        <h1 className="display t-hero mt-8 max-w-[16ch] text-[var(--ink)]">
          I build backends that{" "}
          <em className="italic text-[var(--accent)]">take a beating</em>.
        </h1>
      </Reveal>

      {/* rule left, description right — the split girhe uses to stop the hero
          from being one undifferentiated block of text */}
      <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-16">
        <Reveal delay={160}>
          <div className="hidden h-px w-full bg-[var(--rule-strong)] md:block" />
        </Reveal>
        <Reveal delay={200}>
          <p className="t-body max-w-[46ch]">
            Event ingestion, identity resolution, and async pipelines that push a hundred jobs
            through a rate-limited API and still finish. Three years of it — mostly on the half of
            the product nobody demos.
          </p>
        </Reveal>
      </div>

      {/* socials left, CTA right */}
      <div className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <Reveal delay={260}>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group inline-flex min-h-11 items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-soft)] transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  {s.label}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={320}>
          <a
            href="#work"
            className="inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-7 text-sm font-medium text-[var(--paper)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[var(--accent)]"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            See my work
          </a>
        </Reveal>
      </div>
    </section>
  );
}
