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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-walnut">
              {name} from {city}
            </p>
            <p className="text-sm text-walnut/70">just bought {product}!</p>
          </div>
        </div>,
        {
          duration: 4000,
          position: "bottom-left",
          className: "!bg-cream !border-accent/20",
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
