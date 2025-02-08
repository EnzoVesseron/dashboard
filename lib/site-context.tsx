"use client";

import React, { createContext, useContext, useState } from "react";

export interface Site {
  id: string;
  name: string;
  domain: string;
}

export const sites = [
  {
    id: "1",
    name: "Site Principal",
    domain: "site-principal.com",
  },
  {
    id: "2",
    name: "Blog",
    domain: "blog.site-principal.com",
  },
  {
    id: "3",
    name: "E-commerce",
    domain: "boutique.site-principal.com",
  },
] as const;

interface SiteContextType {
  currentSite: Site;
  setCurrentSite: (site: Site) => void;
  sites: typeof sites;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [currentSite, setCurrentSite] = useState<Site>(sites[0]);

  return (
    <SiteContext.Provider value={{ currentSite, setCurrentSite, sites }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
}