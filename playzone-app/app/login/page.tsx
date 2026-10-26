"use client";

import { useState } from "react";
import { loginAction } from "@/app/actions";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(formData: FormData) {
    setLoading(true);
    const res = await loginAction(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b10] p-6 font-sans">
      
      {/* KUNCI 3D: Hilangkan 'overflow-hidden' dari kontainer utama ini 
        agar karakter transparan bisa keluar dari box.
      */}
      <div className="relative flex w-full max-w-4xl rounded-2xl bg-[#14141d] shadow-2xl">
        
        {/* GAMBAR 3D POP-OUT (Tanpa Background) */}
        {/* Sesuaikan nilai -left, bottom, dan width (w-[...]) agar pas dengan proporsi gambar Anda */}
        <div className="pointer-events-none absolute -left-90 bottom-0 z-20 hidden w-[20%] md:block lg:-left-32 lg:w-[60%] xl:-left-40 xl:w-[65%]">
          <img 
            src="/karakter-popout.png" 
            alt="Character 3D" 
            className="h-auto w-full drop-shadow-[0_10px_20px_rgba(209,14,219,0.3)]"
          />
        </div>

        {/* Bagian Kiri - Latar Belakang (Dengan Background) */}
        <div 
          className="relative hidden w-1/2 overflow-hidden rounded-l-2xl bg-cover bg-center md:block"
          style={{ 
            backgroundImage: "url('/bg-game.jpg')",
          }}
        >
          {/* Efek Gradasi Bawah agar teks terbaca */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#14141d] via-[#14141d]/40 to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 z-20 text-white">
            <h2 className="text-3xl font-black uppercase tracking-wider">PlayZONE</h2>
            <p className="text-sm text-yellow-200">Neymar da Silva Santos Júnior</p>
          </div>
        </div>

        {/* Bagian Kanan - Form Area */}
        <div className="relative z-10 w-full p-10 md:w-1/2 lg:px-14 lg:py-12">
          {/* Tombol Tutup */}
          <div className="mb-6 flex justify-end">
            <Link href="/" className="text-gray-500 transition hover:text-white">✕</Link>
          </div>

          <h2 className="mb-8 text-sm font-bold uppercase tracking-wider text-gray-400">
            <span className="text-white">Login</span>
          </h2>

          {error && (
            <div className="mb-6 rounded border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form action={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-xs font-semibold text-white">Email</label>
              <input 
                name="email" 
                type="email" 
                placeholder="Enter your Email"
                required 
                className="w-full rounded bg-[#1e1e28] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-xs font-semibold text-white">Password</label>
              <div className="relative">
                <input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••"
                  required 
                  className="w-full rounded bg-[#1e1e28] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-cyan-500"
                />
                <span className="absolute right-4 top-3.5 text-gray-500">👁</span>
              </div>
            </div>

            <div className="mt-2 flex items-start gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-transparent text-cyan-500 focus:ring-cyan-500 focus:ring-offset-[#14141d]" />
              <p className="text-xs text-gray-500">
                I am 18 years old and I have read and accept <span className="text-cyan-500">Terms and Conditions</span> and <span className="text-cyan-500">Privacy Policy</span>.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 w-full rounded bg-[#25C2D9] py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-cyan-400 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>

          {/* Social Icons Mockup */}
          <div className="mt-8 text-center">
            <p className="mb-4 text-xs text-gray-500">Daftar Member Hubungi Admin Yang Berjaga</p>
          </div>
        </div>

      </div>
    </main>
  );
}