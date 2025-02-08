import { ActivityWithUser } from "@/types/activity";

// Mock des activités statiques
const mockActivities: Record<string, ActivityWithUser[]> = {
  "1": [
    {
      id: "1",
      userId: "3",
      action: "CREATE_ACCOUNT",
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      user: { name: "Jane Smith", email: "jane@example.com" }
    },
    {
      id: "2",
      userId: "2",
      action: "UPDATE_PROFILE",
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      user: { name: "John Doe", email: "john@example.com" }
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
      user: { name: "Site 2 Admin", email: "admin2@example.com" }
    },
  ],
  "3": [
    {
      id: "4",
      userId: "1",
      action: "LOGIN",
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      user: { name: "Admin User", email: "admin@example.com" }
    },
  ],
};

const formatActivityMessage = (activity: ActivityWithUser): string => {
  switch (activity.action) {
    case "CREATE_ACCOUNT":
      return "a créé un nouveau compte";
    case "UPDATE_PROFILE":
      return "a modifié son profil";
    case "ADD_DOCUMENT":
      return `a ajouté ${activity.metadata?.documentName ? `"${activity.metadata.documentName}"` : "un nouveau document"}`;
    case "LOGIN":
      return "s'est connecté";
    default:
      return activity.action;
  }
};

const formatTimeAgo = (date: string): string => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  if (seconds < 60) return "il y a moins d'une minute";
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  
  const days = Math.floor(hours / 24);
  return `il y a ${days} jour${days > 1 ? 's' : ''}`;
};

export const ActivityService = {
  getRecentActivities: async (siteId: string): Promise<ActivityWithUser[]> => {
    // Simuler un délai de chargement
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockActivities[siteId] || [];
  },

  formatMessage: formatActivityMessage,
  formatTimeAgo: formatTimeAgo,
};