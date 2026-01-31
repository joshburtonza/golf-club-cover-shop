import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-walnut border-t border-border">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          {/* Logo/Brand */}
          <h3 className="font-display text-2xl sm:text-3xl mb-2 text-primary-foreground">
            TOPPED <span className="text-accent">IT</span>
          </h3>
          <p className="text-primary-foreground/70 font-body text-sm mb-2">
            Headcovers for golfers who've topped one (or a hundred).
          </p>
          <p className="text-primary-foreground/50 font-body text-xs mb-6 italic">
            Premium gear, self-deprecating humor.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="https://instagram.com/toppedit.za"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-walnut-light border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-primary-foreground"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/toppedit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-walnut-light border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-primary-foreground"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@toppedit.co.za"
              className="w-10 h-10 rounded-full bg-walnut-light border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-primary-foreground"
              aria-label="Email us"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Email */}
          <a
            href="mailto:hello@toppedit.co.za"
            className="text-accent hover:underline font-body mb-6"
          >
            hello@toppedit.co.za
          </a>

          {/* Copyright */}
          <p className="text-primary-foreground/60 font-body text-xs">
            © {new Date().getFullYear()} Topped It. All rights reserved. Mulligans not included.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
