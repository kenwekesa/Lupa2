import { create } from 'zustand';

interface PropertyModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const usePropertyModal = create<PropertyModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({isOpen:false})
}))

export default usePropertyModal;

