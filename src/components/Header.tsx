import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Home", "About", "Services", "Portfolio", "Blog", "Contact"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="font-display text-3xl font-bold uppercase tracking-wider text-foreground">
          Vaedra Global
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-display text-lg uppercase tracking-wide text-foreground/80 hover:text-foreground px-4 py-2 transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://cal.com/vaedra-global-agency"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex font-display text-sm uppercase tracking-wider bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
          >
            Book a Call
          </a>
          <button className="text-foreground/70 hover:text-foreground transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-xl uppercase tracking-wide text-foreground/80 hover:text-foreground px-6 py-3 transition-colors hover:bg-secondary"
                >
                  {link}
                </a>
              ))}
              <a
                href="https://cal.com/vaedra-global-agency"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="font-display text-xl uppercase tracking-wide text-primary px-6 py-3 transition-colors hover:bg-secondary"
              >
                Book a Call
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
