import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { User } from "@/types/user";

// Mock des utilisateurs avec leurs sites associés
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    isSuperAdmin: true,
    isAdmin: true,
    siteIds: ["1", "2", "3"],
    createdAt: "2025-02-08T17:07:35.485Z",
    theme: "light"
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    isSuperAdmin: false,
    isAdmin: true,
    siteIds: ["1", "2"],
    createdAt: "2025-02-09T10:15:22.123Z",
    theme: "light"
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    isSuperAdmin: false,
    isAdmin: false,
    siteIds: ["2"],
    createdAt: "2025-02-10T14:30:45.789Z",
    theme: "light"
  },
  {
    id: "4",
    name: "Site 2 Admin",
    email: "admin2@example.com",
    isSuperAdmin: false,
    isAdmin: true,
    siteIds: ["2"],
    createdAt: "2025-02-11T08:20:15.123Z",
    theme: "light"
  },
];

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

    const currentUser = mockUsers.find(u => u.id === payload.userId) || mockUsers[0];
    
    // Filtrer les utilisateurs en fonction du site
    const users = mockUsers.filter(user => {
      // Ne pas inclure les super admins dans la liste
      if (user.isSuperAdmin) return false;
      return user.siteIds.includes(siteId);
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Users API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}