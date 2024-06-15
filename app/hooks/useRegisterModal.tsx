// import { create } from 'zustand';

// interface RegisterModalStore {
//     isOpen: boolean;
//     onOpen: () => void;
//     onClose: () => void;
// }

// const useRegisterModal = create<RegisterModalStore>((set) => ({
//     isOpen: false,
//     onOpen: () => set({ isOpen: true }),
//     onClose: () => set({isOpen:false})
// }))

// export default useRegisterModal;

// useRegisterModal.js



//========================================================================================




// import { create } from 'zustand';

// interface RegisterModalStore {
//     isOpen: boolean;
//     onOpen: (userType?: string) => void; // Update the type of customProp as needed
//     onClose: () => void;
// }

// const useRegisterModal = create<RegisterModalStore>((set) => ({
//     isOpen: false,
//     onOpen: (customProp) => set({ isOpen: true, userType }), // Pass the custom prop here
//     onClose: () => set({isOpen:false})
// }));

// export default useRegisterModal;


//=================================================================================================





// useRegisterModal.js

import { create } from 'zustand';

interface RegisterModalStore {
    isOpen: boolean;
    userType?: any; // Add customProp to the state
    onOpen: (userType?: any) => void;
    onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    userType: undefined, // Initialize customProp
    onOpen: (userType) => set({ isOpen: true, userType }), // Pass the custom prop here
    onClose: () => set({ isOpen: false, userType: undefined }), // Clear customProp on close
}));

export default useRegisterModal;

