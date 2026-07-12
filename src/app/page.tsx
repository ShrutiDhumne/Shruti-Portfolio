import { Nav } from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Work } from "@/sections/Work";
import { Experience } from "@/sections/Experience";
import { Skills } from "@/sections/Skills";
import { Recognition } from "@/sections/Recognition";
import { Contact } from "@/sections/Contact";

export default function Page() {
  return (
    <>
      {/* The skip link stays above the progress bar — z-[70] over its z-[60]. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[70] focus:rounded-full focus:bg-[var(--ink)] focus:px-5 focus:py-3 focus:text-sm focus:text-[var(--paper)]"
      >
        Skip to content
      </a>

      <SmoothScroll />
      <ScrollProgress />
      <Nav />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Recognition />
        <Contact />
      </main>
    </>
  );
}
