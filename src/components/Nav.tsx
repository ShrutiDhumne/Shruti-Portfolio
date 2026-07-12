"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/resume";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/**
 * A quiet header. It stays with you, but it only draws its rule once you've left
 * the top of the page — floating chrome over a hero is the fastest way to make a
 * calm page feel busy.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(250, 249, 247, 0.82)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
      }}
    >
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          className="display inline-flex min-h-11 items-center text-lg tracking-normal text-[var(--ink)] md:text-xl"
        >
          {profile.name}
        </a>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 md:gap-8">
            {LINKS.map((l) => (
              <li key={l.id} className="hidden sm:block">
                <a href={`#${l.id}`} className="link t-mono text-[var(--ink-soft)]">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="t-mono inline-flex min-h-11 items-center rounded-full border border-[var(--rule-strong)] px-4 text-[var(--ink)] transition-colors duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
