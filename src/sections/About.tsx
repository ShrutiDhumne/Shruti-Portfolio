import { Reveal } from "@/components/Reveal";

const FACTS = [
  { value: "3", suffix: "yrs", label: "Building production systems" },
  { value: "150", suffix: "+", label: "Automation workflows shipped" },
  { value: "20", suffix: "+", label: "AI voice agents in production" },
  { value: "9.64", suffix: "", label: "B.Tech CGPA" },
];

export function About() {
  return (
    <section id="about" className="border-t border-[var(--rule)] bg-[var(--paper-2)]">
      <div className="wrap section">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <p className="t-meta">About</p>
              <h2 className="display t-h2 mt-5 text-[var(--ink)]">
                The unglamorous, load-bearing half.
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
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
              <p className="t-body mt-6">
                Right now I&apos;m at Etherwise, building AI products end to end — an ad attribution
                platform, a generative video pipeline, and a fleet of voice agents that answer the
                phone for real businesses. Before that I spent seventeen months at Veritas, teaching
                a model to predict which test suites a pull request was about to break.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="t-body mt-6">
                I work most comfortably in Python and FastAPI, close to the data and the failure
                modes — but I&apos;ll happily take a thing all the way to the browser if that&apos;s
                what shipping it requires.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120}>
          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-[var(--rule)] pt-12 md:mt-24 md:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dd className="t-num text-[var(--ink)]">
                  {f.value}
                  <span className="text-[var(--accent)]">{f.suffix}</span>
                </dd>
                <dt className="t-meta mt-3 normal-case tracking-normal">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
