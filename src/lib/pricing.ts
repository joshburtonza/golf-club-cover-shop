// Sale Configuration
export const SALE_DISCOUNT = 0.45; // 45% off

// Calculate original price from sale price (reverse the discount)
export const getOriginalPrice = (salePrice: number): number => {
  return salePrice / (1 - SALE_DISCOUNT);
};

// Format price for display
export const formatPrice = (price: number): string => {
  return `R ${Math.round(price)}`;
};

// Get discount percentage as string
export const getDiscountPercentage = (): string => {
  return `${Math.round(SALE_DISCOUNT * 100)}%`;
};
