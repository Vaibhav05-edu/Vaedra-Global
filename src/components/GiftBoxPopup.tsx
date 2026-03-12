import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, PartyPopper } from "lucide-react";

const VALID_CODES = ["VG2026X", "VAEDRA7K", "GIFT5000", "REFVG99", "WIN2026R"];

const GiftBoxPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = () => {
    if (VALID_CODES.includes(code.trim().toUpperCase())) {
      setStatus("success");
      setTimeout(() => {
        window.location.href = "https://vaedraglobal.app";
      }, 6000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <>
      {/* Floating Gift Button */}
      <motion.button
        onClick={() => { setIsOpen(true); setStatus("idle"); setCode(""); }}
        className="fixed bottom-[90px] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:shadow-[0_0_30px_rgba(251,191,36,0.7)] transition-shadow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.15, rotate: [0, -10, 10, -10, 0] }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open gift box"
      >
        <Gift className="w-7 h-7 text-white drop-shadow" />
        {/* Glow pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-amber-400/30" />
      </motion.button>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-sm rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-amber-500/30 p-6 shadow-[0_0_40px_rgba(251,191,36,0.2)]"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {status === "success" ? (
                <motion.div
                  className="text-center py-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <motion.div
                    animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-4"
                  >
                    <PartyPopper className="w-16 h-16 text-amber-400 mx-auto" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2 font-display">
                    🎁 Congratulations!
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    You unlocked <span className="text-amber-400 font-bold text-lg">₹5,000 OFF</span> on our <span className="text-amber-300 font-semibold">Premium Animated Website</span> package only!
                    <br /><span className="text-red-400 text-xs font-medium">(Valid till 29th March)</span>
                  </p>
                  <p className="text-amber-300/80 text-xs mb-4">
                    📸 Take a screenshot and share it to our WhatsApp!
                  </p>
                  <p className="text-white/50 text-xs">Redirecting to our website in a few seconds...</p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-5">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="inline-block mb-3"
                    >
                      <Gift className="w-12 h-12 text-amber-400 mx-auto" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white font-display">
                      🎁 Got a Referral Code?
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      Enter your code to unlock an exclusive discount!
                    </p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      placeholder="Enter code here..."
                      maxLength={20}
                      className="w-full rounded-lg border border-amber-500/30 bg-white/10 px-4 py-3 text-center text-white text-lg font-mono tracking-widest placeholder:text-white/30 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />

                    <AnimatePresence>
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-sm text-center"
                        >
                          ❌ Invalid code. Please try again.
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      onClick={handleSubmit}
                      className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-white font-bold font-display tracking-wide shadow-lg hover:shadow-amber-500/30 transition-shadow"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Claim Reward
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GiftBoxPopup;
