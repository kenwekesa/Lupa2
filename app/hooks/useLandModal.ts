import { create } from 'zustand';

interface LandModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLandModal = create<LandModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({isOpen:false})
}))

export default useLandModal;

