import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";

export default function HintPanel() {
  const { errors, showHint, hintUsed, requestHint, dismissHint, getHintText, phase } = useGameStore();

  if (phase === "complete") return null;

  const canShowHintButton = errors >= 3 && !showHint;

  return (
    <>
      {/* Hint button appears after 3+ errors */}
      <AnimatePresence>
        {canShowHintButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={requestHint}
            className="fixed bottom-20 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-xl bg-neon-yellow/20 border border-neon-yellow/40 text-neon-yellow font-display text-xs tracking-wider shadow-lg"
            style={{ boxShadow: "0 0 20px hsl(45 100% 55% / 0.2)" }}
          >
            <Lightbulb size={16} />
            BUTUH BANTUAN?
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hint modal */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 glass-strong rounded-xl p-4"
            style={{ boxShadow: "0 0 30px hsl(45 100% 55% / 0.15)" }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 text-neon-yellow">
                <Lightbulb size={16} />
                <span className="font-display text-xs tracking-widest">PETUNJUK</span>
              </div>
              <button onClick={dismissHint} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {getHintText()}
            </p>
            {hintUsed && (
              <p className="text-[10px] text-muted-foreground mt-2">
                ⚠️ Menggunakan petunjuk tidak mengurangi bintang
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
