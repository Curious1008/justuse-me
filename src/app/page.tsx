import CategoryBubbles from "@/components/home/CategoryBubbles";
import PopularTools from "@/components/home/PopularTools";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 flex flex-col items-center gap-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          What do you need to do?
        </h1>
        <p className="text-gray-500">
          Free online tools. No ads. No sign-up. Just use it.
        </p>
      </div>

      <CategoryBubbles />
      <PopularTools />
    </div>
  );
}
