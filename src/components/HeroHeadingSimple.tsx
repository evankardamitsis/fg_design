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
      <span className="font-display italic text-cream/70">{index} / 05</span>
      <h1 className="mt-2 text-4xl text-cream md:text-6xl">{title}</h1>
      <p className="mt-3 text-cream/70">
        {location}, {postcode}
      </p>
    </motion.div>
  );
}
