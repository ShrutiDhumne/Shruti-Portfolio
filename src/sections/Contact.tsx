import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/resume";

export function Contact() {
  const year = 2026; // static: a live Date() would be a hydration mismatch on a static export

  return (
    <>
      <section id="contact" className="wrap section">
        <div className="max-w-3xl">
          <Reveal>
            <p className="t-meta">Contact</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display t-h2 mt-5 text-[var(--ink)]">
              Got a system that has to <em className="italic text-[var(--accent)]">hold</em>?
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="t-lead mt-6">
              {profile.availability}. If nobody on your team wants to own the hard half of it,
              that&apos;s the conversation I want to have.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-7 text-sm font-medium text-[var(--paper)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[var(--accent)]"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center rounded-full border border-[var(--rule-strong)] px-7 text-sm font-medium text-[var(--ink)] transition-colors duration-300 hover:border-[var(--ink)]"
              >
                LinkedIn ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-[var(--rule)]">
        <div className="wrap flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta normal-case tracking-normal">
            © {year} {profile.name} · {profile.location}
          </p>
          <a
            href="#top"
            className="link t-mono inline-flex min-h-11 items-center self-start text-[var(--ink-soft)] sm:self-auto"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
