import logoOracle from "@/assets/logo-oracle.png";
import logoIbm from "@/assets/logo-ibm.png";
import logoIntel from "@/assets/logo-intel.png";
import logoDell from "@/assets/logo-dell.png";
import logoHp from "@/assets/logo-hp.png";
import logoVmware from "@/assets/logo-vmware.png";
import logoMicrosoft from "@/assets/logo-microsoft.png";
import logoApple from "@/assets/logo-apple.png";
import logoGoogle from "@/assets/logo-google.png";
import logoAmazon from "@/assets/logo-amazon.png";
import logoSamsung from "@/assets/logo-samsung.png";
import logoCisco from "@/assets/logo-cisco.png";
import logoAdobe from "@/assets/logo-adobe.png";
import logoNvidia from "@/assets/logo-nvidia.png";

const brands = [
  { src: logoDell, alt: "Dell" },
  { src: logoOracle, alt: "Oracle" },
  { src: logoIbm, alt: "IBM" },
  { src: logoGoogle, alt: "Google" },
  { src: logoIntel, alt: "Intel" },
  { src: logoAmazon, alt: "Amazon" },
  { src: logoHp, alt: "HP" },
  { src: logoNvidia, alt: "Nvidia" },
  { src: logoVmware, alt: "VMware" },
  { src: logoSamsung, alt: "Samsung" },
  { src: logoMicrosoft, alt: "Microsoft" },
  { src: logoCisco, alt: "Cisco" },
  { src: logoApple, alt: "Apple" },
  { src: logoAdobe, alt: "Adobe" },
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
        <div className="animate-marquee flex items-center whitespace-nowrap" style={{ animationDuration: "35s" }}>
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 flex items-center justify-center"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                loading="lazy"
                className="max-h-[50px] sm:max-h-[65px] lg:max-h-[80px] w-auto object-contain opacity-60 hover:opacity-90 transition-opacity invert brightness-75"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
