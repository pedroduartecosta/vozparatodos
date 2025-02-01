"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCollection } from "@/components/providers/collection-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { collections, currentCollection, setCurrentCollection, loading } =
    useCollection();

  const dictionaries = collections.filter((c) => c.type === "dictionary");

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">Coleções</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-4 space-y-1">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            dictionaries.map((dictionary) => (
              <Button
                key={dictionary.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start font-normal",
                  currentCollection?.id === dictionary.id && "bg-muted"
                )}
                onClick={() => setCurrentCollection(dictionary)}
              >
                {dictionary.name}
              </Button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Sidebar;
