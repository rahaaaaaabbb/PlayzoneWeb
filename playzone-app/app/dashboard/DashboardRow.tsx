"use client";

import { useState, useEffect } from "react";
import SelesaikanButton from "./SelesaikanButton";

export default function DashboardRow({ res }: { res: any }) {
  const [sisaWaktu, setSisaWaktu] = useState<string>("Menghitung...");
  const [statusWaktu, setStatusWaktu] = useState<"aman" | "warning" | "habis">("aman");
  
  // Cek apakah transaksi ini sudah kedaluwarsa secara waktu nyata
  const waktuSelesaiMs = new Date(res.waktu_selesai).getTime();
  const sekarangMs = new Date().getTime();
  const sudahLewat = waktuSelesaiMs <= sekarangMs;

  // Transaksi dianggap aktif HANYA JIKA unit sedang disewa DAN waktunya belum di-stop admin
  const isSesiAktif = res.unit.status === "DISEWA" && !sudahLewat;

  useEffect(() => {
    if (!isSesiAktif) {
      setSisaWaktu(sudahLewat ? "Sesi Selesai" : "Sesi Selesai");
      return;
    }

    const hitungMundur = () => {
      const sekarang = new Date().getTime();
      const selisih = waktuSelesaiMs - sekarang;

      if (selisih <= 0) {
        setSisaWaktu("WAKTU HABIS!");
        setStatusWaktu("habis");
      } else {
        const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((selisih % (1000 * 60)) / 1000);

        setSisaWaktu(`${jam}j ${menit}m ${detik}d`);

        if (selisih <= 10 * 60 * 1000) {
          setStatusWaktu("warning");
        } else {
          setStatusWaktu("aman");
        }
      }
    };

    hitungMundur();
    const interval = setInterval(hitungMundur, 1000);

    return () => clearInterval(interval);
  }, [res.waktu_selesai, res.unit.status, isSesiAktif, sudahLewat, waktuSelesaiMs]);

  const hitungDurasiJam = Math.round(res.total_harga / res.unit.harga_jam);

  return (
    <tr className="hover:bg-white/[0.03] transition-colors">
      <td className="p-5 text-gray-400 text-xs">
        {new Date(res.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>

      <td className="p-5 font-bold text-white">{res.user.nama}</td>

      <td className="p-5 font-semibold text-[#01DE82]">
        {res.unit.nama_unit}
        <span className="block text-[10px] text-gray-400 font-normal mt-0.5">
          ({hitungDurasiJam} Jam)
        </span>
      </td>

      <td className="p-5">
        {isSesiAktif || statusWaktu === "habis" ? (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider ${
              statusWaktu === "habis"
                ? "bg-red-500/20 text-red-400 border border-red-500 animate-pulse"
                : statusWaktu === "warning"
                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50"
                : "bg-blue-500/20 text-cyan-300 border border-blue-500/30"
            }`}
          >
            ⏳ {sisaWaktu}
          </span>
        ) : (
          <span className="text-xs text-gray-500 font-semibold">Selesai</span>
        )}
      </td>

      <td className="p-5 font-bold text-white">
        Rp {res.total_harga.toLocaleString("id-ID")}
      </td>

      <td className="p-5 text-center">
        {/* Mengirimkan reservasiId ke komponen tombol */}
        {isSesiAktif || statusWaktu === "habis" ? (
          <SelesaikanButton unitId={res.unit.id} reservasiId={res.id} />
        ) : (
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-gray-500 border border-white/5">
            Selesai
          </span>
        )}
      </td>
    </tr>
  );
}