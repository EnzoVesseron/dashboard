"use client";

import { usePlugins, availablePlugins } from "@/lib/plugins-context";
import { useSite } from "@/lib/site-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { currentSite } = useSite();
  const { isPluginEnabled, togglePlugin, isSuperAdmin } = usePlugins();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">
          Configurez vos préférences
        </p>
      </div>

      {isSuperAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Gestion des plugins</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {availablePlugins.map((plugin) => (
              <div key={plugin.id}>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor={plugin.id}>{plugin.name}</Label>
                    <p className="text-sm text-muted-foreground">
                      {plugin.description}
                    </p>
                  </div>
                  <Switch
                    id={plugin.id}
                    checked={isPluginEnabled(currentSite.id, plugin.id)}
                    onCheckedChange={() => togglePlugin(currentSite.id, plugin.id)}
                  />
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}