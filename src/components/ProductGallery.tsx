import { useState } from "react";
import gilmoreSingle from "@/assets/gilmore-single.png";
import gilmoreSetGrass from "@/assets/gilmore-set-grass.png";
import gilmoreSetCar from "@/assets/gilmore-set-car.png";
import luckySetGrass from "@/assets/lucky-set-grass.png";
import luckySetBag from "@/assets/lucky-set-bag.png";
import luckySetDoor from "@/assets/lucky-set-door.png";

const gilmoreImages = [
  { id: 1, src: gilmoreSingle, alt: "Gilmore 18 - Premium driver headcover" },
  { id: 2, src: gilmoreSetGrass, alt: "Gilmore 18 - 3-pack on the course" },
  { id: 3, src: gilmoreSetCar, alt: "Gilmore 18 - Full set in bag" },
];

const luckyImages = [
  { id: 1, src: luckySetGrass, alt: "100% Lucky - Set on the fairway" },
  { id: 2, src: luckySetBag, alt: "100% Lucky - In golf bag" },
  { id: 3, src: luckySetDoor, alt: "100% Lucky - Ready to go" },
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
];

interface StyleGalleryProps {
  title: string;
  subtitle: string;
  images: { id: number; src: string; alt: string }[];
}

const StyleGallery = ({ title, subtitle, images }: StyleGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="font-display text-3xl sm:text-4xl text-foreground">{title}</h3>
        <p className="text-muted-foreground font-body">{subtitle}</p>
      </div>
      
      {/* Main Image */}
      <div className="aspect-square rounded-lg bg-card border border-border shadow-card overflow-hidden">
        <img 
          src={images[selectedImage].src} 
          alt={images[selectedImage].alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === index
                ? "border-accent shadow-gold"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const ProductGallery = () => {
  return (
    <section id="product" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase">
            The Collection
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-2 text-foreground">
            Two Styles. Zero Excuses.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body">
            Choose your vibe: Classic black & gold "Gilmore 18" for the traditionalist, or white & green "100% Lucky" for those who need all the help they can get.
          </p>
        </div>

        {/* Two Style Galleries Side by Side */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <StyleGallery 
            title="Gilmore 18"
            subtitle="Black & Gold • Jersey Style"
            images={gilmoreImages}
          />
          <StyleGallery 
            title="100% Lucky"
            subtitle="White & Green • Shamrock Style"
            images={luckyImages}
          />
        </div>

        {/* Features Section */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-card">
          <h3 className="font-display text-2xl sm:text-3xl text-center mb-8 text-foreground">
            What You Get
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <span className="font-body font-medium text-foreground">{feature.title}</span>
                  <span className="text-muted-foreground font-body"> — {feature.description}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="bg-secondary rounded-lg p-4 text-center">
              <p className="text-accent font-body text-sm font-semibold mb-1">
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
