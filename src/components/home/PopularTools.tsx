"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getAllTools } from "@/tools/registry";

export default function PopularTools() {
  const tools = getAllTools();

  if (tools.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Popular Tools
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {tools.map((tool) => (
          <Link key={tool.id} href={`/tools/${tool.id}`}>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-pointer"
            >
              <span className="text-lg">{tool.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {tool.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
