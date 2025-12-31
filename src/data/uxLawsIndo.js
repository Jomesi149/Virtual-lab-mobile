export const uxLawsIndo = {
  'aesthetic-usability-effect': {
    title: "Aesthetic-Usability Effect",
    description: "Pengguna sering menganggap desain yang indah sebagai desain yang lebih mudah digunakan.",
    fullContent: "Efek Aesthetic-Usability menggambarkan fenomena di mana pengguna menganggap desain yang lebih estetis lebih mudah digunakan daripada desain yang kurang estetis. Desain yang indah menciptakan respons positif di otak manusia dan membuat mereka percaya bahwa desain tersebut benar-benar bekerja lebih baik.",
    principles: [
      "Desain yang indah menciptakan respons positif dan dapat membuat pengguna lebih toleran terhadap masalah usability kecil.",
      "Desain estetis dapat menutupi masalah usability dan mencegah masalah terdeteksi saat pengujian usability.",
      "Selalu upayakan desain yang indah sekaligus dapat digunakan dengan baik."
    ],
    examples: [
      {
        title: "Produk Premium",
        description: "Produk high-end sering memiliki antarmuka yang halus dan indah yang dianggap pengguna lebih fungsional."
      },
      {
        title: "Kesan Pertama",
        description: "Landing page dengan daya tarik visual yang kuat menciptakan reaksi positif awal dan meningkatkan kepercayaan."
      }
    ]
  },

  'doherty-threshold': {
    title: "Doherty Threshold",
    description: "Produktivitas meningkat ketika komputer dan penggunanya berinteraksi dengan kecepatan yang memastikan tidak ada yang harus menunggu.",
    fullContent: "Doherty Threshold menunjukkan bahwa ketika respons komputer lebih cepat dari 400ms, produktivitas pengguna meningkat karena interaksi terasa instan. Ini menciptakan rasa alur yang lancar dan menjaga pengguna tetap terlibat tanpa memutus konsentrasi mereka.",
    principles: [
      "Berikan feedback sistem dalam waktu 400ms untuk menjaga keterlibatan pengguna.",
      "Gunakan peningkatan performa yang dipersepsikan seperti optimistic UI updates dan skeleton screens.",
      "Indikator progress harus digunakan untuk aksi yang memakan waktu lebih dari 400ms.",
      "Animasi dapat membuat waktu tunggu terasa lebih singkat jika digunakan dengan bijak."
    ],
    examples: [
      {
        title: "Pencarian Instan",
        description: "Hasil pencarian yang muncul saat Anda mengetik tanpa penundaan yang terlihat."
      },
      {
        title: "Optimistic UI",
        description: "Tombol like yang merespons segera sementara aksi diproses di background."
      }
    ]
  },

  'fitts-law': {
    title: "Fitts's Law",
    description: "Waktu untuk mencapai target adalah fungsi dari jarak dan ukuran target.",
    fullContent: "Hukum Fitts menyatakan bahwa jumlah waktu yang diperlukan seseorang untuk menggerakkan pointer ke area target adalah fungsi dari jarak ke target dibagi dengan ukuran target. Jadi, semakin jauh jarak dan semakin kecil ukuran target, semakin lama waktu yang dibutuhkan.",
    principles: [
      "Target sentuh harus cukup besar agar pengguna dapat memilihnya dengan akurat.",
      "Target sentuh harus memiliki jarak yang cukup di antara mereka.",
      "Target sentuh harus ditempatkan di area antarmuka yang memungkinkan mudah dijangkau.",
      "Tepi dan sudut layar adalah lokasi utama untuk aksi penting."
    ],
    examples: [
      {
        title: "Ukuran Tombol",
        description: "Buat tombol dan elemen interaktif cukup besar agar mudah diklik atau disentuh (minimal 44x44px untuk mobile)."
      },
      {
        title: "Menu Navigasi",
        description: "Tempatkan item menu yang sering digunakan di lokasi yang mudah diakses seperti tepi layar."
      }
    ]
  },

  'goal-gradient-effect': {
    title: "Goal-Gradient Effect",
    description: "Kecenderungan untuk mendekati tujuan meningkat seiring kedekatan pada tujuan.",
    fullContent: "Efek Goal-Gradient menunjukkan bahwa orang lebih termotivasi untuk menyelesaikan tugas saat mereka semakin dekat dengan menyelesaikannya. Efek ini dapat dimanfaatkan dalam desain UX melalui indikator progress, gamifikasi, dan kemajuan artificial.",
    principles: [
      "Tunjukkan progress pengguna untuk meningkatkan motivasi menyelesaikan tugas.",
      "Berikan kemajuan artificial dengan memberi pengguna awal yang lebih baik.",
      "Pecah proses panjang menjadi pencapaian kecil.",
      "Gunakan progress bar dan persentase penyelesaian untuk memvisualisasikan kemajuan."
    ],
    examples: [
      {
        title: "Kekuatan Profil LinkedIn",
        description: "Menunjukkan persentase lengkap dan menyarankan langkah berikutnya untuk meningkatkan profil."
      },
      {
        title: "Program Loyalitas",
        description: "Kartu kopi yang dimulai dengan 2 stempel sudah terisi mendorong penyelesaian."
      }
    ]
  },

  'hicks-law': {
    title: "Hick's Law",
    description: "Waktu yang dibutuhkan untuk membuat keputusan meningkat dengan jumlah dan kompleksitas pilihan.",
    fullContent: "Hukum Hick (atau Hukum Hick-Hyman) menggambarkan waktu yang dibutuhkan seseorang untuk membuat keputusan sebagai hasil dari pilihan yang mungkin mereka miliki. Menambah jumlah pilihan akan meningkatkan waktu keputusan secara logaritmik.",
    principles: [
      "Minimalkan pilihan ketika waktu respons kritis untuk mengurangi waktu keputusan.",
      "Pecah tugas kompleks menjadi langkah-langkah kecil untuk mengurangi beban kognitif.",
      "Hindari membuat pengguna kewalahan dengan menyorot opsi yang direkomendasikan.",
      "Gunakan onboarding progresif untuk meminimalkan beban kognitif bagi pengguna baru.",
      "Hati-hati untuk tidak menyederhanakan hingga titik abstraksi."
    ],
    examples: [
      {
        title: "Navigasi yang Disederhanakan",
        description: "Kurangi opsi menu menjadi item yang paling penting untuk mempercepat pengambilan keputusan."
      },
      {
        title: "Formulir Bertahap",
        description: "Pecah formulir panjang menjadi beberapa langkah untuk mengurangi kelumpuhan keputusan dan meningkatkan tingkat penyelesaian."
      }
    ]
  },

  'jakobs-law': {
    title: "Jakob's Law",
    description: "Pengguna menghabiskan sebagian besar waktu mereka di situs lain. Ini berarti pengguna lebih suka situs Anda bekerja dengan cara yang sama seperti semua situs lain yang sudah mereka kenal.",
    fullContent: "Hukum Jakob menyatakan bahwa pengguna menghabiskan sebagian besar waktu mereka di situs lain, dan mereka lebih suka situs Anda bekerja dengan cara yang sama seperti semua situs lain yang sudah mereka kenal. Dengan memanfaatkan model mental yang ada, kita dapat menciptakan pengalaman pengguna yang superior di mana pengguna dapat fokus pada tugas mereka daripada mempelajari model baru.",
    principles: [
      "Pengguna akan mentransfer ekspektasi yang telah mereka bangun di sekitar satu produk yang familiar ke produk lain yang tampak serupa.",
      "Dengan memanfaatkan model mental yang ada, kita dapat menciptakan pengalaman pengguna yang superior.",
      "Minimalkan ketidaksesuaian dengan memberdayakan pengguna untuk terus menggunakan versi yang familiar untuk waktu terbatas.",
      "Saat membuat perubahan, izinkan pengguna untuk ikut serta dalam fitur baru secara bertahap."
    ],
    examples: [
      {
        title: "Ikon Keranjang Belanja",
        description: "Situs e-commerce menggunakan ikon keranjang belanja di sudut kanan atas karena di situlah pengguna mengharapkannya."
      },
      {
        title: "Penempatan Pencarian",
        description: "Bilah pencarian biasanya ditempatkan di bagian atas situs web, sering dengan ikon kaca pembesar."
      }
    ]
  },

  'law-of-common-region': {
    title: "Law of Common Region",
    description: "Elemen cenderung dipersepsikan sebagai kelompok jika mereka berbagi area dengan batas yang jelas.",
    fullContent: "Hukum Common Region menyatakan bahwa elemen dipersepsikan sebagai bagian dari grup jika mereka terletak dalam region tertutup yang sama. Menambahkan border di sekitar elemen atau grup elemen adalah cara mudah untuk membuat region yang umum dan menunjukkan bahwa elemen tersebut terkait.",
    principles: [
      "Common region menciptakan struktur yang jelas dan membantu pengguna memahami hubungan antar elemen.",
      "Gunakan border, warna latar belakang, atau bayangan untuk membuat region yang umum.",
      "Hindari membuat terlalu banyak region umum, yang dapat menyebabkan antarmuka yang berantakan.",
      "Region umum dapat dikombinasikan dengan prinsip Gestalt lainnya untuk pengelompokan yang lebih kuat."
    ],
    examples: [
      {
        title: "Kartu dan Panel",
        description: "Konten yang dikelompokkan dalam kontainer atau kartu yang berbatas untuk menunjukkan informasi terkait."
      },
      {
        title: "Bagian Formulir",
        description: "Field formulir terkait yang dikelompokkan dalam batas yang terlihat untuk menunjukkan mereka termasuk bersama."
      }
    ]
  },

  'law-of-proximity': {
    title: "Law of Proximity",
    description: "Objek yang dekat, atau berdekatan satu sama lain, cenderung dikelompokkan bersama.",
    fullContent: "Hukum Proximity menyatakan bahwa objek yang lebih dekat satu sama lain dipersepsikan lebih terkait daripada objek yang lebih jauh. Proximity membantu membangun hubungan dengan objek terdekat dan merupakan salah satu cara paling kuat untuk menunjukkan pengelompokan dalam desain visual.",
    principles: [
      "Elemen yang berdekatan dipersepsikan sebagai terkait.",
      "Gunakan white space untuk menciptakan hubungan dan memisahkan grup konten.",
      "Proximity membantu pengguna memahami hierarki informasi.",
      "Perhatikan jarak antara grup elemen yang berbeda."
    ],
    examples: [
      {
        title: "Label Formulir",
        description: "Jaga label dekat dengan field input yang sesuai sehingga pengguna memahami mereka terkait."
      },
      {
        title: "Grup Navigasi",
        description: "Kelompokkan item navigasi terkait lebih dekat daripada item yang tidak terkait."
      }
    ]
  },

  'law-of-pragnanz': {
    title: "Law of Prägnanz",
    description: "Orang akan mempersepsikan dan menginterpretasikan gambar yang ambigu atau kompleks dalam bentuk yang paling sederhana.",
    fullContent: "Hukum Prägnanz (juga dikenal sebagai hukum kesederhanaan atau hukum bentuk yang baik) menyatakan bahwa orang akan mempersepsikan dan menginterpretasikan gambar yang ambigu atau kompleks dalam bentuk yang paling sederhana. Mata manusia suka menemukan kesederhanaan dan keteraturan dalam bentuk kompleks karena mencegah kita dari kewalahan dengan informasi.",
    principles: [
      "Mata manusia menyederhanakan bentuk kompleks dengan mengubahnya menjadi bentuk tunggal yang terpadu.",
      "Orang lebih mampu memproses dan mengingat secara visual bentuk sederhana daripada bentuk kompleks.",
      "Hapus elemen yang tidak perlu untuk meningkatkan pemahaman pengguna.",
      "Gunakan hierarki visual yang sederhana dan jelas untuk memandu pengguna melalui konten."
    ],
    examples: [
      {
        title: "Desain Logo",
        description: "Cincin Olimpiade dipersepsikan sebagai lingkaran yang tumpang tindih daripada bentuk melengkung yang kompleks."
      },
      {
        title: "Ikon",
        description: "Ikonografi sederhana lebih mudah dikenali dan diingat daripada ilustrasi kompleks."
      }
    ]
  },

  'law-of-similarity': {
    title: "Law of Similarity",
    description: "Mata manusia cenderung mempersepsikan elemen serupa dalam desain sebagai gambar, bentuk, atau grup yang lengkap.",
    fullContent: "Hukum Similarity menyatakan bahwa elemen yang berbagi karakteristik visual serupa dipersepsikan lebih terkait daripada elemen yang tidak berbagi karakteristik tersebut. Similarity dapat dicapai melalui warna, bentuk, ukuran, tekstur, atau properti visual lainnya.",
    principles: [
      "Elemen yang secara visual serupa akan dipersepsikan sebagai terkait.",
      "Warna, bentuk, dan ukuran dapat digunakan untuk menandakan bahwa elemen termasuk dalam grup yang sama.",
      "Pastikan bahwa tautan dan sistem navigasi dibedakan secara visual dari elemen teks normal.",
      "Gunakan similarity visual untuk membuat pola desain yang konsisten di seluruh antarmuka Anda."
    ],
    examples: [
      {
        title: "Gaya Tombol",
        description: "Semua tombol aksi utama berbagi warna dan gaya yang sama sehingga pengguna mengenalinya sebagai aksi serupa."
      },
      {
        title: "Konsistensi Ikon",
        description: "Ikon dari tipe yang sama menggunakan gaya visual yang konsisten untuk menunjukkan mereka melayani fungsi serupa."
      }
    ]
  },

  'law-of-uniform-connectedness': {
    title: "Law of Uniform Connectedness",
    description: "Elemen yang terhubung secara visual dipersepsikan lebih terkait daripada elemen tanpa koneksi.",
    fullContent: "Hukum Uniform Connectedness menyatakan bahwa elemen yang terhubung secara visual dipersepsikan lebih terkait daripada elemen tanpa koneksi. Ini dapat dicapai melalui garis, kotak, warna, atau elemen visual lain yang menciptakan koneksi antar item.",
    principles: [
      "Gunakan garis, kotak, atau warna untuk menghubungkan elemen yang terkait secara visual.",
      "Elemen yang terhubung dipersepsikan sebagai satu unit.",
      "Prinsip ini lebih kuat daripada proximity atau similarity saja.",
      "Gunakan elemen penghubung untuk memandu pengguna melalui antarmuka yang kompleks."
    ],
    examples: [
      {
        title: "Baris Tabel",
        description: "Warna baris bergantian atau garis menghubungkan sel dalam baris yang sama."
      },
      {
        title: "Grup Formulir",
        description: "Garis atau latar belakang menghubungkan field formulir terkait bersama."
      }
    ]
  },

  'millers-law': {
    title: "Miller's Law",
    description: "Rata-rata orang hanya dapat menyimpan 7 (plus atau minus 2) item dalam memori kerja mereka.",
    fullContent: "Hukum Miller menyatakan bahwa jumlah objek yang dapat disimpan manusia rata-rata dalam memori kerja adalah sekitar 7. Ini telah dikenal sebagai 'angka ajaib tujuh, plus atau minus dua.' Hukum ini pertama kali diusulkan oleh psikolog kognitif George A. Miller.",
    principles: [
      "Jangan gunakan 'angka ajaib tujuh' untuk membenarkan batasan desain yang tidak perlu.",
      "Organisir konten menjadi potongan kecil untuk membantu pengguna memproses, memahami, dan mengingat dengan mudah.",
      "Ingat bahwa kapasitas memori jangka pendek akan bervariasi per individu, berdasarkan pengetahuan sebelumnya dan konteks situasional.",
      "Chunking informasi membuatnya lebih mudah diingat dan mengurangi beban kognitif."
    ],
    examples: [
      {
        title: "Nomor Telepon yang Dipecah",
        description: "Nomor telepon dipecah menjadi potongan: +1 (555) 123-4567 alih-alih +15551234567"
      },
      {
        title: "Organisasi Menu",
        description: "Kelompokkan item menu terkait ke dalam kategori dengan 5-7 item per grup."
      }
    ]
  },

  'occams-razor': {
    title: "Occam's Razor",
    description: "Di antara hipotesis yang bersaing yang memprediksi dengan sama baiknya, yang dengan asumsi paling sedikit harus dipilih.",
    fullContent: "Pisau Cukur Occam menyatakan bahwa solusi paling sederhana biasanya yang terbaik. Dalam desain UX, ini berarti kita harus menganalisis setiap elemen dan menghapus sebanyak mungkin tanpa mengorbankan fungsi keseluruhan. Kesederhanaan harus menjadi tujuan utama dalam desain.",
    principles: [
      "Sederhanakan antarmuka dengan menghapus elemen atau konten yang tidak perlu.",
      "Solusi desain terbaik biasanya yang paling sederhana yang memecahkan masalah.",
      "Analisis setiap elemen dan hapus sebanyak mungkin tanpa mengorbankan fungsi.",
      "Desain sederhana lebih mudah dipahami dan digunakan."
    ],
    examples: [
      {
        title: "Google Search",
        description: "Homepage sangat sederhana - hanya kotak pencarian dan logo, tidak lebih."
      },
      {
        title: "UI Minimalis",
        description: "Aplikasi modern fokus pada fungsionalitas inti dengan chrome dan dekorasi minimal."
      }
    ]
  },

  'parkinsons-law': {
    title: "Parkinson's Law",
    description: "Setiap tugas akan mengembang hingga semua waktu yang tersedia habis terpakai.",
    fullContent: "Hukum Parkinson menyatakan bahwa pekerjaan mengembang untuk mengisi waktu yang tersedia untuk penyelesaiannya. Dalam desain UX, ini berarti pengguna akan mengambil waktu sebanyak yang kita berikan untuk menyelesaikan tugas. Dengan menetapkan batasan, kita dapat membantu pengguna bekerja lebih efisien.",
    principles: [
      "Tetapkan batasan waktu yang realistis untuk meningkatkan fokus dan efisiensi.",
      "Batasi waktu yang tersedia untuk menyelesaikan tugas untuk meningkatkan kinerja.",
      "Gunakan batas waktu untuk menciptakan urgensi tanpa menyebabkan kecemasan.",
      "Pecah tugas besar menjadi aktivitas yang dibatasi waktu lebih kecil."
    ],
    examples: [
      {
        title: "Flash Sales",
        description: "Penawaran terbatas waktu menciptakan urgensi dan mendorong pengambilan keputusan cepat."
      },
      {
        title: "Timeout Sesi",
        description: "Timer keranjang belanja mendorong pengguna untuk menyelesaikan pembelian."
      }
    ]
  },

  'peak-end-rule': {
    title: "Peak-End Rule",
    description: "Orang menilai pengalaman sebagian besar berdasarkan bagaimana perasaan mereka pada puncaknya dan pada akhirnya, daripada total jumlah atau rata-rata dari setiap momen.",
    fullContent: "Aturan Peak-End menunjukkan bahwa orang mengingat pengalaman berdasarkan bagaimana perasaan mereka pada puncaknya (titik paling intens) dan pada akhirnya, daripada rata-rata dari setiap momen. Ini memiliki implikasi signifikan untuk desain UX - kita harus fokus membuat momen yang paling berkesan menjadi positif.",
    principles: [
      "Perhatikan baik-baik titik paling intens dan momen terakhir dari perjalanan pengguna.",
      "Identifikasi momen ketika produk Anda paling membantu atau menyenangkan dan desain untuk membuat momen tersebut lebih baik.",
      "Ingat bahwa orang mengingat pengalaman negatif lebih jelas daripada yang positif.",
      "Akhiri pengalaman dengan nada tinggi untuk meninggalkan kesan positif yang bertahan lama."
    ],
    examples: [
      {
        title: "Kesuksesan Onboarding",
        description: "Aplikasi yang merayakan pencapaian pengguna di akhir onboarding menciptakan kesan positif yang bertahan lama."
      },
      {
        title: "Konfirmasi Checkout",
        description: "Situs e-commerce dengan halaman konfirmasi pesanan yang menyenangkan meninggalkan pengguna dengan perasaan positif."
      }
    ]
  },

  'postel-law': {
    title: "Postel's Law",
    description: "Bersikap liberal dalam apa yang Anda terima, dan konservatif dalam apa yang Anda kirim.",
    fullContent: "Hukum Postel (juga dikenal sebagai Prinsip Ketahanan) menyatakan bahwa kita harus liberal dalam apa yang kita terima dari pengguna, tetapi konservatif dalam apa yang kita kirim kembali. Dalam desain UX, ini berarti menerima berbagai macam input dan perilaku pengguna, sambil memberikan output yang jelas dan konsisten.",
    principles: [
      "Bersikap empatik, fleksibel, dan toleran terhadap berbagai tindakan yang dapat diambil pengguna.",
      "Terima input variabel dari pengguna tetapi kembalikan output yang konsisten dan standar.",
      "Semakin banyak kita dapat mengantisipasi dan merencanakan dalam desain, semakin tangguh desainnya.",
      "Berikan pesan error yang membantu dan saran ketika terjadi kesalahan."
    ],
    examples: [
      {
        title: "Validasi Formulir",
        description: "Terima nomor telepon dalam berbagai format (dengan/tanpa tanda hubung, spasi, kode negara)."
      },
      {
        title: "Fleksibilitas Pencarian",
        description: "Sistem pencarian yang menangani kesalahan ketik, sinonim, dan frasa yang berbeda."
      }
    ]
  },

  'serial-position-effect': {
    title: "Serial Position Effect",
    description: "Pengguna memiliki kecenderungan untuk paling mengingat item pertama dan terakhir dalam seri.",
    fullContent: "Efek Posisi Serial menunjukkan bahwa orang cenderung mengingat item pertama dan terakhir dalam seri dengan baik, dan item tengah paling buruk. Ini adalah kombinasi dari efek primacy (mengingat lebih baik item di awal) dan efek recency (mengingat lebih baik item di akhir).",
    principles: [
      "Tempatkan item paling penting di awal dan akhir daftar atau menu.",
      "Memposisikan aksi kunci di kiri dan kanan navigasi dapat meningkatkan daya ingat.",
      "Pengguna lebih mungkin mengingat item pertama dan terakhir dalam perjalanan.",
      "Gunakan prinsip ini saat mendesain navigasi, formulir, dan hierarki konten."
    ],
    examples: [
      {
        title: "Menu Navigasi",
        description: "Tempatkan item navigasi paling penting di paling kiri dan kanan bilah menu."
      },
      {
        title: "Daftar Produk",
        description: "Tampilkan produk terbaik Anda di awal dan akhir daftar kategori."
      }
    ]
  },

  'teslers-law': {
    title: "Tesler's Law",
    description: "Untuk setiap sistem ada sejumlah kompleksitas tertentu yang tidak dapat dikurangi.",
    fullContent: "Hukum Tesler (juga dikenal sebagai Hukum Konservasi Kompleksitas) menyatakan bahwa untuk setiap sistem, ada sejumlah kompleksitas tertentu yang tidak dapat dikurangi. Kompleksitas ini dapat dipindahkan, tetapi tidak dapat dihilangkan. Pertanyaannya menjadi: siapa yang harus menangani kompleksitas ini - pengguna atau desainer?",
    principles: [
      "Semua proses memiliki inti kompleksitas yang tidak dapat didesain ulang.",
      "Satu-satunya pertanyaan adalah: siapa yang akan menangani kompleksitas - pengguna atau desainer?",
      "Pastikan sebanyak mungkin kompleksitas dipindahkan dari pengguna.",
      "Sederhanakan pengalaman pengguna bahkan jika itu berarti sistem yang lebih kompleks di belakang layar."
    ],
    examples: [
      {
        title: "Default Cerdas",
        description: "Mengisi formulir dengan default cerdas mengurangi keputusan pengguna sambil menambah kompleksitas backend."
      },
      {
        title: "Autocomplete",
        description: "Autocomplete pencarian menangani kompleksitas algoritma prediksi untuk menyederhanakan input pengguna."
      }
    ]
  },

  'von-restorff-effect': {
    title: "Von Restorff Effect",
    description: "Ketika beberapa objek serupa hadir, yang berbeda dari yang lain paling mungkin diingat.",
    fullContent: "Efek Von Restorff (juga dikenal sebagai Efek Isolasi) memprediksi bahwa ketika beberapa objek serupa hadir, yang berbeda dari yang lain paling mungkin diingat. Efek ini pertama kali dipelajari oleh psikiater Jerman Hedwig von Restorff pada tahun 1933.",
    principles: [
      "Buat informasi penting atau aksi kunci berbeda secara visual.",
      "Gunakan warna, ukuran, atau properti visual lain untuk membuat elemen penting menonjol.",
      "Jangan membuat terlalu banyak elemen berbeda atau efeknya akan diencerkan.",
      "Pastikan apa yang menonjol benar-benar penting untuk tujuan pengguna."
    ],
    examples: [
      {
        title: "Tombol Call-to-Action",
        description: "Tombol CTA utama menggunakan warna kontras untuk menonjol dari elemen halaman lain."
      },
      {
        title: "Pesan Error",
        description: "State error menggunakan merah atau styling yang berbeda untuk menarik perhatian."
      }
    ]
  },

  'zeigarnik-effect': {
    title: "Zeigarnik Effect",
    description: "Orang mengingat tugas yang belum selesai atau terganggu lebih baik daripada tugas yang sudah selesai.",
    fullContent: "Efek Zeigarnik menunjukkan bahwa orang mengingat tugas yang belum selesai atau terganggu lebih baik daripada yang sudah selesai. Ini menciptakan rasa ketegangan yang tetap bersama kita sampai tugas selesai. Efek ini pertama kali dipelajari oleh psikolog Rusia Bluma Zeigarnik pada tahun 1920-an.",
    principles: [
      "Gunakan progress bar dan indikator untuk menunjukkan seberapa dekat pengguna dengan menyelesaikan tugas.",
      "Memberikan kemajuan artificial terhadap tujuan dapat meningkatkan motivasi untuk menyelesaikannya.",
      "Tugas yang belum selesai menciptakan ketegangan mental yang dapat dimanfaatkan untuk mendorong penyelesaian tugas.",
      "Simpan progress pengguna secara otomatis sehingga mereka dapat dengan mudah melanjutkan tugas yang terganggu."
    ],
    examples: [
      {
        title: "Penyelesaian Profil LinkedIn",
        description: "Menunjukkan persentase lengkap dan apa yang hilang untuk memotivasi pengguna menyelesaikan profil mereka."
      },
      {
        title: "Formulir Multi-Langkah",
        description: "Indikator progress menunjukkan berapa banyak langkah yang tersisa, mendorong penyelesaian."
      }
    ]
  }
};

// Fungsi helper untuk mendapatkan terjemahan
export const getIndonesianLaw = (lawId, lawData) => {
  const translation = uxLawsIndo[lawId];
  if (!translation) return lawData;
  
  return {
    ...lawData,
    ...translation
  };
};

// Kategori dalam Bahasa Indonesia
export const categoryTranslations = {
  'cognitive': 'Kognitif',
  'perception': 'Persepsi',
  'interaction': 'Interaksi',
  'behavior': 'Perilaku'
};
