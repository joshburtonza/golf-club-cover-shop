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

    toast.success(`${product.node.title} added to cart!`);
  };

  const variant = product.node.variants.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const productImage = product.node.images.edges[0]?.node;
  const isSoldOut = variant?.quantityAvailable === 0 || !variant?.availableForSale;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 transform transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {productImage && (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/20 flex-shrink-0">
                <img
                  src={productImage.url}
                  alt={product.node.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="hidden sm:block">
              <h4 className="font-display text-sm text-walnut line-clamp-1">
                {product.node.title}
              </h4>
              <p className="font-display text-lg text-accent">
                R {parseFloat(price.amount).toFixed(0)}
              </p>
            </div>
            <p className="font-display text-xl text-accent sm:hidden">
              R {parseFloat(price.amount).toFixed(0)}
            </p>
          </div>
          <Button
            variant="walnut"
            size="lg"
            onClick={handleAddToCart}
            disabled={isSoldOut || isLoading}
            className="flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSoldOut ? (
              "Sold Out"
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
