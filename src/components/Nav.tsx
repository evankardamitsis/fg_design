"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const links = [
  {
    href: "/portfolio",
    label: "Portfolio",
    children: [
      { href: "/portfolio", label: "Residential" },
      { href: "/portfolio/commercial", label: "Commercial" },
    ],
  },
  { href: "/construction", label: "Construction" },
  { href: "/design", label: "Design" },
  { href: "/studio", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav({ variant = "solid" }: { variant?: "solid" | "overlay" }) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const logoLink = useRef<HTMLAnchorElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const topLine = useRef<HTMLSpanElement>(null);
  const bottomLine = useRef<HTMLSpanElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  const hasMounted = useRef(false);
  const scrolledRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isOverlay = variant === "overlay";
  const onDark = (isOverlay && !scrolled) || open;
  const tone = onDark ? "text-cream" : "text-ink";
  const logoSrc = onDark ? "/logo-white.png" : "/logo-dark.png";

  useGSAP(
    () => {
      const updateHeader = (scrollPosition: number) => {
        const next = scrollPosition > 80;
        if (next === scrolledRef.current) return;
        scrolledRef.current = next;
        setScrolled(next);
      };

      const trigger = ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window) + 1,
        onUpdate: (self) => updateHeader(self.scroll()),
        onRefresh: (self) => updateHeader(self.scroll()),
      });

      return () => trigger.kill();
    },
    { scope: root }
  );

  useGSAP(
    () => {
      const panelElement = panel.current;
      if (!panelElement) return;

      const menuLinks = gsap.utils.toArray<HTMLElement>("[data-menu-link]", panelElement);
      const menuMeta = gsap.utils.toArray<HTMLElement>("[data-menu-meta]", panelElement);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      menuTimeline.current?.kill();
      gsap.killTweensOf([panelElement, topLine.current, bottomLine.current, ...menuLinks, ...menuMeta]);

      gsap.to(topLine.current, {
        rotation: open ? 45 : 0,
        y: open ? 3.5 : 0,
        duration: reduceMotion ? 0 : 0.22,
        ease: "power3.out",
      });
      gsap.to(bottomLine.current, {
        rotation: open ? -45 : 0,
        y: open ? -3.5 : 0,
        duration: reduceMotion ? 0 : 0.22,
        ease: "power3.out",
      });

      if (!hasMounted.current) {
        gsap.set(panelElement, {
          autoAlpha: 0,
          clipPath: "inset(0 0 100% 0)",
          pointerEvents: "none",
        });
        gsap.set(menuLinks, { yPercent: 110, opacity: 0 });
        hasMounted.current = true;
        return;
      }

      if (reduceMotion) {
        gsap.set(panelElement, {
          autoAlpha: open ? 1 : 0,
          clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          pointerEvents: open ? "auto" : "none",
        });
        gsap.set(menuLinks, { yPercent: 0, opacity: open ? 1 : 0 });
        gsap.set(menuMeta, { opacity: open ? 1 : 0 });
        return;
      }

      if (open) {
        menuTimeline.current = gsap
          .timeline({ defaults: { overwrite: "auto" } })
          .set(panelElement, { autoAlpha: 1, pointerEvents: "auto" })
          .to(panelElement, {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.62,
            ease: "power3.inOut",
          })
          .fromTo(
            menuLinks,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.065,
              ease: "power3.out",
            },
            "-=0.28"
          )
          .fromTo(
            menuMeta,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" },
            "-=0.42"
          );
      } else {
        menuTimeline.current = gsap
          .timeline({
            defaults: { overwrite: "auto" },
            onComplete: () => gsap.set(panelElement, { autoAlpha: 0, pointerEvents: "none" }),
          })
          .to(menuMeta, { opacity: 0, y: -6, duration: 0.16, ease: "power2.out" })
          .to(
            menuLinks,
            { yPercent: -105, opacity: 0, duration: 0.28, stagger: 0.025, ease: "power2.in" },
            0
          )
          .to(
            panelElement,
            { clipPath: "inset(0 0 100% 0)", duration: 0.46, ease: "power3.inOut" },
            0.04
          );
      }

      return () => menuTimeline.current?.kill();
    },
    { scope: root, dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const panelElement = panel.current;
    document.body.style.overflow = "hidden";

    const getFocusable = () => {
      const panelLinks = Array.from(
        panelElement?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
      );

      return [logoLink.current, menuButton.current, ...panelLinks].filter(
        (element): element is HTMLElement => Boolean(element)
      );
    };

    getFocusable()[2]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    };
  }, [open]);

  const handleMenuToggle = () => setOpen((current) => !current);
  const handleMenuClose = () => setOpen(false);

  return (
    <div ref={root}>
      {!isOverlay && <div aria-hidden className="h-20" />}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !open ? "bg-cream/92 backdrop-blur-md" : "bg-transparent"
        } ${!isOverlay && !scrolled ? "bg-cream" : ""}`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center px-5 md:px-10 lg:px-14">
          <Link
            ref={logoLink}
            href="/"
            onClick={handleMenuClose}
            className="relative z-[60] -ml-2 flex min-h-11 items-center px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          >
            <Image
              src={logoSrc}
              alt="FG Design Partners"
              width={1111}
              height={788}
              priority
              className="h-[3.35rem] w-auto md:h-14"
            />
          </Link>

          <nav
            aria-label="Primary"
            aria-hidden={scrolled || open}
            className={`ml-auto hidden items-center gap-7 text-sm font-medium transition-[opacity,transform,visibility] duration-300 lg:flex ${tone} ${
              scrolled || open ? "invisible pointer-events-none translate-y-1 opacity-0" : "visible translate-y-0 opacity-100"
            }`}
          >
            {links.map((link) => (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className="relative flex min-h-11 items-center whitespace-nowrap after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.23,1,0.32,1)] hover:after:origin-left hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                >
                  {link.label}
                </Link>
                {link.children ? (
                  <div className="pointer-events-none absolute right-0 top-full min-w-40 translate-y-1 border border-ink/10 bg-cream/96 p-2 text-ink opacity-0 shadow-[0_18px_45px_rgba(28,27,27,0.08)] backdrop-blur-md transition-[opacity,transform] duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex min-h-10 items-center px-3 text-sm transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <button
            ref={menuButton}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={handleMenuToggle}
            className={`relative z-[60] ml-auto min-h-11 items-center gap-3 px-1 text-sm font-medium ${tone} ${
              scrolled ? "flex" : "flex lg:hidden"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current`}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden className="flex w-6 flex-col gap-1.5">
              <span ref={topLine} className="h-px w-6 origin-center bg-current" />
              <span ref={bottomLine} className="h-px w-6 origin-center bg-current" />
            </span>
          </button>
        </div>

        <div
          ref={panel}
          id="site-menu"
          aria-hidden={!open}
          inert={!open}
          className="invisible fixed inset-0 z-40 overflow-y-auto bg-ink text-cream [clip-path:inset(0_0_100%_0)]"
        >
          <div className="mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col px-5 pb-8 pt-24 md:px-10 md:pb-10 lg:px-14">
            <nav aria-label="Menu" className="flex flex-1 items-center py-5 md:py-7">
              <div className="w-full">
                {links.map((link) => (
                  <div key={link.href} className="overflow-hidden border-b border-cream/14">
                    <div className="flex min-h-16 flex-col items-start justify-center gap-1 py-3 sm:min-h-18 sm:flex-row sm:items-center sm:justify-between md:min-h-20">
                      <Link
                        href={link.href}
                        onClick={handleMenuClose}
                        className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
                      >
                        <span
                          data-menu-link
                          className="block font-display text-[clamp(2.45rem,5.2vw,5.25rem)] leading-[0.9] tracking-[-0.045em] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none group-hover:translate-x-2"
                        >
                          {link.label}
                        </span>
                      </Link>
                      {link.children ? (
                        <div className="flex gap-5 pb-1 text-sm text-cream/52 sm:pb-0">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleMenuClose}
                              data-menu-link
                              className="transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-cream"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </nav>

            <div className="grid gap-4 border-t border-cream/14 pt-5 text-sm text-cream/58 sm:grid-cols-2 sm:items-end">
              <div data-menu-meta>
                <p>Design, construction and project delivery across residential and commercial spaces.</p>
                <a
                  href="mailto:info@fgdpartners.com"
                  className="mt-2 inline-flex min-h-8 items-center text-xs text-cream/42 transition-colors duration-200 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  info@fgdpartners.com
                </a>
              </div>
              <p data-menu-meta className="sm:text-right">London, United Kingdom</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
