import { Link } from "react-router-dom";

const footerLinks = [
  { name: "Agency", href: "#" },
  { name: "Career", href: "#" },
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Admin Portal", href: "/admin/login" },
];
const socialLinks = [
  { name: "Twitter", url: "#" },
  { name: "Dribbble", url: "#" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/vaedraglobal/" },
  { name: "Instagram", url: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
          <p className="font-display text-sm sm:text-lg uppercase text-foreground/80">
            © 2024-25 Vaedra Global
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {footerLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-display text-sm sm:text-lg uppercase text-foreground/60 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-display text-sm sm:text-lg uppercase text-foreground/60 hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url !== "#" ? "_blank" : undefined}
                rel={social.url !== "#" ? "noopener noreferrer" : undefined}
                className="font-body text-xs sm:text-sm text-foreground/60 hover:text-highlight transition-colors"
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
