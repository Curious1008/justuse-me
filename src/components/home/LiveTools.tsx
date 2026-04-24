"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-2 pb-6">
      <div className="flex items-end justify-between flex-wrap gap-2 mb-5">
        <div>
          <h2 className="text-[22px] font-semibold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)]">
            {labels.heading}
          </h2>
          <p className="text-[13px] text-[var(--color-text-muted)] mt-1">{labels.sub}</p>
        </div>
        <div className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)] font-mono px-2.5 py-1 border border-[var(--color-border-subtle)] rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          {labels.runsLocal}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <LiveQR labels={labels} />
        <LivePassword labels={labels} />
        <LiveWordCounter labels={labels} />
        <LiveColor labels={labels} />
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 flex flex-col gap-3">
      <div className="text-xs font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] uppercase tracking-wider">
        {title}
      </div>
      {children}
    </div>
  );
}

/* ───────────── QR ───────────── */
function LiveQR({ labels }: { labels: Labels }) {
  const [text, setText] = useState("https://justuse.me");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("qrcode");
      if (cancelled || !canvasRef.current) return;
      try {
        await mod.toCanvas(canvasRef.current, text || " ", {
          width: 180,
          margin: 1,
          color: { dark: "#1A1A1A", light: "#FFFFFF00" },
        });
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <Card title={labels.qrTitle}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={labels.qrPlaceholder}
        className="w-full px-3 py-2 text-[13px] rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
      />
      <div className="flex justify-center py-2">
        <canvas ref={canvasRef} width={180} height={180} className="rounded-lg" />
      </div>
      <div className="text-[11px] text-[var(--color-text-muted)] text-center">{labels.qrHint}</div>
    </Card>
  );
}

/* ───────────── Password ───────────── */
const PW_CHARS =
  "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*";

function genPassword(len: number): string {
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  let out = "";
  for (let i = 0; i < len; i++) out += PW_CHARS[arr[i] % PW_CHARS.length];
  return out;
}

function LivePassword({ labels }: { labels: Labels }) {
  const [len, setLen] = useState(20);
  const [pw, setPw] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPw(genPassword(len));
  }, [len]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(pw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <Card title={labels.pwTitle}>
      <div className="font-mono text-[13px] break-all px-3 py-3 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] min-h-[72px] text-[var(--color-text)]">
        {pw}
      </div>
      <label className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)] font-mono">
        <span className="shrink-0">{labels.pwLength}</span>
        <input
          type="range"
          min={8}
          max={48}
          value={len}
          onChange={(e) => setLen(Number(e.target.value))}
          className="w-full accent-[var(--color-accent)]"
        />
        <span className="w-6 text-right text-[var(--color-text)]">{len}</span>
      </label>
      <div className="flex gap-2">
        <button
          onClick={onCopy}
          className="flex-1 text-[12px] px-3 py-2 rounded-lg bg-[var(--color-text)] text-[var(--color-bg)] font-medium"
        >
          {copied ? labels.pwCopied : labels.pwCopy}
        </button>
        <button
          onClick={() => setPw(genPassword(len))}
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] text-[12px]"
        >
          {labels.pwRegen}
        </button>
      </div>
    </Card>
  );
}

/* ───────────── Word Counter ───────────── */
function LiveWordCounter({ labels }: { labels: Labels }) {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = trimmed ? (trimmed.match(/[.!?。！？]+/g) || []).length || 1 : 0;
    return { words, chars, sentences };
  }, [text]);

  return (
    <Card title={labels.wcTitle}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={labels.wcPlaceholder}
        className="w-full h-[116px] resize-none px-3 py-2 text-[13px] rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
      />
      <div className="grid grid-cols-3 gap-2 font-mono">
        <Stat label={labels.wcWords} value={stats.words} />
        <Stat label={labels.wcChars} value={stats.chars} />
        <Stat label={labels.wcSentences} value={stats.sentences} />
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center px-2 py-2 rounded-lg bg-[var(--color-surface-elevated)]">
      <div className="text-[16px] font-semibold text-[var(--color-text)]">{value}</div>
      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* ───────────── Color ───────────── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function LiveColor({ labels }: { labels: Labels }) {
  const [hex, setHex] = useState("#E11D48");
  const [r, g, b] = hexToRgb(hex);
  const [hh, ss, ll] = rgbToHsl(r, g, b);

  return (
    <Card title={labels.colorTitle}>
      <div
        className="w-full h-[92px] rounded-lg border border-[var(--color-border-subtle)]"
        style={{ background: hex }}
      />
      <label className="flex items-center gap-3">
        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value.toUpperCase())}
          className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--color-border-subtle)] bg-transparent"
        />
        <input
          value={hex}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) setHex(v.toUpperCase());
          }}
          className="flex-1 font-mono text-[13px] px-3 py-2 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
        />
      </label>
      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="px-2 py-1.5 rounded-lg bg-[var(--color-surface-elevated)]">
          <div className="text-[9px] uppercase text-[var(--color-text-muted)]">{labels.colorRgb}</div>
          <div className="text-[var(--color-text)]">{r}, {g}, {b}</div>
        </div>
        <div className="px-2 py-1.5 rounded-lg bg-[var(--color-surface-elevated)]">
          <div className="text-[9px] uppercase text-[var(--color-text-muted)]">{labels.colorHsl}</div>
          <div className="text-[var(--color-text)]">{hh}, {ss}%, {ll}%</div>
        </div>
      </div>
    </Card>
  );
}
