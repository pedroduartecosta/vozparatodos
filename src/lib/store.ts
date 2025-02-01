import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection } from "@/types/symbols";
import { AppSettings } from "@/types/settings";
import { defaultSettings } from "@/constants/settings";

interface State {
  // App state
  collections: Collection[];
  currentCollection: Collection | null;
  currentMessage: string[];
  speaking: boolean;

  // Settings
  settings: AppSettings;
}

interface Actions {
  // Collection actions
  addCollection: (collection: Collection) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  setCurrentCollection: (collection: Collection | null) => void;

  // Message actions
  addToMessage: (text: string) => void;
  clearMessage: () => void;

  // Speech actions
  setSpeaking: (speaking: boolean) => void;

  // Settings actions
  updateSettings: (settings: Partial<AppSettings>) => void;
}

const initialState: State = {
  collections: [],
  currentCollection: null,
  currentMessage: [],
  speaking: false,
  settings: defaultSettings,
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,

      // Collection actions
      addCollection: (collection) =>
        set((state) => ({
          collections: [...state.collections, collection],
        })),

      updateCollection: (id, updates) =>
        set((state) => ({
          collections: state.collections.map((collection) =>
            collection.id === id ? { ...collection, ...updates } : collection
          ) as Collection[],
          currentCollection:
            state.currentCollection?.id === id
              ? ({ ...state.currentCollection, ...updates } as Collection)
              : state.currentCollection,
        })),

      deleteCollection: (id) =>
        set((state) => ({
          collections: state.collections.filter(
            (collection) => collection.id !== id
          ),
          currentCollection:
            state.currentCollection?.id === id ? null : state.currentCollection,
        })),

      setCurrentCollection: (collection) =>
        set(() => ({
          currentCollection: collection,
        })),

      // Message actions
      addToMessage: (text) =>
        set((state) => ({
          currentMessage: [...state.currentMessage, text],
        })),

      clearMessage: () =>
        set(() => ({
          currentMessage: [],
        })),

      // Speech actions
      setSpeaking: (speaking) =>
        set(() => ({
          speaking,
        })),

      // Settings actions
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        })),
    }),
    {
      name: "vozparatodos-storage",
      partialize: (state) => ({
        collections: state.collections,
        settings: state.settings,
      }),
    }
  )
);
