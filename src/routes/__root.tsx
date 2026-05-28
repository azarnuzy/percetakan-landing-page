import { type ReactNode, useEffect } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import "@/styles.css";

const themeScript = `
  (function() {
    const storageKey = 'cetakkita-theme';
    const theme = localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const resolvedTheme = theme === 'system' || !theme ? systemTheme : theme;
    document.documentElement.classList.add(resolvedTheme);
  })();
`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CetakKita - Print, Fotokopi, dan Jilid Cepat" },
      {
        name: "description",
        content:
          "CetakKita melayani print dokumen, fotokopi, jilid skripsi, banner, stiker, dan kebutuhan cetak bisnis dengan proses cepat, rapi, dan berkualitas.",
      },
      {
        name: "keywords",
        content:
          "percetakan, print dokumen, fotokopi, jilid skripsi, cetak banner, cetak stiker, CetakKita",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#00968f" },
      {
        property: "og:title",
        content: "CetakKita - Solusi Print, Fotokopi, dan Jilid",
      },
      {
        property: "og:description",
        content:
          "Pesan kebutuhan cetak Anda secara mudah lewat WhatsApp. Cepat, rapi, dan berkualitas untuk mahasiswa, kantor, dan UMKM.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/references/reference-header.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon/favicon-96x96.png" },
      { rel: "icon", type: "image/x-icon", href: "/favicon/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png" },
      { rel: "manifest", href: "/favicon/site.webmanifest" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider defaultTheme="system" storageKey="cetakkita-theme">
        <Outlet />
      </ThemeProvider>
    </RootDocument>
  );
}

const foucPreventionScript = `document.body.classList.add('before-hydration');`;

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    document.body.classList.remove('before-hydration');
  }, []);

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: 'body.before-hydration{opacity:0}' }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: foucPreventionScript }} />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Button render={<Link to="/">Go Home</Link>} />
    </div>
  );
}
