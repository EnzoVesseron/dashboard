import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { Activity, ActivityWithUser } from "@/types/activity";
import { User } from "@/types/user";

// Mock des utilisateurs pour les activités
const mockUsers: Record<string, Pick<User, "name" | "email">> = {
  "1": { name: "Admin User", email: "admin@example.com" },
  "2": { name: "John Doe", email: "john@example.com" },
  "3": { name: "Jane Smith", email: "jane@example.com" },
  "4": { name: "Site 2 Admin", email: "admin2@example.com" },
};

// Mock des activités par site
const mockActivitiesBySite: Record<string, Activity[]> = {
  "1": [
    {
      id: "1",
      userId: "3",
      action: "CREATE_ACCOUNT",
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      userId: "2",
      action: "UPDATE_PROFILE",
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ],
  "2": [
    {
      id: "3",
      userId: "4",
      action: "ADD_DOCUMENT",
      metadata: {
        documentName: "Rapport mensuel",
      },
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    },
  ],
  "3": [
    {
      id: "4",
      userId: "1",
      action: "LOGIN",
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
  ],
};

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("siteId");
    
    if (!siteId) {
      return NextResponse.json({ error: "Site ID is required" }, { status: 400 });
    }

    // Récupérer les activités pour le site spécifié
    const activities = (mockActivitiesBySite[siteId] || [])
      .map(activity => ({
        ...activity,
        user: mockUsers[activity.userId],
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Activities API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}