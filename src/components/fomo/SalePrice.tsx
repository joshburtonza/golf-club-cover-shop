import { getOriginalPrice, formatPrice, getDiscountPercentage } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";

interface SalePriceProps {
  salePrice: number;
  size?: "sm" | "md" | "lg" | "xl";
  showBadge?: boolean;
  className?: string;
}

export const SalePrice = ({ 
  salePrice, 
  size = "md", 
  showBadge = true,
  className = "" 
}: SalePriceProps) => {
  const originalPrice = getOriginalPrice(salePrice);
  
  const sizeClasses = {
    sm: {
      sale: "text-lg sm:text-xl",
      original: "text-xs sm:text-sm",
      badge: "text-[10px]"
    },
    md: {
      sale: "text-xl sm:text-2xl",
      original: "text-sm",
      badge: "text-xs"
    },
    lg: {
      sale: "text-2xl sm:text-3xl",
      original: "text-sm sm:text-base",
      badge: "text-xs"
    },
    xl: {
      sale: "text-4xl sm:text-5xl lg:text-6xl",
      original: "text-base sm:text-lg",
      badge: "text-xs sm:text-sm"
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`font-display ${classes.sale} text-accent`}>
          {formatPrice(salePrice)}
        </span>
        <span className={`font-body ${classes.original} text-muted-foreground line-through`}>
          {formatPrice(originalPrice)}
        </span>
        {showBadge && (
          <Badge variant="destructive" className={`${classes.badge} bg-red-500 hover:bg-red-500`}>
            -{getDiscountPercentage()}
          </Badge>
        )}
      </div>
    </div>
  );
};
