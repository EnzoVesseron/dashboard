import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SignJWT } from "jose";
import { hashPassword } from "@/lib/crypto";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await db.findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    if (user.password) {
      return NextResponse.json(
        { error: "Ce compte a déjà un mot de passe" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    await db.updateUserPassword(email, hashedPassword);

    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    const response = NextResponse.json(
      { success: true, theme: user.theme || 'light' },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400
    });

    return response;
  } catch (error) {
    console.error("First login error:", error);
    return NextResponse.json(
      { error: "Échec de la création du mot de passe" },
      { status: 500 }
    );
  }
}