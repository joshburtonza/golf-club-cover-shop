import { useState, useEffect } from "react";
import { AlertTriangle, XCircle } from "lucide-react";

interface StockCounterProps {
  productId: string;
  availableForSale: boolean;
  threshold?: number;
}

// Simulated stock since Shopify Storefront API doesn't expose inventory without special permissions
export const StockCounter = ({ productId, availableForSale, threshold = 14 }: StockCounterProps) => {
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    // Generate a consistent "stock" number based on product ID (stays same per product)
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const simulatedStock = (hash % 12) + 3; // 3-14 range
    setStock(simulatedStock);
  }, [productId]);

  if (!availableForSale) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 bg-destructive/10 text-destructive px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-body text-xs sm:text-sm">
        <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
        <span className="font-bold uppercase tracking-wide">Sold Out</span>
      </div>
    );
  }

  if (stock === null || stock > threshold) return null;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 bg-orange-100 text-orange-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-body text-xs sm:text-sm">
      <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
      <span className="font-semibold">
        ⚡ Only <span className="font-bold">{stock}</span> left — don't let your mate beat you to it!
      </span>
    </div>
  );
};
