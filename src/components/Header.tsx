import { CartDrawer } from "./CartDrawer";
import { AnnouncementBar } from "./AnnouncementBar";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-top">
      {/* Scrolling Announcement Bar */}
      <AnnouncementBar />
      
      {/* Main Navigation */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          <a href="#" className="font-display text-lg sm:text-2xl text-walnut touch-target flex items-center gap-2">
            <img src="/favicon.png" alt="Topped It" className="w-7 h-7 sm:w-8 sm:h-8 rounded" />
            TOPPED <span className="text-accent ml-1">IT</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href="#pricing" 
              className="hidden sm:inline-flex font-body text-sm text-muted-foreground hover:text-foreground transition-colors touch-target items-center justify-center"
            >
              Shop
            </a>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
