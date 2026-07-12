/**
 * The marker every section opens with — including the hero's greeting, which
 * now renders this component rather than a hand-rolled copy of it. One
 * implementation, one dot size (6px), one gap.
 */
export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`t-meta flex items-center gap-2 ${className}`.trim()}>
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {children}
    </p>
  );
}
