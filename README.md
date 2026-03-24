# 📘 BioCircuit

> **Build the Human System, Learn Biology Through Play.**

BioCircuit adalah platform pembelajaran biologi berbasis web yang menggunakan gamifikasi puzzle untuk membantu siswa memahami sistem organ manusia secara interaktif dan menyenangkan.

---

## 🧠 Latar Belakang

Pembelajaran biologi saat ini masih banyak bergantung pada metode hafalan. Siswa sering kesulitan memahami:

- 📍 Posisi organ dalam tubuh
- 🔍 Fungsi masing-masing organ  
- 🔗 Hubungan antar organ dalam satu sistem

Akibatnya, pembelajaran menjadi kurang menarik dan informasi mudah dilupakan.

**BioCircuit hadir untuk mengubah cara belajar tersebut menjadi pengalaman yang interaktif dan menyenangkan.**

---

## 💡 Solusi yang Ditawarkan

BioCircuit menghadirkan pendekatan pembelajaran berbasis gamifikasi dan interaksi langsung:

- 🧩 **Puzzle Organ** – Menyusun organ tubuh dengan drag & drop
- 🔗 **System Connection** – Menghubungkan organ agar sistem tubuh berfungsi
- 🎮 **Gamification** – XP, level, dan progress system
- 🤖 **AI Summarization** – Merangkum materi menjadi lebih ringkas

---

## 🎮 Fitur Utama

### 1. 🧩 Drag & Drop Organ
Siswa menempatkan organ ke posisi yang benar dalam tubuh manusia dengan antarmuka yang intuitif.

### 2. 🔗 System Connection Puzzle
Organ harus dihubungkan dengan benar agar sistem tubuh dapat berjalan dengan optimal.

### 3. 🎯 Level & XP System
Setiap level mewakili sistem tubuh yang berbeda dengan progres pembelajaran yang terukur.

### 4. 📚 Materi Dasar
Ringkasan konsep untuk membantu pemahaman sebelum bermain.

### 5. 🤖 AI Rangkum
Fitur AI yang membantu menyederhanakan materi pembelajaran secara otomatis.

---

## 🧪 Sistem Organ yang Dipelajari

- ❤️ **Sistem Peredaran Darah** – Jantung, arteri, vena, kapiler
- 🫁 **Sistem Pernapasan** – Paru-paru, trakea, diafragma
- 🧠 **Sistem Saraf** – Otak, sumsum tulang belakang, saraf
- 🍽️ **Sistem Pencernaan** – Mulut, lambung, usus, hati
- 💧 **Sistem Ekskresi** – Ginjal, kandung kemih, kulit
- 💪 **Sistem Otot & Rangka** – Tulang, otot, sendi, ligamen

---

## 🖥️ Cara Menggunakan

### Langkah-Langkah Dasar:

1. **Buka aplikasi** BioCircuit di browser
2. **Pilih Materi Dasar** untuk memahami konsep sebelum bermain
3. **Klik Mulai** untuk masuk ke level puzzle
4. **Drag & drop organ** ke posisi yang benar dalam tubuh manusia
5. **Hubungkan organ** dengan garis hingga sistem aktif dan berfungsi
6. **Dapatkan informasi tambahan** dan rewards setelah puzzle selesai
7. **Kumpulkan XP** dan naik level untuk buka sistem organ baru

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
|----------|-----------|
| **Frontend** | React / Next.js |
| **Backend** | Node.js |
| **Database** | Firebase / MongoDB |
| **AI** | Natural Language Processing (NLP) |
| **UI/UX Design** | Figma |
| **Deployment** | Vercel |
| **Real-time** | Socket.io (opsional) |

---

## 📋 Instalasi

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Git

### Setup Lokal

```bash
# Clone repository
git clone https://github.com/yourusername/biocircuit.git
cd biocircuit

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan konfigurasi Anda

# Run development server
npm run dev

# Akses aplikasi
# Buka http://localhost:3000 di browser
```

---

## 📁 Struktur Proyek

```
biocircuit/
├── public/
│   ├── images/          # Gambar organ dan sistem
│   └── assets/          # Asset statis lainnya
├── src/
│   ├── components/      # React components
│   ├── pages/           # Next.js pages
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utility functions
│   ├── styles/          # CSS/Tailwind styles
│   └── types/           # TypeScript types
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── controllers/      # Business logic
│   └── services/        # External services
├── .env.example         # Environment template
├── package.json
└── README.md
```

---

## 🎯 Target Pengguna

- 🎓 **Siswa SMP & SMA** – Usia 13-18 tahun
- 👩‍🏫 **Guru Biologi** – Untuk membantu pembelajaran di kelas
- 🏫 **Institusi Pendidikan** – Sekolah dan kursus online

---

## 🏆 Keunggulan BioCircuit

| Fitur | BioCircuit | Buku | Video | Quiz App |
|-------|-----------|------|-------|----------|
| **Interaktif** | ✅ | ❌ | ❌ | ⚠️ |
| **Puzzle Organ** | ✅ | ❌ | ❌ | ❌ |
| **Sistem Terhubung** | ✅ | ❌ | ❌ | ❌ |
| **Gamifikasi** | ✅ | ❌ | ❌ | ✅ |
| **Visual 3D** | ✅ | ❌ | ✅ | ❌ |

---

## ⚠️ Batasan Saat Ini

- 📖 Materi masih terbatas pada 6 sistem tubuh utama
- 📱 Belum tersedia versi mobile native
- 🤖 AI masih fokus pada summarization sederhana
- 👨‍👨‍👧 Belum ada fitur multiplayer classroom
- 🔐 Sistem authentication masih dasar

---

## 🚀 Rencana Pengembangan (Roadmap)

### Phase 1 (Q2 2024)
- [ ] Mobile App (Android & iOS)
- [ ] Improve UI/UX berdasarkan user feedback

### Phase 2 (Q3 2024)
- [ ] Teacher Dashboard untuk tracking siswa
- [ ] Multiplayer Classroom Mode
- [ ] Expansion ke 6 sistem organ tambahan

### Phase 3 (Q4 2024)
- [ ] AI Adaptive Learning
- [ ] Analytics dan Progress Tracking
- [ ] Sertifikat digital untuk setiap sistem yang diselesaikan

### Phase 4 (2025)
- [ ] 🧬 Ekspansi ke Kimia & Fisika
- [ ] 🕶️ AR/VR untuk simulasi organ 3D
- [ ] 🌐 Multi-bahasa support
- [ ] Offline mode

---

## 🤝 Kontribusi

Kami terbuka untuk kontribusi! Silakan ikuti langkah berikut:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📄 Lisensi

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

---

## 📞 Kontak & Support

- 📧 Email: support@biocircuit.com
- 🐛 Issue Tracker: [GitHub Issues](https://github.com/yourusername/biocircuit/issues)
- 💬 Discord Community: [Join Server](https://discord.gg/biocircuit)

---

## 🙏 Terima Kasih

Terima kasih telah menggunakan BioCircuit! Semoga platform ini membantu siswa memahami biologi dengan cara yang lebih menyenangkan dan interaktif.

**BioCircuit bukan sekadar aplikasi belajar, tetapi sebuah langkah menuju transformasi pembelajaran biologi yang lebih interaktif, visual, dan bermakna.**

---

<div align="center">

Made with ❤️ for Biology Education

⭐ Jika project ini bermanfaat, silakan berikan bintang!

</div>
