import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/stores/gameStore";
import { levels } from "@/data/levels";
import { Lock, Star, ArrowLeft } from "lucide-react";

const LevelSelect = () => {
  const navigate = useNavigate();
  const { unlockedLevels, completedLevels, startLevel } = useGameStore();

  const handleStart = (levelId: number) => {
    startLevel(levelId);
    navigate("/play");
  };

  return (
    <div className="min-h-screen grid-bg p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Kembali
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-bold text-primary neon-text-cyan mb-8"
        >
          Pilih Level
        </motion.h1>

        <div className="grid gap-4">
          {levels.map((level, i) => {
            const unlocked = unlockedLevels.includes(level.id);
            const result = completedLevels[level.id];

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  disabled={!unlocked}
                  onClick={() => handleStart(level.id)}
                  className={`w-full text-left p-5 rounded-xl transition-all ${
                    unlocked
                      ? "glass hover:bg-white/10 cursor-pointer neon-glow-cyan"
                      : "bg-muted/30 cursor-not-allowed opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{unlocked ? level.icon : ""}</span>
                    {!unlocked && <Lock size={28} className="text-muted-foreground" />}
                    <div className="flex-1">
                      <h3 className="font-display text-sm tracking-wider text-foreground">
                        Level {level.id}
                      </h3>
                      <p className="font-display text-base font-semibold text-foreground mt-0.5">
                        {level.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {level.description}
                      </p>
                    </div>
                    {result && (
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            size={18}
                            className={s <= result.stars ? "text-neon-yellow fill-neon-yellow" : "text-muted-foreground"}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
