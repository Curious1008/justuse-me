"use client";

import { useState } from "react";

interface CompareFAQProps {
  faq: { q: string; a: string }[];
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-border-subtle)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <h3 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)]">
          {q}
        </h3>
        <svg
          className={`w-4 h-4 flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function CompareFAQ({ faq }: CompareFAQProps) {
  if (!faq.length) return null;

  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-8">
        Frequently Asked Questions
      </h2>
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6">
        {faq.map((item) => (
          <FAQItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}
