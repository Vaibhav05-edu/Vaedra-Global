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
    <section className="relative bg-secondary overflow-hidden">
      <div className="flex">
        {/* Left geometric decoration */}
        <div className="relative flex-shrink-0 w-[220px] lg:w-[280px] hidden md:flex items-center">
          {/* Large grey circle (half visible) */}
          <div className="absolute -left-24 w-[220px] h-[220px] rounded-full border-[40px] border-muted/40" />
          {/* Lime green square */}
          <div className="absolute left-[100px] lg:left-[130px] top-1/2 -translate-y-1/2 w-[70px] h-[80px] bg-primary" />
          {/* Small grey shapes */}
          <div className="absolute left-[40px] top-1/2 -translate-y-1/2 w-[60px] h-[70px] bg-muted/30 rounded-sm" />
        </div>

        {/* Logo marquee area */}
        <div className="flex-1 overflow-hidden py-10 lg:py-12">
          <div className="animate-marquee flex items-center gap-20 lg:gap-28 whitespace-nowrap">
            {[...brands, ...brands].map((brand, i) => (
              <img
                key={i}
                src={brand.src}
                alt={brand.alt}
                className="h-10 lg:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale brightness-200"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
