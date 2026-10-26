import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { unitId } = await req.json();
    
    await prisma.unitPS.update({
      where: { id: Number(unitId) },
      data: { status: "DISEWA" }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error Update Status:", error);
    return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
  }
}