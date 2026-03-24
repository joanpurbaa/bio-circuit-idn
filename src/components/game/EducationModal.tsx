import { motion, AnimatePresence } from "framer-motion";
import { LevelEducation } from "@/types/game";
import { X, BookOpen } from "lucide-react";

interface Props {
  education: LevelEducation;
  onClose: () => void;
}

export default function EducationModal({ education, onClose }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen size={20} />
              <h2 className="font-display text-lg font-bold tracking-wider">
                {education.title}
              </h2>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>
          </div>

          <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
            {education.description}
          </p>

          <h3 className="font-display text-xs tracking-widest text-primary mb-3">FAKTA MENARIK</h3>
          <ul className="space-y-2">
            {education.facts.map((fact, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-2 text-sm text-foreground/70"
              >
                <span className="text-accent shrink-0">▸</span>
                {fact}
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full mt-6 py-3 rounded-xl bg-primary text-primary-foreground font-display text-sm tracking-wider"
          >
            LANJUTKAN
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
