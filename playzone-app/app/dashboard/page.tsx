import WalkInModal from "./WalkInModal";
import DashboardRow from "./DashboardRow";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { logoutAction } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Ambil data reservasi beserta relasinya
  const daftarReservasi = await prisma.reservasi.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      unit: true,
      transaksi: true,
    },
  });

  // Ambil data unit untuk dropdown modal walk-in
  const units = await prisma.unitPS.findMany();

  // Hitung total pendapatan
  const totalPendapatan = daftarReservasi.reduce(
    (total, res) => total + res.total_harga,
    0
  );

  // Hitung jumlah unit yang sedang aktif dimainkan
  const unitDisewa = daftarReservasi.filter(
    (r) => r.unit.status === "DISEWA"
  ).length;

  return (
    <main className="min-h-screen bg-[#020E0E] p-6 text-white overflow-x-hidden lg:p-12">
      {/* Efek Cahaya Latar Belakang */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#05614B] to-[#01DE82] rounded-full blur-[150px] opacity-20 pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* --- 1. HEADER DASHBOARD --- */}
        <header className="mb-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-wider">
              PLAY<span className="text-[#01DE82]">ZONE</span>{" "}
              <span className="ml-2 rounded bg-[#05614B]/60 px-2.5 py-1 text-xs font-semibold tracking-widest text-[#01DE82] border border-[#01DE82]/40">
                ADMIN
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Tombol Modal Main Langsung (Walk-In) */}
            <WalkInModal units={units} />

            <Link
              href="/ketersediaan"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition hover:border-[#01DE82] hover:text-[#01DE82]"
            >
              &larr; Ketersediaan
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-red-500/40 bg-red-500/20 px-5 py-2 text-xs font-bold uppercase tracking-widest text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Keluar
              </button>
            </form>
          </div>
        </header>

        {/* --- 2. KARTU STATISTIK --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#05614B]/30 to-[#020E0E] p-6 shadow-[0_0_30px_rgba(1,222,130,0.05)] backdrop-blur-xl group hover:border-[#01DE82]/50 transition duration-300">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Total Pendapatan
            </p>
            <p className="text-3xl lg:text-4xl font-black text-[#01DE82] tracking-tight">
              Rp {totalPendapatan.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#05614B]/30 to-[#020E0E] p-6 shadow-[0_0_30px_rgba(1,222,130,0.05)] backdrop-blur-xl group hover:border-[#01DE82]/50 transition duration-300">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Unit Sedang Aktif (Disewa)
            </p>
            <p className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              {unitDisewa} <span className="text-sm font-normal text-gray-400">Sesi</span>
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#05614B]/30 to-[#020E0E] p-6 shadow-[0_0_30px_rgba(1,222,130,0.05)] backdrop-blur-xl group hover:border-[#01DE82]/50 transition duration-300">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Total Riwayat Reservasi
            </p>
            <p className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              {daftarReservasi.length} <span className="text-sm font-normal text-gray-400">Pesanan</span>
            </p>
          </div>
        </div>

        {/* --- 3. TABEL RIWAYAT RESERVASI --- */}
        <div className="rounded-2xl border border-white/10 bg-[#05614B]/10 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-white/10 bg-[#020E0E]/60 flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-200">
              Riwayat Transaksi Real-Time
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-[#020E0E] text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-white/10">
                <tr>
                  <th className="p-5">Waktu Order</th>
                  <th className="p-5">Pelanggan</th>
                  <th className="p-5">Unit PS</th>
                  <th className="p-5">Sisa Waktu Bermain</th>
                  <th className="p-5">Total Bayar</th>
                  <th className="p-5 text-center">Validasi Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {daftarReservasi.length > 0 ? (
                  daftarReservasi.map((res) => (
                    <DashboardRow key={res.id} res={res} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500 font-medium">
                      Belum ada data reservasi masuk.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}