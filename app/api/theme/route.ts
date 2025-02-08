import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { theme } = await request.json();
    if (!theme || !['light', 'dark', 'system'].includes(theme)) {
      return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
    }

    const user = await db.findUserByEmail('admin@example.com');
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db.updateUserTheme(user.email, theme);

    return NextResponse.json({ success: true, theme });
  } catch (error) {
    console.error("Theme update error:", error);
    return NextResponse.json(
      { error: "Failed to update theme" },
      { status: 500 }
    );
  }
}