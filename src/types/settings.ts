// src/types/settings.ts
export interface SpeechSettings {
  voice: string;
  pitch: number;
  rate: number;
  volume: number;
}

export interface AppSettings {
  theme: "light" | "dark" | "system";
  fontSize: "small" | "medium" | "large";
  symbolSize: "small" | "medium" | "large";
  speech: SpeechSettings;
  showLabels: boolean;
  gridSize: {
    columns: number;
    rows: number;
  };
}

export interface UserSettings extends AppSettings {
  userId: string;
  lastUsedDictionary?: string;
  lastUsedScreen?: string;
  favoriteSymbols: string[];
}
