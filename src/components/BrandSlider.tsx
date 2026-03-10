const brands = [
  "Google", "Microsoft", "Apple", "Amazon", "Meta", "Netflix",
  "Google", "Microsoft", "Apple", "Amazon", "Meta", "Netflix",
];

const BrandSlider = () => {
  return (
    <section className="bg-secondary py-10 overflow-hidden border-y border-border">
      <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
        {brands.map((brand, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl uppercase tracking-wider text-muted-foreground/50 hover:text-foreground transition-colors cursor-default"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
};

export default BrandSlider;
