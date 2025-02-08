"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { sites } from "@/lib/site-context";

export default function SitesPage() {
  const router = useRouter();
  const { isSuperAdmin } = useAuth();

  if (!isSuperAdmin) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Accès refusé</h1>
          <p className="text-muted-foreground">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sites</h1>
          <p className="text-muted-foreground">
            Gérez tous les sites de la plateforme
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/sites/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau site
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <Card key={site.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {site.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {site.domain}
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/dashboard/sites/${site.id}`)}
              >
                Gérer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}