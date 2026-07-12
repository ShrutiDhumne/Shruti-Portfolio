import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { facts } from "@/content/resume";

export function About() {
  return (
    <section id="about" className="border-t border-[var(--rule)] bg-[var(--paper-2)]">
      <div className="wrap section">
        {/* One 12-column track with a 24px gutter — the same one Work, Experience,
            Skills, Recognition and Contact use, so the left rail and the body
            column start on the same two edges in every section.

            The old `md:gap-14` on twelve columns produced 34px columns separated by
            56px gutters: not a grid, twelve slivers with a canyon down the middle. */}
        <div className="grid gap-y-16 md:grid-cols-12 md:gap-x-6">
          {/* Five columns, not four. At the larger heading scale a four-column
              well was too narrow to set "load-bearing" without hyphenating it
              mid-word, which reads as a typo rather than a line break. */}
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel>About</SectionLabel>
              <h2 className="display t-h2 mt-5 text-[var(--ink)]" style={{ hyphens: "manual" }}>
                The unglamorous, load-bearing half.
              </h2>
            </Reveal>

            {/* The figures live in the rail, under the heading. As a full-width band
                below the grid they left 334px of empty column beside the prose —
                the single largest "this page is unfinished" moment on the site. */}
            <Reveal delay={120}>
              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-[var(--rule)] pt-10">
                {/* `flex-col-reverse justify-end` puts the label under the numeral while
                    keeping `dt` before `dd` in the DOM, which is what the spec asks for —
                    and it packs from the top, so all four numerals share a baseline.
                    `min-h-9` reserves two lines for every label, so the label blocks share
                    a bottom edge whether they wrap or not. */}
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col-reverse justify-end">
                    <dt className="mt-3 min-h-9 text-[0.8125rem] leading-snug text-[var(--ink-muted)]">
                      {f.label}
                    </dt>
                    <dd className="display text-[2.75rem] leading-none tabular-nums text-[var(--ink)]">
                      {f.value}
                      {/* "3yrs" set as one 64px serif word read as a typo. The suffix
                          is a footnote to the numeral, not part of it. */}
                      {f.suffix ? (
                        <span className="t-mono ml-1 align-baseline text-[var(--accent)]">
                          {f.suffix}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={80}>
              <p className="t-body">
                Somebody has to decide what happens when the third-party API returns a 429 at three
                in the morning, when the same person shows up as four anonymous sessions across two
                devices, or when a hundred jobs need to finish and the upstream will only let a
                dozen through at a time. I like that work. It has right answers, and you find out
                whether you got them.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p className="t-body mt-8">
                Right now I&apos;m at Etherwise, building AI products end to end — an ad attribution
                platform, a generative video pipeline, and a fleet of voice agents that answer the
                phone for real businesses. Before that I spent seventeen months at Veritas, teaching
                a model to predict which test suites a pull request was about to break.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="t-body mt-8">
                I work most comfortably in Python and FastAPI, close to the data and the failure
                modes — but I&apos;ll happily take a thing all the way to the browser if that&apos;s
                what shipping it requires.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
