import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Heart, Wind, Brain, Utensils, Droplets, Bone, FlaskConical } from "lucide-react";

const materiData = [
  {
    title: "Sistem Peredaran Darah",
    icon: <Heart className="text-destructive" size={24} />,
    emoji: "❤️",
    content: "Sistem peredaran darah terdiri dari jantung, pembuluh darah, dan darah. Jantung memompa darah yang kaya oksigen ke seluruh tubuh melalui arteri, dan darah kembali melalui vena.",
    keyPoints: [
      "Jantung memiliki 4 ruang: 2 atrium dan 2 ventrikel",
      "Arteri membawa darah dari jantung, vena membawa darah ke jantung",
      "Sel darah merah mengandung hemoglobin untuk mengikat oksigen",
      "Sirkulasi pulmoner: jantung → paru-paru → jantung",
      "Sirkulasi sistemik: jantung → seluruh tubuh → jantung",
    ],
  },
  {
    title: "Sistem Pernapasan",
    icon: <Wind className="text-primary" size={24} />,
    emoji: "🫁",
    content: "Sistem pernapasan memungkinkan tubuh mengambil oksigen (O₂) dan mengeluarkan karbon dioksida (CO₂). Udara masuk melalui hidung/mulut, melewati trakea, dan sampai ke paru-paru.",
    keyPoints: [
      "Alveolus adalah tempat pertukaran gas di paru-paru",
      "Diafragma berkontraksi saat inspirasi (menarik napas)",
      "Kapasitas paru-paru dewasa sekitar 6 liter udara",
      "Frekuensi napas normal: 12-20 kali per menit",
      "Oksigen dibawa oleh hemoglobin dalam sel darah merah",
    ],
  },
  {
    title: "Sistem Saraf",
    icon: <Brain className="text-neon-purple" size={24} />,
    emoji: "🧠",
    content: "Sistem saraf adalah pusat kendali tubuh yang mengirim dan menerima sinyal elektrik. Terdiri dari sistem saraf pusat (otak & sumsum tulang belakang) dan sistem saraf tepi.",
    keyPoints: [
      "Neuron adalah sel dasar sistem saraf",
      "Sinaps adalah titik koneksi antar neuron",
      "Otak besar (cerebrum) mengatur pikiran dan gerakan sadar",
      "Otak kecil (cerebellum) mengatur keseimbangan",
      "Refleks adalah respons otomatis tanpa melalui otak",
    ],
  },
  {
    title: "Sistem Pencernaan",
    icon: <Utensils className="text-neon-yellow" size={24} />,
    emoji: "🫃",
    content: "Sistem pencernaan memecah makanan menjadi nutrisi yang dapat diserap tubuh. Prosesnya dimulai dari mulut dan berakhir di usus besar.",
    keyPoints: [
      "Pencernaan mekanik terjadi di mulut (mengunyah)",
      "Pencernaan kimiawi menggunakan enzim (amilase, pepsin, lipase)",
      "Lambung memiliki pH sekitar 1.5-3.5 (sangat asam)",
      "Usus halus memiliki vili untuk memperluas permukaan penyerapan",
      "Usus besar menyerap air dan membentuk feses",
    ],
  },
  {
    title: "Sistem Ekskresi",
    icon: <Droplets className="text-primary" size={24} />,
    emoji: "💧",
    content: "Sistem ekskresi mengeluarkan zat sisa metabolisme dari tubuh. Ginjal menyaring darah dan menghasilkan urine, sedangkan kulit mengeluarkan keringat.",
    keyPoints: [
      "Nefron adalah unit fungsional terkecil ginjal",
      "Proses filtrasi, reabsorpsi, dan sekresi terjadi di ginjal",
      "Urine mengandung urea, air, dan garam mineral",
      "Kulit juga termasuk organ ekskresi (keringat)",
      "Paru-paru mengekskresikan CO₂ dan uap air",
    ],
  },
  {
    title: "Sistem Otot & Rangka",
    icon: <Bone className="text-foreground" size={24} />,
    emoji: "💪",
    content: "Sistem gerak terdiri dari tulang (rangka) dan otot yang bekerja sama untuk menghasilkan gerakan. Sendi menghubungkan tulang-tulang.",
    keyPoints: [
      "Tulang tersusun dari kalsium dan kolagen",
      "3 jenis otot: otot rangka, otot polos, otot jantung",
      "Sendi peluru (bahu), sendi engsel (siku), sendi putar (leher)",
      "Otot bekerja secara antagonis (fleksor vs ekstensor)",
      "Sumsum tulang memproduksi sel darah",
    ],
  },
  {
    title: "Sistem Endokrin",
    icon: <FlaskConical className="text-neon-purple" size={24} />,
    emoji: "🧪",
    content: "Sistem endokrin menghasilkan hormon yang mengatur berbagai fungsi tubuh seperti pertumbuhan, metabolisme, dan reproduksi melalui kelenjar-kelenjar khusus.",
    keyPoints: [
      "Hipotalamus menghubungkan sistem saraf dan endokrin",
      "Hormon tiroksin mengatur metabolisme tubuh",
      "Insulin dan glukagon mengatur kadar gula darah",
      "Hormon pertumbuhan (GH) dihasilkan kelenjar pituitari",
      "Adrenalin dihasilkan kelenjar adrenal saat stres",
    ],
  },
];

const Materi = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Kembali
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <BookOpen className="text-primary" size={28} />
          <h1 className="font-display text-2xl md:text-3xl font-bold text-primary neon-text-cyan">
            Materi Dasar
          </h1>
        </motion.div>

        <p className="text-muted-foreground mb-8 text-sm">
          Pelajari dasar-dasar sistem organ tubuh manusia sebelum memulai game.
        </p>

        <div className="space-y-4">
          {materiData.map((materi, i) => (
            <motion.details
              key={materi.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl group"
            >
              <summary className="flex items-center gap-4 p-5 cursor-pointer list-none select-none hover:bg-white/5 rounded-xl transition-colors">
                <span className="text-2xl">{materi.emoji}</span>
                {materi.icon}
                <div className="flex-1">
                  <h3 className="font-display text-sm font-semibold text-foreground tracking-wider">
                    {materi.title}
                  </h3>
                </div>
                <span className="text-muted-foreground text-xs font-display group-open:rotate-90 transition-transform">▶</span>
              </summary>
              <div className="px-5 pb-5 border-t border-border/50 pt-4">
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  {materi.content}
                </p>
                <h4 className="font-display text-xs tracking-widest text-primary mb-3">POIN PENTING</h4>
                <ul className="space-y-2">
                  {materi.keyPoints.map((point, j) => (
                    <li key={j} className="flex gap-2 text-sm text-foreground/70">
                      <span className="text-accent shrink-0">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materi;
