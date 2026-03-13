import CategoryBubbles from "@/components/home/CategoryBubbles";
import HeroGlow from "@/components/home/HeroGlow";
import { generateSiteJsonLd } from "@/config/seo";

export default function HomePage() {
  const jsonLd = generateSiteJsonLd();

  return (
    <div className="max-w-xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center gap-10 relative">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HeroGlow />

      <div className="text-center space-y-2 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-sora)] tracking-tight leading-[1.15] text-[var(--color-text)]">
          Get things done,{" "}
          <span className="bg-gradient-to-r from-[var(--color-accent)] to-teal-400 bg-clip-text text-transparent">
            effortlessly.
          </span>
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Everyday file tools, ready when you are.
        </p>
      </div>

      <CategoryBubbles />
    </div>
  );
}
