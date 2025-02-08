import { User } from "@/types/user";

// Mock des utilisateurs statiques
const mockUsers: Record<string, User[]> = {
  "1": [
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
      siteIds: ["1"],
      createdAt: "2025-02-10T14:30:45.789Z",
      theme: "light"
    },
  ],
  "2": [
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
  ],
};

export const UserService = {
  getUsersBySite: async (siteId: string): Promise<User[]> => {
    // Simuler un délai de chargement
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers[siteId] || [];
  },

  canModifyUser: (currentUser: User, targetUser: User): boolean => {
    if (currentUser.isSuperAdmin) return true;
    if (currentUser.isAdmin && !targetUser.isAdmin) return true;
    return false;
  }
};