"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return { error: "Email atau password salah!" };
  }

  const cookieStore = await cookies();
  cookieStore.set("playzone_role", user.role);
  cookieStore.set("playzone_userId", String(user.id));

  if (user.role === "ADMIN" || user.role === "OWNER") {
    redirect("/dashboard");
  } else {
    redirect("/ketersediaan");
  }
}
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("playzone_role");
  cookieStore.delete("playzone_userId");
  redirect("/");
}