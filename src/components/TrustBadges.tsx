import { Truck, ShieldCheck, RotateCcw, Package } from "lucide-react";

const badges = [
  {
    icon: Package,
    title: "Shipped from SA",
    description: "No customs drama to add to your bogeys",
  },
  {
    icon: Truck,
    title: "3-5 Day Delivery",
    description: "Faster than finding your ball in the rough",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Easier than fixing your slice",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Safer than your course management",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-12 sm:py-16 bg-muted border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center mb-4">
                <badge.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl mb-1 text-foreground">{badge.title}</h3>
              <p className="text-muted-foreground font-body text-sm">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
