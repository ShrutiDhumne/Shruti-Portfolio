import { Nav } from "@/components/Nav";
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-[var(--ink)] focus:px-5 focus:py-3 focus:text-sm focus:text-[var(--paper)]"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
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
