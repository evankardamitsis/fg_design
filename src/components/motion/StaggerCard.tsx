/**
 * Opt-in marker for a StaggerReveal child. The animation itself lives in the
 * parent's GSAP timeline, which selects on [data-stagger].
 */
export function StaggerCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-stagger data-reveal className={className}>
      {children}
    </div>
  );
}
