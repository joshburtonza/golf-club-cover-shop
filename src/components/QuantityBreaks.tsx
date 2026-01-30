import { useState } from "react";
import { Check, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityBreaksProps {
  basePrice: number;
  onQuantityChange: (quantity: number, priceEach: number) => void;
}

const tiers = [
  { quantity: 1, discount: 0.10, label: "Buy 1", badge: null, icon: null },
  { quantity: 2, discount: 0.20, label: "Buy 2", badge: "Most Popular", icon: Star },
  { quantity: 3, discount: 0.30, label: "Buy 3", badge: "Best Value", icon: Crown },
];

export const QuantityBreaks = ({ basePrice, onQuantityChange }: QuantityBreaksProps) => {
  const [selectedTier, setSelectedTier] = useState(0);

  const handleSelect = (index: number) => {
    setSelectedTier(index);
    const tier = tiers[index];
    const discountedPrice = basePrice * (1 - tier.discount);
    onQuantityChange(tier.quantity, discountedPrice);
  };

  // Calculate original price (assuming 10% discount is already applied to base)
  const originalPrice = basePrice / 0.9;

  return (
    <div className="space-y-2">
      <p className="text-xs font-body text-walnut/70 uppercase tracking-wide font-semibold">
        Bundle & Save
      </p>
      <div className="space-y-2">
        {tiers.map((tier, index) => {
          const discountedPrice = Math.round(basePrice * (1 - tier.discount + 0.10)); // Remove original 10% then apply tier
          const savingsPercent = Math.round(tier.discount * 100);
          const isSelected = selectedTier === index;
          const Icon = tier.icon;

          return (
            <button
              key={tier.quantity}
              onClick={() => handleSelect(index)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left",
                isSelected 
                  ? "border-accent bg-accent/5 shadow-md" 
                  : "border-border hover:border-accent/50 bg-card"
              )}
            >
              {/* Radio indicator */}
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                isSelected ? "border-accent bg-accent" : "border-muted-foreground/30"
              )}>
                {isSelected && <Check className="w-3 h-3 text-accent-foreground" />}
              </div>

              {/* Tier info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm text-walnut">{tier.label}</span>
                  {tier.badge && (
                    <span className={cn(
                      "inline-flex items-center gap-1 text-[10px] font-body font-semibold uppercase px-2 py-0.5 rounded-full",
                      index === 1 ? "bg-gold/20 text-gold" : "bg-accent/20 text-accent"
                    )}>
                      {Icon && <Icon className="w-3 h-3" />}
                      {tier.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-body">
                  Save {savingsPercent}%
                </p>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p className="font-display text-lg text-accent">R{discountedPrice}</p>
                <p className="text-xs text-muted-foreground line-through font-body">
                  R{Math.round(originalPrice)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
