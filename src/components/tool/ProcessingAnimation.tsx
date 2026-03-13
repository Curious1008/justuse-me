"use client";

import { motion } from "framer-motion";

interface ProcessingAnimationProps {
  label: string;
}

export default function ProcessingAnimation({ label }: ProcessingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center h-56 gap-8">
      {/* Orbital dots */}
      <div className="relative w-16 h-16">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]"
            style={{
              top: "50%",
              left: "50%",
              marginTop: -5,
              marginLeft: -5,
            }}
            animate={{
              x: [
                Math.cos((i * 2 * Math.PI) / 3) * 24,
                Math.cos((i * 2 * Math.PI) / 3 + (2 * Math.PI) / 3) * 24,
                Math.cos((i * 2 * Math.PI) / 3 + (4 * Math.PI) / 3) * 24,
                Math.cos((i * 2 * Math.PI) / 3) * 24,
              ],
              y: [
                Math.sin((i * 2 * Math.PI) / 3) * 24,
                Math.sin((i * 2 * Math.PI) / 3 + (2 * Math.PI) / 3) * 24,
                Math.sin((i * 2 * Math.PI) / 3 + (4 * Math.PI) / 3) * 24,
                Math.sin((i * 2 * Math.PI) / 3) * 24,
              ],
              scale: [1, 0.6, 1, 0.6, 1],
              opacity: [1, 0.4, 1, 0.4, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Center pulse */}
        <motion.div
          className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-[var(--color-accent)]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-[var(--color-text-secondary)] font-[family-name:var(--font-sora)]"
      >
        {label}
      </motion.p>
    </div>
  );
}
