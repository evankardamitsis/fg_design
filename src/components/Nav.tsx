"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/studio", label: "About" },
  { href: "/contact", label: "Contact" },
];

const easing = [0.16, 1, 0.3, 1] as const;

const menuVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
};

export function Nav({ variant = "solid" }: { variant?: "solid" | "overlay" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Native listener rather than framer's useScroll: this has to stay correct
  // regardless of the smooth-scroll layer driving the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isOverlay = variant === "overlay";
  const onDark = (isOverlay && !scrolled) || open;
  const tone = onDark ? "text-cream" : "text-ink";
  const logoSrc = onDark ? "/logo-white.png" : "/logo-dark.png";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Solid pages have no hero behind the bar, so reserve its height in flow. */}
      {!isOverlay && <div aria-hidden className="h-[96px] md:h-[104px]" />}
      <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled && !open ? "bg-cream/90 backdrop-blur-md" : "bg-transparent"
      } ${!isOverlay && !scrolled ? "bg-cream" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center px-6 py-5 md:px-10">
        {/* Logo — the SVG lockup already contains the wordmark, so no text beside it.
            It stays anchored left in every state; only the links retract on scroll. */}
        <Link href="/" onClick={() => setOpen(false)} className="block shrink-0">
          <Image
            src={logoSrc}
            alt="FG Design Partners"
            width={1111}
            height={788}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <AnimatePresence initial={false}>
          {!scrolled && (
            <motion.nav
              key="links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: easing }}
              onMouseLeave={() => setHovered(null)}
              className={`ml-auto hidden items-center gap-8 text-sm font-medium md:flex ${tone}`}
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  className="relative whitespace-nowrap py-1"
                >
                  {link.label}
                  {hovered === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-current"
                      transition={{ duration: 0.3, ease: easing }}
                    />
                  )}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Menu button: always on mobile, and on desktop once the links retract,
            so navigation never becomes unreachable. */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={`relative z-50 ml-auto flex flex-col gap-1.5 ${tone} ${
            scrolled ? "flex" : "md:hidden"
          }`}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }}
            transition={{ duration: 0.25, ease: easing }}
            className="h-px w-6 bg-current"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }}
            transition={{ duration: 0.25, ease: easing }}
            className="h-px w-6 bg-current"
          />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: easing }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-32 text-cream md:px-10"
          >
            <motion.nav
              variants={menuVariants}
              initial="hidden"
              animate="show"
              className="mx-auto flex w-full max-w-7xl flex-col gap-2"
            >
              {links.map((link, i) => (
                <motion.div key={link.href} variants={linkVariants} className="overflow-hidden">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 border-b border-cream/10 py-5"
                  >
                    <span className="font-display italic text-sm text-cream/40">0{i + 1}</span>
                    <span className="text-4xl leading-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-6xl">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="show"
              className="mx-auto flex w-full max-w-7xl flex-col gap-1 text-sm text-cream/50"
            >
              <span>London, United Kingdom</span>
              <span>Est. MMXVI</span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </header>
    </>
  );
}
