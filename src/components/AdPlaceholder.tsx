interface AdPlaceholderProps {
  slotId?: string;
  format?: "banner" | "rectangle" | "leaderboard";
  className?: string;
}

export default function AdPlaceholder({
  slotId = "default-slot",
  format = "leaderboard",
  className = "",
}: AdPlaceholderProps) {
  // Fixed heights to strictly guarantee 0.00 CLS (Cumulative Layout Shift)
  const heightClass =
    format === "leaderboard"
      ? "min-h-[90px] max-h-[90px]"
      : format === "rectangle"
      ? "min-h-[250px] max-h-[250px]"
      : "min-h-[100px]";

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/40 p-2 overflow-hidden ${heightClass} ${className}`}
      data-ad-slot={slotId}
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
        Sponsorlu Reklam Alanı (CLS Rezerve)
      </span>
      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-mono">
        [AdSense / Header Bidding Alanı #{slotId}]
      </div>
    </div>
  );
}
