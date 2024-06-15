'use client'
import React, { useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { IoMdClose } from "react-icons/io";
import { PiImagesSquareLight } from "react-icons/pi";
import { SafeUser, safeBlog, safeReservation } from '@/app/types';
import { TbPlayerTrackPrev } from "react-icons/tb";
import { TbPlayerTrackNext } from "react-icons/tb";

interface ListingCardProps {
    data: safeBlog;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const BlogsCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openDialog = (index: number) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };
    const closeDialog = () => setIsOpen(false);

    const reservationDate = React.useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'pp')} - ${format(end, 'pp')}`;
    }, [reservation]);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? data.imageSrc.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === data.imageSrc.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div>
            <div className="flex flex-col gap-2 w-full main-image-small-screen">
                <div className="flex flex-row items-center gap-1">
                    <div className="font-bold text-md text-green-600 truncate max-w-[20rem]">
                        {data.title.toUpperCase()}
                    </div>
                </div>

               <div className="h-[60vh] w-full overflow-hidden rounded-xl relative">
                {data.imageSrc.map((image, index) => (
                    <div key={index} className={`absolute top-0 left-0 w-full h-full transition-opacity ${index === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        <Image
                            // fill
                            alt={`Image ${index + 1}`}
                            src={image}
                            className="object-cover h-full w-full cursor-pointer"
                            onClick={() => openDialog(index)}
                        />
                    </div>
                ))}
                {data.imageSrc.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full cursor-pointer">
                        <PiImagesSquareLight className="h-6 w-6 text-gray-600" onClick={() => openDialog(0)} />
                    </div>
                )}
            </div>


            </div>

            {/* Dialog */}
            <Transition appear show={isOpen} as={React.Fragment}>
                <Dialog
                    as="div"
                    className="fixed  mt-11 inset-0 z-1000 overflow-y-auto"
                    onClose={closeDialog}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0" 
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        </Transition.Child>

                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg align-middle text-center font-medium leading-6 text-gray-900"
                                >
                                    {data.title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <Image
                                        key={currentImageIndex}
                                        alt={`Image ${currentImageIndex + 1}`}
                                        src={data.imageSrc[currentImageIndex]}
                                        className="object-contain h-[66vh] w-full rounded-lg"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={handlePrevImage}
                                    >
                                    <TbPlayerTrackPrev className="w-5 h-5 mr-2"/>
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={handleNextImage}
                                    >
                                    <TbPlayerTrackNext className="w-5 h-5 mr-2"/>
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeDialog}
                                    >
                                        <IoMdClose className="w-5 h-5 mr-2"/>
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default BlogsCard;