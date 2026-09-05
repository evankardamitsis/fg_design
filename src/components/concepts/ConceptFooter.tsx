import Link from "next/link";

export function ConceptFooter({ tone }: { tone: "dark" | "light" }) {
  const isDark = tone === "dark";
  const surface = isDark ? "bg-[#111315] text-[#ecece7]" : "bg-cream text-ink";
  const border = isDark ? "border-white/15" : "border-ink/15";
  const muted = isDark ? "text-[#ecece7]/58" : "text-ink/58";
  const button = isDark
    ? "border border-[#ecece7] text-[#ecece7] hover:bg-[#ecece7] hover:text-[#111315]"
    : "bg-ink text-cream hover:bg-ink/82";

  return (
    <footer className={surface}>
      <div className={`mx-auto max-w-[1440px] border-t px-5 py-16 md:px-10 md:py-20 lg:px-14 ${border}`}>
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="max-w-3xl text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
              Ready to discuss your home?
            </h2>
            <Link
              href="/contact"
              className={`mt-8 inline-flex min-h-12 items-center justify-center whitespace-nowrap px-6 text-sm font-semibold transition-colors duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${button}`}
            >
              Start a project
            </Link>
          </div>

          <div className={`grid grid-cols-2 gap-8 text-sm md:col-span-4 ${muted}`}>
            <nav aria-label="Footer navigation" className="grid content-end gap-3">
              <Link href="/portfolio" className="hover:opacity-65">Projects</Link>
              <Link href="/studio" className="hover:opacity-65">About</Link>
              <Link href="/contact" className="hover:opacity-65">Contact</Link>
            </nav>
            <div className="grid content-end gap-3">
              <span>London, UK</span>
              <span>Founded 2016</span>
            </div>
          </div>
        </div>

        <div className={`mt-16 flex flex-col gap-4 border-t pt-6 text-xs sm:flex-row sm:justify-between ${border} ${muted}`}>
          <span>&copy; {new Date().getFullYear()} FG Design Partners Ltd.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:opacity-65">Privacy</Link>
            <Link href="/cookies" className="hover:opacity-65">Cookies</Link>
            <Link href="/terms" className="hover:opacity-65">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
