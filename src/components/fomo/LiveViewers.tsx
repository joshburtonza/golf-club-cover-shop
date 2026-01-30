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
    <div className="flex items-center gap-2 text-sm font-body">
      <Eye className="w-4 h-4 text-orange-500" />
      <span className="text-walnut/80">
        🔥{" "}
        <span
          className={`font-semibold text-orange-600 transition-transform duration-300 inline-block ${
            isPulsing ? "scale-125" : "scale-100"
          }`}
        >
          {viewers}
        </span>{" "}
        people are viewing this right now
      </span>
    </div>
  );
};
