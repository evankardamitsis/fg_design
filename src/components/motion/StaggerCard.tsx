"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/components/motion/Reveal";

export function StaggerCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
