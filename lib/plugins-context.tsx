"use client";

import React, { createContext, useContext, useState } from "react";

export interface Plugin {
  id: string;
  name: string;
  description: string;
}

export const availablePlugins: Plugin[] = [
  {
    id: "content",
    name: "Gestion de contenu",
    description: "Permet de gérer le contenu du site",
  },
  {
    id: "stats",
    name: "Statistiques",
    description: "Accès aux statistiques et analyses",
  },
  {
    id: "users",
    name: "Gestion des utilisateurs",
    description: "Permet de gérer les utilisateurs du site",
  },
];

interface PluginsState {
  [siteId: string]: {
    [pluginId: string]: boolean;
  };
}

interface PluginsContextType {
  plugins: PluginsState;
  togglePlugin: (siteId: string, pluginId: string) => void;
  isPluginEnabled: (siteId: string, pluginId: string) => boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  availablePlugins: Plugin[];
}

const PluginsContext = createContext<PluginsContextType | undefined>(undefined);

const defaultPluginsState: PluginsState = {
  "1": { content: true, stats: true, users: true },
  "2": { content: true, stats: true, users: true },
  "3": { content: true, stats: true, users: true },
};

export function PluginsProvider({ children }: { children: React.ReactNode }) {
  const [plugins, setPlugins] = useState<PluginsState>(defaultPluginsState);
  // TODO: Remplacer par les vraies données de l'utilisateur connecté
  const [isSuperAdmin] = useState(true);
  const [isAdmin] = useState(true);

  const togglePlugin = (siteId: string, pluginId: string) => {
    setPlugins((prev) => ({
      ...prev,
      [siteId]: {
        ...prev[siteId],
        [pluginId]: !prev[siteId]?.[pluginId],
      },
    }));
  };

  const isPluginEnabled = (siteId: string, pluginId: string): boolean => {
    return plugins[siteId]?.[pluginId] ?? false;
  };

  return (
    <PluginsContext.Provider
      value={{ 
        plugins, 
        togglePlugin, 
        isPluginEnabled, 
        isSuperAdmin, 
        isAdmin,
        availablePlugins 
      }}
    >
      {children}
    </PluginsContext.Provider>
  );
}

export function usePlugins() {
  const context = useContext(PluginsContext);
  if (context === undefined) {
    throw new Error("usePlugins must be used within a PluginsProvider");
  }
  return context;
}