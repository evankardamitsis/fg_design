import Link from "next/link";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/motion/Reveal";

export function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="bg-ink text-cream">
      {showCta ? (
        <Reveal className="border-b border-cream/10">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-10 md:py-28">
            <h2 className="max-w-xl text-3xl leading-tight md:text-5xl">
              Ready to talk through a <span className="font-display italic">project?</span>
            </h2>
            <Button href="/contact" variant="frosted" className="shrink-0">
              Start a project.
            </Button>
          </div>
        </Reveal>
      ) : null}

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="block font-display italic text-2xl">FG Design Partners</span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              Turnkey design and build for London&apos;s most distinguished homes.
              One in-house team, from concept through completion.
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-cream/50">Studio</span>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/studio" className="hover:opacity-70">About</Link></li>
              <li><Link href="/portfolio" className="hover:opacity-70">Portfolio</Link></li>
            </ul>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-cream/50">Get in touch</span>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/contact" className="hover:opacity-70">Start a project</Link></li>
              <li className="text-cream/70">London, United Kingdom</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-6 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <span>&copy; {new Date().getFullYear()} FG Design Partners Ltd. All rights reserved.</span>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-cream/80">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-cream/80">Cookie Policy</Link>
            <Link href="/terms" className="hover:text-cream/80">Terms of Use</Link>
          </nav>

          <span>
            Designed &amp; Developed by{" "}
            <a
              href="https://belowthefold.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 underline underline-offset-4 transition-colors hover:text-cream"
            >
              Below The Fold
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
