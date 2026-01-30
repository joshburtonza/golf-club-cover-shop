import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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

    toast.success(`${product.node.title} added to cart!`);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const openProductGallery = (product: ShopifyProduct) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
  };

  // Stock is now simulated in StockCounter component based on product ID
  const isProductSoldOut = (product: ShopifyProduct): boolean => {
    const variant = product.node.variants.edges[0]?.node;
    return !variant?.availableForSale;
  };

  if (loading) {
    return (
      <section id="catalogue" className="py-16 sm:py-24 bg-cream">
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
      <section id="catalogue" className="py-16 sm:py-24 bg-cream">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-4xl sm:text-5xl text-walnut mb-4">
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
    <section id="catalogue" className="py-16 sm:py-24 bg-cream">
      {/* Purchase notifications running in background */}
      <PurchaseNotifications productName="a Topped It headcover" enabled />

      <div className="container">
        <div className="text-center mb-12">
          <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase">
            The Collection
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2 text-walnut">
            Shop All Styles
          </h2>
          <p className="text-walnut/70 mt-4 max-w-2xl mx-auto font-body">
            Browse our complete collection of premium golf headcovers. Each style crafted with personality and protection in mind.
          </p>
        </div>

        {/* Single Product Card Container */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-walnut">Premium Headcovers</h3>
              <p className="text-walnut/60 font-body text-sm">Click any product to view gallery</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="rounded-full border-walnut/20 hover:bg-walnut/10"
              >
                <ChevronLeft className="w-5 h-5 text-walnut" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="rounded-full border-walnut/20 hover:bg-walnut/10"
              >
                <ChevronRight className="w-5 h-5 text-walnut" />
              </Button>
            </div>
          </div>

          {/* Horizontal Scrollable Product List */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => {
              const price = product.node.priceRange.minVariantPrice;
              const variant = product.node.variants.edges[0]?.node;
              const productImage = product.node.images.edges[0]?.node;
              const productSoldOut = isProductSoldOut(product);

              return (
                <div
                  key={product.node.id}
                  onClick={() => openProductGallery(product)}
                  className="flex-shrink-0 w-64 sm:w-72 flex flex-col bg-cream/50 rounded-xl border border-border overflow-hidden cursor-pointer hover:shadow-lg hover:border-accent/30 transition-all duration-300 snap-start group"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-muted/20 overflow-hidden relative">
                    {productImage ? (
                      <img
                        src={productImage.url}
                        alt={productImage.altText || product.node.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-walnut/5">
                        <span className="text-walnut/30 font-display text-lg">No Image</span>
                      </div>
                    )}
                    {/* Sold out overlay */}
                    {productSoldOut && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-display text-xl uppercase">Sold Out</span>
                      </div>
                    )}
                    {/* Image count badge */}
                    {product.node.images.edges.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-walnut/80 text-cream text-xs px-2 py-1 rounded-full font-body">
                        +{product.node.images.edges.length - 1} photos
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-display text-lg text-walnut mb-1 line-clamp-1">
                      {product.node.title}
                    </h4>
                    <p className="text-walnut/60 font-body text-sm line-clamp-2 flex-1">
                      {product.node.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="font-display text-2xl text-accent">
                        R {parseFloat(price.amount).toFixed(0)}
                      </p>
                      <Button
                        variant="walnut"
                        size="sm"
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={productSoldOut || cartLoading}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {productSoldOut ? "Sold Out" : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Gallery Modal with FOMO Features */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl p-0 bg-card border-border overflow-hidden max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">
            {selectedProduct?.node.title || "Product Gallery"}
          </DialogTitle>
          {selectedProduct && (
            <div className="flex flex-col lg:flex-row">
              {/* Main Image */}
              <div className="flex-1 bg-muted/10 aspect-square lg:aspect-auto lg:min-h-[500px] relative">
                {selectedProduct.node.images.edges[selectedImageIndex]?.node ? (
                  <img
                    src={selectedProduct.node.images.edges[selectedImageIndex].node.url}
                    alt={selectedProduct.node.images.edges[selectedImageIndex].node.altText || selectedProduct.node.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-walnut/30 font-display">No Image</span>
                  </div>
                )}

                {/* Sold out overlay */}
                {isSoldOut && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-display text-3xl uppercase">Sold Out</span>
                  </div>
                )}

                {/* Navigation arrows */}
                {selectedProduct.node.images.edges.length > 1 && (
                  <>
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
                  </>
                )}
              </div>

              {/* Product Info Panel */}
              <div className="lg:w-96 p-6 flex flex-col">
                {/* Live viewers */}
                <div className="mb-3">
                  <LiveViewers productId={selectedProduct.node.id} />
                </div>

                <h3 className="font-display text-2xl text-walnut mb-2">
                  {selectedProduct.node.title}
                </h3>
                <p className="text-walnut/70 font-body text-sm mb-4">
                  {selectedProduct.node.description}
                </p>

                {/* Stock counter */}
                <div className="mb-4">
                  <StockCounter 
                    productId={selectedProduct.node.id} 
                    availableForSale={selectedVariant?.availableForSale ?? false} 
                  />
                </div>

                {/* Thumbnail Gallery */}
                {selectedProduct.node.images.edges.length > 1 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {selectedProduct.node.images.edges.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
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
                <div className="mb-4">
                  <CountdownTimer endDate={SALE_END_DATE} />
                </div>

                <div ref={addToCartButtonRef} className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="font-display text-3xl text-accent">
                    R {parseFloat(selectedProduct.node.priceRange.minVariantPrice.amount).toFixed(0)}
                  </p>
                  <Button
                    variant="walnut"
                    onClick={(e) => {
                      handleAddToCart(selectedProduct, e);
                      setSelectedProduct(null);
                    }}
                    disabled={isSoldOut || cartLoading}
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
