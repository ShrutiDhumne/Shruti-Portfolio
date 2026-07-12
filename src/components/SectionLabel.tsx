/** The same marker the hero's greeting uses, so every section opens the same way. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="t-meta flex items-center gap-2.5">
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {children}
    </p>
  );
}
