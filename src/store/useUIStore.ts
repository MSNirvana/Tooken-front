import { create } from "zustand";

interface UIStore {
  sidebarCollapsed: boolean;
  theme: "dark";
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  theme: "dark",
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
