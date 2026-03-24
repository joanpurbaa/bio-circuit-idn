import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX, Clock, Zap } from "lucide-react";
import { Level } from "@/types/game";
import { useGameStore } from "@/stores/gameStore";

interface Props {
  level: Level;
}

export default function GameHeader({ level }: Props) {
  const navigate = useNavigate();
  const { timer, xp, errors, soundEnabled, toggleSound, goToMenu } = useGameStore();

  const mins = Math.floor(timer / 60);
  const secs = timer % 60;

  return (
    <header className="flex items-center justify-between p-2 sm:p-4 glass border-b border-border gap-2">
      <button
        onClick={() => { goToMenu(); navigate("/levels"); }}
        className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
      >
        <ArrowLeft size={14} />
        <span className="hidden sm:inline">Keluar</span>
      </button>

      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
        <span className="text-base sm:text-lg">{level.icon}</span>
        <div className="min-w-0">
          <p className="font-display text-[10px] sm:text-xs tracking-wider text-primary">Lv {level.id}</p>
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate">{level.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock size={12} />
          <span className="font-display text-[10px] sm:text-xs">
            {mins}:{secs.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <Zap size={12} />
          <span className="font-display text-[10px] sm:text-xs">{xp}</span>
        </div>
        {errors > 0 && (
          <span className="text-[10px] text-destructive font-display hidden sm:inline">
            {errors}err
          </span>
        )}
        <button onClick={toggleSound} className="text-muted-foreground hover:text-foreground transition-colors">
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>
      </div>
    </header>
  );
}
