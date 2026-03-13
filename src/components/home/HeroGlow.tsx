"use client";

import { motion } from "framer-motion";

export default function HeroGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Warm ambient gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(13, 148, 136, 0.06) 0%, rgba(13, 148, 136, 0.02) 35%, transparent 65%)",
        }}
      />
      {/* Soft warm accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
        className="absolute top-10 -right-20 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(251, 191, 36, 0.04) 0%, transparent 60%)",
        }}
      />
      {/* Left cool accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.6, ease: "easeOut" }}
        className="absolute top-40 -left-20 w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(99, 102, 241, 0.03) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
