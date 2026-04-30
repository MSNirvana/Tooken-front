import { create } from "zustand";

export interface ModelItem {
  id: string;
  name: string;
  provider: string;
  category: string;
  creditsPer1k: number;
  context: string;
}

interface ModelsStore {
  models: ModelItem[];
  selectedCategory: string;
  searchQuery: string;
  setCategory: (cat: string) => void;
  setSearch: (q: string) => void;
}

const mockModels: ModelItem[] = [
  { id: "auto", name: "Auto Router", provider: "Tooken", category: "auto", creditsPer1k: 8, context: "Adaptive" },
  { id: "gpt-5", name: "GPT-5", provider: "OpenAI", category: "global", creditsPer1k: 20, context: "256K" },
  { id: "claude-opus-4", name: "Claude Opus 4", provider: "Anthropic", category: "global", creditsPer1k: 18, context: "200K" },
];

export const useModelsStore = create<ModelsStore>((set) => ({
  models: mockModels,
  selectedCategory: "all",
  searchQuery: "",
  setCategory: (selectedCategory) => set({ selectedCategory }),
  setSearch: (searchQuery) => set({ searchQuery }),
}));
