import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { namaPelanggan, unitId, durasiJam } = await req.json();

    const unit = await prisma.unitPS.findUnique({
      where: { id: Number(unitId) },
    });

    if (!unit || unit.status !== "TERSEDIA") {
      return NextResponse.json({ error: "Unit sedang tidak tersedia!" }, { status: 400 });
    }

    // 1. Cari atau buat akun bayangan (Shadow Account) untuk pelanggan Walk-In
    let walkinUser = await prisma.user.findFirst({
      where: { email: "walkin@playzone.internal" },
    });

    if (!walkinUser) {
      walkinUser = await prisma.user.create({
  data: {
    nama: "Pelanggan Walk-In",
    email: "walkin@playzone.internal",
    password: "NO_PASSWORD_REQUIRED",
  },
});
    }

    const waktuMulai = new Date();
    const waktuSelesai = new Date(waktuMulai.getTime() + durasiJam * 60 * 60 * 1000);
    const totalHarga = unit.harga_jam * durasiJam;

    // 2. Catat reservasi (Jika format nama diisi admin: misal "Budi (Walk-In)")
    // Kita simpan nama kustom pelanggan dengan membuat user sementara atau mengandalkan relasi
    // Agar lebih praktis tanpa merusak skema, kita bisa buat user khusus atau gunakan nama inputan admin
    const customUser = await prisma.user.create({
      data: {
        nama: `${namaPelanggan} (Walk-In)`,
        email: `walkin-${Date.now()}@playzone.internal`,
        password: "CASH_TRANSACTION",
      },
    });

    const reservasi = await prisma.reservasi.create({
      data: {
        userId: customUser.id,
        unitId: Number(unitId),
        waktu_mulai: waktuMulai,
        waktu_selesai: waktuSelesai,
        total_harga: totalHarga,
      },
    });

    const orderId = `WALKIN-${reservasi.id}-${Date.now()}`;
    await prisma.transaksi.create({
      data: {
        reservasiId: reservasi.id,
        order_id: orderId,
        status_bayar: "settlement", // Langsung dianggap Lunas (Cash)
      },
    });

    // 3. Langsung ubah unit menjadi DISEWA
    await prisma.unitPS.update({
      where: { id: Number(unitId) },
      data: { status: "DISEWA" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error Walk-In:", error);
    return NextResponse.json({ error: "Gagal memproses main langsung" }, { status: 500 });
  }
}