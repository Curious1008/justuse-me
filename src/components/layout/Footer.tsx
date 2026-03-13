import Link from "next/link";
import { type Locale, localePath } from "@/lib/i18n";

const dictionaries: Record<Locale, { copyright: string; privacyNotice: string; privacyPolicy: string; terms: string }> = {
  en: { copyright: "JustUse.me — Paymomentum LLC", privacyNotice: "Your privacy matters to us", privacyPolicy: "Privacy Policy", terms: "Terms of Service" },
  "zh-CN": { copyright: "JustUse.me — Paymomentum LLC", privacyNotice: "我们重视您的隐私", privacyPolicy: "隐私政策", terms: "服务条款" },
  "zh-TW": { copyright: "JustUse.me — Paymomentum LLC", privacyNotice: "我們重視您的隱私", privacyPolicy: "隱私政策", terms: "服務條款" },
};

export default function Footer({ lang = "en" }: { lang?: Locale }) {
  const t = dictionaries[lang] || dictionaries.en;

  return (
    <footer className="w-full mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-6 sm:py-10 flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} {t.copyright}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            {t.privacyNotice}
          </p>
        </div>
        <div className="flex items-center justify-center gap-6">
          <Link href={localePath(lang, "/privacy")} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">
            {t.privacyPolicy}
          </Link>
          <Link href={localePath(lang, "/terms")} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">
            {t.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
