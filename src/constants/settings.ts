import { AppSettings } from "@/types/settings";

export const defaultSettings: AppSettings = {
  theme: "system",
  fontSize: "medium",
  symbolSize: "medium",
  speech: {
    voice: "",
    pitch: 1,
    rate: 1,
    volume: 1,
  },
  showLabels: true,
  gridSize: {
    columns: 4,
    rows: 4,
  },
};
