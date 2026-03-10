import { motion } from "framer-motion";
import heroImg from "@/assets/hero-bg.jpg";

const FullWidthImage = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <img
        src={heroImg}
        alt="Agency workspace"
        className="w-full h-[50vh] md:h-[70vh] object-cover"
      />
    </motion.section>
  );
};

export default FullWidthImage;
