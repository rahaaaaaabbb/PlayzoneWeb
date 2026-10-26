import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { unitId, reservasiId } = await req.json();

    // 1. Ubah status unit kembali menjadi TERSEDIA
    await prisma.unitPS.update({
      where: { id: Number(unitId) },
      data: { status: "TERSEDIA" },
    });

    // 2. Tandai bahwa reservasi spesifik ini sudah selesai
    // (Kita set waktu_selesai ke waktu sekarang agar perhitungan timernya langsung stop di 0)
    if (reservasiId) {
      await prisma.reservasi.update({
        where: { id: Number(reservasiId) },
        data: { waktu_selesai: new Date() },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error selesai:", error);
    return NextResponse.json(
      { error: "Gagal update status unit" },
      { status: 500 }
    );
  }
}