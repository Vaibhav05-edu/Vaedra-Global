import logoOracle from "@/assets/logo-oracle.png";
import logoIbm from "@/assets/logo-ibm.png";
import logoIntel from "@/assets/logo-intel.png";
import logoDell from "@/assets/logo-dell.png";
import logoHp from "@/assets/logo-hp.png";
import logoVmware from "@/assets/logo-vmware.png";
import logoMicrosoft from "@/assets/logo-microsoft.png";
import logoApple from "@/assets/logo-apple.png";

const brands = [
  { src: logoDell, alt: "Dell" },
  { src: logoOracle, alt: "Oracle" },
  { src: logoIbm, alt: "IBM" },
  { src: logoIntel, alt: "Intel" },
  { src: logoHp, alt: "HP" },
  { src: logoVmware, alt: "VMware" },
  { src: logoMicrosoft, alt: "Microsoft" },
  { src: logoApple, alt: "Apple" },
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
      <div className="relative z-[2] overflow-hidden py-10 lg:py-12">
        <div className="ml-[260px] md:ml-[300px] animate-marquee flex items-center whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[200px] lg:w-[250px] xl:w-[280px] mx-10 lg:mx-14 flex items-center justify-center"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                loading="lazy"
                className="max-h-[70px] lg:max-h-[85px] xl:max-h-[100px] w-auto object-contain opacity-60 hover:opacity-90 transition-opacity invert brightness-75"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
