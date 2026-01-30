import { useState, useEffect } from "react";
import { Truck, Clock } from "lucide-react";

interface ShippingCountdownProps {
  cutoffHour?: number; // 24-hour format, default 14 (2 PM)
  businessDays?: number; // Days to deliver, default 4
}

export const ShippingCountdown = ({ 
  cutoffHour = 14, 
  businessDays = 4 
}: ShippingCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  useEffect(() => {
    const calculateTimeAndDelivery = () => {
      const now = new Date();
      const today = new Date(now);
      
      // Set cutoff time for today
      const cutoff = new Date(today);
      cutoff.setHours(cutoffHour, 0, 0, 0);
      
      let targetCutoff = cutoff;
      let orderDate = new Date(today);
      
      // If past cutoff, use tomorrow's cutoff
      if (now >= cutoff) {
        targetCutoff = new Date(cutoff);
        targetCutoff.setDate(targetCutoff.getDate() + 1);
        orderDate.setDate(orderDate.getDate() + 1);
      }
      
      // Calculate time remaining
      const diff = targetCutoff.getTime() - now.getTime();
      
      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, delivery: null };
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Calculate delivery date (add business days)
      const delivery = new Date(orderDate);
      let addedDays = 0;
      while (addedDays < businessDays) {
        delivery.setDate(delivery.getDate() + 1);
        const dayOfWeek = delivery.getDay();
        // Skip weekends (0 = Sunday, 6 = Saturday)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          addedDays++;
        }
      }
      
      return { hours, minutes, seconds, delivery };
    };

    const update = () => {
      const result = calculateTimeAndDelivery();
      setTimeLeft({ hours: result.hours, minutes: result.minutes, seconds: result.seconds });
      setDeliveryDate(result.delivery);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [cutoffHour, businessDays]);

  const pad = (num: number) => num.toString().padStart(2, "0");

  const formatDeliveryDate = (date: Date | null) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-ZA', options);
  };

  return (
    <div className="bg-muted/50 rounded-lg p-3 border border-border">
      <div className="flex items-center gap-2 text-walnut">
        <Truck className="w-4 h-4 text-accent flex-shrink-0" />
        <div className="text-xs sm:text-sm font-body">
          <span className="flex items-center gap-1 flex-wrap">
            <Clock className="w-3 h-3 inline" />
            <span>Order in</span>
            <span className="font-mono font-bold text-accent">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
            <span>for delivery by</span>
            <span className="font-semibold text-accent">
              {formatDeliveryDate(deliveryDate)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
