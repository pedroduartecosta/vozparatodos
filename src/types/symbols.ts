// src/types/symbols.ts

/**
 * Base symbol interface with common properties
 */
interface BaseSymbol {
  id: string;
  text: string;
  description?: string;
  tags?: string[];
}

/**
 * Symbol that uses an icon from the icon library
 */
interface IconSymbol extends BaseSymbol {
  type: "icon";
  icon: string; // Name of the icon from lucide-react
}

/**
 * Symbol that uses an image
 */
interface ImageSymbol extends BaseSymbol {
  type: "image";
  imageUrl: string; // Path to the image
}

/**
 * Union type for all symbol types
 */
export type Symbol = IconSymbol | ImageSymbol;

/**
 * Grid position for symbols in a screen layout
 */
export interface GridPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Symbol with position information for screen layouts
 */
interface SymbolWithPosition extends BaseSymbol {
  type: "icon" | "image";
  position: GridPosition;
}

export interface PositionedSymbol extends SymbolWithPosition {}

/**
 * Category of symbols
 */
export interface Category {
  id: string;
  name: string;
  description?: string;
  symbols: Symbol[];
}

/**
 * Layout configuration for screens
 */
export interface LayoutConfig {
  columns: number;
  rows: number;
  spacing: number;
  symbolSize: "small" | "medium" | "large";
}

/**
 * Base collection interface
 */
export interface BaseCollection {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Dictionary collection
 */
export interface Dictionary extends BaseCollection {
  type: "dictionary";
  categories: Category[];
}

/**
 * Screen collection
 */
export interface Screen extends BaseCollection {
  type: "screen";
  layout: LayoutConfig;
  symbols: PositionedSymbol[];
}

/**
 * Union type for all collection types
 */
export type Collection = Dictionary | Screen;

/**
 * Type guard to check if a collection is a dictionary
 */
export function isDictionary(collection: Collection): collection is Dictionary {
  return collection.type === "dictionary";
}

/**
 * Type guard to check if a collection is a screen
 */
export function isScreen(collection: Collection): collection is Screen {
  return collection.type === "screen";
}

/**
 * Type guard to check if a symbol uses an icon
 */
export function isIconSymbol(symbol: Symbol): symbol is IconSymbol {
  return symbol.type === "icon";
}

/**
 * Type guard to check if a symbol uses an image
 */
export function isImageSymbol(symbol: Symbol): symbol is ImageSymbol {
  return symbol.type === "image";
}
