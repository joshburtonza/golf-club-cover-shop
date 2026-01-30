import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <section className="py-16 sm:py-24 gradient-dark">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">
            Choose Your Pack
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2">
            Simple Pricing
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Single Cover */}
          <div className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card">
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl sm:text-3xl mb-2">Single Cover</h3>
              <p className="text-muted-foreground font-body text-sm">
                Perfect for trying out
              </p>
            </div>

            <div className="text-center mb-6">
              <span className="font-display text-5xl sm:text-6xl text-foreground">R480</span>
              <span className="text-muted-foreground font-body ml-2">each</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 font-body">
                <Check className="w-5 h-5 text-gold flex-shrink-0" />
                <span>1 x Driver Headcover</span>
              </li>
              <li className="flex items-center gap-3 font-body">
                <Check className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Choice of number (1, 3, or 5)</span>
              </li>
              <li className="flex items-center gap-3 font-body">
                <Check className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Premium packaging</span>
              </li>
            </ul>

            {/* Shopify Buy Button Placeholder */}
            <div id="shopify-buy-button-single" className="bg-muted rounded-lg p-4 text-center border-2 border-dashed border-border">
              <Button variant="dark" size="lg" className="w-full">
                Add to Cart — R480
              </Button>
              <p className="text-muted-foreground text-xs mt-2 font-body">
                Shopify Buy Button will appear here
              </p>
            </div>
          </div>

          {/* 3-Pack - Featured */}
          <div className="rounded-xl bg-card border-2 border-gold p-6 sm:p-8 shadow-elevated relative">
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="gradient-gold text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                Save R660
              </span>
            </div>

            <div className="text-center mb-6 pt-2">
              <h3 className="font-display text-2xl sm:text-3xl mb-2">3-Pack Bundle</h3>
              <p className="text-muted-foreground font-body text-sm">
                Complete your set
              </p>
            </div>

            <div className="text-center mb-6">
              <span className="font-display text-5xl sm:text-6xl text-gold">R780</span>
              <span className="text-muted-foreground font-body ml-2">
                <s>R1,440</s>
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 font-body">
                <Check className="w-5 h-5 text-gold flex-shrink-0" />
                <span>3 x Driver Headcovers</span>
              </li>
              <li className="flex items-center gap-3 font-body">
                <Check className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Numbers 1, 3 & 5 included</span>
              </li>
              <li className="flex items-center gap-3 font-body">
                <Check className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Premium gift box packaging</span>
              </li>
              <li className="flex items-center gap-3 font-body">
                <Check className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-gold font-semibold">FREE shipping included</span>
              </li>
            </ul>

            {/* Shopify Buy Button Placeholder */}
            <div id="shopify-buy-button" className="bg-muted rounded-lg p-4 text-center border-2 border-dashed border-gold/30">
              <Button variant="gold" size="lg" className="w-full">
                Add to Cart — R780
              </Button>
              <p className="text-muted-foreground text-xs mt-2 font-body">
                Shopify Buy Button will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
