"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { type Locale, localePath } from "@/lib/i18n";

const dict: Record<Locale, {
  title: string; subtitle: string; success: string; canceled: string;
  free: string; pro: string; popular: string; perMonth: string;
  freeFeatures: string[]; proFeatures: string[];
  getStarted: string; upgradeToPro: string; redirecting: string; manageSubscription: string;
}> = {
  en: {
    title: "Simple pricing", subtitle: "No hidden fees. Cancel anytime.",
    success: "Welcome to Pro! Your subscription is now active.",
    canceled: "Checkout was canceled. No charges were made.",
    free: "Free", pro: "Pro", popular: "Popular", perMonth: "/month",
    freeFeatures: ["3 uses per day", "All tools available", "No watermarks", "Browser-side privacy"],
    proFeatures: ["Unlimited uses", "All tools available", "No watermarks", "Browser-side privacy", "Priority support"],
    getStarted: "Get Started", upgradeToPro: "Upgrade to Pro", redirecting: "Redirecting...", manageSubscription: "Manage Subscription",
  },
  "zh-CN": {
    title: "简单定价", subtitle: "无隐藏费用，随时取消。",
    success: "欢迎加入专业版！您的订阅已激活。",
    canceled: "结账已取消，未产生任何费用。",
    free: "免费版", pro: "专业版", popular: "热门", perMonth: "/月",
    freeFeatures: ["每天3次免费使用", "所有工具可用", "无水印", "浏览器端隐私保护"],
    proFeatures: ["无限次使用", "所有工具可用", "无水印", "浏览器端隐私保护", "优先支持"],
    getStarted: "开始使用", upgradeToPro: "升级到专业版", redirecting: "跳转中...", manageSubscription: "管理订阅",
  },
  "zh-TW": {
    title: "簡單定價", subtitle: "無隱藏費用，隨時取消。",
    success: "歡迎加入專業版！您的訂閱已啟用。",
    canceled: "結帳已取消，未產生任何費用。",
    free: "免費版", pro: "專業版", popular: "熱門", perMonth: "/月",
    freeFeatures: ["每天3次免費使用", "所有工具可用", "無浮水印", "瀏覽器端隱私保護"],
    proFeatures: ["無限次使用", "所有工具可用", "無浮水印", "瀏覽器端隱私保護", "優先支援"],
    getStarted: "開始使用", upgradeToPro: "升級至專業版", redirecting: "跳轉中...", manageSubscription: "管理訂閱",
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

  const checkIcon = (
    <span className="w-4 h-4 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center flex-shrink-0">
      <svg className="w-2.5 h-2.5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </span>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }} className="text-[11px] font-mono uppercase tracking-[0.6px] text-[var(--color-accent)] mb-3">
          Pricing
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] leading-[1]"
          style={{ fontSize: "clamp(36px, 5.5vw, 48px)", letterSpacing: "-1.5px" }}
        >
          {t.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.05 }}
          className="text-[17px] text-[var(--color-text-secondary)] max-w-lg mx-auto mt-4 leading-[1.5]"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Free Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }} whileHover={{ y: -4 }} className="relative p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300">
          <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-1">{t.free}</h2>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-3xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)]">$0</span>
          </div>
          <ul className="space-y-3 mb-8">
            {t.freeFeatures.map((f) => (
              <li key={f} className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2.5">{checkIcon}{f}</li>
            ))}
          </ul>
          {!user && !loading && (
            <motion.a href={localePath(lang, "/auth/login")} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="block w-full py-3 rounded-xl border border-[var(--color-border)] text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] text-center transition-all">
              {t.getStarted}
            </motion.a>
          )}
        </motion.div>

        {/* Pro Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.18 }} whileHover={{ y: -4 }} className="relative p-8 rounded-2xl border border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent-glow)] bg-[var(--color-surface)] transition-all duration-300">
          <span className="absolute -top-3 left-6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] font-[family-name:var(--font-sora)] bg-[var(--color-accent)] text-white rounded-full">{t.popular}</span>
          <h2 className="text-lg font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-1">{t.pro}</h2>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-3xl font-bold font-[family-name:var(--font-sora)] text-[var(--color-text)]">$2.59</span>
            <span className="text-sm text-[var(--color-text-muted)]">{t.perMonth}</span>
          </div>
          <ul className="space-y-3 mb-8">
            {t.proFeatures.map((f) => (
              <li key={f} className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2.5">{checkIcon}{f}</li>
            ))}
          </ul>

          {isPro ? (
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleManage} className="w-full py-3 rounded-xl border border-[var(--color-accent)] text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-accent)] transition-all cursor-pointer">
              {t.manageSubscription}
            </motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleUpgrade} disabled={checkoutLoading} className="w-full py-3 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] hover:bg-[var(--color-accent-dim)] shadow-sm transition-all cursor-pointer disabled:opacity-60">
              {checkoutLoading ? t.redirecting : t.upgradeToPro}
            </motion.button>
          )}
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
