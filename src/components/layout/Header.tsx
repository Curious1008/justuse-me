"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-xl font-bold tracking-tight"
          >
            JustUse<span className="text-blue-500">.me</span>
          </motion.span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/pricing">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Pricing
            </motion.span>
          </Link>
        </div>
      </div>
    </header>
  );
}
