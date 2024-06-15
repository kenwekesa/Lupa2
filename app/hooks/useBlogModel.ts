import { create } from 'zustand';

interface BlogModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useBlogModal = create<BlogModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({isOpen:false})
}))

export default useBlogModal;

