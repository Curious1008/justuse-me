interface PageTitleProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}

export default function PageTitle({ eyebrow, title, lede, align = "left" }: PageTitleProps) {
  const wrap = align === "center" ? "text-center mx-auto" : "";
  return (
    <header className={`mb-8 ${wrap}`}>
      {eyebrow && (
        <div className="text-[11px] font-mono uppercase tracking-[0.6px] text-[var(--color-accent)] mb-2">
          {eyebrow}
        </div>
      )}
      <h1
        className="font-[family-name:var(--font-sora)] font-bold tracking-tight leading-[1.02] text-[var(--color-text)]"
        style={{ fontSize: "clamp(32px, 5vw, 44px)", letterSpacing: "-1.2px" }}
      >
        {title}
      </h1>
      {lede && (
        <p className="mt-3 text-[16px] leading-[1.5] text-[var(--color-text-secondary)] max-w-[620px]" style={align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}}>
          {lede}
        </p>
      )}
    </header>
  );
}
