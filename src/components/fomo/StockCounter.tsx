import { AlertTriangle, XCircle } from "lucide-react";

interface StockCounterProps {
  quantity: number | null;
  threshold?: number;
}

export const StockCounter = ({ quantity, threshold = 14 }: StockCounterProps) => {
  if (quantity === null) return null;

  if (quantity === 0) {
    return (
      <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-2 rounded-lg font-body">
        <XCircle className="w-4 h-4" />
        <span className="font-bold uppercase">Sold Out</span>
      </div>
    );
  }

  if (quantity > threshold) return null;

  return (
    <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-2 rounded-lg font-body animate-pulse">
      <AlertTriangle className="w-4 h-4" />
      <span className="font-semibold">
        Only <span className="font-bold">{quantity}</span> left in stock!
      </span>
    </div>
  );
};
