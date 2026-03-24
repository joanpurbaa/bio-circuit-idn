import { Achievement } from "@/types/game";

export const achievements: Achievement[] = [
  { id: "anatomy-beginner", name: "Anatomy Beginner", description: "Selesaikan level pertama", icon: "🏅" },
  { id: "system-master", name: "System Master", description: "Selesaikan 3 level", icon: "🏆" },
  { id: "human-architect", name: "Human Architect", description: "Selesaikan semua level", icon: "👑" },
  { id: "perfect-run", name: "Perfect Run", description: "Dapatkan 3 bintang di satu level", icon: "⭐" },
  { id: "speed-demon", name: "Speed Demon", description: "Selesaikan level dalam 30 detik", icon: "⚡" },
  { id: "no-errors", name: "Flawless", description: "Selesaikan level tanpa error", icon: "💎" },
];
