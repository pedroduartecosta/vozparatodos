"use server";

import { Collection } from "@/types/symbols";
import { defaultCollections } from "@/constants/defaultCollections";
import { revalidatePath } from "next/cache";

export async function getCollections(): Promise<Collection[]> {
  // In a real app, this would fetch from a database
  return defaultCollections;
}

export async function addCollection(collection: Collection) {
  // In a real app, this would save to a database
  defaultCollections.push(collection);
  revalidatePath("/");
}

export async function updateCollection(
  id: string,
  updates: Partial<Collection>
) {
  const index = defaultCollections.findIndex((c) => c.id === id);
  if (index !== -1) {
    defaultCollections[index] = {
      ...defaultCollections[index],
      ...updates,
    } as Collection;
    revalidatePath("/");
  }
}

export async function deleteCollection(id: string) {
  const index = defaultCollections.findIndex((c) => c.id === id);
  if (index !== -1) {
    defaultCollections.splice(index, 1);
    revalidatePath("/");
  }
}
