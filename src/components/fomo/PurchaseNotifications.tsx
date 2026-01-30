import { useEffect } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

const SA_FIRST_NAMES = [
  "Thabo", "Lerato", "Sipho", "Naledi", "Johan", 
  "Anele", "Pieter", "Zinhle", "Marco", "Fatima"
];

const SA_CITIES = [
  "Johannesburg", "Cape Town", "Durban", "Pretoria", 
  "Port Elizabeth", "Bloemfontein", "Stellenbosch", "Sandton"
];

interface PurchaseNotificationsProps {
  productName?: string;
  enabled?: boolean;
}

export const usePurchaseNotifications = ({ productName, enabled = true }: PurchaseNotificationsProps) => {
  useEffect(() => {
    if (!enabled) return;

    const showNotification = () => {
      const name = SA_FIRST_NAMES[Math.floor(Math.random() * SA_FIRST_NAMES.length)];
      const city = SA_CITIES[Math.floor(Math.random() * SA_CITIES.length)];
      const product = productName || "a headcover";

      toast(
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-walnut text-sm truncate">
              {name} from {city}
            </p>
            <p className="text-xs text-walnut/70 truncate">just bought {product}!</p>
          </div>
        </div>,
        {
          duration: 4000,
          position: "bottom-left",
          className: "!bg-cream !border-accent/20 !max-w-[280px] sm:!max-w-sm",
        }
      );
    };

    // Initial delay of 10-20 seconds before first notification
    const initialDelay = Math.floor(Math.random() * 10000) + 10000;
    
    const scheduleNext = () => {
      // Random interval between 45-90 seconds
      const interval = Math.floor(Math.random() * 45000) + 45000;
      return setTimeout(() => {
        showNotification();
        scheduleNext();
      }, interval);
    };

    const initialTimeout = setTimeout(() => {
      showNotification();
      scheduleNext();
    }, initialDelay);

    return () => clearTimeout(initialTimeout);
  }, [productName, enabled]);
};

export const PurchaseNotifications = (props: PurchaseNotificationsProps) => {
  usePurchaseNotifications(props);
  return null;
};
