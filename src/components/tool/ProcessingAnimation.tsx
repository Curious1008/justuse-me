"use client";

import { motion } from "framer-motion";

export default function ProcessingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-6">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-blue-500 rounded-full"
            animate={{
              y: [0, -16, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-gray-500 font-medium"
      >
        Processing your file...
      </motion.p>
    </div>
  );
}
