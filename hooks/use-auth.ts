import { useCallback } from "react";
import { AuthService } from "@/lib/services/auth.service";

export function useAuth() {
  const currentUser = AuthService.getCurrentUser();
  
  const logout = useCallback(async () => {
    await AuthService.logout();
    // Redirection ou autre logique post-déconnexion
  }, []);

  const hasAccessToSite = useCallback((siteId: string) => {
    return AuthService.hasAccessToSite(currentUser, siteId);
  }, [currentUser]);

  return {
    currentUser,
    logout,
    hasAccessToSite,
    isAuthenticated: !!currentUser,
    isSuperAdmin: currentUser?.isSuperAdmin,
    isAdmin: currentUser?.isAdmin
  };
}