import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} JustUse.me — Paymomentum LLC
          </p>
          <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Your privacy matters to us
          </p>
        </div>
        <div className="flex items-center justify-center gap-6">
          <Link href="/privacy" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
