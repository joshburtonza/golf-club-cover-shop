import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-charcoal border-t border-border">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          {/* Logo/Brand */}
          <h3 className="font-display text-2xl sm:text-3xl mb-2">
            TOPPED <span className="text-gold">IT</span>
          </h3>
          <p className="text-muted-foreground font-body text-sm mb-6">
            Headcovers for the Rest of Us
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="https://instagram.com/toppedit.za"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/toppedit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@toppedit.co.za"
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              aria-label="Email us"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Email */}
          <a
            href="mailto:hello@toppedit.co.za"
            className="text-gold hover:underline font-body mb-6"
          >
            hello@toppedit.co.za
          </a>

          {/* Copyright */}
          <p className="text-muted-foreground font-body text-xs">
            © {new Date().getFullYear()} Topped It. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
