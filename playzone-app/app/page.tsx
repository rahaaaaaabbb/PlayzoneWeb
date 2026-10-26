"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  // DAFTAR NAMA FILE FOTO BACKGROUND & AREA
  const fotoHeroBg = "/bg-ketersediaan.png";       // Latar belakang atas
  
  // DAFTAR FOTO NEGARA WORLD CUP (Untuk Marquee Berjalan)
  const daftarFotoAbout = [
    { id: 1, nama: "ARGENTINA", foto: "/argentina.png", sorotan: true },
    { id: 2, nama: "BRAZIL", foto: "/brazil.png", sorotan: false },
    { id: 3, nama: "TURKEY", foto: "/TURKEY.jpg", sorotan: false },
    { id: 4, nama: "INGGRIS", foto: "/inggris.png", sorotan: false },
    { id: 5, nama: "PRANCIS", foto: "/prancis.jpg", sorotan: false },
    { id: 6, nama: "SPAIN", foto: "/spanyol.jpg", sorotan: false },
  ];
  
  // ================= DAFTAR FOTO GAME BARU ANDA =================
  const daftarGame = [
    { id: "01", judul: "EA SPORTS FC 26", genre: "Sports / Football", konsol: "PS 5 & PS 4", foto: "/game-fc26.jpg" },
    { id: "02", judul: "BLACK MYTH: WUKONG", genre: "Action RPG", konsol: "PS 5 ", foto: "/game-wukong.jpg" },
    { id: "03", judul: "GRAND THEFT AUTO VI", genre: "Open World Action", konsol: "PS 5 Exclusive", foto: "/game-gta6.jpg" },
    { id: "04", judul: "TEKKEN 8", genre: "Fighting / Versus", konsol: "PS 5 & PC VIP", foto: "/game-tekken8.jpg" },
    { id: "05", judul: "MOTO GP 26", genre: "Racing Simulation", konsol: "PS 5 & PS 4", foto: "/game-motogp.jpg" },
    { id: "06", judul: "CYBERPUNK 2077", genre: "Sci-Fi RPG", konsol: "PS 5", foto: "/game-cyberpunk.jpg" },
    { id: "07", judul: "E FOOTBALL", genre: "Sports / Football", konsol: "PS 5 & PS 4", foto: "/game-efootball.jpg" },
    { id: "08", judul: "NARUTO STORM CONNECTIONS", genre: "Anime Fighting", konsol: "PS 5 & PS 4", foto: "/game-naruto.jpg" },
  ];

  // Daftar Fitur / Tim Layanan
  const fiturLayanan = [
    { nama: "REAL-TIME CHECK", role: "Cek Unit dari Rumah", warna: "from-pink-500 to-purple-600" },
    { nama: "INSTANT PAY", role: "QRIS & VA Midtrans", warna: "from-emerald-400 to-teal-600" },
    { nama: "NO QUEUE", role: "Datang Langsung Main", warna: "from-amber-400 to-orange-600" },
    { nama: "MEMBER LOYALTY", role: "Diskon & Promo Rutin", warna: "from-cyan-400 to-blue-600" },
  ];

  return (
    <main className="relative min-h-screen w-full bg-[#05070f] text-white overflow-x-hidden font-sans select-none">
      
      {/* STYLE KHUSUS UNTUK INTERACTIVE INFINITE SCROLL & ANIMASI HERO */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.01); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-games {
          display: flex;
          width: max-content;
          animation: marquee-reverse 35s linear infinite;
        }
        /* Berhenti bergerak (Pause) ketika kursor diarahkan ke area foto */
        .animate-marquee:hover,
        .animate-marquee-games:hover {
          animation-play-state: paused;
        }
        .animate-hero-text {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>

      {/* ================= 1. HERO SECTION (BANNER ATAS) ================= */}
      <section className="relative min-h-[90vh] w-full flex flex-col justify-between border-b border-cyan-500/20 pb-12">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={fotoHeroBg}
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/60 to-transparent" />
        </div>

        <header className="relative z-20 flex items-center justify-between px-6 md:px-16 py-6">
          <div className="flex items-center gap-2 font-black text-xl tracking-wider text-cyan-400">
            <span className="text-2xl">🎮</span> PLAYZONE
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-gray-300 uppercase">
  <Link href="/ketersediaan" className="hover:text-cyan-400 transition">Ketersediaan</Link>
  <Link href="/fasilitas" className="hover:text-cyan-400 text-cyan-300 transition">Ruangan VIP</Link> {/* <-- MENU BARU */}
  <Link href="#about" className="hover:text-cyan-400 transition">World Cup</Link>
  <Link href="#katalog-game" className="hover:text-cyan-400 transition">Daftar Game</Link>
  <Link href="#fitur" className="hover:text-cyan-400 transition">Layanan</Link>
</nav>

          <Link
            href="/login"
            className="relative px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-[#05070f] font-black text-xs uppercase tracking-widest transition shadow-[0_0_20px_rgba(6,182,212,0.6)] [clip-path:polygon(10px_0,_100%_0,_100%_calc(100%_-_10px),_calc(100%_-_10px)_100%,_0_100%,_0_10px)]"
          >
            ▶ BOOKING NOW
          </Link>
        </header>

        {/* HERO TEXT INTERACTIVE (Melayang Halus & Glowing) */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 my-auto py-12 animate-hero-text">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-widest italic text-white drop-shadow-[0_0_35px_rgba(6,182,212,0.5)] max-w-4xl leading-tight transition-all duration-300 hover:drop-shadow-[0_0_50px_rgba(6,182,212,0.9)] hover:scale-[1.02] cursor-default">
            THE NEXT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              GENERATION RENTAL
            </span>
          </h1>

          <p className="mt-4 max-w-md text-xs sm:text-sm text-cyan-200/80 uppercase tracking-widest font-semibold border-y border-cyan-500/30 py-2">
            Sistem Reservasi PlayStation UP TO DATE
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/ketersediaan"
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition shadow-[0_0_25px_rgba(6,182,212,0.5)] [clip-path:polygon(12px_0,_100%_0,_100%_calc(100%_-_12px),_calc(100%_-_12px)_100%,_0_100%,_0_12px)]"
            >
              ▶ CEK UNIT KOSONG
            </Link>
            <Link
              href="#katalog-game"
              className="px-8 py-3.5 border border-cyan-400/50 bg-cyan-950/30 text-cyan-300 font-black text-xs uppercase tracking-widest hover:bg-cyan-900/50 transition [clip-path:polygon(12px_0,_100%_0,_100%_calc(100%_-_12px),_calc(100%_-_12px)_100%,_0_100%,_0_12px)]"
            >
              EXPLORE GAMES
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 2. ABOUT SECTION (INTERACTIVE MARQUEE SCROLL) ================= */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-cyan-500/10 overflow-hidden">
        <div className="lg:col-span-6 flex flex-col items-start">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-cyan-400 inline-block"></span> WORLD CUP 2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-wider mb-6">
            SAMBUT PERAYAAN <br /> WORLD CUP 2026
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-8 font-normal">
            RAYAKAN DEMAM WORLD CUP 2026 BERSAMA PLAYZONE!
            Rasakan atmosfer panggung sepak bola terbesar di dunia bersama teman-temanmu. Mainkan match panas laga Piala Dunia di TV 4K 120Hz super tajam, didukung sound system imersif bak di dalam stadion asli, dan kenyamanan kursi ergonomis kelas VIP.

            Jangan sampai kehilangan momen laga favoritmu—booking jam mainmu langsung dari rumah, datang, dan kick-off tanpa perlu antre!
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/ketersediaan" className="px-6 py-2.5 bg-cyan-500 text-black font-black text-xs uppercase tracking-wider [clip-path:polygon(8px_0,_100%_0,_100%_calc(100%_-_8px),_calc(100%_-_8px)_100%,_0_100%,_0_8px)]">
              MAIN SEKARANG
            </Link>
            <Link href="/login" className="px-6 py-2.5 border border-white/20 bg-white/5 text-white font-bold text-xs uppercase tracking-wider hover:border-cyan-400 [clip-path:polygon(8px_0,_100%_0,_100%_calc(100%_-_8px),_calc(100%_-_8px)_100%,_0_100%,_0_8px)]">
              BECOME A MEMBER
            </Link>
          </div>
        </div>

        {/* KANAN: INFINITE SCROLL MARQUEE AREA */}
        <div className="lg:col-span-6 overflow-hidden relative py-4">
          <div className="animate-marquee gap-5">
            {[...daftarFotoAbout, ...daftarFotoAbout].map((item, idx) => (
              <div
                key={idx}
                className={`relative shrink-0 transition-all duration-300 cursor-pointer ${
                  item.sorotan
                    ? "w-44 sm:w-56 h-72 sm:h-80 border-2 border-cyan-400 bg-cyan-950/40 p-2 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                    : "w-36 sm:w-48 h-64 sm:h-72 border border-cyan-500/40 bg-black p-2 opacity-80 hover:opacity-100"
                } [clip-path:polygon(20px_0,_100%_0,_100%_100%,_0_100%,_0_20px)]`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={item.foto} alt={item.nama} fill className="object-cover hover:scale-110 transition duration-500" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                    <span className={`text-xs font-black uppercase ${item.sorotan ? "text-cyan-300" : "text-white"}`}>
                      {item.nama}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. KATALOG GAME POPULER (SERAGAM & INTERACTIVE GLOW) ================= */}
      <section id="katalog-game" className="relative z-10 py-20 border-b border-cyan-500/10 overflow-hidden">
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block mb-1">
            ALWAYS UPDATED
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase italic tracking-widest text-white">
            KATALOG <span className="text-cyan-400">GAME POPULER</span>
          </h2>
          <p className="text-xs text-gray-400 mt-2">Arahkan kursor ke foto game untuk melihat detail spesifikasi konsol</p>
        </div>

        {/* Carousel Infinite Scroll Game */}
        <div className="overflow-hidden relative py-6">
          <div className="animate-marquee-games gap-6 px-3">
            {[...daftarGame, ...daftarGame].map((game, idx) => (
              <Link
                href="/ketersediaan"
                key={idx}
                className="group relative shrink-0 w-60 sm:w-64 h-80 sm:h-96 border border-cyan-500/30 bg-[#080d1a] p-2 transition-all duration-500 ease-out hover:scale-105 hover:border-2 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:z-30 [clip-path:polygon(24px_0,_100%_0,_100%_calc(100%_-_24px),_calc(100%_-_24px)_100%,_0_100%,_0_24px)] block"
              >
                <div className="relative w-full h-full overflow-hidden bg-black">
                  <Image
                    src={game.foto}
                    alt={game.judul}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay Hitam Gradasi */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/30 to-transparent transition-opacity duration-300 group-hover:via-[#05070f]/50" />

                  {/* Badge Platform Konsol di Kanan Atas */}
                  <div className="absolute top-3 right-3 bg-black/80 border border-cyan-500/50 backdrop-blur-md px-2.5 py-1 rounded transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-400">
                    <span className="text-[9px] font-black text-cyan-300 uppercase tracking-wider">{game.konsol}</span>
                  </div>

                  {/* Tombol Play Sci-Fi yang Muncul Saat Di-Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <span className="w-14 h-14 rounded-full bg-cyan-500 text-black flex items-center justify-center text-base font-black shadow-[0_0_25px_rgba(6,182,212,1)]">
                      ▶
                    </span>
                  </div>

                  {/* Informasi Judul & Genre Game */}
                  <div className="absolute bottom-4 left-4 right-4 transition-transform duration-300 group-hover:-translate-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 block tracking-widest uppercase mb-1">
                      {game.genre}
                    </span>
                    <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white line-clamp-1 group-hover:text-cyan-300 transition-colors duration-300">
                      {game.judul}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. MEET OUR TEAM / KEUNGGULAN LAYANAN ================= */}
      <section id="fitur" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block mb-1">
            WHY CHOOSE US
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-widest text-white">
            KEUNGGULAN <span className="text-cyan-400">SISTEM KAMI</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {fiturLayanan.map((fitur, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-cyan-500/20 bg-[#080d1a]/80 backdrop-blur-md hover:border-cyan-400 transition group shadow-lg"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${fitur.warna} flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:scale-110 transition duration-300`}>
                <span className="text-3xl">🎮</span>
              </div>

              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1">
                {fitur.nama}
              </h4>
              <p className="text-[11px] text-cyan-300/70 font-semibold uppercase tracking-widest">
                {fitur.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. FOOTER MINIMALIS SCI-FI ================= */}
      <footer className="relative z-10 border-t border-white/10 px-6 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 bg-[#030408]">
        <div className="flex items-center gap-2 font-black tracking-wider text-cyan-500 mb-4 sm:mb-0">
          🎮 PLAYZONE <span className="text-[10px] text-gray-500 font-normal">v2.0 NEXT-GEN</span>
        </div>
        <div className="flex gap-6 uppercase text-[10px] tracking-widest font-bold text-gray-400">
          <Link href="/ketersediaan" className="hover:text-cyan-400 transition">Ketersediaan</Link>
          <Link href="/login" className="hover:text-cyan-400 transition">Login</Link>
          <span>© 2026 PLAYZONE</span>
        </div>
      </footer>

    </main>
  );
}