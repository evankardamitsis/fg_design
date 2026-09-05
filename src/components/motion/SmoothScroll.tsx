"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll, driven on GSAP's ticker.
 *
 * Lenis and ScrollTrigger must share a clock. Left alone, Lenis runs its own
 * requestAnimationFrame loop while ScrollTrigger listens to native scroll
 * events, so triggers resolve against a scroll position that is one frame stale
 * — which shows up as reveals firing slightly early or late, and as jitter on
 * anything scroll-linked. Driving Lenis from gsap.ticker and telling
 * ScrollTrigger to update on each Lenis frame keeps them on the same tick.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000); // gsap ticker is in seconds
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Layout settles after fonts and images land; stale trigger positions are a
    // common cause of reveals firing at the wrong scroll offset.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
