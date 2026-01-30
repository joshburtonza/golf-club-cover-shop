import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";

interface CartUpsellsProps {
  cartItems: CartItem[];
}

export const CartUpsells = ({ cartItems }: CartUpsellsProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 10 });
        if (!data?.data?.products?.edges) {
          setLoading(false);
          return;
        }

        const allProducts: ShopifyProduct[] = data.data.products.edges.filter(
          (product: ShopifyProduct) => {
            const title = product.node.title.toLowerCase();
            return !title.includes("bundle") && !title.includes("build your own");
          }
        );

        // Filter out products already in cart
        const cartVariantIds = cartItems.map(item => item.variantId);
        const upsellProducts = allProducts.filter(product => {
          const variantId = product.node.variants.edges[0]?.node.id;
          return !cartVariantIds.includes(variantId);
        });

        setProducts(upsellProducts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching upsell products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const handleQuickAdd = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    setAddingId(product.node.id);
    try {
      await addItem({
        variantId: variant.id,
        variantTitle: variant.title,
        quantity: 1,
        product,
        selectedOptions: variant.selectedOptions,
        price: variant.price,
      });
      toast.success(`${product.node.title} added!`, { position: "top-center" });
    } finally {
      setAddingId(null);
    }
  };

  if (loading || products.length === 0) return null;

  return (
    <div className="px-4 sm:px-6 pb-4">
      <h4 className="font-display text-sm text-walnut mb-3">You might also like</h4>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth-touch pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {products.map((product) => {
          const price = product.node.priceRange.minVariantPrice;
          const image = product.node.images.edges[0]?.node;
          const isAdding = addingId === product.node.id;

          return (
            <div 
              key={product.node.id}
              className="flex-shrink-0 w-32 sm:w-36 bg-muted/30 rounded-lg overflow-hidden border border-border"
            >
              <div className="aspect-square bg-muted/20 overflow-hidden">
                {image ? (
                  <img 
                    src={image.url} 
                    alt={product.node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-walnut/5">
                    <span className="text-walnut/30 text-xs">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-2">
                <h5 className="font-display text-xs text-walnut truncate">{product.node.title}</h5>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-display text-sm text-accent">
                    R{parseFloat(price.amount).toFixed(0)}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={() => handleQuickAdd(product)}
                    disabled={isAdding}
                  >
                    {isAdding ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
