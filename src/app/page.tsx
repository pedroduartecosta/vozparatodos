"use client";

import React from "react";
import { SymbolGrid } from "@/components/ui/symbol-grid";
import { useCollection } from "@/components/providers/collection-provider";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { currentCollection, loading } = useCollection();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentCollection) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card>
          <CardContent className="p-6">
            <p className="text-lg text-center">
              Selecione uma coleção para começar
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4 overflow-auto pb-4">
      {currentCollection.categories.map((category) => (
        <div key={category.id} className="space-y-2">
          <h2 className="text-lg font-semibold">{category.name}</h2>
          <SymbolGrid symbols={category.symbols} />
        </div>
      ))}
    </div>
  );
}
