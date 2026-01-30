import { Progress } from "@/components/ui/progress";
import { Truck, PartyPopper } from "lucide-react";

interface FreeShippingProgressProps {
  currentTotal: number;
  threshold?: number;
}

export const FreeShippingProgress = ({ 
  currentTotal, 
  threshold = 500 
}: FreeShippingProgressProps) => {
  const remaining = Math.max(0, threshold - currentTotal);
  const progress = Math.min(100, (currentTotal / threshold) * 100);
  const hasUnlockedFreeShipping = currentTotal >= threshold;

  if (hasUnlockedFreeShipping) {
    return (
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 text-green-600">
          <PartyPopper className="w-5 h-5 flex-shrink-0" />
          <span className="font-body font-semibold text-sm">
            🎉 You've unlocked FREE SHIPPING!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted/50 border border-border rounded-lg p-3 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Truck className="w-4 h-4 text-accent flex-shrink-0" />
        <span className="font-body text-sm text-walnut">
          You're <span className="font-bold text-accent">R{remaining.toFixed(0)}</span> away from FREE SHIPPING!
        </span>
      </div>
      <Progress value={progress} className="h-2 bg-walnut/10">
        <div 
          className="h-full bg-gradient-to-r from-accent to-gold transition-all rounded-full"
          style={{ width: `${progress}%` }}
        />
      </Progress>
      <p className="text-xs text-muted-foreground mt-1 font-body">
        Free shipping on orders over R{threshold}
      </p>
    </div>
  );
};
