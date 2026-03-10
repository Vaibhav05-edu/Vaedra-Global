const footerLinks = ["Agency", "Career", "Privacy", "Terms"];
const socialLinks = [
  { name: "Twitter", url: "#" },
  { name: "Dribbble", url: "#" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/vaedraglobal/" },
  { name: "Instagram", url: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-lg uppercase text-foreground/80">
            © 2024-25 Vaedra Global
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
                key={social.name}
                href={social.url}
                target={social.url !== "#" ? "_blank" : undefined}
                rel={social.url !== "#" ? "noopener noreferrer" : undefined}
                className="font-body text-sm text-foreground/60 hover:text-highlight transition-colors"
                aria-label={social.name}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
