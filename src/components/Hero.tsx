import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProduct = () => {
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center gradient-dark overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block text-gold font-body text-sm font-semibold tracking-widest uppercase mb-4">
              Limited Edition
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] mb-6">
              Vintage Jersey
              <span className="block text-gold">Headcovers</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto lg:mx-0 mb-8 font-body">
              Premium golf headcovers inspired by classic sports jerseys. 
              Protect your clubs in style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="gold" size="xl" onClick={scrollToProduct}>
                Shop Now
              </Button>
              <Button variant="goldOutline" size="xl" onClick={scrollToProduct}>
                View Collection
              </Button>
            </div>
            <p className="text-muted-foreground text-sm mt-6 font-body">
              From <span className="text-gold font-semibold">R480</span> • Free shipping over R500
            </p>
          </div>

          {/* Hero Image Placeholder */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-forest to-primary flex items-center justify-center shadow-elevated">
                <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-card border-2 border-border flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">⛳</div>
                    <p className="text-muted-foreground text-sm font-body">
                      Product Image
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gold animate-pulse" />
              <div className="absolute -bottom-2 -left-6 w-6 h-6 rounded-full bg-forest-light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
