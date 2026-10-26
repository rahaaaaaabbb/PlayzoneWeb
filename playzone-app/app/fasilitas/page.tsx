"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function FasilitasPage() {
  const [filter, setFilter] = useState("SEMUA");

  // DAFTAR FOTO RUANGAN & KONSOL
  // Silakan siapkan foto ruangan rental Anda dan masukkan ke folder public/
  const daftarRuangan = [
    {
      id: "VIP-PS5",
      kategori: "PS 5",
      tipe: "VIP ROOM",
      nama: "PS 5 VIP Lounge",
      harga: "Rp 25.000 / Jam",
      foto: "/ruang-ps5-vip.jpg",
      spesifikasi: ["Smart TV OLED 55 Inch 120Hz", "Sofa Premium 3-4 Orang", "Dolby Atmos Audio", "AC Dingin & Ruangan Privat"],
    },
    {
      id: "REG-PS5",
      kategori: "PS 5",
      tipe: "REGULER",
      nama: "PS 5 Arena Reguler",
      harga: "Rp 15.000 / Jam",
      foto: "/ruang-ps5-reg.jpg",
      spesifikasi: ["Smart TV 4K 43 Inch", "Kursi Gaming Ergonomis", "Headset Gaming Available", "Bebas Pilih Game Terbaru"],
    },
    {
      id: "VIP-PS4",
      kategori: "PS 4",
      tipe: "VIP ROOM",
      nama: "PS 4 Pro Squad VIP",
      harga: "Rp 18.000 / Jam",
      foto: "/ruang-ps4-vip.jpg",
      spesifikasi: ["Smart TV 50 Inch", "Sofa L Nyaman", "Cocok untuk Mabar Squad Bola/Party", "Sound System Bass Booster"],
    },
    {
      id: "REG-PS4",
      kategori: "PS 4",
      tipe: "REGULER",
      nama: "PS 4 Pro & Slim Reguler",
      harga: "Rp 10.000 / Jam",
      foto: "/ruang-ps4-reg.jpg",
      spesifikasi: ["LED TV Full HD 40 Inch", "Kursi Santai", "Stik Wireless Original", "Katalog Game Lengkap"],
    },
    {
      id: "REG-PS3",
      kategori: "PS 3",
      tipe: "REGULER",
      nama: "PS 3 Nostalgia Booth",
      harga: "Rp 5.000 / Jam",
      foto: "/ruang-ps3.jpg",
      spesifikasi: ["LED TV 32 Inch", "Hemat & Murah Meriah", "Game PES Gembox & GTA San Andreas", "Tempat Bersih & Nyaman"],
    },
  ];

  // Filter ruangan sesuai tombol tab yang dipilih
  const ruanganTerfilter = filter === "SEMUA" 
    ? daftarRuangan 
    : daftarRuangan.filter((item) => item.kategori === filter || item.tipe.includes(filter));

  return (
    <main className="min-h-screen w-full bg-[#05070f] text-white font-sans select-none pb-20">
      
      {/* --- 1. HEADER / NAVBAR --- */}
      <header className="flex items-center justify-between px-6 md:px-16 py-6 border-b border-cyan-500/20 bg-[#05070f]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-wider text-cyan-400">
          <span className="text-2xl">🎮</span> PLAYZONE
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-gray-300 uppercase">
          <Link href="/" className="hover:text-cyan-400 transition">&larr; Beranda</Link>
          <Link href="/ketersediaan" className="hover:text-cyan-400 transition">Ketersediaan Unit</Link>
        </nav>

        <Link
          href="/login"
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest transition [clip-path:polygon(8px_0,_100%_0,_100%_calc(100%_-_8px),_calc(100%_-_8px)_100%,_0_100%,_0_8px)]"
        >
          BOOKING SEKARANG
        </Link>
      </header>

      {/* --- 2. JUDUL SHOWROOM --- */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block mb-2">
          ARENA & FASILITASI KAMI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-wider text-white">
          SHOWROOM <span className="text-cyan-400">RUANGAN PLAYZONE</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-3 max-w-xl mx-auto">
          Pilih suasana bermain yang paling cocok untukmu. Mulai dari area VIP dengan sofa empuk privat hingga booth reguler hemat untuk mabar seru bareng teman-teman.
        </p>

        {/* Tombol Filter Kategori */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["SEMUA", "PS 5", "PS 4", "PS 3", "VIP"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 text-xs font-black uppercase tracking-wider transition ${
                filter === tab
                  ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                  : "border border-cyan-500/30 text-gray-300 hover:border-cyan-400"
              } [clip-path:polygon(8px_0,_100%_0,_100%_calc(100%_-_8px),_calc(100%_-_8px)_100%,_0_100%,_0_8px)]`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* --- 3. GALERI KARTU RUANGAN --- */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {ruanganTerfilter.map((ruang) => (
          <div
            key={ruang.id}
            className="group relative border border-cyan-500/30 bg-[#080d1a] p-4 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col justify-between [clip-path:polygon(20px_0,_100%_0,_100%_calc(100%_-_20px),_calc(100%_-_20px)_100%,_0_100%,_0_20px)]"
          >
            {/* Foto Ruangan */}
            <div>
              <div className="relative h-64 w-full overflow-hidden bg-black mb-4">
                <Image
                  src={ruang.foto}
                  alt={ruang.nama}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => {
                    // Fallback sementara jika foto belum disiapkan
                    e.currentTarget.src = "/bg-ketersediaan.png";
                  }}
                />
                <div className="absolute top-3 left-3 bg-black/80 border border-cyan-500/50 backdrop-blur-md px-3 py-1">
                  <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest">{ruang.tipe}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-cyan-500 text-black px-3 py-1 font-black text-xs uppercase">
                  {ruang.harga}
                </div>
              </div>

              {/* Deskripsi & Spesifikasi */}
              <h3 className="text-xl font-black uppercase italic tracking-wide text-white group-hover:text-cyan-400 transition">
                {ruang.nama}
              </h3>
              
              <ul className="mt-3 space-y-1.5 text-xs text-gray-300">
                {ruang.spesifikasi.map((spek, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">✓</span> {spek}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tombol Aksi */}
            <div className="mt-6 pt-4 border-t border-white/10 flex gap-4">
              <Link
                href="/ketersediaan"
                className="w-full text-center py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black text-xs uppercase tracking-widest hover:brightness-110 transition [clip-path:polygon(8px_0,_100%_0,_100%_calc(100%_-_8px),_calc(100%_-_8px)_100%,_0_100%,_0_8px)]"
              >
                CEK KETERSEDIAAN
              </Link>
            </div>
          </div>
        ))}
      </section>

    </main>
  );
}