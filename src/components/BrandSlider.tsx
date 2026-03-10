const brands = [
  "Mother's",
  "MICROWAVE",
  "smart education",
  "FITNESS",
  "natural",
  "THE BEST",
];

const BrandLogo = ({ name }: { name: string }) => {
  const styles: Record<string, string> = {
    "Mother's": "font-serif italic text-[1.7rem] lg:text-[2.2rem] tracking-wide",
    "MICROWAVE": "font-display text-[1.5rem] lg:text-[2rem] uppercase tracking-[0.3em] font-light",
    "smart education": "font-body text-[1.3rem] lg:text-[1.7rem] tracking-wide font-light",
    "FITNESS": "font-display text-[1.8rem] lg:text-[2.3rem] uppercase tracking-[0.25em] font-bold",
    "natural": "font-serif italic text-[1.8rem] lg:text-[2.3rem] tracking-wide font-normal",
    "THE BEST": "font-display text-[1.3rem] lg:text-[1.7rem] uppercase tracking-[0.2em] font-semibold",
  };

  return (
    <span className={`text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors whitespace-nowrap select-none ${styles[name] || "font-display text-2xl uppercase tracking-wider"}`}>
      {name}
    </span>
  );
};

const BrandSlider = () => {
  return (
    <section className="relative bg-secondary">
      {/* Large geometric background decoration spanning hero into this section */}
      <div className="absolute -top-[300px] left-0 w-[400px] h-[600px] z-[1] hidden md:block pointer-events-none">
        {/* Large grey semi-circle (ring) */}
        <div className="absolute left-[-120px] top-[60px] w-[380px] h-[380px] rounded-full border-[55px] border-muted-foreground/12" />
        {/* Grey rectangle */}
        <div className="absolute left-[90px] bottom-[50px] w-[90px] h-[130px] bg-muted-foreground/10" />
        {/* Lime green square */}
        <div className="absolute left-[150px] bottom-[40px] w-[85px] h-[110px] bg-primary" />
      </div>

      {/* Logo marquee */}
      <div className="relative z-[2] overflow-hidden py-10 lg:py-14">
        <div className="ml-[260px] md:ml-[300px] animate-marquee flex items-center whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex-shrink-0 px-12 lg:px-16 flex items-center justify-center">
              <BrandLogo name={brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
