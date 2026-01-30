import { useState } from "react";

const images = [
  { id: 1, alt: "The Mulligan - Driver headcover front view" },
  { id: 2, alt: "Premium synthetic leather detail" },
  { id: 3, alt: "The Scramble - 3-pack collection" },
  { id: 4, alt: "Magnetic closure close-up" },
];

const features = [
  {
    title: "Fits drivers up to 460cc",
    description: "Unlike that slice that fit perfectly into the car park",
  },
  {
    title: "Premium synthetic leather",
    description: "Softer than your playing partners' heckling",
  },
  {
    title: "Fleece interior lining",
    description: "Protects your club like you protect your ego",
  },
  {
    title: "Magnetic closure",
    description: "Stays on better than your tempo",
  },
  {
    title: "Numbered designs (1, 3, 5)",
    description: "So you know which club to blame",
  },
];

const ProductGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section id="product" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-gold font-body text-sm font-semibold tracking-widest uppercase">
            The Collection
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2">
            What You Get
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Main Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg bg-card border border-border shadow-card overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-card">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🏌️</div>
                  <p className="text-muted-foreground font-body">
                    {images[selectedImage].alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md bg-card border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-gold shadow-gold"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    {index === 0 && "🎯"}
                    {index === 1 && "✨"}
                    {index === 2 && "📦"}
                    {index === 3 && "🧲"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl mb-2">
                The Mulligan - Premium Headcover
              </h3>
              <p className="text-muted-foreground font-body text-lg">
                We can't fix your swing. But we CAN make your clubs look better than your handicap.
              </p>
            </div>

            <div className="space-y-4 py-6 border-y border-border">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                  <div>
                    <span className="font-body font-medium">{feature.title}</span>
                    <span className="text-muted-foreground font-body"> — {feature.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-gold/30 rounded-lg p-4">
              <p className="text-gold font-body text-sm font-semibold mb-1">
                "Finally, something in my golf bag that doesn't embarrass me."
              </p>
              <p className="text-muted-foreground font-body text-xs">
                — Thabo M., Johannesburg
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
