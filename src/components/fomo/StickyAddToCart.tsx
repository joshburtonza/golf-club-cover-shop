import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface StickyAddToCartProps {
  product: ShopifyProduct;
  triggerRef: React.RefObject<HTMLElement>;
}

export const StickyAddToCart = ({ product, triggerRef }: StickyAddToCartProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem, isLoading } = useCartStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when trigger element is NOT visible (scrolled past)
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerRef]);

  const handleAddToCart = () => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) {
      toast.error("Product not available");
      return;
    }

    addItem({
      variantId: variant.id,
      variantTitle: variant.title,
      quantity: 1,
      product,
      selectedOptions: variant.selectedOptions,
      price: variant.price,
    });

    toast.success(`${product.node.title} added to cart!`, {
      position: "top-center",
    });
  };

  const variant = product.node.variants.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const productImage = product.node.images.edges[0]?.node;
  const isSoldOut = !variant?.availableForSale;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 transform transition-transform duration-300 safe-bottom ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {productImage && (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-muted/20 flex-shrink-0">
                <img
                  src={productImage.url}
                  alt={product.node.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-display text-sm sm:text-base text-walnut truncate">
                {product.node.title}
              </h4>
              <p className="font-display text-lg sm:text-xl text-accent">
                R {parseFloat(price.amount).toFixed(0)}
              </p>
            </div>
          </div>
          <Button
            variant="walnut"
            size="lg"
            onClick={handleAddToCart}
            disabled={isSoldOut || isLoading}
            className="flex-shrink-0 touch-target-lg text-sm sm:text-base px-3 sm:px-6"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSoldOut ? (
              "Sold Out"
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-1 sm:mr-2" />
                <span>Add</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};