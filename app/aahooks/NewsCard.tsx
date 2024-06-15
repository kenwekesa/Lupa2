'use client'
import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { SafeUser, safeBlog, safeReservation } from '@/app/types';
import { useRouter } from 'next/navigation';

interface ListingCardProps {
    data: safeBlog;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const NewsCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {

    const reservationDate = React.useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'pp')} - ${format(end, 'pp')}`;
    }, [reservation]);

    const router = useRouter();

    return (
        <div onClick={() => router.push(`/blog/${data?.id}`)} //added ?
            className="col-span-1 cursor-pointer group rounded-xl pb-3">
            <div className="flex flex-col gap-2 w-full main-image-small-screen">
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold truncate max-w-[20rem] text-lg text-neutral-600">
                        {data.title}
                    </div>
                </div>
                <div className="h-[53vh] w-full relative overflow-hidden rounded-xl">
                    {data?.imageSrc[0] ? (
                        <Image
                            fill
                            alt="Listing"
                            src={data?.imageSrc[0]}
                            className="object-cover h-full w-full transition group-hover:scale-110"
                        />
                    ) : data?.hotelLink !== "" ? (
                        <iframe
                            src={data?.hotelLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    ) : null}
                </div>
                {/* <div className="flex flex-row items-center gap-1">
                    <div className="text-md text-neutral-600 truncate max-w-[20rem]">
                        {data.description}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default NewsCard;
