import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Organ } from "@/types/game";

interface Props {
  organs: Organ[];
  phase: string;
}

function DraggableOrgan({ organ }: { organ: Organ }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: organ.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      whileHover={{ scale: 1.08 }}
      className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl glass cursor-grab active:cursor-grabbing transition-all hover:bg-white/10 shrink-0 min-w-[120px] lg:min-w-0 ${
        isDragging ? "opacity-40 scale-95" : ""
      }`}
    >
      <span className="text-2xl">{organ.icon}</span>
      <div>
        <p className="text-sm font-semibold text-foreground">{organ.name}</p>
        <p className="text-[10px] text-muted-foreground">{organ.description}</p>
      </div>
    </motion.div>
  );
}

export default function OrganPanel({ organs, phase }: Props) {
  if (phase !== "placement") {
    return (
      <div className="glass rounded-xl p-4">
        <h3 className="font-display text-xs tracking-widest text-primary mb-3">ORGAN</h3>
        <p className="text-xs text-muted-foreground">
          {phase === "connection" ? "Semua organ terpasang! Buat koneksi antar organ." : "Level selesai!"}
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-3 sm:p-4">
      <h3 className="font-display text-xs tracking-widest text-primary mb-2 sm:mb-3">ORGAN</h3>
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
        {organs.map((organ) => (
          <DraggableOrgan key={organ.id} organ={organ} />
        ))}
      </div>
      {organs.length === 0 && (
        <p className="text-xs text-accent">✓ Semua terpasang</p>
      )}
    </div>
  );
}
