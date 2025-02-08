import { User } from "@/types/user";

// Mock de l'utilisateur connecté (à remplacer par les vraies données)
const currentUser: User = {
  id: "1",
  name: "Admin User",
  email: "admin@example.com",
  isSuperAdmin: true,
  isAdmin: true,
  siteIds: ["1", "2", "3"],
  createdAt: new Date().toISOString(),
  theme: "light"
};

export const AuthService = {
  getCurrentUser: () => currentUser,
  
  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  },
  
  hasAccessToSite: (user: User, siteId: string): boolean => {
    if (user.isSuperAdmin) return true;
    return user.siteIds.includes(siteId);
  }
};