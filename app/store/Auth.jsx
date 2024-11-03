import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuth: false,
    isVip: false,
    toggleVip: () => set((state) => ({ isVip: !state.isVip })),
    toggleAuth: () => set((state) => ({ isAuth: !state.isAuth })),
    
}));