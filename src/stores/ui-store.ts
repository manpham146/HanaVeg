import { create } from 'zustand';

interface UIState {
    /** Is the item detail modal open */
    isItemModalOpen: boolean;
    /** ID of the currently viewed menu item */
    selectedItemId: string | null;
    /** Global loading state */
    isLoading: boolean;
    /** Toast notification */
    toast: { message: string; type: 'success' | 'error'; } | null;

    // Actions
    openItemModal: (itemId: string) => void;
    closeItemModal: () => void;
    setLoading: (loading: boolean) => void;
    showToast: (message: string, type: 'success' | 'error') => void;
    clearToast: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
    isItemModalOpen: false,
    selectedItemId: null,
    isLoading: false,
    toast: null,

    openItemModal: (itemId) =>
        set({ isItemModalOpen: true, selectedItemId: itemId }),
    closeItemModal: () =>
        set({ isItemModalOpen: false, selectedItemId: null }),
    setLoading: (loading) =>
        set({ isLoading: loading }),
    showToast: (message, type) =>
        set({ toast: { message, type } }),
    clearToast: () =>
        set({ toast: null }),
}));
