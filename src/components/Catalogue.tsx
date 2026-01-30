import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

// Local product images by style
import eggplantMonster1 from "@/assets/eggplant-monster-1.png";
import eggplantMonster2 from "@/assets/eggplant-monster-2.png";
import eggplantMonster3 from "@/assets/eggplant-monster-3.png";
import bomb1 from "@/assets/bomb-1.png";
import bomb2 from "@/assets/bomb-2.png";
import bomb3 from "@/assets/bomb-3.png";
import bomb4 from "@/assets/bomb-4.png";

const LOCAL_STYLE_IMAGES: Record<string, { src: string; alt: string }[]> = {
  "eggplant-monster": [
    { src: eggplantMonster1, alt: "Eggplant Monster headcover on golf cart" },
    { src: eggplantMonster2, alt: "Eggplant Monster headcover set" },
    { src: eggplantMonster3, alt: "Eggplant Monster headcover closeup" },
  ],
  "bomb": [
    { src: bomb1, alt: "BOMB headcover set at doorway" },
    { src: bomb2, alt: "BOMB headcover collection" },
    { src: bomb3, alt: "BOMB headcover at car trunk" },
    { src: bomb4, alt: "BOMB headcover with golf bag" },
  ],
};

interface HeadcoverStyle {
  id: string;
  name: string;
  subtitle: string;
  products: ShopifyProduct[];
  images: { id: number; src: string; alt: string }[];
}

const Catalogue = () => {
  const [styles, setStyles] = useState<HeadcoverStyle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState<Record<string, number>>({});
  const { addItem, isLoading: cartLoading } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50 });
        if (!data?.data?.products?.edges) {
          setLoading(false);
          return;
        }

        const products: ShopifyProduct[] = data.data.products.edges;
        
        // Group products by style (based on title patterns)
        const styleGroups: Record<string, ShopifyProduct[]> = {};
        
        products.forEach((product) => {
          const title = product.node.title.toLowerCase();
          let styleName = "Other";
          
          if (title.includes("gilmore")) {
            styleName = "Gilmore 18";
          } else if (title.includes("lucky") || title.includes("clover")) {
            styleName = "100% Lucky";
          } else if (title.includes("eggplant") || title.includes("monster")) {
            styleName = "Eggplant Monster";
          } else if (title.includes("bomb")) {
            styleName = "BOMB";
          } else if (title.includes("lily") || title.includes("floral")) {
            styleName = "Lily Floral";
          } else if (title.includes("hibiscus") || title.includes("hello golf")) {
            styleName = "Hello Golf Hibiscus";
          } else if (title.includes("bundle") || title.includes("build your own")) {
            return; // Skip bundle products in catalogue
          }
          
          if (!styleGroups[styleName]) {
            styleGroups[styleName] = [];
          }
          styleGroups[styleName].push(product);
        });

        // Convert to HeadcoverStyle array
        const stylesArray: HeadcoverStyle[] = Object.entries(styleGroups).map(([name, prods]) => {
          const styleId = name.toLowerCase().replace(/\s+/g, "-");
          
          // Use local images if available, otherwise use Shopify images
          const localImages = LOCAL_STYLE_IMAGES[styleId];
          let allImages: { id: number; src: string; alt: string }[] = [];
          
          if (localImages && localImages.length > 0) {
            allImages = localImages.map((img, index) => ({
              id: index + 1,
              src: img.src,
              alt: img.alt,
            }));
          } else {
            let imageId = 1;
            prods.forEach((product) => {
              product.node.images.edges.forEach((img) => {
                allImages.push({
                  id: imageId++,
                  src: img.node.url,
                  alt: img.node.altText || product.node.title,
                });
              });
            });
          }

          const subtitles: Record<string, string> = {
            "Gilmore 18": "Black & Gold • Jersey Style",
            "100% Lucky": "White & Green • Shamrock Style",
            "Eggplant Monster": "Purple Fuzzy • Character Style",
            "BOMB": "White & Red • Explosion Style",
            "Lily Floral": "White • Embroidered Flowers",
            "Hello Golf Hibiscus": "Pink Quilted • Tropical Style",
          };

          return {
            id: styleId,
            name,
            subtitle: subtitles[name] || "Premium Headcovers",
            products: prods,
            images: allImages,
          };
        });

        setStyles(stylesArray);
        
        // Initialize selected images
        const initialSelected: Record<string, number> = {};
        stylesArray.forEach((style) => {
          initialSelected[style.id] = 0;
        });
        setSelectedImages(initialSelected);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load catalogue");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
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

  if (styles.length === 0) {
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

  return (
    <section id="catalogue" className="py-16 sm:py-24 bg-cream">
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

        <div className="grid gap-8">
          {styles.map((style) => (
            <div key={style.id} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
              <div className="text-center mb-8">
                <h3 className="font-display text-3xl sm:text-4xl text-walnut">{style.name}</h3>
                <p className="text-walnut/60 font-body">{style.subtitle}</p>
              </div>

              {/* Style images gallery - only show if we have local images */}
              {style.images.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {style.images.slice(0, 4).map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImages((prev) => ({ ...prev, [style.id]: index }))}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImages[style.id] === index
                            ? "border-accent shadow-gold ring-2 ring-accent/20"
                            : "border-border hover:border-walnut/40"
                        }`}
                      >
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {style.products.map((product) => {
                  const price = product.node.priceRange.minVariantPrice;
                  const variant = product.node.variants.edges[0]?.node;
                  const productImage = product.node.images.edges[0]?.node;

                  return (
                    <div
                      key={product.node.id}
                      className="flex flex-col bg-cream/50 rounded-xl border border-border overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="aspect-square bg-muted/20 overflow-hidden">
                        {productImage ? (
                          <img
                            src={productImage.url}
                            alt={productImage.altText || product.node.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-walnut/5">
                            <span className="text-walnut/30 font-display text-lg">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-display text-lg text-walnut mb-1">{product.node.title}</h4>
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
                            onClick={() => handleAddToCart(product)}
                            disabled={!variant?.availableForSale || cartLoading}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
