import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { SiteProvider } from "@/lib/site-context";
import { PluginsProvider } from "@/lib/plugins-context";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Custom CMS',
  description: 'A custom CMS built with Next.js and shadcn/ui',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="theme"
        >
          <SiteProvider>
            <PluginsProvider>
              {children}
            </PluginsProvider>
          </SiteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}