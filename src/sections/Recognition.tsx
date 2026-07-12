import { Reveal } from "@/components/Reveal";
import { education, achievements } from "@/content/resume";

export function Recognition() {
  return (
    <section
      id="recognition"
      className="border-t border-[var(--rule)] bg-[var(--paper-2)]"
    >
      <div className="wrap section">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* ── education ── */}
          <div>
            <Reveal>
              <p className="t-meta">Education</p>
            </Reveal>

            {education.map((e, i) => (
              <Reveal key={e.id} delay={80 + i * 80}>
                <div className="mt-8 border-t border-[var(--rule)] pt-6">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="display text-2xl text-[var(--ink)]">{e.qualification}</h3>
                      <p className="t-body mt-1 text-[0.9375rem]">{e.field}</p>
                      <p className="t-meta mt-3 normal-case tracking-normal">
                        {e.institution} · {e.period}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="display text-3xl text-[var(--accent)]">{e.score}</div>
                      <div className="t-meta mt-1">{e.scoreLabel}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── achievements ── */}
          <div>
            <Reveal>
              <p className="t-meta">Recognition</p>
            </Reveal>

            {achievements.map((a, i) => (
              <Reveal key={a.id} delay={80 + i * 80}>
                <div className="mt-8 border-t border-[var(--rule)] pt-6">
                  <div className="flex items-start gap-5">
                    <span className="display shrink-0 text-3xl text-[var(--accent)]">
                      {a.placement.replace(" Place", "")}
                    </span>
                    <div>
                      <h3 className="display text-2xl text-[var(--ink)]">{a.title}</h3>
                      <p className="t-meta mt-2 normal-case tracking-normal">{a.date}</p>
                      <p className="t-body mt-3 text-[0.9375rem]">{a.note}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
