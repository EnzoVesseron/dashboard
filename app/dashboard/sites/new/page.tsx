"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { usePlugins } from "@/lib/plugins-context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  domain: z.string().min(3, "Le domaine doit contenir au moins 3 caractères"),
  adminEmail: z.string().email("Email invalide"),
  plugins: z.record(z.boolean()),
});

export default function NewSitePage() {
  const router = useRouter();
  const { availablePlugins } = usePlugins();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultPluginValues = Object.fromEntries(
    availablePlugins.map(plugin => [plugin.id, true])
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      adminEmail: "",
      plugins: defaultPluginValues,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du site");
      }

      router.push("/dashboard/sites");
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/sites"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Nouveau site</h1>
        <p className="text-muted-foreground">
          Créez un nouveau site et configurez ses paramètres initiaux
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du site</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du site</FormLabel>
                    <FormControl>
                      <Input placeholder="Mon nouveau site" {...field} />
                    </FormControl>
                    <FormDescription>
                      Le nom qui sera affiché dans l'interface
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domaine</FormLabel>
                    <FormControl>
                      <Input placeholder="monsite.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Le domaine principal du site
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="adminEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de l'administrateur</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@monsite.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      L'administrateur principal du site
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Plugins activés</h3>
                <div className="space-y-4">
                  {availablePlugins.map((plugin) => (
                    <FormField
                      key={plugin.id}
                      control={form.control}
                      name={`plugins.${plugin.id}`}
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              {plugin.name}
                            </FormLabel>
                            <FormDescription>
                              {plugin.description}
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Création..." : "Créer le site"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}