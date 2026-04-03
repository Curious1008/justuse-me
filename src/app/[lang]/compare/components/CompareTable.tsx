"use client";

import { CompetitorData, justuseme } from "../compare-data";

interface CompareTableProps {
  competitor: CompetitorData;
}

function CheckIcon() {
  return (
    <span className="w-5 h-5 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center flex-shrink-0">
      <svg className="w-3 h-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </span>
  );
}

function XIcon() {
  return (
    <span className="w-5 h-5 rounded-full bg-[var(--color-error-dim)] flex items-center justify-center flex-shrink-0">
      <svg className="w-3 h-3 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </span>
  );
}

interface RowProps {
  label: string;
  competitor: React.ReactNode;
  justuse: React.ReactNode;
  highlight?: boolean;
}

function Row({ label, competitor, justuse, highlight }: RowProps) {
  return (
    <tr className="border-b border-[var(--color-border-subtle)] last:border-b-0">
      <td className="py-4 pr-4 text-sm font-medium text-[var(--color-text)]">{label}</td>
      <td className="py-4 px-4 text-sm text-[var(--color-text-secondary)]">{competitor}</td>
      <td className={`py-4 pl-4 text-sm font-medium ${highlight ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"}`}>
        {justuse}
      </td>
    </tr>
  );
}

export default function CompareTable({ competitor }: CompareTableProps) {
  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="py-4 pr-4 pl-6 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Feature
              </th>
              <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {competitor.name}
              </th>
              <th className="py-4 pl-4 pr-6 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] border-l-2 border-[var(--color-accent)]">
                JustUse.me
              </th>
            </tr>
          </thead>
          <tbody className="[&_td:first-child]:pl-6 [&_td:last-child]:pr-6 [&_td:last-child]:border-l-2 [&_td:last-child]:border-[var(--color-accent-glow-strong)]">
            <Row
              label="Price"
              competitor={<span className="text-[var(--color-text-muted)]">{competitor.price}</span>}
              justuse={<span className="text-[var(--color-accent)] font-bold">{justuseme.price}/mo</span>}
              highlight
            />
            <Row
              label="Tools"
              competitor={<span>{competitor.toolCount} ({competitor.toolScope})</span>}
              justuse={<span>{justuseme.toolCount} tools across 8 categories</span>}
            />
            <Row
              label="File Processing"
              competitor={
                <span className="flex items-center gap-2">
                  {competitor.serverUpload ? <XIcon /> : <CheckIcon />}
                  {competitor.serverUpload ? "Server upload" : "Browser-local"}
                </span>
              }
              justuse={
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Browser-local
                </span>
              }
            />
            <Row
              label="Watermark"
              competitor={
                <span className="flex items-center gap-2">
                  {competitor.watermark ? <XIcon /> : <CheckIcon />}
                  {competitor.watermark ? "Yes (free tier)" : "No"}
                </span>
              }
              justuse={
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Never
                </span>
              }
            />
            <Row
              label="Sign-up Required"
              competitor={
                <span className="flex items-center gap-2">
                  {competitor.signupRequired ? <XIcon /> : <CheckIcon />}
                  {competitor.signupRequired ? "Yes" : "No"}
                </span>
              }
              justuse={
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  No
                </span>
              }
            />
            <Row
              label="Free Tier"
              competitor={<span>{competitor.freeLimit}</span>}
              justuse={<span>{justuseme.freeLimit}</span>}
            />
          </tbody>
        </table>
      </div>
    </section>
  );
}
