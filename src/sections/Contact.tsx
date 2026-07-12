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
          {/* The page grid: 12 columns, one 24px gutter. Same well as every other
              section, so `col-start-7` resolves to the same x here as it does in
              Hero and About. No section-local gap values. */}
          <div className="grid gap-y-16 md:grid-cols-12 md:gap-x-6">
            {/* the pitch — md:pt-8 matches the form card's 32px padding, so the
                "Contact" eyebrow and the form's first label share a top edge. */}
            <div className="md:col-span-5 md:pt-8">
              <Reveal>
                <SectionLabel>Contact</SectionLabel>
                <h2
                  className="display t-h2 mt-4 text-[var(--ink)]"
                  style={{ hyphens: "manual" }}
                >
                  Got a system that has to{" "}
                  <em className="italic text-[var(--accent)]">hold</em>?
                </h2>
              </Reveal>

              <Reveal delay={80}>
                {/* t-body, not t-lead: a 22px lead in a 5-column well is ~34
                    characters a line and rags into five stubs. 17px gives a real
                    measure at this width. */}
                <p className="t-body mt-6">
                  {profile.availability}. If nobody on your team wants to own the hard half of it,
                  that&apos;s the conversation I want to have.
                </p>
              </Reveal>

              <Reveal delay={140}>
                <dl className="mt-12 space-y-6 border-t border-[var(--rule)] pt-8">
                  <div>
                    <dt className="t-meta">Email</dt>
                    {/* `flex` on the <dd> so the anchor is a flex item and adds no
                        line-box strut: the 44px tap target is then grown with a
                        negative margin and the row box does not move. All three
                        rows measure the same height and space-y-6 reads evenly. */}
                    <dd className="mt-1 flex">
                      <a
                        href={`mailto:${profile.email}`}
                        className="link -my-3 inline-flex items-center py-3 text-base"
                      >
                        {profile.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="t-meta">LinkedIn</dt>
                    <dd className="mt-1 flex">
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="link -my-3 inline-flex items-center gap-1.5 py-3 text-base"
                      >
                        {profile.linkedinLabel}
                        <span aria-hidden className="text-[var(--ink-muted)]">
                          ↗
                        </span>
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="t-meta">Based in</dt>
                    <dd className="mt-1 text-base text-[var(--ink-soft)]">
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

      {/* The bookend. The page opened on a 112px display headline; it has to close
          on something with weight, not on 12px of mono. Ink ground, one display
          line, the address, then the fine print on a hairline strip. */}
      <footer className="bg-[var(--ink)] text-[var(--paper)]">
        <div className="wrap py-20">
          <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-6">
            <p className="display text-4xl md:col-span-5">
              Let&apos;s build something that holds.
            </p>
            <div className="md:col-span-6 md:col-start-7 md:pt-2">
              {/* -my-3 py-3: grows the hit box to 44px+ without adding any visible
                  space around the link, so the footer's vertical rhythm is unchanged. */}
              <a
                href={`mailto:${profile.email}`}
                className="-my-3 inline-flex items-center py-3 text-lg text-[var(--paper)] underline decoration-[rgba(250,249,247,0.35)] underline-offset-[6px] transition-colors duration-300 hover:decoration-[var(--paper)]"
              >
                {profile.email}
              </a>
              <p className="t-body mt-3 text-[rgba(250,249,247,0.62)]">
                {profile.availability}.
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-[rgba(250,249,247,0.14)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[rgba(250,249,247,0.62)]">
              © {year} {profile.name} · {profile.location}
            </p>
            <a
              href="#top"
              className="-my-3 inline-flex items-center gap-2 self-start py-3 text-sm text-[rgba(250,249,247,0.62)] transition-colors duration-300 hover:text-[var(--paper)] sm:self-auto"
            >
              Back to top <span aria-hidden>↑</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
