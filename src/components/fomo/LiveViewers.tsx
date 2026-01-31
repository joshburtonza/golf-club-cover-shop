import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

interface LiveViewersProps {
  productId: string;
}

export const LiveViewers = ({ productId }: LiveViewersProps) => {
  const [viewers, setViewers] = useState(() => Math.floor(Math.random() * 6) + 3); // 3-8
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const updateViewers = () => {
      setIsPulsing(true);
      setViewers(Math.floor(Math.random() * 6) + 3);
      setTimeout(() => setIsPulsing(false), 500);
    };

    // Random interval between 3-5 minutes (180000-300000ms)
    const scheduleUpdate = () => {
      const interval = Math.floor(Math.random() * 120000) + 180000;
      return setTimeout(() => {
        updateViewers();
        scheduleUpdate();
      }, interval);
    };

    const timeoutId = scheduleUpdate();
    return () => clearTimeout(timeoutId);
  }, [productId]);

  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-body bg-orange-500/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
      <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
      <span className="text-walnut/80">
        🔥{" "}
        <span
          className={`font-semibold text-orange-600 transition-transform duration-300 inline-block ${
            isPulsing ? "scale-110" : "scale-100"
          }`}
        >
          {viewers}
        </span>
        <span className="hidden sm:inline"> golfers eyeing this</span>
        <span className="sm:hidden"> looking</span>
      </span>
    </div>
  );
};
