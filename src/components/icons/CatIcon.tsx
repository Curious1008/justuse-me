import type { Category } from "@/tools/types";

const PATHS: Record<Category, React.ReactNode> = {
  pdf: (
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM13 3v5h5" />
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="m21 16-5-5-7 7" />
    </>
  ),
  text: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  convert: <path d="M3 6h4l10 12h4M3 18h4L17 6h4M17 3l4 3-4 3M17 15l4 3-4 3" />,
  generator: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  ),
  calculator: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </>
  ),
  developer: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </>
  ),
  utility: (
    <path d="M14.7 6.3a4 4 0 0 1 5 5L16 15l3 3-3 3-3-3-3.7 3.7a4 4 0 0 1-5-5L8 14l-3-3 3-3 3 3 3.7-3.7z" />
  ),
};

export default function CatIcon({
  category,
  size = 18,
  className,
}: {
  category: Category;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[category]}
    </svg>
  );
}
