import { create } from 'zustand';
import type { UserProfile } from '@/types';

interface AuthState {
    /** Current authenticated user */
    user: UserProfile | null;
    /** Whether auth state has been initialized */
    isInitialized: boolean;

    // Actions
    setUser: (user: UserProfile | null) => void;
    setInitialized: (initialized: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    isInitialized: false,

    setUser: (user) => set({ user }),
    setInitialized: (initialized) => set({ isInitialized: initialized }),
    logout: () => set({ user: null }),
}));
