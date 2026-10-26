"use client"; // <-- Kunci utama agar bisa pakai onError

import Image from "next/image";
import Link from "next/link";

export default function UnitCard({ unit }: { unit: any }) {
  // Menentukan path gambar (otomatis cari berdasarkan ID atau kolom gambar)
  const fotoUnit = unit.gambar || `/unit-${unit.id}.jpg`;

  return (
    <div className="group relative flex-none w-[160px] md:w-[220px] snap-start rounded-xl overflow-hidden border border-white/10 bg-[#05614B]/20 hover:border-[#01DE82]/60 hover:shadow-[0_0_20px_rgba(1,222,130,0.2)] transition-all duration-300 cursor-pointer">
      
      {/* --- BAGIAN GAMBAR --- */}
      <div className="relative h-[240px] md:h-[320px] w-full flex items-center justify-center bg-[#020E0E]">
        <Image
          src={fotoUnit}
          alt={unit.nama_unit}
          fill
          sizes="(max-width: 768px) 160px, 220px"
          className="object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            // Mengganti gambar jika file tidak ditemukan di folder public
            e.currentTarget.src = "/bg-game.jpg";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020E0E] via-[#020E0E]/20 to-transparent z-10" />

        <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold tracking-widest border border-white/10">
          <span className={unit.status === "TERSEDIA" ? "text-[#ffffff]" : "text-red-500"}>
            {unit.status}
          </span>
        </div>
      </div>

      {/* --- PANEL BAWAH --- */}
      <div className="absolute bottom-0 z-20 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-sm font-bold text-white line-clamp-1 mb-1">
          {unit.nama_unit}
        </h3>
        <p className="text-[#01DE82] text-xs font-semibold mb-3">
          {unit.harga_jam / 1000}k/jam
        </p>

        {unit.status === "TERSEDIA" ? (
          <Link
            href={`/reservasi/${unit.id}`}
            className="block w-full py-1.5 rounded bg-white text-black text-xs font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Pesan
          </Link>
        ) : (
          <button
            disabled
            className="w-full py-1.5 rounded bg-gray-800 text-gray-500 text-xs font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Penuh
          </button>
        )}
      </div>
    </div>
  );
}