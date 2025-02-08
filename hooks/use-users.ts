import { useState, useEffect } from "react";
import { UserService } from "@/lib/services/user.service";
import { useAuth } from "@/hooks/use-auth";
import { useSite } from "@/lib/site-context";
import { User } from "@/types/user";

export function useUsers() {
  const { currentSite } = useSite();
  const { currentUser, isSuperAdmin, isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await UserService.getUsersBySite(currentSite.id);
      setUsers(data);
    };
    
    fetchUsers();
  }, [currentSite.id]);

  const canModifyUser = (targetUser: User) => {
    return UserService.canModifyUser(currentUser, targetUser);
  };

  return {
    users,
    canModifyUser,
    canAddUsers: isSuperAdmin || isAdmin
  };
}