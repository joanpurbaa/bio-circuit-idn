import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { levels } from "@/data/levels";
import { playSound } from "@/utils/sound";
import HumanBody from "@/components/game/HumanBody";
import OrganPanel from "@/components/game/OrganPanel";
import HealthPanel from "@/components/game/HealthPanel";
import GameHeader from "@/components/game/GameHeader";
import EducationModal from "@/components/game/EducationModal";
import LevelCompleteModal from "@/components/game/LevelCompleteModal";
import HintPanel from "@/components/game/HintPanel";
import confetti from "canvas-confetti";

const GamePlay = () => {
  const navigate = useNavigate();
  const store = useGameStore();
  const [activeOrgan, setActiveOrgan] = useState<string | null>(null);
  const [shakeZone, setShakeZone] = useState<string | null>(null);

  const level = levels.find((l) => l.id === store.currentLevel);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  // Timer
  useEffect(() => {
    if (!level || store.phase === "complete") return;
    const interval = setInterval(() => store.tick(), 1000);
    return () => clearInterval(interval);
  }, [level, store.phase]);

  // Check achievements
  useEffect(() => {
    if (store.phase === "complete" && level) {
      const completed = Object.keys(store.completedLevels).length;
      if (completed >= 1) store.addAchievement("anatomy-beginner");
      if (completed >= 4) store.addAchievement("system-master");
      if (completed >= 8) store.addAchievement("human-architect");
      const result = store.completedLevels[level.id];
      if (result?.stars === 3) store.addAchievement("perfect-run");
      if (store.timer <= 30) store.addAchievement("speed-demon");
      if (store.errors === 0) store.addAchievement("no-errors");

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      if (store.soundEnabled) playSound("complete");
    }
  }, [store.phase]);

  // Redirect if no level
  useEffect(() => {
    if (!level) navigate("/levels");
  }, [level, navigate]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveOrgan(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveOrgan(null);
      const { active, over } = event;
      if (!over) return;

      const organId = active.id as string;
      const zoneId = over.id as string;
      const success = store.placeOrgan(organId, zoneId);

      if (success) {
        if (store.soundEnabled) playSound("success");
      } else {
        if (store.soundEnabled) playSound("error");
        setShakeZone(zoneId);
        setTimeout(() => setShakeZone(null), 500);
      }
    },
    [store]
  );

  if (!level) return null;

  const remainingOrgans = level.organs.filter(
    (o) => !store.placedOrgans.includes(o.id)
  );

  return (
    <div className="min-h-screen grid-bg flex flex-col">
      <GameHeader level={level} />

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Mobile: vertical stack. Desktop: horizontal */}
        <div className="flex-1 flex flex-col lg:flex-row gap-2 sm:gap-4 p-2 sm:p-4 max-w-6xl mx-auto w-full overflow-y-auto">
          
          {/* Organ Panel - top on mobile, left on desktop */}
          <div className="lg:w-56 shrink-0 order-1 lg:order-1">
            <OrganPanel organs={remainingOrgans} phase={store.phase} />
          </div>

          {/* Body - Center */}
          <div className="flex-1 flex items-center justify-center order-2 lg:order-2 min-h-[300px] sm:min-h-[400px]">
            <HumanBody
              level={level}
              placedOrgans={store.placedOrgans}
              organZoneMap={store.organZoneMap}
              madeConnections={store.madeConnections}
              selectedOrgan={store.selectedOrgan}
              phase={store.phase}
              shakeZone={shakeZone}
              onOrganClick={(id) => {
                if (store.phase === "connection") {
                  store.selectForConnection(id);
                  if (store.soundEnabled) playSound("drop");
                }
              }}
            />
          </div>

          {/* Health Panel - bottom on mobile, right on desktop */}
          <div className="lg:w-56 shrink-0 order-3 lg:order-3">
            <HealthPanel level={level} />
          </div>
        </div>

        <DragOverlay>
          {activeOrgan ? (
            <div className="text-4xl opacity-80 pointer-events-none">
              {level.organs.find((o) => o.id === activeOrgan)?.icon}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Phase indicator */}
      <motion.div
        key={store.phase}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pb-2 sm:pb-4 px-2"
      >
        <span className="text-[10px] sm:text-xs font-display tracking-widest text-muted-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass inline-block">
          {store.phase === "placement"
            ? "🫳 SERET ORGAN KE POSISI YANG BENAR"
            : store.phase === "connection"
            ? "🔗 KLIK ORGAN UNTUK MEMBUAT KONEKSI"
            : "✅ LEVEL SELESAI!"}
        </span>
      </motion.div>

      <HintPanel />

      {store.phase === "complete" && store.showEducation && (
        <EducationModal
          education={level.education}
          onClose={() => store.dismissEducation()}
        />
      )}
      {store.phase === "complete" && !store.showEducation && (
        <LevelCompleteModal level={level} />
      )}
    </div>
  );
};

export default GamePlay;
