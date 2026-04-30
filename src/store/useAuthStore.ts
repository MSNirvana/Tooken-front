import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  walletAddress: string | null;
  isConnected: boolean;
  credits: number;
  login: (user: User) => void;
  logout: () => void;
  setWallet: (address: string) => void;
  updateCredits: (amount: number) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  walletAddress: null,
  isConnected: false,
  credits: 128400,
  login: (user) => set({ user }),
  logout: () => set({ user: null, walletAddress: null, isConnected: false }),
  setWallet: (address) => set({ walletAddress: address, isConnected: Boolean(address) }),
  updateCredits: (amount) => set({ credits: amount }),
}));
