import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const FullWidthVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — silent fallback
      });
    }
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-[40vh] sm:h-[50vh] md:h-[70vh] object-cover object-center block"
        style={{ minHeight: '300px', background: '#000' }}
      >
        <source src="/videos/showcase.mp4" type="video/mp4" />
      </video>
    </motion.section>
  );
};

export default FullWidthVideo;
