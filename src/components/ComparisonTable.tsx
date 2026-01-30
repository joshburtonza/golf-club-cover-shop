import { Check, X } from "lucide-react";

const comparisons = [
  { benefit: "Premium synthetic leather", us: true, others: true },
  { benefit: "Magnetic closure", us: true, others: false },
  { benefit: "Under R500 for a single", us: true, others: false },
  { benefit: "Ships in 3-5 days across SA", us: true, others: false },
  { benefit: "30-day returns, no questions", us: true, others: false },
  { benefit: "Sense of humor included", us: true, others: false },
];

const ComparisonTable = () => {
  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">
              The Comparison
            </span>
            <h2 className="font-display text-4xl sm:text-5xl mt-2">
              Why Choose Us Over Pro Shop Prices?
            </h2>
            <p className="text-muted-foreground font-body mt-4">
              Topped It brings SA golfers premium headcovers without the pro shop markup.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted border-b border-border">
              <div className="font-display text-lg">Feature</div>
              <div className="font-display text-lg text-center text-gold">Topped It</div>
              <div className="font-display text-lg text-center text-muted-foreground">Pro Shops</div>
            </div>

            {/* Rows */}
            {comparisons.map((item, index) => (
              <div 
                key={item.benefit}
                className={`grid grid-cols-3 gap-4 p-4 ${
                  index !== comparisons.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="font-body text-sm sm:text-base">{item.benefit}</div>
                <div className="flex justify-center">
                  {item.us ? (
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-gold" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {item.others ? (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <Check className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
