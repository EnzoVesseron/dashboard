import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.isSuperAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await request.json();
    
    // Simuler la création d'un site
    console.log("Création d'un nouveau site:", data);

    return NextResponse.json({ 
      success: true,
      message: "Site créé avec succès",
      site: {
        id: Math.random().toString(36).substring(7),
        ...data
      }
    });
  } catch (error) {
    console.error("Sites API error:", error);
    return NextResponse.json(
      { error: "Failed to create site" },
      { status: 500 }
    );
  }
}