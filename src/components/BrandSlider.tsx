import brandMicrowave from "@/assets/brand-microwave.png";
import brandSmartEdu from "@/assets/brand-smart-edu.png";
import brandFitness from "@/assets/brand-fitness.png";
import brandNatural from "@/assets/brand-natural.png";
import brandGraduation from "@/assets/brand-graduation.png";
import brandMothers from "@/assets/brand-mothers.png";

const brands = [
  { src: brandMothers, alt: "Happy Mother's" },
  { src: brandMicrowave, alt: "Microwave Hair Salon" },
  { src: brandSmartEdu, alt: "Smart Education" },
  { src: brandFitness, alt: "Fitness Premium Club" },
  { src: brandNatural, alt: "Natural Mineral Water" },
  { src: brandGraduation, alt: "The Best Graduation" },
];

const BrandSlider = () => {
  return (
    <section className="relative bg-secondary overflow-visible">
      {/* Large geometric background decoration - semi-circle + green square */}
      <div className="absolute -top-[280px] left-0 w-[400px] h-[560px] z-0 hidden md:block pointer-events-none">
        {/* Large grey semi-circle */}
        <div className="absolute left-[-100px] top-0 w-[360px] h-[360px] rounded-full border-[60px] border-muted-foreground/15" />
        {/* Grey rectangle behind green */}
        <div className="absolute left-[80px] bottom-[40px] w-[100px] h-[120px] bg-muted-foreground/10 rounded-sm" />
        {/* Lime green square */}
        <div className="absolute left-[140px] bottom-[30px] w-[90px] h-[110px] bg-primary" />
      </div>

      {/* Logo marquee area */}
      <div className="relative z-10 overflow-hidden py-8 lg:py-10 pl-[280px] md:pl-[300px]">
        <div className="animate-marquee flex items-center gap-24 lg:gap-32 whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <img
              key={i}
              src={brand.src}
              alt={brand.alt}
              className="h-14 lg:h-16 xl:h-[4.5rem] w-auto object-contain opacity-50 hover:opacity-80 transition-opacity grayscale brightness-[2.5] contrast-[0.8]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
