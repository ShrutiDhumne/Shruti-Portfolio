"use client";

import { useEffect, useState } from "react";


const LINKS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/**
 * A floating pill nav with an active indicator that tracks the section you're in.
 *
 * The dot is the whole trick: it tells you where you are without a progress bar,
 * a scroll counter, or any other chrome competing with the page.
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
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(
      (e): e is HTMLElement => Boolean(e),
    );

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
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

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="wrap flex h-20 items-center justify-between gap-4">
        {/* wordmark */}
        <a
          href="#top"
          className="pointer-events-auto display inline-flex min-h-11 items-center text-lg tracking-normal text-[var(--ink)] transition-opacity duration-300 hover:opacity-60"
        >
          Shruti<span className="text-[var(--accent)]">.</span>
        </a>

        {/* the pill */}
        <nav
          aria-label="Primary"
          className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 md:block"
        >
          <ul
            className="flex items-center gap-1 rounded-full border p-1.5 transition-all duration-500"
            style={{
              borderColor: scrolled ? "var(--rule)" : "transparent",
              background: scrolled ? "rgba(250,249,247,0.72)" : "transparent",
              backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
              WebkitBackdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
              boxShadow: scrolled ? "var(--shadow-sm)" : "none",
            }}
          >
            {LINKS.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={on ? "true" : undefined}
                    /* min-h-11 = 44px. The pill's own padding made these 37px tall,
                       which is under the target-size minimum on every viewport. */
                    className="relative flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] transition-colors duration-300"
                    style={{ color: on ? "var(--ink)" : "var(--ink-muted)" }}
                  >
                    {/* the indicator — a dot, not an underline. It reads as "you are here". */}
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

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="pointer-events-auto inline-flex min-h-11 items-center rounded-full border border-[var(--rule-strong)] px-5 text-[0.8125rem] font-medium text-[var(--ink)] transition-all duration-300 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            style={{
              background: scrolled ? "rgba(250,249,247,0.72)" : "transparent",
              backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
              WebkitBackdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
            }}
          >
            Get in touch
          </a>

          {/* Phones had no navigation at all — the pill is desktop-only. */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--rule-strong)] md:hidden"
            style={{
              background: scrolled || open ? "rgba(250,249,247,0.72)" : "transparent",
              backdropFilter: scrolled || open ? "saturate(180%) blur(14px)" : "none",
              WebkitBackdropFilter: scrolled || open ? "saturate(180%) blur(14px)" : "none",
            }}
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
        className="pointer-events-auto md:hidden"
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
