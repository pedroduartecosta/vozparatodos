// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CollectionProvider } from "@/components/providers/collection-provider";

export const metadata: Metadata = {
  title: "VozParaTodos - Comunicação Aumentativa e Alternativa",
  description: "Plataforma de Comunicação Aumentativa e Alternativa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">
          <CollectionProvider>
            <MainLayout>{children}</MainLayout>
          </CollectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
