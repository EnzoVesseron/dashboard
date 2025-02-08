"use client";

import * as React from "react";
import { ChevronDown, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSite, sites } from "@/lib/site-context";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

type SiteSwitcherProps = {
  className?: string;
};

export function SiteSwitcher({ className }: SiteSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const { currentSite, setCurrentSite } = useSite();
  const { isSuperAdmin } = useAuth();
  const router = useRouter();

  const handleSiteChange = (site: typeof sites[number]) => {
    setCurrentSite(site);
    setOpen(false);
  };

  const handleAddSite = () => {
    setOpen(false);
    router.push("/dashboard/sites/new");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Sélectionner un site"
          className={cn("w-[200px] justify-between", className)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarFallback>{currentSite.name[0]}</AvatarFallback>
          </Avatar>
          {currentSite.name}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Rechercher un site..." />
            <CommandEmpty>Aucun site trouvé.</CommandEmpty>
            <CommandGroup heading="Sites">
              {sites.map((site) => (
                <CommandItem
                  key={site.id}
                  onSelect={() => handleSiteChange(site)}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarFallback>{site.name[0]}</AvatarFallback>
                  </Avatar>
                  {site.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentSite.id === site.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {isSuperAdmin && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleAddSite}
                    className="text-sm text-primary"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un site
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}