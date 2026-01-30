import { useState } from "react";

const images = [
  { id: 1, alt: "Driver headcover front view" },
  { id: 2, alt: "Driver headcover side view" },
  { id: 3, alt: "3-pack collection" },
  { id: 4, alt: "Detail stitching" },
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
            Crafted For Champions
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
                    {index === 1 && "👀"}
                    {index === 2 && "📦"}
                    {index === 3 && "✨"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl mb-2">
                Vintage Jersey Driver Cover
              </h3>
              <p className="text-muted-foreground font-body text-lg">
                Premium quality headcover with classic sports jersey styling
              </p>
            </div>

            <div className="space-y-4 py-6 border-y border-border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="font-body">Fits drivers up to 460cc</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="font-body">Premium synthetic leather exterior</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="font-body">Soft fleece interior lining</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="font-body">Magnetic closure for secure fit</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="font-body">Numbered design (1, 3, 5 available)</span>
              </div>
            </div>

            <p className="text-muted-foreground font-body leading-relaxed">
              Inspired by vintage sports jerseys from the golden era, these headcovers 
              bring retro style to your golf bag. Each cover is handcrafted with 
              attention to detail, featuring bold numbering and classic athletic aesthetics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
