import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "918420063164";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi Vaedra Global! I'm interested in your services.");

const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)] hover:bg-[#1ebe5d] transition-all"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path
          d="M16.004 2.667A13.29 13.29 0 0 0 2.72 15.95a13.21 13.21 0 0 0 1.783 6.638L2.667 29.333l6.96-1.82A13.3 13.3 0 0 0 16.004 29.3 13.3 13.3 0 0 0 29.333 16 13.3 13.3 0 0 0 16.004 2.667Zm0 24.266a11.02 11.02 0 0 1-5.61-1.533l-.403-.24-4.168 1.092 1.113-4.06-.263-.418A10.94 10.94 0 0 1 5 15.95a11.013 11.013 0 0 1 22.024 0 11.02 11.02 0 0 1-11.02 10.983Z"
          fill="white"
        />
        <path
          d="M22.56 18.907c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.78-1.07-.96-1.79-2.14-2-2.5-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.61-.81-.62h-.69c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.54 3.87 6.15 5.43.86.37 1.53.59 2.05.76.86.27 1.65.23 2.27.14.69-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42Z"
          fill="white"
        />
      </svg>
    </motion.a>
  );
};

export default WhatsAppButton;
