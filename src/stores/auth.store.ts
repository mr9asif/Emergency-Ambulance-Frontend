import { create } from "zustand";

export type UserRole = "PATIENT" | "DISPATCHER" | "AMBULANCE_DRIVER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => {
    set({ user });
  },

  clearUser: () => {
    set({ user: null });
  },
}));
