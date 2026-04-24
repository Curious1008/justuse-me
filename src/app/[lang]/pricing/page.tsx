"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { type Locale, localePath } from "@/lib/i18n";

const dict: Record<Locale, {
  eyebrow: string; title: string; subtitle: string; success: string; canceled: string;
  free: string; pro: string; popular: string; perMonth: string;
  freeTagline: string; proTagline: string;
  freeFeatures: string[]; proFeatures: string[];
  getStarted: string; upgradeToPro: string; redirecting: string; manageSubscription: string;
}> = {
  en: {
    eyebrow: "Pricing",
    title: "Free. All of it.",
    subtitle: "Every tool is free with no watermark, no sign-up, no file size cap. Pro is for people who want more.",
    success: "Welcome to Pro! Your subscription is now active.",
    canceled: "Checkout was canceled. No charges were made.",
    free: "Free", pro: "Pro", popular: "Recommended", perMonth: "/mo",
    freeTagline: "Forever. Really.",
    proTagline: "Unlimited uses + priority support.",
    freeFeatures: ["All 122 tools", "3 uses per day", "No watermarks", "Browser-side privacy", "3 languages"],
    proFeatures: ["Everything in Free", "Unlimited uses", "Priority email support", "Early access to new tools", "Help keep it ad-free"],
    getStarted: "Just use it", upgradeToPro: "Upgrade to Pro", redirecting: "Redirecting…", manageSubscription: "Manage subscription",
  },
  "zh-CN": {
    eyebrow: "定价",
    title: "全部免费。",
    subtitle: "每个工具都免费，无水印、无需注册、无文件大小限制。Pro 面向想要更多的用户。",
    success: "欢迎加入专业版！您的订阅已激活。",
    canceled: "结账已取消，未产生任何费用。",
    free: "免费版", pro: "专业版", popular: "推荐", perMonth: "/月",
    freeTagline: "永久免费。真的。",
    proTagline: "无限使用 + 优先支持。",
    freeFeatures: ["全部 122 个工具", "每天 3 次免费使用", "无水印", "浏览器端隐私保护", "3 种语言"],
    proFeatures: ["包含免费版全部功能", "无限次使用", "优先邮件支持", "抢先体验新工具", "帮助保持无广告"],
    getStarted: "直接使用", upgradeToPro: "升级到专业版", redirecting: "跳转中…", manageSubscription: "管理订阅",
  },
  "zh-TW": {
    eyebrow: "定價",
    title: "全部免費。",
    subtitle: "每個工具都免費，無浮水印、無需註冊、無檔案大小限制。Pro 面向想要更多的使用者。",
    success: "歡迎加入專業版！您的訂閱已啟用。",
    canceled: "結帳已取消，未產生任何費用。",
    free: "免費版", pro: "專業版", popular: "推薦", perMonth: "/月",
    freeTagline: "永久免費。真的。",
    proTagline: "無限使用 + 優先支援。",
    freeFeatures: ["全部 122 個工具", "每天 3 次免費使用", "無浮水印", "瀏覽器端隱私保護", "3 種語言"],
    proFeatures: ["包含免費版全部功能", "無限次使用", "優先郵件支援", "搶先體驗新工具", "協助保持無廣告"],
    getStarted: "直接使用", upgradeToPro: "升級至專業版", redirecting: "跳轉中…", manageSubscription: "管理訂閱",
  },
};

function PricingContent() {
  const params = useParams();
  const lang = (params.lang as Locale) || "en";
  const t = dict[lang] || dict.en;
  const { user, profile, loading } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const isPro = profile?.plan === "pro" || !!success;

  const handleUpgrade = async () => {
    if (!user) {
      window.location.href = localePath(lang, "/auth/login");
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error || "Failed to start checkout");
        setCheckoutLoading(false);
      }
    } catch {
      setCheckoutError("Network error. Please try again.");
      setCheckoutLoading(false);
    }
  };

  const handleManage = async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  const rosecheck = (dark: boolean) => (
    <svg className={`w-4 h-4 shrink-0 ${dark ? "text-[var(--color-accent)]" : "text-[var(--color-accent)]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="text-center mb-14">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] font-mono uppercase tracking-[0.6px] text-[var(--color-accent)] mb-3">
          {t.eyebrow}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] leading-[1.02]"
          style={{ fontSize: "clamp(32px, 7vw, 60px)", letterSpacing: "-1.8px" }}
        >
          {t.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.05 }}
          className="text-[17px] text-[var(--color-text-secondary)] max-w-xl mx-auto mt-5 leading-[1.5]"
        >
          {t.subtitle}
        </motion.p>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 p-4 rounded-xl bg-[var(--color-accent-glow)] border border-[var(--color-accent)] text-center text-sm text-[var(--color-accent)]">
            {t.success}
          </motion.div>
        )}
        {canceled && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 p-4 rounded-xl bg-[var(--color-error-dim)] border border-[var(--color-error)] text-center text-sm text-[var(--color-error)]">
            {t.canceled}
          </motion.div>
        )}
        {checkoutError && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 p-4 rounded-xl bg-[var(--color-error-dim)] border border-[var(--color-error)] text-center text-sm text-[var(--color-error)]">
            {checkoutError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {/* Free Plan (light card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
          className="relative p-7 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          <h2 className="text-[17px] font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">{t.free}</h2>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="font-[family-name:var(--font-sora)] font-bold text-[var(--color-text)] tracking-tight" style={{ fontSize: "52px", letterSpacing: "-2px", lineHeight: 1 }}>
              $0
            </span>
          </div>
          <p className="text-[14px] text-[var(--color-text-secondary)] mb-7">{t.freeTagline}</p>

          <motion.a
            href={localePath(lang, "/auth/login")}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full py-3 rounded-xl bg-[var(--color-text)] text-[var(--color-bg)] text-[14px] font-semibold font-[family-name:var(--font-sora)] text-center hover:opacity-90 transition-opacity mb-6"
          >
            {t.getStarted}
          </motion.a>

          <ul className="space-y-2.5">
            {t.freeFeatures.map((f) => (
              <li key={f} className="text-[14px] text-[var(--color-text-secondary)] flex items-center gap-2.5">
                {rosecheck(false)}
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Pro Plan (black card, RECOMMENDED) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.18 }}
          className="relative p-7 rounded-2xl bg-[#1A1A1A] text-white"
        >
          <span className="absolute -top-2.5 right-6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] font-[family-name:var(--font-sora)] bg-[var(--color-accent)] text-white rounded-full">
            {t.popular}
          </span>
          <h2 className="text-[17px] font-bold font-[family-name:var(--font-sora)] text-white mb-4">{t.pro}</h2>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="font-[family-name:var(--font-sora)] font-bold text-white tracking-tight" style={{ fontSize: "52px", letterSpacing: "-2px", lineHeight: 1 }}>
              $2.59
            </span>
            <span className="text-[14px] text-white/60">{t.perMonth}</span>
          </div>
          <p className="text-[14px] text-white/70 mb-7">{t.proTagline}</p>

          {isPro ? (
            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={handleManage}
              className="block w-full py-3 rounded-xl bg-white text-[#1A1A1A] text-[14px] font-semibold font-[family-name:var(--font-sora)] text-center hover:opacity-90 transition-opacity mb-6 cursor-pointer"
            >
              {t.manageSubscription}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={handleUpgrade}
              disabled={checkoutLoading}
              className="block w-full py-3 rounded-xl bg-white text-[#1A1A1A] text-[14px] font-semibold font-[family-name:var(--font-sora)] text-center hover:opacity-90 transition-opacity disabled:opacity-60 mb-6 cursor-pointer"
            >
              {checkoutLoading ? t.redirecting : t.upgradeToPro}
            </motion.button>
          )}

          <ul className="space-y-2.5">
            {t.proFeatures.map((f) => (
              <li key={f} className="text-[14px] text-white/80 flex items-center gap-2.5">
                {rosecheck(true)}
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense>
      <PricingContent />
    </Suspense>
  );
}
