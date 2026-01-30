import { CartDrawer } from "./CartDrawer";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-display text-xl sm:text-2xl text-walnut">
          TOPPED <span className="text-accent">IT</span>
        </a>
        <div className="flex items-center gap-4">
          <a 
            href="#pricing" 
            className="hidden sm:inline-block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop
          </a>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};

export default Header;
