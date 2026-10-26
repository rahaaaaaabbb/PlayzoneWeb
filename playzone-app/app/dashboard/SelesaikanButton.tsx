"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelesaikanButton({
  unitId,
  reservasiId,
}: {
  unitId: number;
  reservasiId: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSelesai = async () => {
    if (!confirm("Akhiri sesi sewa untuk transaksi pemain ini?")) return;

    setLoading(true);
    const res = await fetch("/api/unit/selesai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unitId, reservasiId }),
    });

    if (res.ok) {
      alert("Sesi sewa diselesaikan. Unit kembali tersedia.");
      router.refresh();
    } else {
      alert("Gagal memperbarui status unit.");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleSelesai}
      disabled={loading}
      className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "Proses..." : "Selesaikan Sewa"}
    </button>
  );
}