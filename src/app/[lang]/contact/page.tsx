"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { type Locale } from "@/lib/i18n";

const dict: Record<Locale, {
  title: string; subtitle: string; namePlaceholder: string; emailPlaceholder: string;
  messagePlaceholder: string; send: string; sending: string; success: string; sendAnother: string;
}> = {
  en: { title: "Contact us", subtitle: "Have a question or feedback? We'd love to hear from you.", namePlaceholder: "Your name", emailPlaceholder: "Your email", messagePlaceholder: "Your message", send: "Send Message", sending: "Sending...", success: "Message sent! We'll get back to you soon.", sendAnother: "Send another message" },
  "zh-CN": { title: "联系我们", subtitle: "有问题或反馈？我们很乐意听到您的声音。", namePlaceholder: "您的姓名", emailPlaceholder: "您的邮箱", messagePlaceholder: "您的留言", send: "发送消息", sending: "发送中...", success: "消息已发送！我们会尽快回复您。", sendAnother: "再发一条消息" },
  "zh-TW": { title: "聯絡我們", subtitle: "有問題或回饋？我們很樂意聽到您的聲音。", namePlaceholder: "您的姓名", emailPlaceholder: "您的電子郵件", messagePlaceholder: "您的留言", send: "傳送訊息", sending: "傳送中...", success: "訊息已傳送！我們會盡快回覆您。", sendAnother: "再傳送一則訊息" },
};

export default function ContactPage() {
  const params = useParams();
  const lang = (params.lang as Locale) || "en";
  const t = dict[lang] || dict.en;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors";

  return (
    <div className="max-w-lg mx-auto px-6 py-24">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] font-mono uppercase tracking-[0.6px] text-[var(--color-accent)] mb-2">
        Contact
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-3 leading-[1.02]"
        style={{ fontSize: "clamp(32px, 5vw, 44px)", letterSpacing: "-1.2px" }}
      >
        {t.title}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-[16px] text-[var(--color-text-secondary)] mb-12 leading-[1.5]">{t.subtitle}</motion.p>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6 py-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }} className="w-14 h-14 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            </motion.div>
            <p className="text-sm text-[var(--color-text-secondary)]">{t.success}</p>
            <button onClick={() => setSent(false)} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors underline underline-offset-4">{t.sendAnother}</button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-4">
            <input id="contact-name" name="name" type="text" placeholder={t.namePlaceholder} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={inputClass} />
            <input id="contact-email" name="email" type="email" placeholder={t.emailPlaceholder} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className={inputClass} />
            <textarea id="contact-message" name="message" placeholder={t.messagePlaceholder} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className={`${inputClass} resize-none`} />
            {error && <p className="text-sm text-[var(--color-error)] text-center">{error}</p>}
            <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="w-full py-3 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold font-[family-name:var(--font-sora)] cursor-pointer transition-all hover:bg-[var(--color-accent-dim)] disabled:opacity-50 disabled:cursor-not-allowed">
              {sending ? t.sending : t.send}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
