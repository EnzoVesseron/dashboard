"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { DeviceStats } from "@/components/dashboard/device-stats";
import { Eye, Clock, Globe2, ArrowUpRight, Repeat2 } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { useEffect, useState } from "react";

// Multiplicateurs de données par site pour la simulation
const siteMultipliers: Record<string, number> = {
  "1": 1,    // Site Principal
  "2": 0.6,  // Blog
  "3": 0.8,  // E-commerce
};

interface Stats {
  pageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: string;
  bounceRate: string;
  topPages: Array<{ path: string; views: number; name: string; }>;
}

export default function StatsPage() {
  const { currentSite } = useSite();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const multiplier = siteMultipliers[currentSite.id] || 1;

    setStats({
      pageViews: Math.floor(2350 * multiplier),
      uniqueVisitors: Math.floor(1850 * multiplier),
      avgSessionDuration: `${Math.floor(2 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      bounceRate: `${Math.floor(45 + Math.random() * 15)}%`,
      topPages: [
        { path: "/", views: Math.floor(800 * multiplier), name: "Accueil" },
        { path: "/contact", views: Math.floor(450 * multiplier), name: "Contact" },
        { path: "/about", views: Math.floor(350 * multiplier), name: "À propos" },
        { path: "/services", views: Math.floor(300 * multiplier), name: "Services" },
      ],
    });
  }, [currentSite.id]);

  if (!stats) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Statistiques</h1>
          <p className="text-muted-foreground">
            Chargement des statistiques...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Statistiques</h1>
        <p className="text-muted-foreground">
          Analyse détaillée des performances de {currentSite.name}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pages vues
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +18% depuis la semaine dernière
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Visiteurs uniques
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% depuis la semaine dernière
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Durée moyenne de session
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgSessionDuration}</div>
            <p className="text-xs text-muted-foreground">
              +15s depuis la semaine dernière
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taux de rebond
            </CardTitle>
            <Repeat2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bounceRate}</div>
            <p className="text-xs text-muted-foreground">
              -2% depuis la semaine dernière
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Vue d'ensemble des visites</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Pages les plus visitées</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topPages.map((page) => (
                <div key={page.path} className="flex items-center">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-sm font-medium">{page.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {page.views.toLocaleString()} vues
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Répartition par appareils</CardTitle>
          <Globe2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <DeviceStats />
        </CardContent>
      </Card>
    </div>
  );
}