import { prisma } from "../../lib/prisma";
import Link from "next/link";
import { logoutAction } from "@/app/actions";
import Image from "next/image";
import UnitCard from "./UnitCard"
export const dynamic = "force-dynamic";

export default async function KetersediaanPage() {
  const units = await prisma.unitPS.findMany();
  
  // Mengambil satu unit untuk dijadikan "Sorotan Utama" (Hero Banner)
  // Jika database kosong, kita sediakan nilai bawaan (fallback)
  const featuredUnit = units[0] || {
    nama_unit: "PLAYZONE EXCLUSIVE",
    kategori: "Premium",
    id: "0",
  };

  return (
    <main 
      className="relative min-h-screen text-white overflow-x-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/bg-ketersediaan.png')",
      }}
    >
      
      {/* --- 1. TOP NAVBAR --- */}
<nav className="absolute top-0 w-full z-50 px-6 lg:px-12 py-6 flex justify-between items-center bg-gradient-to-b from-[#020E0E]/90 to-transparent">
  <div className="flex items-center gap-10">
    <div className="text-2xl font-extrabold tracking-wider hidden md:block">
      PLAY<span className="text-[#01DE82]">ZONE</span>
    </div>
    </div>

  <div className="flex items-center gap-4">
    {/* SEBELUMNYA: Tombol merah bulat w-8 h-8 rounded-full bg-red-500/20 ... */}
    {/* SESUDAH: Hanya Teks KELUAR tebal dengan efek hover hijau/merah */}
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-xs md:text-sm font-black tracking-widest text-red-500 hover:text-red-400 transition-colors cursor-pointer"
        title="Logout"
      >
        KELUAR
      </button>
    </form>
  </div>
</nav>

      {/* --- 2. HERO SECTION (Banner Utama) --- */}
      <section className="relative w-full h-[85vh] flex flex-col justify-center px-6 lg:px-12 pt-20">
        {/* Background Visual: Gradasi Sinematik & Cahaya Neon sebagai pengganti gambar */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Efek gradient latar belakang */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020E0E] via-[#020E0E]/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020E0E] via-transparent to-transparent z-10"></div>
          
          {/* Objek cahaya pengganti poster film */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#05614B] to-[#01DE82] rounded-full blur-[120px] opacity-30"></div>
          
          {/* Ikon besar samar di kanan */}
          <div className="absolute right-10 md:right-32 top-1/2 transform -translate-y-1/2 text-[20rem] opacity-10 blur-sm z-0">
            {featuredUnit.nama_unit.toLowerCase().includes('pc') ? '🖥️' : '🎮'}
          </div>
        </div>

        {/* Konten Teks Hero */}
        <div className="relative z-20 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wide leading-tight mb-4 text-white drop-shadow-2xl">
            {featuredUnit.nama_unit}
          </h1>
          
          {/* Metadata ala Film */}
          <div className="flex items-center gap-3 text-xs md:text-sm font-semibold mb-8 text-gray-300">
            <span className="text-[#ff6101]">Playzone Original</span>
            <span>•</span>
            <span className="text-white">98% Match</span>
            <span>•</span>
            <span>2026</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {featuredUnit.id !== 0 && featuredUnit.status === "TERSEDIA" ? (
  <Link
    href={`/reservasi/${featuredUnit.id}`}
    className="bg-[#01DE82] text-[#020E0E] px-10 py-3 rounded-full font-extrabold tracking-widest hover:scale-105 hover:shadow-[0_0_30px_rgba(1,222,130,0.5)] transition-all duration-300"
  >
    PLAY
  </Link>
) : (
  <button 
    disabled 
    className="bg-gray-800 text-gray-500 border border-white/10 px-10 py-3 rounded-full font-extrabold tracking-widest cursor-not-allowed"
  >
    PENUH
  </button>
)}
          </div>
        </div>
      </section>

      {/* --- 3. HORIZONTAL CAROUSEL ("MY LIST") --- */}
  <section className="relative z-30 -mt-25 pl-6 lg:pl-12">
    <h2 className="text-base font-bold tracking-widest mb-4 uppercase text-gray-200">
      Populer Minggu Ini
    </h2>

    <div className="flex gap-4 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {units.map((unit) => (
        // Kode kita sekarang jauh lebih ringkas & bebas error:
        <UnitCard key={unit.id} unit={unit} />
      ))}
      <div className="flex-none w-6 lg:w-12"></div>
    </div>
  </section>
    </main>
  );
}