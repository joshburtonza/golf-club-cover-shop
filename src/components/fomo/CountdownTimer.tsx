import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endDate: Date;
}

export const CountdownTimer = ({ endDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = endDate.getTime() - new Date().getTime();
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
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
  }, [endDate]);

  if (timeLeft.expired) {
    return null;
  }

  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-body">
      <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
      <span className="font-semibold text-xs sm:text-sm">
        <span className="hidden sm:inline">⏰ </span>Sale ends:
      </span>
      <div className="flex items-center gap-0.5 sm:gap-1 font-mono font-bold text-sm sm:text-lg">
        <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded">{pad(timeLeft.hours)}</span>
        <span>:</span>
        <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded">{pad(timeLeft.minutes)}</span>
        <span>:</span>
        <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 rounded">{pad(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};
