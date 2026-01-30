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
      <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-2 rounded-lg font-body">
        <XCircle className="w-4 h-4" />
        <span className="font-bold uppercase">Sold Out</span>
      </div>
    );
  }

  if (stock === null || stock > threshold) return null;

  return (
    <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-2 rounded-lg font-body animate-pulse">
      <AlertTriangle className="w-4 h-4" />
      <span className="font-semibold">
        Only <span className="font-bold">{stock}</span> left in stock!
      </span>
    </div>
  );
};
