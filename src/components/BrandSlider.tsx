import logoOracle from "@/assets/logo-oracle.png";
import logoIbm from "@/assets/logo-ibm.png";
import logoIntel from "@/assets/logo-intel.png";
import logoDell from "@/assets/logo-dell.png";
import logoHp from "@/assets/logo-hp.png";
import logoVmware from "@/assets/logo-vmware.png";
import logoMicrosoft from "@/assets/logo-microsoft.png";
import logoApple from "@/assets/logo-apple.png";
import logoGoogle from "@/assets/logo-google.svg";
import logoAmazon from "@/assets/logo-amazon.svg";
import logoSamsung from "@/assets/logo-samsung.svg";
import logoCisco from "@/assets/logo-cisco.svg";
import logoAdobe from "@/assets/logo-adobe.svg";
import logoNvidia from "@/assets/logo-nvidia.svg";

const brands = [
  { src: logoDell, alt: "Dell", isSvg: false },
  { src: logoOracle, alt: "Oracle", isSvg: false },
  { src: logoIbm, alt: "IBM", isSvg: false },
  { src: logoGoogle, alt: "Google", isSvg: true },
  { src: logoIntel, alt: "Intel", isSvg: false },
  { src: logoAmazon, alt: "Amazon", isSvg: true },
  { src: logoHp, alt: "HP", isSvg: false },
  { src: logoNvidia, alt: "Nvidia", isSvg: true },
  { src: logoVmware, alt: "VMware", isSvg: false },
  { src: logoSamsung, alt: "Samsung", isSvg: true },
  { src: logoMicrosoft, alt: "Microsoft", isSvg: false },
  { src: logoCisco, alt: "Cisco", isSvg: true },
  { src: logoApple, alt: "Apple", isSvg: false },
  { src: logoAdobe, alt: "Adobe", isSvg: true },
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
        <div className="animate-marquee flex items-center whitespace-nowrap" style={{ animationDuration: "40s" }}>
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-6 sm:mx-8 lg:mx-10 flex items-center justify-center h-[40px] sm:h-[50px] lg:h-[60px] w-[80px] sm:w-[100px] lg:w-[120px]"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                loading="lazy"
                className={`max-h-full w-auto object-contain opacity-60 hover:opacity-90 transition-opacity ${brand.isSvg ? "invert" : "invert brightness-75"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
