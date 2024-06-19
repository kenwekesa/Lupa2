import React, { useState } from 'react';
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../container/Heading";
import Image from "next/image";
import HeartButton from "../container/HeartButton";
import DialogModal from "./DialogModal";
import { IoImageOutline } from 'react-icons/io5';

interface ListingHeadProps {
    title: string;
    imageSrc: string[];
    id: string;
    town: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    id,
    town,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openModal = (index: number) => {
        setSelectedIndex(index);
    };

    const closeModal = () => {
        setSelectedIndex(null);
    };

    return (
        <>
            {/* <Heading
                title={title}
                subtitle={title}
            /> */}
            {/* <div><span className='font-bold text-lg'>{title}</span></div> */}
            {/* <div>{county}</div> */}
            <div className="w-full h-[64vh] overflow-hidden rounded-xl relative">
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 row-span-4 relative">
                        <img 
                            src={imageSrc[0]} 
                            alt="Main Image" 
                            className="w-[60vw] h-[64vh] object-cover cursor-pointer" 
                            onClick={() => openModal(0)}
                        />
                    </div>
                    <div className="flex flex-col justify-between col-span-1 gap-4 row-span-2">
                        {imageSrc.slice(1, 3).map((imageUrl: string, index: number) => (
                            <div key={index} className="relative">
                                <img
                                    src={imageUrl} 
                                    alt={`Small Image ${index + 1}`} 
                                    className="w-[30vw] h-[31vh] object-cover cursor-pointer" 
                                    onClick={() => openModal(index + 1)}
                                />
                                {index === imageSrc.slice(1, 3).length - 1 && (
                                    <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 cursor-pointer" onClick={() => openModal(index + 1)}>
                                        <IoImageOutline size={24} />
                                    </div>
                                )}
                            </div>
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

            {selectedIndex !== null && (
                <DialogModal
                    isOpen={selectedIndex !== null} 
                    images={imageSrc} 
                    initialIndex={selectedIndex}
                    onClose={closeModal} 
                />
            )}
        </>
    );
}

export default ListingHead;
