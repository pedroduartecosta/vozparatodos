// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CollectionProvider } from "@/components/providers/collection-provider";

const inter = Inter({ subsets: ["latin"] });

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
