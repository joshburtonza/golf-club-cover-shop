import { useEffect, useRef } from "react";

const messages = [
  "⛳ FREE SHIPPING over R500 — The only free thing in golf",
  "💰 SAVE R500 on the 3-Pack — That's 10 rounds of lost balls right there",
  "⭐ \"At least your bag will look good\" — Every Topped It customer",
  "🏌️ Premium headcovers for golfers who've accepted their handicap",
  "⛳ FREE SHIPPING over R500 — The only free thing in golf",
  "💰 SAVE R500 on the 3-Pack — That's 10 rounds of lost balls right there",
];

export const AnnouncementBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-accent text-accent-foreground overflow-hidden whitespace-nowrap">
      <div 
        ref={scrollRef}
        className="inline-flex animate-marquee"
      >
        {messages.map((message, index) => (
          <span 
            key={index} 
            className="inline-flex items-center px-8 py-2 text-xs sm:text-sm font-body font-semibold uppercase tracking-wider"
          >
            {message}
            <span className="mx-8 text-accent-foreground/50">•</span>
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {messages.map((message, index) => (
          <span 
            key={`dup-${index}`} 
            className="inline-flex items-center px-8 py-2 text-xs sm:text-sm font-body font-semibold uppercase tracking-wider"
          >
            {message}
            <span className="mx-8 text-accent-foreground/50">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
