"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";
import { type Locale, localeNames, locales, localePath } from "@/lib/i18n";
import { usePathname } from "next/navigation";

const dictionaries: Record<Locale, typeof import("@/locales/en").default.nav> = {
  en: { pricing: "Pricing", contact: "Contact", signIn: "Sign In", signOut: "Sign Out", freePlan: "Free Plan", proPlan: "Pro Plan", upgradeToPro: "Upgrade to Pro", manageSubscription: "Manage Subscription" },
  "zh-CN": { pricing: "定价", contact: "联系", signIn: "登录", signOut: "退出", freePlan: "免费版", proPlan: "专业版", upgradeToPro: "升级到专业版", manageSubscription: "管理订阅" },
  "zh-TW": { pricing: "定價", contact: "聯絡", signIn: "登入", signOut: "登出", freePlan: "免費版", proPlan: "專業版", upgradeToPro: "升級至專業版", manageSubscription: "管理訂閱" },
};

const themeLabels: Record<Locale, { light: string; dark: string; system: string }> = {
  en: { light: "Light", dark: "Dark", system: "System" },
  "zh-CN": { light: "浅色", dark: "深色", system: "跟随系统" },
  "zh-TW": { light: "淺色", dark: "深色", system: "跟隨系統" },
};

function ThemeIcon({ resolved }: { resolved: "light" | "dark" }) {
  return resolved === "dark" ? (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  );
}

export default function Header({ lang = "en" }: { lang?: Locale }) {
  const t = dictionaries[lang] || dictionaries.en;
  const tTheme = themeLabels[lang] || themeLabels.en;
  const { user, profile, loading, signOut } = useAuth();
  const { theme, resolved, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Build path for switching locale
  function switchLocalePath(targetLocale: Locale): string {
    let cleanPath = pathname;
    for (const l of locales) {
      if (cleanPath.startsWith(`/${l}/`)) {
        cleanPath = cleanPath.slice(l.length + 1);
        break;
      } else if (cleanPath === `/${l}`) {
        cleanPath = "/";
        break;
      }
    }
    return localePath(targetLocale, cleanPath);
  }

  const dropdownCls = "absolute right-0 top-full mt-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg shadow-black/[0.08] z-50";

  return (
    <header className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href={localePath(lang, "/")}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="flex items-center gap-2.5"
          >
            <span className="text-lg font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)]">
              justuse<span className="text-[var(--color-accent)]">.me</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href={localePath(lang, "/pricing")}>
            <motion.span
              whileHover={{ color: "var(--color-accent)" }}
              className="text-sm text-[var(--color-text-secondary)] transition-colors"
            >
              {t.pricing}
            </motion.span>
          </Link>
          <Link href={localePath(lang, "/contact")}>
            <motion.span
              whileHover={{ color: "var(--color-accent)" }}
              className="text-sm text-[var(--color-text-secondary)] transition-colors"
            >
              {t.contact}
            </motion.span>
          </Link>

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.559" />
              </svg>
              <span>{localeNames[lang]}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`${dropdownCls} w-36 py-1`}
                >
                  {locales.map((l) => (
                    <a
                      key={l}
                      href={switchLocalePath(l)}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        l === lang
                          ? "text-[var(--color-accent)] font-medium"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
                      }`}
                    >
                      {localeNames[l]}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(resolved === "light" ? "dark" : "light")}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            <ThemeIcon resolved={resolved} />
          </button>

          {loading ? (
            <div className="w-8 h-8 rounded-full bg-[var(--color-surface-elevated)] animate-pulse" />
          ) : user ? (
            <div ref={menuRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-[var(--color-accent)] transition-colors cursor-pointer"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                    {(profile?.display_name || user.email || "U")[0].toUpperCase()}
                  </div>
                )}
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`${dropdownCls} w-52 py-2`}
                  >
                    <div className="px-4 py-2 border-b border-[var(--color-border)]">
                      <p className="text-sm font-medium text-[var(--color-text)] truncate">
                        {profile?.display_name || user.email}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        {profile?.plan === "pro" ? t.proPlan : t.freePlan}
                      </p>
                    </div>

                    {profile?.plan !== "pro" && (
                      <Link
                        href={localePath(lang, "/pricing")}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[var(--color-accent)] font-medium hover:bg-[var(--color-surface-elevated)] transition-colors"
                      >
                        {t.upgradeToPro}
                      </Link>
                    )}

                    {profile?.plan === "pro" && (
                      <button
                        onClick={async () => {
                          setMenuOpen(false);
                          const res = await fetch("/api/stripe/portal", { method: "POST" });
                          const { url } = await res.json();
                          if (url) window.location.href = url;
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors cursor-pointer"
                      >
                        {t.manageSubscription}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors cursor-pointer"
                    >
                      {t.signOut}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Link
                href={localePath(lang, "/auth/login")}
                className="text-sm px-5 py-2 rounded-full bg-[var(--color-text)] text-white hover:bg-[var(--color-text-secondary)] transition-colors font-medium"
              >
                {t.signIn}
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile hamburger */}
        <div ref={mobileRef} className="sm:hidden relative">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`${dropdownCls} w-48 py-2`}
              >
                <Link
                  href={localePath(lang, "/pricing")}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                >
                  {t.pricing}
                </Link>
                <Link
                  href={localePath(lang, "/contact")}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                >
                  {t.contact}
                </Link>

                <div className="border-t border-[var(--color-border)] my-1" />

                {/* Language options */}
                {locales.map((l) => (
                  <a
                    key={l}
                    href={switchLocalePath(l)}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      l === lang
                        ? "text-[var(--color-accent)] font-medium"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
                    }`}
                  >
                    {localeNames[l]}
                  </a>
                ))}

                <div className="border-t border-[var(--color-border)] my-1" />

                {/* Theme options */}
                <div className="px-4 py-2 flex items-center gap-1.5">
                  {(["light", "dark", "system"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setTheme(opt); setMobileOpen(false); }}
                      className={`flex-1 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                        theme === opt
                          ? "bg-[var(--color-accent-glow)] text-[var(--color-accent)] font-medium"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {tTheme[opt]}
                    </button>
                  ))}
                </div>

                <div className="border-t border-[var(--color-border)] my-1" />

                {loading ? null : user ? (
                  <>
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-[var(--color-text)] truncate">
                        {profile?.display_name || user.email}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        {profile?.plan === "pro" ? t.proPlan : t.freePlan}
                      </p>
                    </div>
                    {profile?.plan !== "pro" && (
                      <Link
                        href={localePath(lang, "/pricing")}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[var(--color-accent)] font-medium hover:bg-[var(--color-surface-elevated)] transition-colors"
                      >
                        {t.upgradeToPro}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] transition-colors cursor-pointer"
                    >
                      {t.signOut}
                    </button>
                  </>
                ) : (
                  <Link
                    href={localePath(lang, "/auth/login")}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-surface-elevated)] transition-colors"
                  >
                    {t.signIn}
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
