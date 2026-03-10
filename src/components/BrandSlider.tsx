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
            <div key={i} className="flex-shrink-0 w-[200px] lg:w-[240px] mx-10 lg:mx-14 flex items-center justify-center">
              <img
                src={brand.src}
                alt={brand.alt}
                className="h-16 lg:h-20 xl:h-24 w-full object-contain opacity-50 hover:opacity-80 transition-opacity grayscale brightness-[2.5] contrast-75"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
