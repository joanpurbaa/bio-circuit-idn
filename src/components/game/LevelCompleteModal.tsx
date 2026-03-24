import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, RotateCcw, ArrowRight } from "lucide-react";
import { Level } from "@/types/game";
import { useGameStore } from "@/stores/gameStore";

interface Props {
  level: Level;
}

export default function LevelCompleteModal({ level }: Props) {
  const navigate = useNavigate();
  const { completedLevels, errors, timer, startLevel, goToMenu } = useGameStore();
  const result = completedLevels[level.id];
  const stars = result?.stars ?? 1;

  const mins = Math.floor(timer / 60);
  const secs = timer % 60;

  const totalLevels = 8;
  const nextLevel = level.id < totalLevels ? level.id + 1 : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-strong rounded-2xl p-8 max-w-sm w-full text-center"
      >
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="text-5xl mb-4"
        >
          🎉
        </motion.div>

        <h2 className="font-display text-xl font-bold text-foreground tracking-wider mb-2">
          LEVEL SELESAI!
        </h2>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + s * 0.15, type: "spring" }}
            >
              <Star
                size={32}
                className={s <= stars ? "text-neon-yellow fill-neon-yellow" : "text-muted-foreground"}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass rounded-lg p-3">
            <p className="text-[10px] text-muted-foreground">Waktu</p>
            <p className="font-display text-sm text-foreground">
              {mins}:{secs.toString().padStart(2, "0")}
            </p>
          </div>
          <div className="glass rounded-lg p-3">
            <p className="text-[10px] text-muted-foreground">Error</p>
            <p className="font-display text-sm text-foreground">{errors}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => startLevel(level.id)}
            className="flex-1 py-3 rounded-xl glass font-display text-xs tracking-wider text-foreground flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} /> ULANGI
          </motion.button>
          {nextLevel ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => startLevel(nextLevel)}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-display text-xs tracking-wider flex items-center justify-center gap-2 neon-glow-cyan"
            >
              NEXT <ArrowRight size={14} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { goToMenu(); navigate("/levels"); }}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-display text-xs tracking-wider neon-glow-cyan"
            >
              MENU
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
