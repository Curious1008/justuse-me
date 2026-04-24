import { type Locale } from "@/lib/i18n";

const labels: Record<Locale, { browser: string; noUpload: string; noSignup: string; noWatermark: string }> = {
  en: { browser: "Runs in your browser", noUpload: "Files never uploaded", noSignup: "No sign-up", noWatermark: "No watermark" },
  "zh-CN": { browser: "在浏览器中运行", noUpload: "文件不会上传", noSignup: "无需注册", noWatermark: "无水印" },
  "zh-TW": { browser: "在瀏覽器中執行", noUpload: "檔案不會上傳", noSignup: "無需註冊", noWatermark: "無浮水印" },
};

export default function TrustChips({ lang = "en", serverRuntime = false }: { lang?: Locale; serverRuntime?: boolean }) {
  const t = labels[lang] || labels.en;
  const chips = [
    { icon: "⌁", label: serverRuntime ? t.noSignup : t.browser },
    { icon: "◈", label: t.noUpload },
    { icon: "⚡", label: t.noSignup },
    { icon: "✓", label: t.noWatermark },
  ];
  return (
    <div className="flex gap-1.5 flex-wrap">
      {chips.map((c) => (
        <span
          key={c.label}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[11px] font-mono text-[var(--color-text-secondary)]"
        >
          <span className="text-[var(--color-accent)]">{c.icon}</span>
          {c.label}
        </span>
      ))}
    </div>
  );
}
