'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../container/Heading";
import Image from "next/image";
import HeartButton from "../container/HeartButton";
import { useState } from "react";
import DialogModal from "./DialogModal";

interface ListingHeadProps {
    title: string;
    // county: string;
    imageSrc: string[];
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    // county,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <Heading
                title={title}
                subtitle={title}
            />
            <div className="w-full h-[64vh] overflow-hidden rounded-xl relative">
                <div className="grid grid-cols-3 gap-1">
                    <div className="col-span-1 row-span-4">
                        <img 
                            src={imageSrc[0]} 
                            alt="Main Image" 
                            className="w-[60vw] h-[64vh] object-cover" 
                            onClick={() => openModal(imageSrc[0])}
                        />
                    </div>
                    <div className="flex flex-col justify-between col-span-1 gap-4 row-span-2">
                        {imageSrc.slice(1, 3).map((imageUrl: string | undefined, index: number) => (
                            <img 
                                key={index} 
                                src={imageUrl} 
                                alt={`Small Image ${index + 1}`} 
                                className="w-[30vw] h-[31vh] object-cover" 
                                onClick={() => openModal(imageUrl!)}
                            />
                        ))}
                    </div>
                </div>
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>

            <DialogModal
                isOpen={selectedImage !== null} 
                imageUrl={selectedImage!} 
                onClose={closeModal} 
            />
        </>
    );
}

export default ListingHead;
