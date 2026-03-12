"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "pdf",
    label: "PDF",
    icon: "\u{1F4C4}",
    color: "bg-red-50 hover:bg-red-100 border-red-200",
  },
  {
    id: "image",
    label: "Image",
    icon: "\u{1F5BC}\uFE0F",
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
  },
  {
    id: "text",
    label: "Text & Code",
    icon: "{ }",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CategoryBubbles() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap justify-center gap-4"
    >
      {categories.map((cat) => (
        <Link key={cat.id} href={`/${cat.id}`}>
          <motion.div
            variants={item}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`flex flex-col items-center gap-2 px-8 py-6 rounded-2xl border ${cat.color} cursor-pointer`}
          >
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-sm font-medium text-gray-700">
              {cat.label}
            </span>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
