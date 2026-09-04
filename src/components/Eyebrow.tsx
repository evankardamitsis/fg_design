export function Eyebrow({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: "ink" | "cream";
}) {
  return (
    <div className="flex items-center gap-6">
      <span
        className={`font-display italic text-lg md:text-xl whitespace-nowrap ${
          tone === "cream" ? "text-cream" : "text-ink"
        }`}
      >
        {children}
      </span>
      <span
        className={`h-px flex-1 bg-gradient-to-r ${
          tone === "cream" ? "from-cream/40" : "from-ink/30"
        } to-transparent`}
      />
    </div>
  );
}
