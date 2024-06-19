import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CgPlayTrackPrevO } from "react-icons/cg";
import { BiSkipNextCircle } from "react-icons/bi";

interface DialogModalProps {
    isOpen: boolean;
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({ isOpen, images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-4 rounded-lg max-w-4xl w-full">
                <button 
                    className="absolute top-2 right-2 text-black bg-white rounded-full p-1" 
                    onClick={onClose}
                >
                    <IoMdCloseCircleOutline size={24} />
                </button>
                <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="w-full max-h-[80vh] object-contain" />
                <button 
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 text-black bg-white rounded-full p-1" 
                    onClick={handlePrev}
                >
                    <CgPlayTrackPrevO size={24} />
                </button>
                <button 
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-black bg-white rounded-full p-1" 
                    onClick={handleNext}
                >
                    <BiSkipNextCircle size={24} />
                </button>
            </div>
        </div>
    );
};

export default DialogModal;
