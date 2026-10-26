import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
// @ts-ignore
import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get("playzone_userId")?.value;

    // 1. Pastikan pengguna sudah login dengan akun aslinya
    if (!userIdCookie) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu untuk melakukan booking!" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userIdCookie) },
    });

    if (!user) {
      return NextResponse.json({ error: "Akun tidak ditemukan!" }, { status: 404 });
    }

    const { unitId, durasiJam } = await req.json();
    const unit = await prisma.unitPS.findUnique({ where: { id: Number(unitId) } });

    if (!unit || unit.status !== "TERSEDIA") {
      return NextResponse.json({ error: "Unit tidak tersedia!" }, { status: 400 });
    }

    const waktuMulai = new Date();
    const waktuSelesai = new Date(waktuMulai.getTime() + durasiJam * 60 * 60 * 1000);
    const totalHarga = unit.harga_jam * durasiJam;

    // 2. Buat reservasi dengan userId asli pemain
    const reservasi = await prisma.reservasi.create({
      data: {
        userId: user.id,
        unitId: Number(unitId),
        waktu_mulai: waktuMulai,
        waktu_selesai: waktuSelesai,
        total_harga: totalHarga,
      },
    });

    const orderId = `BOOKING-${reservasi.id}-${Date.now()}`;
    await prisma.transaksi.create({
      data: {
        reservasiId: reservasi.id,
        order_id: orderId,
        status_bayar: "pending",
      },
    });

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalHarga,
      },
      customer_details: {
        first_name: user.nama,
        email: user.email,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ success: true, token: transaction.token });
  } catch (error) {
    console.error("Error Reservasi:", error);
    return NextResponse.json({ error: "Gagal memproses booking" }, { status: 500 });
  }
}