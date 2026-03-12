"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function ToolCard({ id, name, description, icon }: ToolCardProps) {
  return (
    <Link href={`/tools/${id}`}>
      <motion.div
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md cursor-pointer text-center"
      >
        <span className="text-4xl">{icon}</span>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </motion.div>
    </Link>
  );
}
