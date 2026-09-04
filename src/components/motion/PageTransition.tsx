"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Mount-only fade, keyed on the route.
 *
 * Deliberately not an exit/enter crossfade: in the App Router the outgoing tree
 * unmounts as soon as the new route's payload resolves, so exit animations
 * rarely finish — you get a flash rather than a crossfade. Fading the incoming
 * route is the part that reliably works.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, { opacity: 0, duration: 0.5, ease: "power2.out" });
    },
    { dependencies: [pathname] }
  );

  return (
    <div ref={ref} data-reveal>
      {children}
    </div>
  );
}
