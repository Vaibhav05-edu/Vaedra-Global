import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "919999999999"; // Replace with actual number
const WHATSAPP_MESSAGE = encodeURIComponent("Hi Vaedra Global! I'm interested in your services.");

const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1da851] transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </motion.a>
  );
};

export default WhatsAppButton;
