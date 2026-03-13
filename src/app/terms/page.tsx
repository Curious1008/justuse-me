import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — JustUse.me",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-8">
        Terms of Service
      </h1>
      <p className="text-xs text-[var(--color-text-muted)] mb-8">
        Last updated: March 13, 2026
      </p>

      <div className="space-y-8 text-sm text-[var(--color-text-secondary)] leading-relaxed">
        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Agreement
          </h2>
          <p>
            By accessing or using JustUse.me (&quot;the Service&quot;), you agree to these Terms of
            Service. The Service is operated by <strong>Paymomentum LLC</strong>, 30 N Gould St
            Ste R, Sheridan, WY 82801, Wyoming, United States.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Description of Service
          </h2>
          <p>
            JustUse.me provides online file processing tools including PDF manipulation, image
            editing, and text utilities. Some tools run in your browser; others require server-side
            processing.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Free and paid plans
          </h2>
          <p>
            Free users may use the Service up to 3 times per day without creating an account.
            Registered users receive 3 free uses per day. Pro subscribers ($9.90/month) receive
            unlimited access. Payments are processed by Stripe. You may cancel your subscription at
            any time; access continues until the end of the billing period.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Your content
          </h2>
          <p>
            You retain all rights to the files you upload. We do not claim ownership of your content.
            Files uploaded for server-side processing are automatically deleted within 1 hour. You
            are responsible for ensuring you have the right to process the files you upload.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Acceptable use
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to circumvent usage limits or access controls</li>
            <li>Upload files containing malware or malicious code</li>
            <li>Interfere with or disrupt the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Disclaimer
          </h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any kind. We do not
            guarantee that the Service will be uninterrupted, error-free, or that the results will
            be accurate. Use the Service at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Limitation of liability
          </h2>
          <p>
            To the maximum extent permitted by law, Paymomentum LLC shall not be liable for any
            indirect, incidental, or consequential damages arising from your use of the Service.
            Our total liability shall not exceed the amount you paid us in the 12 months preceding
            the claim.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Changes to these terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes
            constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Governing law
          </h2>
          <p>
            These Terms are governed by the laws of the State of Wyoming, United States.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            Contact
          </h2>
          <p>
            Questions about these Terms? Contact us at{" "}
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
