"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LINKS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/* Sections that have no nav entry of their own but must still light one up.
   Recognition sits under Skills conceptually; without this the dot froze on
   "Experience" for ~19% of the scroll. */
const OWNER: Record<string, string> = { recognition: "skills" };

/* Everything the observer watches — the nav's own targets plus the orphans. */
const OBSERVED = [...LINKS.map((l) => l.id), ...Object.keys(OWNER)];

/**
 * A floating nav with an active indicator that tracks the section you're in.
 *
 * One surface, not three: the *header* takes the frosted backdrop on scroll.
 * Previously the wordmark and the CTA sat on bare transparency while only the
 * pill had a backdrop, so page content — marquee words, headings, body copy —
 * ran straight through them.
 */
export function Nav() {
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Escape closes the sheet. A menu you can only dismiss by aiming at a 44px
  // button is a menu that traps keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const els = OBSERVED.map((id) => document.getElementById(id)).filter(
      (e): e is HTMLElement => Boolean(e),
    );

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActive(OWNER[id] ?? id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );

    els.forEach((el) => io.observe(el));

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        setScrolled(window.scrollY > 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const lifted = scrolled || open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* THE surface. A neutral white scrim rather than a --paper one, because
          half the page's bands are --paper-2: a paper-coloured chrome element
          renders as a lighter lozenge floating on beige. White at 0.72 with a
          real blur reads correctly on both. */}
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: lifted ? 1 : 0,
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "saturate(160%) blur(20px)",
          WebkitBackdropFilter: "saturate(160%) blur(20px)",
          borderBottom: "1px solid var(--rule)",
        }}
      />

      {/* Three tracks, so the nav is centred in the space between the flanking
          items instead of on the viewport. The old absolute centring overlapped
          the CTA by 7px at 768px and sat 76px off-centre at 1440. */}
      <div className="wrap relative grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <a
          href="#top"
          className="pointer-events-auto display col-start-1 inline-flex min-h-11 w-fit items-center self-center text-[1.375rem] leading-none tracking-normal text-[var(--ink)] transition-opacity duration-300 hover:opacity-60"
        >
          Shruti<span className="text-[var(--accent)]">.</span>
        </a>

        <nav
          aria-label="Primary"
          className="pointer-events-auto col-start-2 hidden justify-self-center lg:block"
        >
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={on ? "true" : undefined}
                    /* min-h-11 = 44px, the target-size minimum. */
                    className="relative flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] transition-colors duration-300"
                    style={{ color: on ? "var(--ink)" : "var(--ink-muted)" }}
                  >
                    {/* The lozenge GLIDES between items instead of blinking on and
                        off, because motion's `layoutId` animates one shared element
                        from its old box to its new one. It sits behind the label
                        (-z-10) and is purely decorative — the accessible "you are
                        here" is `aria-current`, which is unaffected. */}
                    {on && (
                      <motion.span
                        aria-hidden
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-[var(--accent-soft)]"
                      />
                    )}
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                      style={{
                        background: on ? "var(--accent)" : "transparent",
                        transform: on ? "scale(1)" : "scale(0)",
                      }}
                    />
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* col-start-3 explicitly: below `lg` the <nav> is display:none, so
            without it auto-placement drops this group into the empty middle
            track and the CTA lands mid-header. */}
        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <a
            href="#contact"
            /* Hidden on phones: at 390 it wrapped to two lines beside the
               hamburger. Contact is one tap away in the sheet. */
            className="pointer-events-auto hidden min-h-11 items-center rounded-full border border-[var(--rule-strong)] px-5 text-[0.8125rem] font-medium whitespace-nowrap text-[var(--ink)] transition-all duration-300 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] sm:inline-flex"
          >
            Get in touch
          </a>

          {/* Six links plus a CTA genuinely do not fit at 768. Tablet gets the
              sheet, which it can actually hold. */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--rule-strong)] lg:hidden"
          >
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className="absolute left-0 block h-px w-4 bg-[var(--ink)] transition-transform duration-300"
                style={{ top: open ? 6 : 1, transform: open ? "rotate(45deg)" : "none" }}
              />
              <span
                className="absolute left-0 block h-px w-4 bg-[var(--ink)] transition-transform duration-300"
                style={{ top: open ? 6 : 11, transform: open ? "rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* the sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="pointer-events-auto relative lg:hidden"
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <ul className="wrap flex flex-col py-4">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === l.id ? "true" : undefined}
                className="display flex min-h-14 items-center gap-3 text-2xl"
                style={{ color: active === l.id ? "var(--accent)" : "var(--ink)" }}
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full transition-transform duration-300"
                  style={{
                    background: "var(--accent)",
                    transform: active === l.id ? "scale(1)" : "scale(0)",
                  }}
                />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
