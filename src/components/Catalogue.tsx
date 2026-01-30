import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  LiveViewers,
  StockCounter,
  CountdownTimer,
  PurchaseNotifications,
  StickyAddToCart,
} from "@/components/fomo";

// Configure sale end date (set this to your desired end date)
const SALE_END_DATE = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

const Catalogue = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem, isLoading: cartLoading } = useCartStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const addToCartButtonRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50 });
        if (!data?.data?.products?.edges) {
          setLoading(false);
          return;
        }

        // Filter out bundle products, keep only single headcovers
        const allProducts: ShopifyProduct[] = data.data.products.edges.filter(
          (product: ShopifyProduct) => {
            const title = product.node.title.toLowerCase();
            return !title.includes("bundle") && !title.includes("build your own");
          }
        );

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load catalogue");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [selectedProduct]);

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth < 640 ? 240 : 288; // w-60 or w-72
      container.scrollBy({
        left: direction === "left" ? -cardWidth - 16 : cardWidth + 16,
        behavior: "smooth",
      });
    }
  };

  const openProductGallery = (product: ShopifyProduct) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
  };

  // Touch handlers for swipe gestures on gallery
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!selectedProduct) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    const imageCount = selectedProduct.node.images.edges.length;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && selectedImageIndex < imageCount - 1) {
        // Swipe left - next image
        setSelectedImageIndex(prev => prev + 1);
      } else if (swipeDistance < 0 && selectedImageIndex > 0) {
        // Swipe right - previous image
        setSelectedImageIndex(prev => prev - 1);
      }
    }
  }, [selectedProduct, selectedImageIndex]);

  const isProductSoldOut = (product: ShopifyProduct): boolean => {
    const variant = product.node.variants.edges[0]?.node;
    return !variant?.availableForSale;
  };

  if (loading) {
    return (
      <section id="catalogue" className="py-12 sm:py-24 bg-cream">
        <div className="container">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-walnut" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="catalogue" className="py-12 sm:py-24 bg-cream">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-5xl text-walnut mb-4">
              Our Collection
            </h2>
            <p className="text-walnut/70 font-body">
              No products available yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const selectedVariant = selectedProduct?.node.variants.edges[0]?.node;
  const isSoldOut = selectedProduct ? isProductSoldOut(selectedProduct) : false;

  return (
    <section id="catalogue" className="py-12 sm:py-24 bg-cream">
      {/* Purchase notifications running in background */}
      <PurchaseNotifications productName="a Topped It headcover" enabled />

      <div className="container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-accent font-body text-xs sm:text-sm font-semibold tracking-widest uppercase">
            The Collection
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl mt-2 text-walnut">
            Shop All Styles
          </h2>
          <p className="text-walnut/70 mt-3 sm:mt-4 max-w-2xl mx-auto font-body text-sm sm:text-base">
            Browse our complete collection of premium golf headcovers.
          </p>
        </div>

        {/* Product Card Container */}
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-card">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="font-display text-xl sm:text-3xl text-walnut">Premium Headcovers</h3>
              <p className="text-walnut/60 font-body text-xs sm:text-sm">Tap to view gallery</p>
            </div>
            {/* Navigation - hidden on mobile, use swipe instead */}
            <div className="hidden sm:flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="rounded-full border-walnut/20 hover:bg-walnut/10 touch-target"
              >
                <ChevronLeft className="w-5 h-5 text-walnut" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="rounded-full border-walnut/20 hover:bg-walnut/10 touch-target"
              >
                <ChevronRight className="w-5 h-5 text-walnut" />
              </Button>
            </div>
          </div>

          {/* Horizontal Scrollable Product List - Mobile optimized */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth-touch pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {products.map((product) => {
              const price = product.node.priceRange.minVariantPrice;
              const productImage = product.node.images.edges[0]?.node;
              const productSoldOut = isProductSoldOut(product);

              return (
                <div
                  key={product.node.id}
                  onClick={() => openProductGallery(product)}
                  className="flex-shrink-0 w-60 sm:w-72 flex flex-col bg-cream/50 rounded-xl border border-border overflow-hidden cursor-pointer active:scale-[0.98] hover:shadow-lg hover:border-accent/30 transition-all duration-200 snap-start group"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-muted/20 overflow-hidden relative">
                    {productImage ? (
                      <img
                        src={productImage.url}
                        alt={productImage.altText || product.node.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-walnut/5">
                        <span className="text-walnut/30 font-display text-lg">No Image</span>
                      </div>
                    )}
                    {productSoldOut && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-display text-xl uppercase">Sold Out</span>
                      </div>
                    )}
                    {product.node.images.edges.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-walnut/80 text-cream text-xs px-2 py-1 rounded-full font-body">
                        +{product.node.images.edges.length - 1} photos
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h4 className="font-display text-base sm:text-lg text-walnut mb-1 line-clamp-1">
                      {product.node.title}
                    </h4>
                    <p className="text-walnut/60 font-body text-xs sm:text-sm line-clamp-2 flex-1">
                      {product.node.description}
                    </p>
                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      <p className="font-display text-xl sm:text-2xl text-accent">
                        R {parseFloat(price.amount).toFixed(0)}
                      </p>
                      <Button
                        variant="walnut"
                        size="sm"
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={productSoldOut || cartLoading}
                        className="touch-target text-xs sm:text-sm px-3 sm:px-4"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1 sm:mr-2" />
                        {productSoldOut ? "Sold" : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll hint for mobile */}
          <div className="flex sm:hidden justify-center mt-2 gap-1">
            <span className="text-walnut/40 text-xs font-body">← Swipe to browse →</span>
          </div>
        </div>
      </div>

      {/* Product Gallery Modal - Full screen on mobile */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl p-0 bg-card border-border overflow-hidden h-[100dvh] sm:h-auto sm:max-h-[90vh] flex flex-col sm:block rounded-none sm:rounded-lg">
          <DialogTitle className="sr-only">
            {selectedProduct?.node.title || "Product Gallery"}
          </DialogTitle>
          
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedProduct(null)}
            className="absolute top-2 right-2 z-50 sm:hidden bg-black/20 text-white hover:bg-black/40 rounded-full touch-target"
          >
            <X className="w-5 h-5" />
          </Button>

          {selectedProduct && (
            <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
              {/* Main Image - Touch swipeable */}
              <div 
                ref={imageContainerRef}
                className="flex-1 bg-muted/10 relative min-h-[50vh] sm:min-h-[500px] touch-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {selectedProduct.node.images.edges[selectedImageIndex]?.node ? (
                  <img
                    src={selectedProduct.node.images.edges[selectedImageIndex].node.url}
                    alt={selectedProduct.node.images.edges[selectedImageIndex].node.altText || selectedProduct.node.title}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-walnut/30 font-display">No Image</span>
                  </div>
                )}

                {isSoldOut && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-display text-2xl sm:text-3xl uppercase">Sold Out</span>
                  </div>
                )}

                {/* Image pagination dots for mobile */}
                {selectedProduct.node.images.edges.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
                    {selectedProduct.node.images.edges.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all touch-target ${
                          selectedImageIndex === index 
                            ? "bg-accent w-4" 
                            : "bg-white/60"
                        }`}
                        style={{ minWidth: selectedImageIndex === index ? '16px' : '8px', minHeight: '8px' }}
                      />
                    ))}
                  </div>
                )}

                {/* Desktop navigation arrows */}
                {selectedProduct.node.images.edges.length > 1 && (
                  <div className="hidden sm:block">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-cream/80 hover:bg-cream rounded-full"
                      onClick={() =>
                        setSelectedImageIndex((prev) =>
                          prev === 0 ? selectedProduct.node.images.edges.length - 1 : prev - 1
                        )
                      }
                    >
                      <ChevronLeft className="w-5 h-5 text-walnut" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-cream/80 hover:bg-cream rounded-full"
                      onClick={() =>
                        setSelectedImageIndex((prev) =>
                          prev === selectedProduct.node.images.edges.length - 1 ? 0 : prev + 1
                        )
                      }
                    >
                      <ChevronRight className="w-5 h-5 text-walnut" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Product Info Panel */}
              <div className="sm:w-96 p-4 sm:p-6 flex flex-col overflow-y-auto safe-bottom bg-card">
                {/* Live viewers - compact on mobile */}
                <div className="mb-2 sm:mb-3">
                  <LiveViewers productId={selectedProduct.node.id} />
                </div>

                <h3 className="font-display text-xl sm:text-2xl text-walnut mb-1 sm:mb-2">
                  {selectedProduct.node.title}
                </h3>
                <p className="text-walnut/70 font-body text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                  {selectedProduct.node.description}
                </p>

                {/* Stock counter */}
                <div className="mb-3 sm:mb-4">
                  <StockCounter 
                    productId={selectedProduct.node.id} 
                    availableForSale={selectedVariant?.availableForSale ?? false} 
                  />
                </div>

                {/* Thumbnail Gallery - horizontal scroll on mobile */}
                {selectedProduct.node.images.edges.length > 1 && (
                  <div className="hidden sm:flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    {selectedProduct.node.images.edges.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all touch-target ${
                          selectedImageIndex === index
                            ? "border-accent ring-2 ring-accent/20"
                            : "border-border hover:border-walnut/40"
                        }`}
                      >
                        <img
                          src={image.node.url}
                          alt={image.node.altText || `${selectedProduct.node.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Countdown Timer */}
                <div className="mb-3 sm:mb-4">
                  <CountdownTimer endDate={SALE_END_DATE} />
                </div>

                {/* Price and Add to Cart - sticky on mobile */}
                <div ref={addToCartButtonRef} className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border mt-auto">
                  <p className="font-display text-2xl sm:text-3xl text-accent">
                    R {parseFloat(selectedProduct.node.priceRange.minVariantPrice.amount).toFixed(0)}
                  </p>
                  <Button
                    variant="walnut"
                    size="lg"
                    onClick={(e) => {
                      handleAddToCart(selectedProduct, e);
                      setSelectedProduct(null);
                    }}
                    disabled={isSoldOut || cartLoading}
                    className="touch-target-lg text-sm sm:text-base"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {isSoldOut ? "Sold Out" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Sticky Add to Cart Bar */}
      {selectedProduct && (
        <StickyAddToCart
          product={selectedProduct}
          triggerRef={addToCartButtonRef as React.RefObject<HTMLElement>}
        />
      )}
    </section>
  );
};

export default Catalogue;
