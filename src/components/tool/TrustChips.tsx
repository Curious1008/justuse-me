import { type Locale } from "@/lib/i18n";

const labels: Record<Locale, { browser: string; noUpload: string; noSignup: string; noWatermark: string }> = {
  en: { browser: "Runs in your browser", noUpload: "Files never uploaded", noSignup: "No sign-up", noWatermark: "No watermark" },
  "zh-CN": { browser: "在浏览器中运行", noUpload: "文件不会上传", noSignup: "无需注册", noWatermark: "无水印" },
  "zh-TW": { browser: "在瀏覽器中執行", noUpload: "檔案不會上傳", noSignup: "無需註冊", noWatermark: "無浮水印" },
};

const Svg = ({ d }: { d: React.ReactNode }) => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const ICONS = {
  bolt: <Svg d={<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />} />,
  noCloud: <Svg d={<><path d="M7 18a4 4 0 1 1 .7-7.9A6 6 0 0 1 19 11a4 4 0 0 1-.5 7H7z" /><path d="M3 3l18 18" /></>} />,
  sparkle: <Svg d={<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />} />,
  check: <Svg d={<path d="M4 12l5 5L20 6" />} />,
};

export default function TrustChips({ lang = "en", serverRuntime = false }: { lang?: Locale; serverRuntime?: boolean }) {
  const t = labels[lang] || labels.en;
  const chips = [
    { icon: ICONS.bolt, label: serverRuntime ? t.noSignup : t.browser },
    { icon: ICONS.noCloud, label: t.noUpload },
    { icon: ICONS.sparkle, label: t.noSignup },
    { icon: ICONS.check, label: t.noWatermark },
  ];
  return (
    <div className="flex gap-1.5 flex-wrap">
      {chips.map((c) => (
        <span
          key={c.label}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[11px] font-mono text-[var(--color-text-secondary)]"
        >
          <span className="text-[var(--color-accent)] inline-flex">{c.icon}</span>
          {c.label}
        </span>
      ))}
    </div>
  );
}
