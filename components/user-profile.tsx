import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { User, Shield, ShieldAlert, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserProfile() {
  const { currentUser, logout, isSuperAdmin, isAdmin } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <User className="h-4 w-4" />
          <span className="truncate max-w-[100px]">{currentUser.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{currentUser.name}</p>
          <p className="text-xs text-muted-foreground">{currentUser.email}</p>
        </div>
        <div className="px-2 py-1.5">
          <div className="flex items-center gap-2 text-xs">
            {isSuperAdmin ? (
              <>
                <ShieldAlert className="h-3 w-3 text-destructive" />
                <span>Super Admin</span>
              </>
            ) : isAdmin ? (
              <>
                <Shield className="h-3 w-3 text-primary" />
                <span>Admin</span>
              </>
            ) : (
              <>
                <User className="h-3 w-3" />
                <span>Utilisateur</span>
              </>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}