"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    features: [
      "3 uses per day",
      "All tools available",
      "No watermarks",
      "Browser-side privacy",
    ],
    cta: "Get Started",
    href: "/auth/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.9",
    period: "/month",
    features: [
      "Unlimited uses",
      "All tools available",
      "No watermarks",
      "Browser-side privacy",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    href: "#",
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Simple pricing
        </h1>
        <p className="text-gray-500">No hidden fees. Cancel anytime.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`p-8 rounded-2xl border ${
              plan.highlighted
                ? "border-blue-500 shadow-lg shadow-blue-500/10"
                : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-gray-400 text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <span className="text-green-500">&#10003;</span> {f}
                </li>
              ))}
            </ul>
            <Link href={plan.href}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-xl font-semibold text-sm ${
                  plan.highlighted
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "border border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {plan.cta}
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
