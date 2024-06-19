// components/Dialog.js

import React, { ReactNode } from "react";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
                {children}
                <div className="flex justify-end mt-4">
                    <button 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;

