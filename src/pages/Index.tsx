import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/stores/gameStore";
import { Volume2, VolumeX } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { soundEnabled, toggleSound, xp } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden grid-bg">
      {/* Ambient background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-4"
      >
        {/* Logo / Icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl mb-6"
        >
          🧬
        </motion.div>

        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wider mb-2 neon-text-cyan text-primary">
          BioCircuit
        </h1>
        <p className="font-display text-lg md:text-xl text-muted-foreground tracking-widest mb-10">
          Human System Puzzle
        </p>

        {xp > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-primary mb-6 font-display"
          >
            ⚡ {xp} XP
          </motion.p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/levels")}
            className="px-10 py-4 rounded-xl font-display text-lg tracking-wider bg-primary text-primary-foreground neon-glow-cyan transition-all hover:brightness-110"
          >
            MULAI
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/materi")}
            className="px-10 py-4 rounded-xl font-display text-sm tracking-wider glass hover:bg-white/10 text-foreground transition-all"
          >
            📖 MATERI DASAR
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/ai-summarizer")}
            className="px-10 py-4 rounded-xl font-display text-sm tracking-wider glass hover:bg-white/10 text-foreground transition-all"
          >
            ✨ AI RANGKUM
          </motion.button>
        </div>

        {/* Sound toggle */}
        <div className="mt-8">
          <button
            onClick={toggleSound}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 text-xs text-muted-foreground font-body tracking-wider"
      >
        Game Edukasi Interaktif · Biologi
      </motion.div>
    </div>
  );
};

export default Index;
