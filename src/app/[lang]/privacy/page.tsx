import type { Metadata } from "next";
import PageTitle from "@/components/page/PageTitle";

export const metadata: Metadata = {
  title: "Privacy Policy — JustUse.me",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <PageTitle
        eyebrow="Privacy policy"
        title="Privacy"
        lede="Last updated March 13, 2026. Plain English summary below — full details in each section."
      />
      <p className="text-[13px] font-mono text-[var(--color-text-muted)] mb-8 px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
        The short version: your files stay in your browser. We don&apos;t run a processing server for client-side tools, we don&apos;t sell your data, and we only collect what&apos;s needed to run your account.
      </p>

      <div className="space-y-8 text-sm text-[var(--color-text-secondary)] leading-relaxed">
        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Who we are
          </h2>
          <p>
            JustUse.me is operated by <strong>Paymomentum LLC</strong>, a company registered in the
            State of Wyoming, United States.
          </p>
          <p className="mt-2 text-[var(--color-text-muted)]">
            30 N Gould St Ste R, Sheridan, WY 82801
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            How your files are handled
          </h2>
          <p>
            <strong>Browser-side tools</strong> — Many of our tools run entirely in your browser.
            Files processed by these tools are never uploaded to our servers. They remain on your
            device at all times.
          </p>
          <p className="mt-2">
            <strong>Server-side tools</strong> — Some tools require server processing. When you use
            these tools, your files are uploaded to our servers, processed, and the result is
            returned to you. Uploaded files are automatically deleted from our servers within 1 hour
            of processing. We do not read, analyze, or share the content of your files.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Account data
          </h2>
          <p>
            If you create an account, we collect your email address and, if you use Google sign-in,
            your name and profile picture. This information is used solely for authentication and
            account management.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Usage data
          </h2>
          <p>
            We track anonymous usage counts to enforce free-tier limits. We do not use third-party
            analytics trackers, and we do not sell your data to anyone.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Payments
          </h2>
          <p>
            Payments are processed securely by <strong>Stripe</strong>. We never store your credit
            card number or payment details on our servers. All payment data is handled directly by
            Stripe in compliance with PCI DSS standards.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Cookies
          </h2>
          <p>
            We use essential cookies only — for authentication and session management. We do not use
            advertising or tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Contact
          </h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a
              href="mailto:nev901008@gmail.com"
              className="text-[var(--color-accent)] hover:underline"
            >
              nev901008@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
