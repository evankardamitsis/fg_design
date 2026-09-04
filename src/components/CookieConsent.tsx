"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "fgd-cookie-consent";

export type ConsentValue = "accepted" | "declined";

/** Read the stored choice. Use this to gate any non-essential script. */
export function getCookieConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  // Never render on the server pass — the stored choice is client-only, and
  // rendering it during SSR would flash the banner for people who already chose.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);
  }, []);

  function choose(value: ConsentValue) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Private browsing can reject writes; the banner still dismisses.
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-cream/15 bg-ink text-cream"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10">
            <p className="max-w-2xl text-sm leading-relaxed text-cream/75">
              We use cookies to understand how this site is used and to improve your
              experience. You can decline without affecting how the site works. See our{" "}
              <Link href="/cookies" className="underline underline-offset-4 hover:text-cream">
                Cookie Policy
              </Link>
              .
            </p>

            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="px-6 py-3 text-sm font-medium text-cream/80 transition-colors hover:text-cream"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="bg-cream px-6 py-3 text-sm font-medium text-ink transition-all duration-300 ease-out hover:tracking-wide"
              >
                Accept.
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
