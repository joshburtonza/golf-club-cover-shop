import { Check, X } from "lucide-react";

const comparisons: { benefit: string; us: boolean; others: boolean | string }[] = [
  { benefit: "Premium synthetic leather", us: true, others: true },
  { benefit: "Magnetic closure", us: true, others: "Sometimes" },
  { benefit: "Under R500 for a single", us: true, others: "LOL no" },
  { benefit: "Ships in 3-5 days", us: true, others: "In-store only" },
  { benefit: "30-day returns, no questions", us: true, others: "Usually 7 days" },
  { benefit: "Sense of humor included", us: true, others: "Definitely not" },
];

const ComparisonTable = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase">
              The Comparison
            </span>
            <h2 className="font-display text-4xl sm:text-5xl mt-2 text-foreground">
              Why Choose Us Over the Pro Shop?
            </h2>
            <p className="text-muted-foreground font-body mt-4">
              Topped It brings SA golfers premium headcovers without the markup that makes you wince more than your slice.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary border-b border-border">
              <div className="font-display text-lg text-foreground">Feature</div>
              <div className="font-display text-lg text-center text-accent">Topped It</div>
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
                <div className="font-body text-sm sm:text-base text-foreground">{item.benefit}</div>
                <div className="flex justify-center">
                  {item.us ? (
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {item.others === true ? (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <Check className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ) : typeof item.others === 'string' ? (
                    <span className="text-xs sm:text-sm text-muted-foreground font-body italic">{item.others}</span>
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
