import { create } from 'zustand';

interface NewsModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useNewsModal = create<NewsModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({isOpen:false})
}))

export default useNewsModal;