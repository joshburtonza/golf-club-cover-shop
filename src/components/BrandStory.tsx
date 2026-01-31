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
              Every golfer knows the feeling. You've set up perfectly. Waggle complete. Backswing smooth.
              And then... <span className="text-accent font-medium italic">thwack</span>.
            </p>
            
            <p>
              The ball dribbles forward. Your mates go silent (for half a second). Then the roasting begins.
            </p>

            <p className="text-foreground/80 italic">
              "Great shot! You could've walked that far."<br />
              "Did you mean to keep it under the ladies' tee?"<br />
              "Mate, the ball's supposed to go UP."
            </p>

            <p>
              We've all topped one. Or a hundred. That's why we built <span className="text-accent font-semibold">Topped It</span> — 
              headcovers for golfers who take their equipment seriously but themselves not so much.
            </p>

            <p className="text-foreground font-medium">
              Because even if your swing is questionable, your bag doesn't have to be.
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
