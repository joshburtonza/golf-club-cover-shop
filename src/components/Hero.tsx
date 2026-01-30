import { Button } from "@/components/ui/button";
import gilmoreSingle from "@/assets/gilmore-single.png";

const Hero = () => {
  const scrollToCatalogue = () => {
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center gradient-warm overflow-hidden py-8 sm:py-0 pt-16 sm:pt-20">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235c4033' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block text-accent font-body text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4">
              For Every Golfer Who's Topped One
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] mb-4 sm:mb-6 text-foreground">
              TOPPED IT
              <span className="block text-walnut text-2xl sm:text-4xl lg:text-5xl mt-1 sm:mt-2">
                Headcovers for the Rest of Us
              </span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-xl max-w-md mx-auto lg:mx-0 mb-6 sm:mb-8 font-body">
              We can't fix your swing. But we CAN make sure your clubs look better than your handicap.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button variant="walnut" size="xl" onClick={scrollToCatalogue} className="w-full sm:w-auto touch-target-lg">
                Save Your Dignity
              </Button>
              <Button variant="goldOutline" size="xl" onClick={scrollToCatalogue} className="w-full sm:w-auto touch-target-lg">
                View Collection
              </Button>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm mt-5 sm:mt-6 font-body">
              From <span className="text-accent font-semibold">R375</span> • Free shipping over R500
            </p>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-elevated bg-card">
                <img 
                  src={gilmoreSingle} 
                  alt="Gilmore 18 Premium Golf Headcover" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Decorative elements - smaller on mobile */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent animate-pulse" />
              <div className="absolute -bottom-1 -left-3 sm:-bottom-2 sm:-left-6 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-walnut-light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
