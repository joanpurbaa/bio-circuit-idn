import { create } from "zustand";
import { persist } from "zustand/middleware";
import { levels } from "@/data/levels";

interface GameState {
  // Persisted
  xp: number;
  unlockedLevels: number[];
  completedLevels: Record<number, { stars: number; bestTime: number }>;
  achievements: string[];
  soundEnabled: boolean;

  // Session
  currentLevel: number | null;
  phase: "placement" | "connection" | "complete";
  placedOrgans: string[];
  organZoneMap: Record<string, string>;
  madeConnections: Array<{ from: string; to: string }>;
  selectedOrgan: string | null;
  errors: number;
  timer: number;
  showEducation: boolean;
  hintUsed: boolean;
  showHint: boolean;

  // Actions
  startLevel: (levelId: number) => void;
  placeOrgan: (organId: string, zoneId: string) => boolean;
  selectForConnection: (organId: string) => void;
  tick: () => void;
  toggleSound: () => void;
  addAchievement: (id: string) => void;
  completeLevel: () => void;
  dismissEducation: () => void;
  goToMenu: () => void;
  requestHint: () => void;
  dismissHint: () => void;
  getHintText: () => string;
}

const TOTAL_LEVELS = levels.length;

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      xp: 0,
      unlockedLevels: [1],
      completedLevels: {},
      achievements: [],
      soundEnabled: true,

      currentLevel: null,
      phase: "placement",
      placedOrgans: [],
      organZoneMap: {},
      madeConnections: [],
      selectedOrgan: null,
      errors: 0,
      timer: 0,
      showEducation: false,
      hintUsed: false,
      showHint: false,

      startLevel: (levelId) =>
        set({
          currentLevel: levelId,
          phase: "placement",
          placedOrgans: [],
          organZoneMap: {},
          madeConnections: [],
          selectedOrgan: null,
          errors: 0,
          timer: 0,
          showEducation: false,
          hintUsed: false,
          showHint: false,
        }),

      placeOrgan: (organId, zoneId) => {
        const state = get();
        const level = levels.find((l) => l.id === state.currentLevel);
        if (!level) return false;

        const organ = level.organs.find((o) => o.id === organId);
        if (!organ || organ.zoneId !== zoneId) {
          set({ errors: state.errors + 1 });
          return false;
        }

        const newPlaced = [...state.placedOrgans, organId];
        const newMap = { ...state.organZoneMap, [organId]: zoneId };
        const allPlaced = newPlaced.length === level.organs.length;
        const newXP = state.xp + 10;

        set({
          placedOrgans: newPlaced,
          organZoneMap: newMap,
          xp: newXP,
          phase: allPlaced ? "connection" : "placement",
        });
        return true;
      },

      selectForConnection: (organId) => {
        const state = get();
        const level = levels.find((l) => l.id === state.currentLevel);
        if (!level || state.phase !== "connection") return;

        if (!state.selectedOrgan) {
          set({ selectedOrgan: organId });
          return;
        }

        if (state.selectedOrgan === organId) {
          set({ selectedOrgan: null });
          return;
        }

        const from = state.selectedOrgan;
        const to = organId;

        const isValid = level.connections.some(
          (c) => (c.from === from && c.to === to) || (c.from === to && c.to === from)
        );
        const alreadyConnected = state.madeConnections.some(
          (c) => (c.from === from && c.to === to) || (c.from === to && c.to === from)
        );

        if (alreadyConnected) {
          set({ selectedOrgan: null });
          return;
        }

        if (isValid) {
          const newConns = [...state.madeConnections, { from, to }];
          const allConnected = newConns.length >= level.connections.length;
          const newXP = state.xp + 20;

          if (allConnected) {
            const errors = state.errors;
            const stars = errors === 0 ? 3 : errors <= 3 ? 2 : 1;
            const time = state.timer;
            const bonusXP = time <= 30 ? 50 : 0;
            const levelXP = 100 + bonusXP;
            const totalXP = newXP + levelXP;

            const prev = state.completedLevels[level.id];
            const bestStars = prev ? Math.max(prev.stars, stars) : stars;
            const bestTime = prev ? Math.min(prev.bestTime, time) : time;

            const newUnlocked = state.unlockedLevels.includes(level.id + 1)
              ? state.unlockedLevels
              : level.id < TOTAL_LEVELS
              ? [...state.unlockedLevels, level.id + 1]
              : state.unlockedLevels;

            set({
              madeConnections: newConns,
              selectedOrgan: null,
              xp: totalXP,
              phase: "complete",
              showEducation: true,
              completedLevels: {
                ...state.completedLevels,
                [level.id]: { stars: bestStars, bestTime },
              },
              unlockedLevels: newUnlocked,
            });
          } else {
            set({ madeConnections: newConns, selectedOrgan: null, xp: newXP });
          }
        } else {
          set({ selectedOrgan: null, errors: state.errors + 1 });
        }
      },

      tick: () => set((s) => ({ timer: s.timer + 1 })),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      addAchievement: (id) => {
        const state = get();
        if (!state.achievements.includes(id)) {
          set({ achievements: [...state.achievements, id] });
        }
      },
      completeLevel: () => set({ phase: "complete" }),
      dismissEducation: () => set({ showEducation: false }),
      goToMenu: () => set({ currentLevel: null }),

      requestHint: () => set({ showHint: true, hintUsed: true }),
      dismissHint: () => set({ showHint: false }),

      getHintText: () => {
        const state = get();
        const level = levels.find((l) => l.id === state.currentLevel);
        if (!level) return "";

        if (state.phase === "placement") {
          const remaining = level.organs.filter((o) => !state.placedOrgans.includes(o.id));
          if (remaining.length > 0) {
            const organ = remaining[0];
            const zone = level.zones.find((z) => z.id === organ.zoneId);
            return `💡 Coba letakkan "${organ.name}" di zona "${zone?.label}".`;
          }
        }

        if (state.phase === "connection") {
          const remaining = level.connections.filter(
            (c) =>
              !state.madeConnections.some(
                (m) => (m.from === c.from && m.to === c.to) || (m.from === c.to && m.to === c.from)
              )
          );
          if (remaining.length > 0) {
            return `💡 Coba hubungkan: ${remaining[0].label}`;
          }
        }

        return "💡 Kamu sudah di jalur yang benar!";
      },
    }),
    {
      name: "biocircuit-save",
      partialize: (state) => ({
        xp: state.xp,
        unlockedLevels: state.unlockedLevels,
        completedLevels: state.completedLevels,
        achievements: state.achievements,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
