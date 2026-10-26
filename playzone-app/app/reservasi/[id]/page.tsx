"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Script from 'next/script';

declare global {
  interface Window {
    snap: any;
  }
}

export default function ReservasiPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [durasi, setDurasi] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePesan = async () => {
    setLoading(true);
    const res = await fetch("/api/reservasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unitId: resolvedParams.id, durasiJam: durasi }),
    });
    
    const data = await res.json();
    setLoading(false);
    
    if (data.success && data.token) {
      window.snap.pay(data.token, {
        onSuccess: async function () {
          try {
            const resUpdate = await fetch("/api/reservasi/sukses", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ unitId: resolvedParams.id }),
            });

            if (!resUpdate.ok) throw new Error("Gagal update DB");

            alert("Pembayaran berhasil! Selamat bermain.");
            window.location.href = "/ketersediaan";
          } catch (error) {
            console.error(error);
            alert("Pembayaran berhasil, tapi ada masalah sinkronisasi sistem.");
          }
        },
        onPending: function () {
          alert("Menunggu pembayaran...");
          router.push("/ketersediaan");
        },
        onError: function () {
          alert("Pembayaran gagal!");
        },
        onClose: function () {
          alert("Anda menutup popup sebelum menyelesaikan pembayaran");
        }
      });
    } else {
      alert("Gagal: " + data.error);
    }
  };

  return (
    <>
      {/* Script Midtrans diletakkan di luar struktur main agar load lebih stabil */}
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive" 
      />

      <main className="flex min-h-screen items-center justify-center bg-[#020E0E] p-8">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-b from-[#05614B]/30 to-[#020E0E] p-8 shadow-[0_0_50px_rgba(1,222,130,0.1)] backdrop-blur-xl">
          
          <div className="mb-8 text-center">
            <span className="text-5xl mb-4 block">🕹️</span>
            <h1 className="text-2xl font-extrabold text-white tracking-widest uppercase">Detail Pesanan</h1>
            <p className="text-gray-400 text-sm mt-2">Pilih durasi mainmu untuk unit ini</p>
          </div>
          
          <div className="mb-8">
            <label className="mb-3 block text-sm font-bold text-gray-300 tracking-wider">DURASI (JAM)</label>
            <div className="flex items-center gap-4 bg-[#020E0E] p-2 rounded-xl border border-white/10 focus-within:border-[#01DE82] transition-colors">
              <input 
                type="number" 
                min="1" 
                value={durasi} 
                onChange={(e) => setDurasi(Number(e.target.value))}
                className="w-full bg-transparent p-3 outline-none text-white text-xl font-bold text-center"
              />
              <span className="pr-4 font-bold text-[#01DE82]">JAM</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => router.back()}
              className="w-1/3 rounded-xl border border-white/20 py-3 font-bold text-gray-300 hover:bg-white/5 transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={handlePesan}
              disabled={loading}
              className="w-2/3 rounded-xl bg-[#01DE82] py-3 font-extrabold text-[#020E0E] hover:shadow-[0_0_20px_rgba(1,222,130,0.4)] disabled:opacity-50 disabled:hover:shadow-none transition-all duration-300 uppercase tracking-wider"
            >
              {loading ? "Memproses..." : "Bayar Sekarang"}
            </button>
          </div>

        </div>
      </main>
    </>
  );
}