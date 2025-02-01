"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Collection, Symbol } from "@/types/symbols";
import { getCollections } from "@/app/actions";

interface CollectionContextType {
  collections: Collection[];
  currentCollection: Collection | null;
  currentMessage: string[];
  setCurrentCollection: (collection: Collection) => void;
  addSymbolToMessage: (symbol: Symbol) => void;
  clearMessage: () => void;
  loading: boolean;
}

const CollectionContext = createContext<CollectionContextType | undefined>(
  undefined
);

export function CollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(
    null
  );
  const [currentMessage, setCurrentMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCollections() {
      try {
        const data = await getCollections();
        setCollections(data);
        // Set the first dictionary-type collection as default
        const defaultDict = data.find((c) => c.type === "dictionary");
        if (defaultDict) {
          setCurrentCollection(defaultDict);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading collections:", error);
        setLoading(false);
      }
    }

    loadCollections();
  }, []);

  const addSymbolToMessage = (symbol: Symbol) => {
    setCurrentMessage((prev) => [...prev, symbol.text]);
  };

  const clearMessage = () => {
    setCurrentMessage([]);
  };

  const value = {
    collections,
    currentCollection,
    currentMessage,
    setCurrentCollection,
    addSymbolToMessage,
    clearMessage,
    loading,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  return context;
}
