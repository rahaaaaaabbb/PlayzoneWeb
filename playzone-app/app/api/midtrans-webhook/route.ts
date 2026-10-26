import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = body;

    // 1. Validasi Keamanan (Signature Key) agar tidak bisa dipalsukan oleh hacker
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    const hash = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");

    if (hash !== signature_key) {
      return NextResponse.json(
        { error: "Invalid signature key!" },
        { status: 403 }
      );
    }

    // 2. Cari data transaksi berdasarkan Order ID dari Midtrans
    const transaksi = await prisma.transaksi.findFirst({
      where: { order_id: order_id },
      include: { reservasi: true },
    });

    if (!transaksi) {
      return NextResponse.json({ error: "Transaksi tidak ditemukan" }, { status: 404 });
    }

    // 3. Tentukan status pembayaran baru
    let statusBaru = "pending";
    if (transaction_status === "capture") {
      statusBaru = fraud_status === "challenge" ? "pending" : "lunas";
    } else if (transaction_status === "settlement") {
      statusBaru = "lunas";
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      statusBaru = "gagal";
    }

    // 4. Update status pembayaran di tabel Transaksi
    await prisma.transaksi.update({
      where: { id: transaksi.id },
      data: { status_bayar: statusBaru },
    });

    // 5. Jika pembayaran LUNAS, otomatis aktifkan sewa unit PS
    if (statusBaru === "lunas") {
      await prisma.unitPS.update({
        where: { id: transaksi.reservasi.unitId },
        data: { status: "DISEWA" },
      });
    }

    return NextResponse.json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("Midtrans Webhook Error:", error);
    return NextResponse.json({ error: "Gagal memproses webhook" }, { status: 500 });
  }
}