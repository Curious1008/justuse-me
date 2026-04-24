"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";

interface Labels {
  heading: string;
  sub: string;
  runsLocal: string;
  qrTitle: string;
  qrPlaceholder: string;
  qrHint: string;
  pwTitle: string;
  pwLength: string;
  pwCopy: string;
  pwCopied: string;
  pwRegen: string;
  wcTitle: string;
  wcPlaceholder: string;
  wcWords: string;
  wcChars: string;
  wcSentences: string;
  colorTitle: string;
  colorHex: string;
  colorRgb: string;
  colorHsl: string;
}

export default function LiveTools({ labels }: { labels: Labels }) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-2 pb-10">
      <div className="flex items-end justify-between flex-wrap gap-2 mb-5">
        <div>
          <h2 className="text-[22px] font-semibold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)]">
            {labels.heading}
          </h2>
          <p className="text-[13px] text-[var(--color-text-muted)] mt-1">{labels.sub}</p>
        </div>
        <div className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)] font-mono px-2.5 py-1 border border-[var(--color-border-subtle)] rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          {labels.runsLocal}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LiveQR />
        <LivePassword />
        <LiveWordCounter />
        <LiveColor />
      </div>
    </section>
  );
}

/* ───────────── Shared shell ───────────── */
function LiveShell({
  kind,
  title,
  subtitle,
  href,
  accent = "rose",
  children,
}: {
  kind: string;
  title: string;
  subtitle: string;
  href: string;
  accent?: "rose" | "warm";
  children: React.ReactNode;
}) {
  const dotBg = accent === "warm" ? "var(--color-warm-glow, rgba(232,105,58,0.1))" : "var(--color-accent-glow)";
  const dotColor = accent === "warm" ? "var(--color-warm, #E8693A)" : "var(--color-accent)";
  return (
    <div className="relative flex flex-col gap-3 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors">
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-full text-[10.5px] font-mono font-semibold uppercase tracking-[0.3px]"
          style={{ background: dotBg, color: dotColor }}
        >
          <span className="w-[5px] h-[5px] rounded-full animate-pulse" style={{ background: dotColor }} />
          LIVE · {kind}
        </span>
        <a
          href={href}
          className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] inline-flex items-center gap-1 transition-colors"
        >
          open →
        </a>
      </div>
      <div>
        <div className="font-[family-name:var(--font-sora)] font-semibold text-[15px] text-[var(--color-text)] tracking-tight">
          {title}
        </div>
        <div className="text-[12px] text-[var(--color-text-muted)] mt-0.5">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

function CopyBtn({ value, compact = false }: { value: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] font-mono font-medium text-[11px] transition-colors ${
        compact ? "px-2 py-1" : "px-2.5 py-1.5"
      } ${copied ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"}`}
    >
      {copied ? (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>
          copied
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
          copy
        </>
      )}
    </button>
  );
}

/* ───────────── 1. QR ───────────── */
function LiveQR() {
  const [text, setText] = useState("https://justuse.me");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("qrcode");
      if (cancelled || !canvasRef.current) return;
      try {
        await mod.toCanvas(canvasRef.current, text || " ", {
          width: 104,
          margin: 1,
          color: { dark: "#1A1A1A", light: "#FFFFFF" },
        });
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [text]);

  const presets: [string, string][] = [
    ["URL", "https://justuse.me"],
    ["Wi-Fi", "WIFI:S:HomeNetwork;T:WPA;P:pass123;;"],
    ["vCard", "MECARD:N:Jane Doe;TEL:+15555550100;EMAIL:jane@example.com;;"],
  ];

  return (
    <LiveShell
      kind="QR CODE"
      title="Generate a QR code"
      subtitle="Type anything — URL, text, Wi-Fi. Click to download."
      href="/tools/qr-code"
    >
      <div className="grid gap-3 items-start" style={{ gridTemplateColumns: "minmax(0, 1fr) 116px" }}>
        <div className="flex flex-col gap-2 min-w-0">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full resize-none px-3 py-2.5 text-[13px] font-mono rounded-[10px] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
          />
          <div className="flex gap-1.5 flex-wrap">
            {presets.map(([lbl, val]) => (
              <button
                key={lbl}
                onClick={() => setText(val)}
                className="text-[10.5px] font-mono px-2 py-1 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors whitespace-nowrap"
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
        <div className="w-[116px] h-[116px] bg-white border border-[var(--color-border)] rounded-[10px] p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
          <canvas ref={canvasRef} width={104} height={104} className="w-full h-full block" style={{ imageRendering: "pixelated" }} />
        </div>
      </div>
    </LiveShell>
  );
}

/* ───────────── 2. Password ───────────── */
function LivePassword() {
  const [len, setLen] = useState(20);
  const [symbols, setSymbols] = useState(true);
  const [pw, setPw] = useState("");

  const gen = useCallback(() => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = lower.toUpperCase();
    const digits = "0123456789";
    const syms = "!@#$%^&*-_=+?";
    const pool = lower + upper + digits + (symbols ? syms : "");
    const buf = new Uint32Array(len);
    crypto.getRandomValues(buf);
    let out = "";
    for (let i = 0; i < len; i++) out += pool[buf[i] % pool.length];
    setPw(out);
  }, [len, symbols]);

  useEffect(() => { gen(); }, [gen]);

  const pool = 26 + 26 + 10 + (symbols ? 13 : 0);
  const bits = Math.round(len * Math.log2(pool));
  const strengthColor = bits < 50 ? "#E8693A" : bits < 80 ? "#D4A843" : "var(--color-accent)";
  const strengthLabel = bits < 50 ? "weak" : bits < 80 ? "good" : "strong";

  return (
    <LiveShell
      kind="GENERATOR"
      title="Strong password"
      subtitle={`${bits} bits of entropy · regenerated locally`}
      href="/tools/hash-generator"
      accent="warm"
    >
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] min-h-[42px]">
        <span className="flex-1 font-mono text-[13px] text-[var(--color-text)] break-all" style={{ letterSpacing: 0.5 }}>
          {pw}
        </span>
        <button
          onClick={gen}
          aria-label="Regenerate"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] p-1 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
        <CopyBtn value={pw} compact />
      </div>
      <div className="flex gap-3 items-center flex-wrap">
        <label className="flex items-center gap-2 text-[11.5px] text-[var(--color-text-secondary)] flex-1 min-w-[140px]">
          <span className="font-mono">len</span>
          <input
            type="range"
            min={8}
            max={48}
            value={len}
            onChange={(e) => setLen(+e.target.value)}
            className="flex-1"
            style={{ accentColor: "var(--color-warm, #E8693A)" }}
          />
          <span className="font-mono text-[var(--color-text)] w-5 text-right">{len}</span>
        </label>
        <label className="flex items-center gap-1.5 text-[11.5px] text-[var(--color-text-secondary)] cursor-pointer">
          <input
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            style={{ accentColor: "var(--color-warm, #E8693A)" }}
          />
          symbols
        </label>
        <span
          className="text-[10.5px] font-mono font-semibold uppercase"
          style={{ color: strengthColor, letterSpacing: 0.5 }}
        >
          ● {strengthLabel}
        </span>
      </div>
    </LiveShell>
  );
}

/* ───────────── 3. Word Counter ───────────── */
function LiveWordCounter() {
  const [text, setText] = useState(
    "Paste or type here. Word count updates instantly — no server, no upload, no sign-up."
  );
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const readMin = Math.max(1, Math.round(words / 230));
    return { words, chars, charsNoSpace, readMin };
  }, [text]);

  const items: [string, number | string][] = [
    ["words", stats.words],
    ["chars", stats.chars],
    ["no-spc", stats.charsNoSpace],
    ["read", `${stats.readMin}m`],
  ];

  return (
    <LiveShell
      kind="TEXT"
      title="Word & character counter"
      subtitle="Paste anything — it never leaves your browser."
      href="/tools/word-counter"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full resize-none px-3 py-2.5 text-[13px] rounded-[10px] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] leading-[1.5]"
      />
      <div className="grid grid-cols-4 gap-2">
        {items.map(([k, v]) => (
          <div
            key={k}
            className="px-2.5 py-2 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)]"
          >
            <div className="font-[family-name:var(--font-sora)] text-[20px] font-bold text-[var(--color-text)] leading-none tracking-tight">
              {typeof v === "number" ? v.toLocaleString() : v}
            </div>
            <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider mt-1">
              {k}
            </div>
          </div>
        ))}
      </div>
    </LiveShell>
  );
}

/* ───────────── 4. Color ───────────── */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").padEnd(6, "0").slice(0, 6);
  return [
    parseInt(clean.slice(0, 2), 16) || 0,
    parseInt(clean.slice(2, 4), 16) || 0,
    parseInt(clean.slice(4, 6), 16) || 0,
  ];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function LiveColor() {
  const [hex, setHex] = useState("#0D9488");
  const [r, g, b] = hexToRgb(hex);
  const [hh, ss, ll] = rgbToHsl(r, g, b);

  const rows: [string, string][] = [
    ["HEX", hex.toUpperCase()],
    ["RGB", `${r}, ${g}, ${b}`],
    ["HSL", `${hh}°, ${ss}%, ${ll}%`],
  ];

  return (
    <LiveShell
      kind="CONVERT"
      title="Color converter"
      subtitle="Pick or type — HEX · RGB · HSL update together."
      href="/tools/color-converter"
    >
      <div className="grid gap-3 items-stretch" style={{ gridTemplateColumns: "80px minmax(0, 1fr)" }}>
        <label
          className="relative rounded-xl border border-[var(--color-border)] overflow-hidden cursor-pointer min-h-[116px]"
          style={{ background: hex }}
        >
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 text-[10px] rounded bg-black/30 text-white font-mono">
            tap
          </div>
        </label>
        <div className="flex flex-col gap-1.5 min-w-0">
          {rows.map(([k, v]) => (
            <div
              key={k}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] min-w-0"
            >
              <span className="text-[10px] font-mono font-semibold text-[var(--color-text-muted)] w-7 shrink-0">{k}</span>
              <input
                value={v}
                onChange={(e) => k === "HEX" && setHex(e.target.value)}
                readOnly={k !== "HEX"}
                className="flex-1 min-w-0 w-full border-none bg-transparent text-[12.5px] font-mono text-[var(--color-text)] p-0 focus:outline-none"
              />
              <CopyBtn value={v} compact />
            </div>
          ))}
        </div>
      </div>
    </LiveShell>
  );
}
