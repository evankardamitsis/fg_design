"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const content = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(veil.current, { autoAlpha: 0 });
        gsap.set(content.current, { opacity: 1 });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => gsap.set(veil.current, { autoAlpha: 0 }),
        });

        timeline
          .set(veil.current, { autoAlpha: 1, yPercent: 0 })
          .fromTo(
            content.current,
            { opacity: 0.94 },
            { opacity: 1, duration: 0.52, ease: "power2.out" },
            0.08
          )
          .to(
            veil.current,
            { yPercent: -100, duration: 0.62, ease: "power3.inOut" },
            0
          );
      });

      return () => media.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  return (
    <>
      <div
        ref={veil}
        data-page-veil
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] bg-cream"
      />
      <div ref={content} data-reveal>{children}</div>
    </>
  );
}
