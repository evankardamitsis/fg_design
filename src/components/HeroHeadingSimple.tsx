"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

export function HeroHeadingSimple({
  index,
  title,
  location,
  postcode,
}: {
  index: string;
  title: string;
  location: string;
  postcode: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: easing }}
    >
      <span className="font-display italic text-cream/68">{index} / 05</span>
      <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(3rem,7vw,7.25rem)] leading-[0.92] tracking-[-0.045em] text-cream">
        {title}
      </h1>
      <p className="mt-5 text-sm text-cream/68 md:text-base">
        {location}, {postcode}
      </p>
    </motion.div>
  );
}
