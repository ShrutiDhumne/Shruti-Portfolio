import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/content/resume";

export function Contact() {
  const year = 2026; // static: a live Date() would be a hydration mismatch on a static export

  return (
    <>
      {/* Paper, not the recessed band — Recognition above is already banded, and
          two in a row read as one undifferentiated block. */}
      <section id="contact" className="border-t border-[var(--rule)]">
        <div className="wrap section">
          <div className="grid gap-14 md:grid-cols-12 md:gap-14">
            {/* the pitch */}
            <div className="md:col-span-5">
              <Reveal>
                <SectionLabel>Contact</SectionLabel>
                <h2
                  className="display t-h2 mt-5 text-[var(--ink)]"
                  style={{ hyphens: "manual" }}
                >
                  Got a system that has to{" "}
                  <em className="italic text-[var(--accent)]">hold</em>?
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <p className="t-lead mt-6">
                  {profile.availability}. If nobody on your team wants to own the hard half of it,
                  that&apos;s the conversation I want to have.
                </p>
              </Reveal>

              <Reveal delay={140}>
                <dl className="mt-10 space-y-5 border-t border-[var(--rule)] pt-8">
                  <div>
                    <dt className="t-meta">Email</dt>
                    <dd className="mt-1.5">
                      <a
                        href={`mailto:${profile.email}`}
                        className="link inline-flex min-h-11 items-center text-[0.9375rem]"
                      >
                        {profile.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="t-meta">LinkedIn</dt>
                    <dd className="mt-1.5">
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="link inline-flex min-h-11 items-center text-[0.9375rem]"
                      >
                        {profile.linkedinLabel} ↗
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="t-meta">Based in</dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--ink-soft)]">
                      {profile.location} · open to remote
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            {/* the form */}
            <div className="md:col-span-6 md:col-start-7">
              <Reveal delay={120}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
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
