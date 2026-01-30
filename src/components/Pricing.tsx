import { Button } from "@/components/ui/button";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const Pricing = () => {
  const { addItem, isLoading: cartLoading } = useCartStore();

  const { data: products, isLoading } = useQuery({
    queryKey: ['shopify-products'],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 10 });
      return (data?.data?.products?.edges || []) as ShopifyProduct[];
    },
  });

  const handleAddToCart = async (product: ShopifyProduct, variant: ShopifyProduct['node']['variants']['edges'][0]['node']) => {
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.node.title} added to cart!`, {
      position: "top-center",
    });
  };

  // No products - show setup message
  if (!isLoading && (!products || products.length === 0)) {
    return (
      <section id="pricing" className="py-16 sm:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase">
              Pick Your Poison
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2 text-foreground">
              Simple Pricing
            </h2>
          </div>

          <div className="max-w-xl mx-auto text-center bg-secondary border border-border rounded-xl p-8">
            <AlertCircle className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-display text-2xl mb-3 text-foreground">No Products Yet</h3>
            <p className="text-muted-foreground font-body mb-6">
              Your store is connected but there's nothing to sell yet. 
              Time to stock those shelves!
            </p>
            <p className="text-sm text-muted-foreground font-body">
              Tell me to create: "The Mulligan for R400 and The Scramble 3-pack for R700"
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase">
            Pick Your Poison
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2 text-foreground">
            Simple Pricing
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse space-y-4">
              <div className="h-64 w-80 bg-muted rounded-xl"></div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {products?.map((product) => {
              const variant = product.node.variants.edges[0]?.node;
              const price = variant?.price;
              const isBundle = product.node.title.toLowerCase().includes('pack') || 
                              product.node.title.toLowerCase().includes('bundle') ||
                              product.node.title.toLowerCase().includes('scramble');
              const isBuildYourOwn = product.node.title.toLowerCase().includes('build your own');
              
              return (
                <div 
                  key={product.node.id}
                  className={`rounded-xl bg-background p-6 sm:p-8 shadow-card relative ${
                    isBundle || isBuildYourOwn ? 'border-2 border-accent shadow-elevated' : 'border border-border'
                  }`}
                >
                  {isBundle && !isBuildYourOwn && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="gradient-gold text-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                        Save R500
                      </span>
                    </div>
                  )}

                  {isBuildYourOwn && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-walnut text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                        Customise
                      </span>
                    </div>
                  )}

                  <div className={`text-center mb-6 ${isBundle || isBuildYourOwn ? 'pt-2' : ''}`}>
                    <h3 className="font-display text-2xl sm:text-3xl mb-2 text-foreground">{product.node.title}</h3>
                    {product.node.description && (
                      <p className="text-muted-foreground font-body text-sm line-clamp-2">
                        {product.node.description}
                      </p>
                    )}
                  </div>

                  {product.node.images.edges[0] && (
                    <div className="mb-6 rounded-lg overflow-hidden bg-muted aspect-square">
                      <img 
                        src={product.node.images.edges[0].node.url} 
                        alt={product.node.images.edges[0].node.altText || product.node.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <span className={`font-display text-5xl sm:text-6xl ${isBundle || isBuildYourOwn ? 'text-accent' : 'text-foreground'}`}>
                      R {parseFloat(price?.amount || '0').toFixed(0)}
                    </span>
                    {isBuildYourOwn && (
                      <p className="text-muted-foreground font-body text-sm mt-2">
                        Starting price • Build your perfect set
                      </p>
                    )}
                    {isBundle && !isBuildYourOwn && (
                      <p className="text-muted-foreground font-body text-sm mt-2">
                        vs R1,200 buying separately
                      </p>
                    )}
                  </div>

                  <Button 
                    variant={isBundle || isBuildYourOwn ? "gold" : "walnutOutline"} 
                    size="lg" 
                    className="w-full"
                    onClick={() => variant && handleAddToCart(product, variant)}
                    disabled={!variant?.availableForSale || cartLoading}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart — R {parseFloat(price?.amount || '0').toFixed(0)}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
