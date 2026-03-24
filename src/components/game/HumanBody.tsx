import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Level } from "@/types/game";

interface Props {
  level: Level;
  placedOrgans: string[];
  organZoneMap: Record<string, string>;
  madeConnections: Array<{ from: string; to: string }>;
  selectedOrgan: string | null;
  phase: "placement" | "connection" | "complete";
  shakeZone: string | null;
  onOrganClick: (organId: string) => void;
}

const BodySVG = () => (
  <svg viewBox="0 0 200 500" className="w-full h-full opacity-20" fill="currentColor" stroke="none">
    <defs>
      <radialGradient id="bodyGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Full body silhouette */}
    <path
      d="
        M 100 8
        C 80 8, 68 22, 68 40
        C 68 58, 80 72, 100 72
        C 120 72, 132 58, 132 40
        C 132 22, 120 8, 100 8
        Z
      "
      className="text-primary" opacity="0.6"
    />
    {/* Neck */}
    <rect x="90" y="70" width="20" height="18" rx="6" className="text-primary" opacity="0.5" />
    {/* Torso */}
    <path
      d="
        M 90 86
        Q 50 92, 42 110
        L 42 115
        Q 38 130, 30 160
        L 28 170
        Q 30 175, 34 175
        L 36 170
        Q 40 155, 44 140
        L 48 125
        Q 50 118, 55 112
        L 58 108
        Q 62 106, 62 115
        L 60 180
        Q 58 200, 62 220
        L 68 260
        Q 72 275, 78 280
        L 82 282
        Q 90 284, 100 285
        Q 110 284, 118 282
        L 122 280
        Q 128 275, 132 260
        L 138 220
        Q 142 200, 140 180
        L 138 115
        Q 138 106, 142 108
        L 145 112
        Q 150 118, 152 125
        L 156 140
        Q 160 155, 164 170
        L 166 175
        Q 170 175, 172 170
        L 170 160
        Q 162 130, 158 115
        L 158 110
        Q 150 92, 110 86
        Z
      "
      className="text-primary" opacity="0.45"
    />
    {/* Left arm */}
    <path
      d="
        M 30 160
        Q 26 185, 24 210
        Q 22 235, 20 250
        Q 18 260, 16 265
        Q 14 272, 12 270
        Q 10 268, 14 258
        Q 18 242, 20 230
        Q 24 200, 28 170
      "
      className="text-primary" opacity="0.4"
    />
    {/* Right arm */}
    <path
      d="
        M 170 160
        Q 174 185, 176 210
        Q 178 235, 180 250
        Q 182 260, 184 265
        Q 186 272, 188 270
        Q 190 268, 186 258
        Q 182 242, 180 230
        Q 176 200, 172 170
      "
      className="text-primary" opacity="0.4"
    />
    {/* Left leg */}
    <path
      d="
        M 78 280
        Q 74 310, 72 340
        Q 70 370, 68 400
        Q 66 430, 64 455
        Q 62 465, 60 470
        L 52 472
        Q 48 473, 48 470
        Q 50 468, 56 466
        L 62 462
        Q 64 450, 66 430
        Q 68 400, 70 370
        Q 72 340, 74 310
        Q 76 295, 80 282
      "
      className="text-primary" opacity="0.4"
    />
    {/* Right leg */}
    <path
      d="
        M 122 280
        Q 126 310, 128 340
        Q 130 370, 132 400
        Q 134 430, 136 455
        Q 138 465, 140 470
        L 148 472
        Q 152 473, 152 470
        Q 150 468, 144 466
        L 138 462
        Q 136 450, 134 430
        Q 132 400, 130 370
        Q 128 340, 126 310
        Q 124 295, 120 282
      "
      className="text-primary" opacity="0.4"
    />
    {/* Glow overlay */}
    <ellipse cx="100" cy="200" rx="80" ry="150" fill="url(#bodyGlow)" />
  </svg>
);

function HumanBody({ level, placedOrgans, organZoneMap, madeConnections, selectedOrgan, phase, shakeZone, onOrganClick }: Props) {
  const getOrganInZone = (zoneId: string) => {
    const entry = Object.entries(organZoneMap).find(([, z]) => z === zoneId);
    if (!entry) return null;
    return level.organs.find((o) => o.id === entry[0]);
  };

  const getZoneForOrgan = (organId: string) => {
    const organ = level.organs.find((o) => o.id === organId);
    if (!organ) return null;
    return level.zones.find((z) => z.id === organ.zoneId);
  };

  return (
    <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] aspect-[2/5] mx-auto">
      <BodySVG />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {madeConnections.map((conn, i) => {
          const z1 = getZoneForOrgan(conn.from);
          const z2 = getZoneForOrgan(conn.to);
          if (!z1 || !z2) return null;
          return (
            <g key={i}>
              <line
                x1={z1.x} y1={z1.y}
                x2={z2.x} y2={z2.y}
                stroke="hsl(150 100% 50%)"
                strokeWidth="0.5"
                opacity="0.6"
              />
              <circle r="0.8" fill="hsl(150 100% 60%)">
                <animateMotion dur="1.5s" repeatCount="indefinite" path={`M${z1.x},${z1.y} L${z2.x},${z2.y}`} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Drop zones */}
      {level.zones.map((zone) => {
        const placedOrgan = getOrganInZone(zone.id);
        return (
          <DropZoneSlot
            key={zone.id}
            zone={zone}
            placedOrgan={placedOrgan}
            isShaking={shakeZone === zone.id}
            phase={phase}
            isSelected={placedOrgan ? selectedOrgan === placedOrgan.id : false}
            onOrganClick={onOrganClick}
          />
        );
      })}
    </div>
  );
}

interface SlotProps {
  zone: { id: string; x: number; y: number; label: string };
  placedOrgan: { id: string; icon: string; name: string } | null | undefined;
  isShaking: boolean;
  phase: string;
  isSelected: boolean;
  onOrganClick: (id: string) => void;
}

function DropZoneSlot({ zone, placedOrgan, isShaking, phase, isSelected, onOrganClick }: SlotProps) {
  const { setNodeRef, isOver } = useDroppable({ id: zone.id });

  return (
    <div
      ref={setNodeRef}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
    >
      <motion.div
        animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
        onClick={() => placedOrgan && phase === "connection" && onOrganClick(placedOrgan.id)}
        className={`w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
          placedOrgan
            ? isSelected
              ? "glass-strong neon-glow-cyan border-primary scale-110"
              : "glass neon-glow-green"
            : isOver
            ? "glass-strong border-primary scale-110 neon-glow-cyan"
            : "border border-dashed border-muted-foreground/30 bg-white/5"
        }`}
      >
        {placedOrgan ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl"
          >
            {placedOrgan.icon}
          </motion.span>
        ) : (
          <span className="text-[10px] text-muted-foreground text-center leading-tight px-1">
            {zone.label}
          </span>
        )}
      </motion.div>
    </div>
  );
}

export default HumanBody;
