import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SignJWT } from "jose";
import { comparePasswords } from "@/lib/crypto";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log("Tentative de connexion pour:", email);

    // Vérification des champs requis
    if (!email || !password) {
      console.log("Champs manquants");
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    const user = await db.findUserByEmail(email);
    console.log("Utilisateur trouvé:", user ? "oui" : "non");

    if (!user || !user.password) {
      console.log("Utilisateur non trouvé ou pas de mot de passe");
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    const passwordMatch = await comparePasswords(password, user.password);
    console.log("Mot de passe correspond:", passwordMatch);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ 
      userId: user.id,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      isAdmin: user.isAdmin
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    const response = NextResponse.json(
      { 
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          theme: user.theme || 'light'
        }
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    // Configuration du cookie avec des options plus permissives pour le développement
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400,
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}