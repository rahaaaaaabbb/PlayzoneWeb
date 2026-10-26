"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WalkInModal({ units }: { units: any[] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [unitId, setUnitId] = useState("");
  const [durasi, setDurasi] = useState(1);

  const unitTersedia = units.filter((u) => u.status === "TERSEDIA");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitId || !nama) return alert("Pilih unit dan isi nama pelanggan!");

    setLoading(true);
    const res = await fetch("/api/admin/walkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        namaPelanggan: nama,
        unitId: Number(unitId),
        durasiJam: Number(durasi),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Berhasil! Unit langsung aktif dimainkan.");
      setIsOpen(false);
      setNama("");
      router.refresh();
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-[#01DE82] px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-[#020E0E] transition hover:scale-105 hover:shadow-[0_0_20px_rgba(1,222,130,0.4)]"
      >
        + Catat Main Langsung (Walk-In)
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#020E0E] p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-extrabold uppercase tracking-wider text-white">
              Main Langsung Tanpa Akun (Cash)
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-gray-400">
                  Nama Pelanggan (Datang Langsung)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi (Meja 1)"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white outline-none focus:border-[#01DE82]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-gray-400">
                  Pilih Unit Tersedia
                </label>
                <select
                  required
                  value={unitId}
                  onChange={(e) => setUnitId(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#05614B] p-3 text-sm text-white outline-none"
                >
                  <option value="">-- Pilih Unit --</option>
                  {unitTersedia.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nama_unit} - Rp {u.harga_jam.toLocaleString("id-ID")}/jam
                    </option>
                  ))}
                </select>
                {unitTersedia.length === 0 && (
                  <p className="mt-1 text-xs text-red-400">Semua unit sedang penuh/disewa!</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-gray-400">
                  Durasi Bermain (Jam)
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={durasi}
                  onChange={(e) => setDurasi(Number(e.target.value))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm font-bold text-[#01DE82] outline-none"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-1/2 rounded-lg border border-white/10 py-3 text-xs font-bold uppercase text-gray-400 hover:bg-white/5"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading || unitTersedia.length === 0}
                  className="w-1/2 rounded-lg bg-[#01DE82] py-3 text-xs font-extrabold uppercase tracking-wider text-[#020E0E] transition hover:bg-emerald-400 disabled:opacity-50"
                >
                  {loading ? "Memproses..." : "Aktifkan Unit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}