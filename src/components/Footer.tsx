const footerLinks = ["Agency", "Career", "Privacy", "Terms"];
const socialLinks = ["Twitter", "Dribbble", "LinkedIn", "Instagram"];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-lg uppercase text-foreground/80">
            © 2024-25 Arolax Agency
          </p>

          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-display text-lg uppercase text-foreground/60 hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social}
                href="#"
                className="font-body text-sm text-foreground/60 hover:text-highlight transition-colors"
                aria-label={social}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
