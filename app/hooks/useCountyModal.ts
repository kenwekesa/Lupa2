import { create } from 'zustand';

interface CountyModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCountyModal = create<CountyModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({isOpen:false})
}))

export default useCountyModal;

