import { motion } from "framer-motion";

const FullWidthVideo = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <video
        src="/videos/showcase.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-[50vh] md:h-[70vh] object-cover block"
        style={{ minHeight: '300px' }}
      />
    </motion.section>
  );
};

export default FullWidthVideo;
