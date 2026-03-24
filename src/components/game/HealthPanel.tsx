import { motion } from "framer-motion";
import { Level } from "@/types/game";
import { useGameStore } from "@/stores/gameStore";

interface Props {
  level: Level;
}

interface IndicatorProps {
  label: string;
  icon: string;
  value: number;
  active: boolean;
}

function Indicator({ label, icon, value, active }: IndicatorProps) {
  return (
    <div className={`flex items-center gap-2 py-2 ${!active ? "animate-blink-red" : ""}`}>
      <span className="text-lg">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-muted-foreground truncate">{label}</p>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${
              value >= 80 ? "bg-accent" : value >= 40 ? "bg-neon-yellow" : "bg-destructive"
            }`}
          />
        </div>
      </div>
      <span className={`text-xs font-display ${active ? "text-accent" : "text-destructive"}`}>
        {Math.round(value)}%
      </span>
    </div>
  );
}

export default function HealthPanel({ level }: Props) {
  const { placedOrgans, madeConnections, phase } = useGameStore();

  const totalOrgans = level.organs.length;
  const placedCount = placedOrgans.length;
  const totalConns = level.connections.length;
  const connCount = madeConnections.length;

  const placementProgress = totalOrgans > 0 ? (placedCount / totalOrgans) * 60 : 0;
  const connectionProgress = totalConns > 0 ? (connCount / totalConns) * 40 : 0;
  const baseValue = placementProgress + connectionProgress;

  // Different indicators based on level
  const indicators = [
    { label: "Heart Rate", icon: "❤️", relevantLevels: [1, 8] },
    { label: "Oxygen Level", icon: "🫁", relevantLevels: [2, 8] },
    { label: "Neural Activity", icon: "🧠", relevantLevels: [3, 8] },
    { label: "Nutrient Absorption", icon: "🫃", relevantLevels: [4, 8] },
    { label: "Waste Filtration", icon: "💧", relevantLevels: [5, 8] },
    { label: "Muscle Activity", icon: "💪", relevantLevels: [6, 8] },
    { label: "Hormone Balance", icon: "🧪", relevantLevels: [7, 8] },
    { label: "Blood Flow", icon: "🩸", relevantLevels: [1, 8] },
  ];

  const relevant = indicators.filter((ind) => ind.relevantLevels.includes(level.id));

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="font-display text-xs tracking-widest text-primary mb-3">STATUS KESEHATAN</h3>
      {relevant.map((ind) => (
        <Indicator
          key={ind.label}
          label={ind.label}
          icon={ind.icon}
          value={phase === "complete" ? 100 : baseValue}
          active={phase === "complete" || baseValue >= 80}
        />
      ))}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">Status Sistem</span>
          <span className={phase === "complete" ? "text-accent" : "text-neon-yellow"}>
            {phase === "complete" ? "AKTIF ✓" : "MEMBANGUN..."}
          </span>
        </div>
      </div>
    </div>
  );
}
