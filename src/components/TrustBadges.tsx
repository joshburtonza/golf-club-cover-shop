import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over R500",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "100% protected payments",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Easy hassle-free returns",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-12 sm:py-16 bg-secondary border-y border-border">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center mb-4">
                <badge.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-xl mb-1">{badge.title}</h3>
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
