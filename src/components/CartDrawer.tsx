import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { FreeShippingProgress } from "@/components/fomo/FreeShippingProgress";
import { CartUpsells } from "@/components/cart/CartUpsells";
import { PaymentIcons } from "@/components/cart/PaymentIcons";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="goldOutline" size="icon" className="relative touch-target">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs gradient-gold text-accent-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-[100dvh] bg-card border-border p-0">
        <SheetHeader className="flex-shrink-0 p-4 sm:p-6 pb-0">
          <SheetTitle className="font-display text-xl sm:text-2xl">Shopping Cart</SheetTitle>
          <SheetDescription className="font-body text-sm">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-4 sm:pt-6 min-h-0 overflow-hidden">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-body">Your cart is empty</p>
                <p className="text-muted-foreground/70 font-body text-sm mt-2">
                  Browse our collection and add your favorites
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress Bar */}
              <div className="px-4 sm:px-6">
                <FreeShippingProgress currentTotal={totalPrice} threshold={500} />
              </div>

              <div className="flex-1 overflow-y-auto px-4 sm:px-6 min-h-0 scroll-smooth-touch">
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-3 sm:gap-4 p-3 bg-muted/30 rounded-xl">
                      {/* Product Image */}
                      <div className="w-20 h-20 sm:w-16 sm:h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img 
                            src={item.product.node.images.edges[0].node.url} 
                            alt={item.product.node.title} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display text-sm sm:text-base truncate">{item.product.node.title}</h4>
                          <p className="text-xs text-muted-foreground font-body line-clamp-1">
                            {item.selectedOptions.map(option => option.value).join(' • ')}
                          </p>
                        </div>
                        <p className="font-semibold text-gold font-body text-base sm:text-lg">
                          R {parseFloat(item.price.amount).toFixed(0)}
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-col items-end justify-between flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive touch-target" 
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        {/* Quantity controls - larger on mobile */}
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 sm:h-7 sm:w-7 touch-target" 
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-body font-medium">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 sm:h-7 sm:w-7 touch-target" 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Upsells */}
              <CartUpsells cartItems={items} />
              
              {/* Checkout section - sticky at bottom with safe area */}
              <div className="flex-shrink-0 p-4 sm:p-6 pt-4 border-t border-border bg-card safe-bottom">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base sm:text-lg font-display">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-gold font-display">R {totalPrice.toFixed(0)}</span>
                </div>
                <Button 
                  onClick={handleCheckout} 
                  variant="gold" 
                  className="w-full touch-target-lg text-base" 
                  size="lg" 
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Checkout • R {totalPrice.toFixed(0)}
                    </>
                  )}
                </Button>
                
                {/* Payment Icons */}
                <PaymentIcons />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
