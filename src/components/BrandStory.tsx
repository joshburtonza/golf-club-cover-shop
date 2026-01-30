const BrandStory = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase">
            The Story
          </span>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 mb-8 text-foreground">
            Why "Topped It"?
          </h2>
          
          <div className="space-y-6 text-muted-foreground font-body text-lg leading-relaxed">
            <p>
              Because every golfer has been there. That sickening <span className="text-accent font-medium">thwack</span> as 
              you catch the top of the ball and it dribbles 30 metres while your mates try not to laugh.
            </p>
            
            <p>
              We named our brand after our worst shots so you don't have to hide from yours. 
              Premium headcovers for golfers who take their equipment seriously, but themselves not so much.
            </p>

            <p className="text-foreground font-medium">
              At least your bag will look good.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-accent">🇿🇦</span>
              <span className="text-muted-foreground">Shipped from SA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">📦</span>
              <span className="text-muted-foreground">3-5 Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">🔄</span>
              <span className="text-muted-foreground">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
