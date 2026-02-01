import { useState, useEffect } from "react";
import { Flame, Clock } from "lucide-react";
import { getDiscountPercentage } from "@/lib/pricing";

// Calculate the next sale end time on a rolling 3-day cycle
const getSaleEndDate = (): Date => {
  const now = new Date();
  const cycleMs = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
  const epoch = new Date('2025-01-01T00:00:00Z').getTime(); // Fixed reference point
  const timeSinceEpoch = now.getTime() - epoch;
  const currentCycle = Math.floor(timeSinceEpoch / cycleMs);
  const nextCycleEnd = epoch + (currentCycle + 1) * cycleMs;
  return new Date(nextCycleEnd);
};

export const SaleTicker = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const endDate = getSaleEndDate();
    const difference = endDate.getTime() - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.expired) {
    return null;
  }

  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-2 sm:py-3 px-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            <span className="font-display text-sm sm:text-lg uppercase tracking-wide">
              {getDiscountPercentage()} OFF SALE
            </span>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-white/30" />
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-body">Ends in:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-sm sm:text-base">
              {timeLeft.days > 0 && (
                <>
                  <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-xs sm:text-sm">
                    {timeLeft.days}d
                  </span>
                  <span className="text-white/60">:</span>
                </>
              )}
              <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-xs sm:text-sm">
                {pad(timeLeft.hours)}
              </span>
              <span className="text-white/60">:</span>
              <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-xs sm:text-sm">
                {pad(timeLeft.minutes)}
              </span>
              <span className="text-white/60">:</span>
              <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-xs sm:text-sm animate-pulse">
                {pad(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
