// ==================== GLOBAL STATE ====================
let currentUser = '';
let currentScreen = 'homeScreen';
let currentService = '';
let chatHistory = [];
let isTyping = false;
let infoScrollInterval = null;
let currentInfoIndex = 0;
let currentCategory = null;

// ==================== INFO CARDS DATA ====================
const infoCardsData = [
  {
    type: 'time',
    icon: '🕐',
    badge: 'Waktu',
    title: 'Jam & Tanggal',
    isLive: true
  },
  {
    type: 'weather',
    icon: '🌤️',
    badge: 'Cuaca',
    title: 'Cuaca Semarang',
    temp: '29°C',
    condition: 'Cerah Berawan',
    humidity: '75%'
  },
  {
    type: 'warning',
    icon: '⚠️',
    badge: 'Penting',
    title: 'Blangko KTP Menipis!',
    content: 'Cetak KTP diprioritaskan untuk KTP hilang/rusak. Mohon pengertiannya.'
  },
  {
    type: 'location',
    icon: '📍',
    badge: 'Lokasi',
    title: 'TPPDK Semarang Selatan',
    content: 'Jl. Peterongan Raya, Semarang',
    link: 'https://maps.app.goo.gl/NjwbHdTpFp2dPc6w9'
  },
  {
    type: 'tips',
    icon: '💡',
    badge: 'Tips',
    title: 'Tips Mengurus Dokumen',
    content: 'Siapkan dokumen ASLI + fotokopi. Datang sebelum jam tutup!'
  }
];

// ==================== BERITA SEMARANG DATA (UPDATED LINKS) ====================
const newsData = [
  { 
    icon: '🏛️', 
    text: 'Portal Resmi Pemerintah Kota Semarang', 
    isNew: true,
    link: 'https://www.semarangkota.go.id/',
    source: 'Pemkot Semarang',
    description: 'Website resmi Pemerintah Kota Semarang. Berisi informasi layanan publik, berita terkini, dan pengumuman resmi dari Pemkot Semarang.'
  },
  { 
    icon: '🚌', 
    text: 'Trans Semarang - Transportasi Publik', 
    isNew: true,
    link: 'https://dishub.semarangkota.go.id/trans-semarang-2/',
    source: 'Dishub Semarang',
    description: 'Informasi lengkap tentang Trans Semarang meliputi rute, koridor, jadwal, dan tarif bus Trans Semarang.'
  },
  { 
    icon: '🌳', 
    text: 'Simpang Lima - Ikon Kota Semarang', 
    isNew: false,
    link: 'https://www.tripadvisor.co.id/Attraction_Review-g297712-d9705673-Reviews-Simpang_Lima-Semarang_Central_Java_Java.html',
    source: 'TripAdvisor',
    description: 'Simpang Lima adalah landmark terkenal di Semarang. Tempat berkumpul warga, kuliner malam, dan berbagai acara kota.'
  },
  { 
    icon: '📚', 
    text: 'Perpustakaan Digital Indonesia', 
    isNew: false,
    link: 'https://perpustakaan.co.id/home.ks',
    source: 'Perpustakaan Digital',
    description: 'Akses ribuan buku digital secara gratis. Tersedia berbagai koleksi buku, jurnal, dan referensi untuk masyarakat.'
  },
  { 
    icon: '🏥', 
    text: 'Layanan Kesehatan Kota Semarang', 
    isNew: false,
    link: 'https://dinkes.semarangkota.go.id/',
    source: 'Dinkes Semarang',
    description: 'Informasi layanan kesehatan, puskesmas, rumah sakit, dan program kesehatan di Kota Semarang.'
  },
  { 
    icon: '📱', 
    text: 'Aplikasi S\'DnoK - Layanan Online', 
    isNew: true,
    link: 'https://play.google.com/store/apps/details?id=semarangkota.sidnok',
    source: 'Dukcapil Semarang',
    description: 'Download aplikasi S\'DnoK untuk mendaftar layanan Dukcapil secara online. Mudah, cepat, dan praktis!'
  }
];

// ==================== MUSIC DATA ====================
const musicData = [
  { id: 1, title: 'Gambang Suling', artist: 'Musik Tradisional Jawa', duration: '3:45' },
  { id: 2, title: 'Lir Ilir', artist: 'Sunan Kalijaga', duration: '4:12' },
  { id: 3, title: 'Semarang Kota Lumpia', artist: 'Lagu Khas Semarang', duration: '3:55' }
];

// ==================== LAYANAN DATA (COMPLETE) ====================
const layananData = {
  "Akta Kelahiran": {
    type: "online",
    emoji: "👶",
    description: "Pencatatan kelahiran untuk WNI dan Orang Asing",
    categories: [
      { key: "wni_nkri", label: "WNI dalam NKRI", emoji: "🇮🇩" },
      { key: "oa_nkri", label: "Orang Asing di NKRI", emoji: "🌍" }
    ],
    wni_nkri: {
      title: "Pencatatan Kelahiran WNI Dalam Wilayah NKRI",
      syarat: [
        "Surat keterangan kelahiran dari RS/Puskesmas/fasilitas kesehatan/dokter/bidan",
        "Atau surat keterangan dari nahkoda kapal laut/kapten pesawat terbang",
        "Atau dari kepala desa/lurah jika lahir di rumah/tempat lain (kebun, sawah, angkutan umum)",
        "Buku nikah/kutipan akta perkawinan/bukti lain yang sah",
        "Kartu Keluarga di mana penduduk terdaftar atau akan didaftarkan",
        "Berita acara dari kepolisian (untuk anak tidak diketahui asal usulnya)"
      ],
      catatan_khusus: [
        "💡 Jika tidak punya surat kelahiran: Buat SPTJM kebenaran data kelahiran dengan 2 orang saksi",
        "💡 Jika tidak punya buku nikah: Buat SPTJM kebenaran sebagai pasangan suami istri dengan 2 orang saksi"
      ]
    },
    oa_nkri: {
      title: "Pencatatan Kelahiran Orang Asing Di Wilayah NKRI",
      syarat: [
        "Surat keterangan kelahiran dari RS/Puskesmas/fasilitas kesehatan/dokter/bidan",
        "Buku nikah/kutipan akta perkawinan/bukti lain yang sah",
        "Dokumen Perjalanan (Paspor)",
        "KTP-el orang tua atau KITAP atau KITAS atau Visa Kunjungan"
      ],
      catatan_khusus: [
        "💡 Jika tidak punya surat kelahiran: Buat SPTJM dengan 2 orang saksi",
        "💡 Jika tidak punya buku nikah: Buat SPTJM pasangan suami istri dengan 2 orang saksi"
      ]
    },
    catatan: ["📱 Daftar melalui aplikasi S'DnoK", "📄 Untuk pelayanan online, dokumen yang discan/difoto harus ASLI"]
  },
  
  "Akta Kematian": {
    type: "offline",
    emoji: "🕊️",
    description: "Pencatatan kematian dalam wilayah NKRI",
    categories: [
      { key: "umum", label: "Kematian Umum", emoji: "📋" },
      { key: "tidak_jelas", label: "Identitas Tidak Jelas", emoji: "❓" },
      { key: "hilang", label: "Hilang/Tidak Ditemukan", emoji: "🔍" }
    ],
    umum: {
      title: "Pencatatan Kematian Umum",
      syarat: [
        "Surat kematian dari dokter atau kepala desa/lurah",
        "KK yang meninggal dunia",
        "KTP-el yang meninggal dunia",
        "KK pelapor",
        "KTP-el pelapor"
      ]
    },
    tidak_jelas: {
      title: "Kematian dengan Identitas Tidak Jelas",
      syarat: [
        "Surat keterangan kepolisian",
        "KK pelapor",
        "KTP-el pelapor"
      ]
    },
    hilang: {
      title: "Kematian Orang Hilang/Jenazah Tidak Ditemukan",
      syarat: [
        "Salinan penetapan pengadilan, ATAU",
        "Surat pernyataan kematian dari maskapai penerbangan, ATAU",
        "Surat keterangan kematian dari Perwakilan RI (jika meninggal di luar negeri)",
        "Dokumen Perjalanan RI (untuk WNI bukan penduduk)",
        "KK pelapor",
        "KTP-el pelapor"
      ]
    },
    catatan: [
      "🏢 Langsung ke TPPDK",
      "👥 Pelapor: anak/ahli waris (min. 21 th/sudah menikah) ATAU Ketua RT",
      "📄 Untuk pelayanan online, dokumen yang discan/difoto harus ASLI"
    ]
  },
  
  "Cetak KTP": {
    type: "offline",
    emoji: "🪪",
    description: "Penerbitan KTP-el baru, rusak, hilang",
    categories: [
      { key: "baru_wni", label: "KTP Baru (WNI)", emoji: "🆕" },
      { key: "pindah_ubah", label: "Pindah/Perubahan Data", emoji: "✏️" },
      { key: "rusak", label: "KTP Rusak", emoji: "💔" },
      { key: "hilang", label: "KTP Hilang", emoji: "🔍" },
      { key: "oa", label: "Orang Asing", emoji: "🌍" }
    ],
    baru_wni: {
      title: "Penerbitan KTP-el Baru Untuk WNI",
      syarat: [
        "Telah berusia 17 tahun, sudah kawin, atau pernah kawin",
        "Kartu Keluarga",
        "Kutipan Akta Kelahiran"
      ]
    },
    pindah_ubah: {
      title: "KTP-el karena Pindah atau Perubahan Data",
      syarat: [
        "Surat Keterangan Pindah (jika pindah datang)",
        "KTP-el lama",
        "Surat keterangan/bukti perubahan peristiwa kependudukan"
      ]
    },
    rusak: {
      title: "KTP-el Rusak",
      syarat: [
        "KTP-el yang rusak (WAJIB dibawa)",
        "Kartu Keluarga"
      ]
    },
    hilang: {
      title: "KTP-el Hilang",
      syarat: [
        "⚠️ WAJIB: Surat Kehilangan dari POLSEK",
        "Kartu Keluarga"
      ]
    },
    oa: {
      title: "KTP-el Untuk Orang Asing",
      syarat: [
        "Kartu Izin Tinggal Tetap (KITAP)",
        "Telah berusia 17 tahun, sudah kawin, atau pernah kawin",
        "Kartu Keluarga",
        "Dokumen Perjalanan (Paspor)"
      ]
    },
    catatan: [
      "🏢 Langsung ke TPPDK Kecamatan untuk perekaman",
      "⚠️ PERHATIAN: Blangko KTP sedang MENIPIS!",
      "🎯 Prioritas: KTP hilang/rusak"
    ]
  },
  
  "Rekam KTP": {
    type: "offline",
    emoji: "📸",
    description: "Perekaman biometrik KTP-el",
    categories: [
      { key: "baru", label: "Rekam Baru", emoji: "🆕" },
      { key: "ulang", label: "Rekam Ulang", emoji: "🔄" }
    ],
    baru: {
      title: "Rekam KTP-el Baru",
      syarat: [
        "Telah berusia 17 tahun, sudah kawin, atau pernah kawin",
        "Kutipan Akta Kelahiran",
        "Kartu Keluarga"
      ]
    },
    ulang: {
      title: "Rekam Ulang KTP-el",
      syarat: [
        "Kartu Keluarga",
        "KTP-el lama (jika ada)"
      ]
    },
    catatan: [
      "🏢 WAJIB datang langsung ke TPPDK Kecamatan",
      "⏱️ Estimasi waktu: 15-30 menit",
      "📷 Akan dilakukan foto, rekam sidik jari, dan tanda tangan"
    ]
  },
  
  "Kartu Identitas Anak": {
    type: "online",
    emoji: "👧",
    description: "KIA untuk anak usia 0-17 tahun",
    categories: [
      { key: "baru", label: "KIA Baru", emoji: "🆕" },
      { key: "hilang", label: "KIA Hilang", emoji: "🔍" },
      { key: "rusak", label: "KIA Rusak", emoji: "💔" }
    ],
    baru: {
      title: "Penerbitan KIA Baru",
      syarat: [
        "Kutipan Akta Kelahiran",
        "Kartu Keluarga orang tua/wali",
        "KTP-el kedua orang tua/wali",
        "Pas foto anak berwarna (untuk usia 5-17 tahun kurang 1 hari)"
      ]
    },
    hilang: {
      title: "KIA Hilang",
      syarat: [
        "Surat kehilangan dari POLSEK",
        "Kartu Keluarga",
        "KTP-el orang tua/wali"
      ]
    },
    rusak: {
      title: "KIA Rusak",
      syarat: [
        "KIA yang rusak",
        "Kartu Keluarga",
        "KTP-el orang tua/wali"
      ]
    },
    catatan: [
      "📱 Daftar melalui aplikasi S'DnoK",
      "📸 Pas foto diperlukan untuk anak usia 5 tahun ke atas",
      "📄 Untuk pelayanan online, dokumen yang discan/difoto harus ASLI"
    ]
  },
  
  "Perubahan Biodata Kartu Keluarga": {
    type: "online",
    emoji: "📋",
    description: "Perubahan dan penerbitan KK",
    categories: [
      { key: "keluarga_baru", label: "Membentuk Keluarga Baru", emoji: "👨‍👩‍👧" },
      { key: "ganti_kk", label: "Ganti Kepala Keluarga", emoji: "👤" },
      { key: "pisah_kk", label: "Pisah KK (1 Alamat)", emoji: "🏠" },
      { key: "ubah_data", label: "Perubahan Data", emoji: "✏️" },
      { key: "hilang_rusak", label: "KK Hilang/Rusak", emoji: "🔍" }
    ],
    keluarga_baru: {
      title: "KK Baru Karena Membentuk Keluarga Baru",
      syarat: [
        "Kartu Keluarga (lama)",
        "Buku nikah/kutipan akta perkawinan atau kutipan akta perceraian",
        "SPTJM perkawinan/perceraian belum tercatat (jika tidak ada akta)"
      ],
      catatan_khusus: [
        "💍 Jika istri lebih dari satu: Ada surat persetujuan dari istri sebelumnya"
      ]
    },
    ganti_kk: {
      title: "KK Baru Karena Penggantian Kepala Keluarga",
      syarat: [
        "Akta Kematian kepala keluarga",
        "KK lama"
      ]
    },
    pisah_kk: {
      title: "Pisah KK Dalam 1 Alamat",
      syarat: [
        "KK lama",
        "Berumur minimal 17 tahun atau sudah kawin/pernah kawin",
        "Memiliki KTP-el"
      ]
    },
    ubah_data: {
      title: "KK Karena Perubahan Data",
      syarat: [
        "KK lama",
        "Surat keterangan/bukti perubahan (contoh: paspor, SKPWNI)"
      ]
    },
    hilang_rusak: {
      title: "KK Hilang/Rusak",
      syarat: [
        "Surat keterangan hilang dari kepolisian (jika hilang) ATAU KK yang rusak",
        "KTP-el",
        "KITAP (untuk Orang Asing)"
      ]
    },
    catatan: [
      "📱 Daftar melalui aplikasi S'DnoK",
      "📄 Untuk pelayanan online, dokumen yang discan/difoto harus ASLI"
    ]
  },
  
  "Perpindahan": {
    type: "online",
    emoji: "🏠",
    description: "Pindah keluar dan kedatangan penduduk",
    categories: [
      { key: "keluar", label: "Pindah Keluar", emoji: "🚚" },
      { key: "datang", label: "Kedatangan/Pindah Masuk", emoji: "🏡" }
    ],
    keluar: {
      title: "Perpindahan Penduduk WNI Keluar",
      syarat: [
        "Kartu Keluarga"
      ],
      catatan_khusus: [
        "📝 Untuk pindah antar kelurahan/kecamatan dalam Kota Semarang:",
        "• Surat Pernyataan Perubahan Elemen Data (jika ada perubahan data)",
        "• Surat Pernyataan Alamat untuk Administrasi Kependudukan (jika kontrak)",
        "• Surat Pernyataan Tidak Keberatan Numpang KK (jika masuk ke KK pemilik rumah)"
      ]
    },
    datang: {
      title: "Kedatangan Penduduk WNI",
      syarat: [
        "SKPWNI (Surat Keterangan Pindah WNI)",
        "KTP-el dan/atau KIA (untuk diganti baru)",
        "Surat Nikah/Cerai (jika sudah menikah/cerai)",
        "Surat Pernyataan Perubahan Elemen Data (jika ada perubahan)",
        "Surat Pernyataan Alamat untuk Administrasi Kependudukan (jika kontrak)",
        "Surat Pernyataan Tidak Keberatan Numpang KK (jika numpang KK)"
      ]
    },
    catatan: [
      "📱 Daftar melalui aplikasi S'DnoK",
      "📄 Untuk pelayanan online, dokumen yang discan/difoto harus ASLI"
    ]
  },
  
  "Akta Nikah Cerai": {
    type: "online",
    emoji: "💍",
    description: "Pencatatan perkawinan dan perceraian",
    categories: [
      { key: "nikah_wni", label: "Nikah WNI", emoji: "💒" },
      { key: "nikah_oa", label: "Nikah Orang Asing", emoji: "🌍" },
      { key: "cerai", label: "Perceraian", emoji: "📜" }
    ],
    nikah_wni: {
      title: "Pencatatan Perkawinan WNI",
      syarat: [
        "Surat keterangan telah terjadinya perkawinan dari pemuka agama/penghayat kepercayaan",
        "Akta Kelahiran kedua calon pengantin",
        "Foto berdampingan ukuran 4x6 berwarna, background bebas",
        "KTP-el kedua calon pengantin",
        "Kartu Keluarga kedua calon pengantin",
        "Surat Pengantar Nikah dari Kelurahan kedua calon pengantin"
      ],
      catatan_khusus: [
        "💔 Janda/duda cerai mati: Lampirkan akta kematian pasangan",
        "💔 Janda/duda cerai hidup: Lampirkan akta perceraian"
      ]
    },
    nikah_oa: {
      title: "Pencatatan Perkawinan Orang Asing",
      syarat: [
        "Surat keterangan telah terjadinya perkawinan dari pemuka agama",
        "Foto berdampingan suami istri ukuran 4x6 berwarna",
        "Dokumen Perjalanan (Paspor)",
        "Surat keterangan tempat tinggal (untuk pemegang izin tinggal terbatas)",
        "Izin perkawinan dari negara asal/perwakilannya",
        "Akta kelahiran + terjemahan Bahasa Indonesia (dari penerjemah tersumpah)",
        "KTP-el Asli",
        "KK Asli"
      ]
    },
    cerai: {
      title: "Pencatatan Perceraian",
      syarat: [
        "Salinan putusan pengadilan yang telah berkekuatan hukum tetap",
        "Kutipan akta perkawinan ASLI",
        "KTP-el Asli",
        "KK Asli"
      ]
    },
    catatan: [
      "📱 Daftar melalui aplikasi S'DnoK",
      "📄 Untuk pelayanan online, dokumen yang discan/difoto harus ASLI"
    ]
  },
  
  "FAQ": {
    type: "info",
    emoji: "❓",
    description: "Pertanyaan yang sering ditanyakan"
  }
};

// ==================== AI KNOWLEDGE BASE ====================
const aiKnowledge = {
  greetings: {
    keywords: ['halo', 'hai', 'hi', 'hello', 'hey', 'pagi', 'siang', 'sore', 'malam', 'selamat', 'permisi', 'assalamualaikum'],
    responses: [
      "Halo {name}! 👋 Ada yang bisa saya bantu hari ini?",
      "Hai {name}! 😊 Silakan tanya apa saja tentang layanan Dukcapil!",
      "Halo {name}! Saya SIDINA, asisten virtual Dukcapil. Ada yang bisa dibantu?"
    ]
  },
  thanks: {
    keywords: ['terima kasih', 'makasih', 'thanks', 'thx', 'tq', 'thank you', 'trims'],
    responses: [
      "Sama-sama {name}! 😊 Senang bisa membantu!",
      "Terima kasih kembali! Jangan ragu bertanya lagi ya! 👍",
      "Dengan senang hati! Ada yang lain yang bisa saya bantu?"
    ]
  },
  biaya: {
    keywords: ['biaya', 'bayar', 'harga', 'tarif', 'gratis', 'berbayar', 'berapa', 'mahal', 'murah', 'ongkos'],
    responses: [
      "💰 <strong>GRATIS!</strong>\n\nSemua layanan dokumen kependudukan di Dukcapil <strong>tidak dipungut biaya</strong> sepeserpun!\n\n⚠️ Jika ada yang meminta bayaran, silakan laporkan ke:\n📞 Hotline Dukcapil atau\n📍 Langsung ke kantor Dukcapil"
    ]
  },
  waktu: {
    keywords: ['berapa lama', 'kapan jadi', 'kapan selesai', 'estimasi', 'waktu proses', 'tunggu', 'lama'],
    responses: [
      "⏱️ <strong>Estimasi Waktu Proses:</strong>\n\n🪪 Cetak KTP-el: 10-15 menit\n📸 Rekam KTP-el: 15-30 menit\n👶 Akta Kelahiran: 3-7 hari kerja\n📋 Kartu Keluarga: 3-7 hari kerja\n👧 KIA: 3-7 hari kerja\n\n💡 Tips: Datang pagi agar tidak antri lama!"
    ]
  },
  jam: {
    keywords: ['jam buka', 'jam operasional', 'jam kerja', 'buka jam', 'tutup jam', 'jadwal', 'libur', 'buka', 'tutup'],
    responses: [
      "🕐 <strong>Jam Operasional TPPDK:</strong>\n\n📅 Senin - Kamis: 08.15 - 15.00 WIB\n📅 Jumat: 08.00 - 13.00 WIB\n🚫 Sabtu - Minggu: LIBUR\n\n💡 Tips: Datang sebelum jam tutup untuk menghindari penolakan!"
    ]
  },
  lokasi: {
    keywords: ['lokasi', 'alamat', 'dimana', 'tempat', 'kantor', 'maps', 'arah', 'posisi'],
    responses: [
      "📍 <strong>Lokasi TPPDK Kec. Semarang Selatan:</strong>\n\nJl. Peterongan Raya, Semarang\n\n🗺️ <a href='https://maps.app.goo.gl/NjwbHdTpFp2dPc6w9' target='_blank' style='color: var(--primary-light);'>Buka di Google Maps →</a>"
    ]
  },
  sidenok: {
    keywords: ['sidenok', 'sidnok', 'aplikasi', 'daftar online', 'online', 'download', 'unduh', 'app'],
    responses: [
      "📱 <strong>Aplikasi S'DnoK</strong>\n\nUntuk layanan ONLINE (Akta, KK, KIA, dll), kamu harus daftar melalui aplikasi S'DnoK!\n\n📲 Download di Play Store:\n<a href='https://play.google.com/store/apps/details?id=semarangkota.sidnok' target='_blank' style='color: var(--primary-light);'>Download S'DnoK →</a>\n\n💡 Daftar dulu di aplikasi, lalu datang sesuai jadwal yang ditentukan."
    ]
  },
  blangko: {
    keywords: ['blangko', 'stok', 'habis', 'kosong', 'menipis', 'persediaan'],
    responses: [
      "⚠️ <strong>INFO PENTING!</strong>\n\nSaat ini stok blangko KTP-el sedang <strong>MENIPIS</strong>.\n\n🎯 Prioritas diberikan untuk:\n• KTP-el hilang (dengan surat kehilangan dari Polsek)\n• KTP-el rusak (dengan membawa KTP rusak)\n\n🙏 Mohon pengertiannya. Terima kasih!"
    ]
  },
  sptjm: {
    keywords: ['sptjm', 'surat pernyataan', 'tidak punya', 'tidak ada', 'belum punya', 'gak punya', 'ga punya'],
    responses: [
      "📝 <strong>SPTJM (Surat Pernyataan Tanggung Jawab Mutlak)</strong>\n\nJika kamu tidak memiliki dokumen yang disyaratkan, kamu bisa membuat SPTJM!\n\n<strong>Jenis SPTJM:</strong>\n• SPTJM Kebenaran Data Kelahiran (pengganti surat kelahiran)\n• SPTJM Kebenaran Pasangan Suami Istri (pengganti buku nikah)\n\n⚠️ Syarat: Harus ada <strong>2 orang saksi</strong>"
    ]
  },
  polsek: {
    keywords: ['polsek', 'surat kehilangan', 'laporan polisi', 'hilang', 'kehilangan'],
    responses: [
      "🚔 <strong>Surat Kehilangan dari Polsek</strong>\n\nUntuk mengurus dokumen yang hilang, kamu <strong>WAJIB</strong> membawa surat kehilangan dari Polsek!\n\n📋 Caranya:\n1. Datang ke Polsek terdekat\n2. Bawa fotokopi dokumen yang hilang (jika ada)\n3. Isi formulir laporan kehilangan\n4. Minta surat keterangan kehilangan\n\n💡 Gratis dan prosesnya cepat!"
    ]
  }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
  const savedUser = localStorage.getItem('sidinaUser');
  if (savedUser) {
    currentUser = savedUser;
    showMainApp();
  }
  
  renderInfoCards();
  renderNewsCards();
  renderMusicPlaylist();
  updateOperationStatus();
  startInfoAutoScroll();
  
  setInterval(updateOperationStatus, 60000);
  setInterval(updateLiveTime, 1000);
  
  document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  });
  
  document.getElementById('nameInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') startApp();
  });
});

// ==================== LOGIN ====================
function startApp() {
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value.trim();
  
  if (!name) {
    nameInput.style.animation = 'shake 0.5s';
    setTimeout(() => nameInput.style.animation = '', 500);
    return;
  }
  
  currentUser = name;
  localStorage.setItem('sidinaUser', name);
  showMainApp();
}

function showMainApp() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
  
  document.querySelectorAll('#userName').forEach(el => el.textContent = currentUser);
  
  const profileName = document.getElementById('profileName');
  if (profileName) profileName.textContent = currentUser;
  
  const userInitial = document.getElementById('userInitial');
  if (userInitial) userInitial.textContent = currentUser.charAt(0).toUpperCase();
}

function logout() {
  if (confirm('Yakin ingin keluar?')) {
    localStorage.removeItem('sidinaUser');
    location.reload();
  }
}

// ==================== SCREEN NAVIGATION ====================
function switchScreen(screenId) {
  document.querySelectorAll('.app-screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
  
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.screen === screenId) item.classList.add('active');
  });
  
  currentScreen = screenId;
  
  if (screenId === 'chatScreen') {
    document.getElementById('serviceSelection').classList.remove('hidden');
    document.getElementById('chatInterface').classList.add('hidden');
  }
}

// ==================== INFO CARDS ====================
function renderInfoCards() {
  const container = document.getElementById('infoScroll');
  if (!container) return;
  
  container.innerHTML = '';
  const allCards = [...infoCardsData, ...infoCardsData];
  
  allCards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = `info-card ${card.type}`;
    
    let content = '';
    
    if (card.type === 'time') {
      content = `
        <div class="info-card-header">
          <span class="info-card-icon">${card.icon}</span>
          <span class="info-card-badge">${card.badge}</span>
        </div>
        <div class="time-display" id="liveTime${index}">--:--:--</div>
        <div class="date-display" id="liveDate${index}">Memuat...</div>
      `;
    } else if (card.type === 'weather') {
      content = `
        <div class="info-card-header">
          <span class="info-card-icon">${card.icon}</span>
          <span class="info-card-badge">${card.badge}</span>
        </div>
        <div class="weather-display">
          <span class="weather-temp">${card.temp}</span>
          <div class="weather-details">
            <div>${card.condition}</div>
            <div>💧 ${card.humidity}</div>
          </div>
        </div>
        <p class="info-card-content">Semarang, Jawa Tengah</p>
      `;
    } else if (card.type === 'location') {
      content = `
        <div class="info-card-header">
          <span class="info-card-icon">${card.icon}</span>
          <span class="info-card-badge">${card.badge}</span>
        </div>
        <h4 class="info-card-title">${card.title}</h4>
        <p class="info-card-content">${card.content}</p>
        <div class="info-card-footer">
          <a href="${card.link}" target="_blank" class="info-card-link">Buka di Maps →</a>
        </div>
      `;
    } else {
      content = `
        <div class="info-card-header">
          <span class="info-card-icon">${card.icon}</span>
          <span class="info-card-badge">${card.badge}</span>
        </div>
        <h4 class="info-card-title">${card.title}</h4>
        <p class="info-card-content">${card.content}</p>
      `;
    }
    
    cardEl.innerHTML = content;
    container.appendChild(cardEl);
  });
  
  updateLiveTime();
}

function updateLiveTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID');
  const dateStr = now.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  document.querySelectorAll('[id^="liveTime"]').forEach(el => el.textContent = timeStr);
  document.querySelectorAll('[id^="liveDate"]').forEach(el => el.textContent = dateStr);
}

function startInfoAutoScroll() {
  const container = document.getElementById('infoScroll');
  if (!container) return;
  
  infoScrollInterval = setInterval(() => {
    currentInfoIndex++;
    const cardWidth = 296;
    
    if (currentInfoIndex >= infoCardsData.length) {
      currentInfoIndex = 0;
      container.scrollTo({ left: 0, behavior: 'instant' });
    } else {
      container.scrollTo({ left: cardWidth * currentInfoIndex, behavior: 'smooth' });
    }
    
    updateScrollDots();
  }, 5000);
}

function updateScrollDots() {
  const dots = document.querySelectorAll('.auto-scroll-indicator .dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentInfoIndex % infoCardsData.length);
  });
}

// ==================== NEWS SECTION ====================
function renderNewsCards() {
  const container = document.getElementById('newsScroll');
  if (!container) return;
  
  container.innerHTML = '';
  
  newsData.forEach((news, index) => {
    const pill = document.createElement('button');
    pill.className = 'news-pill';
    pill.style.animationDelay = `${index * 0.1}s`;
    
    pill.innerHTML = `
      <div class="news-pill-icon">${news.icon}</div>
      <div class="news-pill-content">
        <span class="news-pill-text">${news.text}</span>
        <span class="news-pill-source">${news.source}</span>
      </div>
      ${news.isNew ? '<span class="news-pill-new">Baru</span>' : ''}
    `;
    
    pill.onclick = () => openNewsDetail(news);
    container.appendChild(pill);
  });
}

function openNewsDetail(news) {
  const modal = document.getElementById('newsModal');
  const body = document.getElementById('newsModalBody');
  
  body.innerHTML = `
    <div class="news-detail">
      <div class="news-detail-icon">${news.icon}</div>
      <h2 class="news-detail-title">${news.text}</h2>
      <div class="news-detail-source">
        <span class="source-badge">${news.source}</span>
        ${news.isNew ? '<span class="new-badge">Baru</span>' : ''}
      </div>
      <div class="news-detail-content">
        <p>${news.description}</p>
      </div>
      <a href="${news.link}" target="_blank" class="btn-open-link">
        <span>Buka ${news.source}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

function openAllNews() {
  const modal = document.getElementById('allNewsModal');
  const body = document.getElementById('allNewsModalBody');
  
  body.innerHTML = `
    <div class="all-news-list">
      ${newsData.map((news, index) => `
        <button class="news-list-item" onclick="openNewsFromList(${index})" style="animation-delay: ${index * 0.05}s">
          <div class="news-list-icon">${news.icon}</div>
          <div class="news-list-content">
            <h4>${news.text}</h4>
            <span class="news-list-source">${news.source}</span>
          </div>
          ${news.isNew ? '<span class="news-list-new">Baru</span>' : ''}
          <svg class="news-list-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `).join('')}
    </div>
  `;
  
  modal.classList.remove('hidden');
}

function openNewsFromList(index) {
  closeModal('allNewsModal');
  setTimeout(() => {
    openNewsDetail(newsData[index]);
  }, 200);
}

// ==================== MUSIC ====================
function renderMusicPlaylist() {
  const playlist = document.getElementById('playlist');
  if (!playlist) return;
  
  playlist.innerHTML = '';
  musicData.forEach((song, i) => {
    const songEl = document.createElement('button');
    songEl.className = 'song-item';
    songEl.dataset.id = song.id;
    songEl.innerHTML = `
      <div class="song-number">${i + 1}</div>
      <div class="song-info">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
      </div>
      <div class="song-duration">${song.duration}</div>
    `;
    songEl.onclick = () => playSong(song);
    playlist.appendChild(songEl);
  });
}

function playSong(song) {
  document.getElementById('currentSongTitle').textContent = song.title;
  document.getElementById('currentArtist').textContent = song.artist;
  
  document.querySelectorAll('.song-item').forEach(item => {
    item.classList.toggle('playing', item.dataset.id == song.id);
  });
}

// ==================== OPERATION STATUS ====================
function updateOperationStatus() {
  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() * 60 + now.getMinutes();
  
  let isOpen = false;
  
  if (day >= 1 && day <= 4) {
    isOpen = time >= 8*60+15 && time < 15*60;
  } else if (day === 5) {
    isOpen = time >= 8*60 && time < 13*60;
  }
  
  const statusEl = document.getElementById('operationStatus');
  if (statusEl) {
    statusEl.textContent = isOpen ? 'Buka' : 'Tutup';
    statusEl.className = `status-text ${isOpen ? 'open' : 'closed'}`;
  }
  
  const modalStatus = document.getElementById('modalOperationStatus');
  if (modalStatus) {
    modalStatus.textContent = isOpen ? '✅ Saat ini BUKA' : '❌ Saat ini TUTUP';
    modalStatus.className = `modal-status ${isOpen ? 'open' : 'closed'}`;
  }
}

// ==================== SERVICE SELECTION & CHAT ====================
function selectService(serviceName) {
  currentService = serviceName;
  currentCategory = null;
  
  document.getElementById('serviceSelection').classList.add('hidden');
  document.getElementById('chatInterface').classList.remove('hidden');
  document.getElementById('currentServiceName').textContent = serviceName;
  
  const chatMessagesEl = document.getElementById('chatMessages');
  chatMessagesEl.innerHTML = '<div class="chat-date-wrapper"><span class="chat-date">Hari ini</span></div>';
  document.getElementById('quickRepliesArea').innerHTML = '';
  chatHistory = [];
  
  setTimeout(() => {
    initServiceChat(serviceName);
    scrollChatToBottom();
  }, 300);
}

function backToServiceSelection() {
  document.getElementById('chatInterface').classList.add('hidden');
  document.getElementById('serviceSelection').classList.remove('hidden');
  currentService = '';
  currentCategory = null;
}

function initServiceChat(service) {
  const data = layananData[service];
  
  if (service === 'FAQ') {
    addBotMessage(`Halo <strong>${currentUser}</strong>! 👋\n\nSaya SIDINA, asisten virtual Dukcapil. Kamu bisa tanya apa saja tentang layanan kami!\n\n<em>Contoh pertanyaan:</em>\n• "Berapa biaya buat KTP?"\n• "Jam buka kantor?"\n• "Syarat bikin akta lahir?"`, true);
    showQuickReplies([
      { text: '💰 Biaya layanan', icon: '💰' },
      { text: '🕐 Jam operasional', icon: '🕐' },
      { text: '📍 Lokasi kantor', icon: '📍' },
      { text: '📱 Download S\'DnoK', icon: '📱' },
      { text: '🏠 Kembali', icon: '🏠' }
    ]);
    return;
  }
  
  if (!data) {
    addBotMessage(`Layanan <strong>${service}</strong> akan segera tersedia. 🚧`, true);
    showQuickReplies([{ text: '🏠 Kembali ke Menu', icon: '🏠' }]);
    return;
  }
  
  const typeBadge = data.type === 'online' 
    ? '<span class="msg-badge online">📱 ONLINE</span>' 
    : '<span class="msg-badge offline">🏢 OFFLINE</span>';
  
  let msg = `Halo <strong>${currentUser}</strong>! ${data.emoji}\n\nKamu memilih layanan:\n<strong>${service}</strong>\n${typeBadge}\n\n${data.description || ''}\n\nSilakan pilih kategori:`;
  
  addBotMessage(msg, true);
  
  if (data.categories) {
    const replies = data.categories.map(c => ({ 
      text: `${c.emoji} ${c.label}`, 
      icon: c.emoji,
      key: c.key 
    }));
    replies.push({ text: '❓ Tanya lainnya', icon: '❓' });
    replies.push({ text: '🏠 Kembali', icon: '🏠' });
    showQuickReplies(replies);
  }
}

// ==================== SMART AI RESPONSE ====================
function getAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  for (const [topic, data] of Object.entries(aiKnowledge)) {
    if (data.keywords.some(kw => msg.includes(kw))) {
      const response = data.responses[Math.floor(Math.random() * data.responses.length)];
      return response.replace('{name}', currentUser);
    }
  }
  
  for (const [serviceName, serviceData] of Object.entries(layananData)) {
    const serviceKeywords = serviceName.toLowerCase().split(' ');
    if (serviceKeywords.some(kw => msg.includes(kw))) {
      return generateServiceInfo(serviceName, serviceData);
    }
  }
  
  if (msg.includes('ktp')) {
    return generateServiceInfo('Cetak KTP', layananData['Cetak KTP']);
  }
  if (msg.includes('akta') && (msg.includes('lahir') || msg.includes('kelahiran'))) {
    return generateServiceInfo('Akta Kelahiran', layananData['Akta Kelahiran']);
  }
  if (msg.includes('kk') || msg.includes('kartu keluarga')) {
    return generateServiceInfo('Perubahan Biodata Kartu Keluarga', layananData['Perubahan Biodata Kartu Keluarga']);
  }
  if (msg.includes('kia') || (msg.includes('kartu') && msg.includes('anak'))) {
    return generateServiceInfo('Kartu Identitas Anak', layananData['Kartu Identitas Anak']);
  }
  if (msg.includes('pindah') || msg.includes('domisili')) {
    return generateServiceInfo('Perpindahan', layananData['Perpindahan']);
  }
  if (msg.includes('nikah') || msg.includes('kawin')) {
    return generateServiceInfo('Akta Nikah Cerai', layananData['Akta Nikah Cerai']);
  }
  if (msg.includes('mati') || msg.includes('meninggal') || msg.includes('kematian')) {
    return generateServiceInfo('Akta Kematian', layananData['Akta Kematian']);
  }
  
  if (msg.includes('syarat') || msg.includes('persyaratan') || msg.includes('dokumen') || msg.includes('perlu apa')) {
    return `📋 Untuk mengetahui persyaratan lengkap, silakan pilih layanan yang kamu butuhkan dari menu.\n\nAtau ketik nama layanan, contoh:\n• "syarat KTP"\n• "persyaratan akta lahir"\n• "dokumen KK"`;
  }
  
  return `Maaf ${currentUser}, saya belum mengerti pertanyaanmu. 😅\n\nCoba tanya dengan kata kunci seperti:\n• Biaya / gratis\n• Jam buka\n• Syarat KTP / Akta / KK\n• Lokasi kantor\n• Download aplikasi\n\nAtau pilih layanan dari menu untuk info lengkap! 👇`;
}

function generateServiceInfo(serviceName, data) {
  if (!data) return `Layanan ${serviceName} tidak ditemukan.`;
  
  const typeBadge = data.type === 'online' ? '📱 ONLINE (via S\'DnoK)' : '🏢 OFFLINE (ke TPPDK)';
  
  let msg = `${data.emoji} <strong>${serviceName}</strong>\n${typeBadge}\n\n`;
  
  if (data.description) {
    msg += `${data.description}\n\n`;
  }
  
  if (data.categories) {
    msg += `<strong>Kategori tersedia:</strong>\n`;
    data.categories.forEach(cat => {
      msg += `• ${cat.emoji} ${cat.label}\n`;
    });
  }
  
  if (data.catatan) {
    msg += `\n<strong>Catatan:</strong>\n`;
    data.catatan.forEach(c => msg += `${c}\n`);
  }
  
  msg += `\n<em>Pilih kategori di bawah untuk melihat persyaratan lengkap!</em>`;
  
  return msg;
}

// ==================== CHAT MESSAGES ====================
function scrollChatToBottom() {
  const container = document.getElementById('chatMessages');
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 100);
}

function addBotMessage(text, isNew = false) {
  const container = document.getElementById('chatMessages');
  
  const typingEl = document.createElement('div');
  typingEl.className = 'chat-bubble-wrapper bot';
  typingEl.id = 'typingIndicator';
  typingEl.innerHTML = `
    <div class="chat-avatar">
      <span>🤖</span>
    </div>
    <div class="chat-bubble typing">
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  container.appendChild(typingEl);
  scrollChatToBottom();
  
  setTimeout(() => {
    typingEl.remove();
    
    const msgWrapper = document.createElement('div');
    msgWrapper.className = 'chat-bubble-wrapper bot';
    msgWrapper.innerHTML = `
      <div class="chat-avatar">
        <span>🤖</span>
      </div>
      <div class="chat-bubble">
        <div class="bubble-content">${text.replace(/\n/g, '<br>')}</div>
        <div class="bubble-time">${getCurrentTime()}</div>
      </div>
    `;
    container.appendChild(msgWrapper);
    
    requestAnimationFrame(() => {
      msgWrapper.classList.add('visible');
      scrollChatToBottom();
    });
  }, isNew ? 600 : 400);
}

function addUserMessage(text) {
  const container = document.getElementById('chatMessages');
  
  const msgWrapper = document.createElement('div');
  msgWrapper.className = 'chat-bubble-wrapper user';
  msgWrapper.innerHTML = `
    <div class="chat-bubble">
      <div class="bubble-content">${text}</div>
      <div class="bubble-time">${getCurrentTime()}</div>
    </div>
  `;
  container.appendChild(msgWrapper);
  
  requestAnimationFrame(() => {
    msgWrapper.classList.add('visible');
    scrollChatToBottom();
  });
  
  chatHistory.push({ role: 'user', content: text });
}

function getCurrentTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

// ==================== QUICK REPLIES ====================
function showQuickReplies(replies) {
  const container = document.getElementById('quickRepliesArea');
  container.innerHTML = '';
  container.className = 'quick-replies-area';
  
  replies.forEach((reply, index) => {
    const btn = document.createElement('button');
    btn.className = 'quick-reply-chip';
    btn.style.animationDelay = `${index * 0.05}s`;
    
    if (typeof reply === 'string') {
      btn.innerHTML = `<span>${reply}</span>`;
      btn.onclick = () => handleQuickReply(reply);
    } else {
      btn.innerHTML = `<span class="chip-icon">${reply.icon}</span><span>${reply.text.replace(reply.icon, '').trim()}</span>`;
      btn.onclick = () => handleQuickReply(reply.text, reply.key);
    }
    
    container.appendChild(btn);
  });
  
  requestAnimationFrame(() => {
    container.classList.add('visible');
  });
}

function hideQuickReplies() {
  const container = document.getElementById('quickRepliesArea');
  container.classList.remove('visible');
  setTimeout(() => {
    container.innerHTML = '';
  }, 300);
}

function handleQuickReply(reply, categoryKey = null) {
  addUserMessage(reply);
  hideQuickReplies();
  
  if (reply.includes('Kembali')) {
    setTimeout(() => backToServiceSelection(), 300);
    return;
  }
  
  if (reply.includes('Tanya lainnya')) {
    setTimeout(() => {
      addBotMessage(`Silakan ketik pertanyaanmu, ${currentUser}! 😊\n\nContoh:\n• "Berapa biayanya?"\n• "Jam buka?"\n• "Dokumen apa saja?"`, true);
    }, 300);
    return;
  }
  
  setTimeout(() => {
    processQuickReply(reply, categoryKey);
  }, 300);
}

function processQuickReply(reply, categoryKey) {
  const data = layananData[currentService];
  
  if (data && data.categories && categoryKey) {
    currentCategory = categoryKey;
    const categoryData = data[categoryKey];
    
    if (categoryData) {
      let msg = `📋 <strong>${categoryData.title}</strong>\n\n<strong>Persyaratan:</strong>\n`;
      categoryData.syarat.forEach((s, i) => {
        msg += `<span class="syarat-item">${i + 1}. ${s}</span>\n`;
      });
      
      if (categoryData.catatan_khusus) {
        msg += `\n<strong>Catatan Khusus:</strong>\n`;
        categoryData.catatan_khusus.forEach(c => msg += `${c}\n`);
      }
      
      if (data.catatan) {
        msg += `\n<strong>Info Tambahan:</strong>\n`;
        data.catatan.forEach(c => msg += `${c}\n`);
      }
      
      addBotMessage(msg, true);
      
      showQuickReplies([
        { text: '💰 Biaya layanan?', icon: '💰' },
        { text: '⏱️ Berapa lama prosesnya?', icon: '⏱️' },
        { text: '📱 Cara daftar online?', icon: '📱' },
        { text: '🔄 Pilih kategori lain', icon: '🔄' },
        { text: '🏠 Kembali ke Menu', icon: '🏠' }
      ]);
      return;
    }
  }
  
  if (reply.includes('Biaya')) {
    addBotMessage(aiKnowledge.biaya.responses[0], true);
  } else if (reply.includes('lama') || reply.includes('Waktu') || reply.includes('proses')) {
    addBotMessage(aiKnowledge.waktu.responses[0], true);
  } else if (reply.includes('Jam') || reply.includes('operasional') || reply.includes('buka')) {
    addBotMessage(aiKnowledge.jam.responses[0], true);
  } else if (reply.includes('Lokasi') || reply.includes('kantor')) {
    addBotMessage(aiKnowledge.lokasi.responses[0], true);
  } else if (reply.includes('S\'DnoK') || reply.includes('online') || reply.includes('daftar')) {
    addBotMessage(aiKnowledge.sidenok.responses[0], true);
  } else if (reply.includes('kategori lain')) {
    initServiceChat(currentService);
    return;
  } else {
    addBotMessage(`Ada pertanyaan lain yang bisa saya bantu, ${currentUser}? 😊`, true);
  }
  
  showQuickReplies([
    { text: '❓ Tanya lainnya', icon: '❓' },
    { text: '🔄 Pilih kategori lain', icon: '🔄' },
    { text: '🏠 Kembali ke Menu', icon: '🏠' }
  ]);
}

// ==================== SEND CHAT MESSAGE ====================
function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  
  addUserMessage(text);
  input.value = '';
  hideQuickReplies();
  
  chatHistory.push({ role: 'user', content: text });
  
  setTimeout(() => {
    const response = getAIResponse(text);
    addBotMessage(response, true);
    
    showQuickReplies([
      { text: '📋 Lihat persyaratan', icon: '📋' },
      { text: '💰 Info biaya', icon: '💰' },
      { text: '🕐 Jam operasional', icon: '🕐' },
      { text: '🏠 Kembali ke Menu', icon: '🏠' }
    ]);
  }, 300);
}

function showChatMenu() {
  showQuickReplies([
    { text: '🔄 Pilih Layanan Lain', icon: '🔄' },
    { text: '📋 Lihat Semua Persyaratan', icon: '📋' },
    { text: '❓ FAQ', icon: '❓' },
    { text: '🏠 Kembali ke Beranda', icon: '🏠' }
  ]);
}

// ==================== MODALS ====================
function showOperationHoursModal() {
  updateOperationStatus();
  document.getElementById('hoursModal').classList.remove('hidden');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

function openLocation() {
  window.open('https://maps.app.goo.gl/NjwbHdTpFp2dPc6w9', '_blank');
}

function openSidenok() {
  window.open('https://play.google.com/store/apps/details?id=semarangkota.sidnok', '_blank');
}

function showAbout() {
  alert('SIDINA v2.0.0\n\nSistem Informasi Dukcapil Interaktif\nTPPDK Kec. Semarang Selatan\n\nDeveloped by Vilicht');
}

// ==================== PREVENT PULL TO REFRESH ====================
let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY, { passive: true });
document.addEventListener('touchmove', function(e) {
  if (e.touches[0].clientY > startY && window.scrollY === 0) {
    e.preventDefault();
  }
}, { passive: false });

