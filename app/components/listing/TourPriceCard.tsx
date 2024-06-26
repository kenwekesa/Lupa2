'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeListing, safeReservation } from "@/app/types";
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../container/HeartButton";
import Button from "../container/Button";
import { safeTour } from "@/app/types";
import { title } from "process";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";


interface ListingCardProps {
    data: safeTour;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const TourPriceCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data?.locationValue); //added ?
    const title = getByValue(data?.title);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data?.price]) //added ?


    const save = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.save;
    }, [reservation, data?.save]) //added ?

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'pp')} - ${format(end, 'pp')}`
    }, [reservation])

  return (
      <div
        onClick={() => router.push(`/tours/${data?.id}`)} //added ?
        className="col-span-1 cursor-pointer group rounded-xl pb-3 shadow-md bg-white"
      >
          <div className="flex h-[50vh] flex-col gap-2 w-full main-image-small-screen">
              <div className="aspect-square w-full relative overflow-hidden rounded-t-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0]} //added ?
                      className="object-cover h-full w-full transition group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 hidden">
                      <HeartButton
                          listingId={data?.id} //added ?
                          currentUser={currentUser}
                      />
                  </div>
              </div>
              <div className="gap-0">
            <div className="flex flex-row px-4 py-1 justify-between items-center">
              <div className="font-semibold text-md truncate max-w-[20rem]">
                <span className="text-neutral-700">{data.title}</span>
              </div>
             </div>
            <div className="flex flex-row px-4 py-2 justify-between items-center">
              <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
              <SlCalender size={18} /> <span>{data.days}</span> days
              </div>
             <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
               <IoLocationOutline size={18} /> <span>{data.locs}</span> locations
               </div>
             <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
                <GiWorld size={18} /> <span>{data.counts}</span> countries
               </div>
             </div>
                  <div className="px-4 py-2">
                   <hr /> 
                  </div>
              <div className="flex flex-row justify-between px-4 py-1 items-center gap-1">
                  <div>
                       from <span className="font-bold text-md">${price}</span>
                      </div>
                      {save !== 0 && (
                        <div className="text-blue-600">
                            save <span className="font-bold text-md">${save}</span>
                        </div>
                      )}
                  </div>
             </div>
              {onAction && actionLabel && (
                  <Button
                      disabled={disabled}
                      small
                      label={actionLabel}
                      onClick={handleCancel}
                  />
              )}
          </div>   
    </div>
  )
}

export default TourPriceCard

// 'use client'

// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { format } from 'date-fns'; // Import format from date-fns
// import { SlCalender } from "react-icons/sl";
// import { IoLocationOutline } from "react-icons/io5";
// import { GiWorld } from "react-icons/gi";
// import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
// import { SafeUser, safeTour, safeReservation } from "@/app/types";
// import useCountries from "@/app/hooks/useCountries";
// import Button from "../container/Button";

// interface ListingCardProps {
//     data: safeTour;
//     reservation?: safeReservation;
//     onAction?: (id: string) => void;
//     disabled?: boolean;
//     actionLabel?: string;
//     actionId?: string;
//     currentUser?: SafeUser | null;
// }

// const TourPriceCard: React.FC<ListingCardProps> = ({
//     data,
//     reservation,
//     onAction,
//     disabled,
//     actionLabel,
//     actionId = "",
//     currentUser
// }) => {
//     const router = useRouter();
//     const { getByValue } = useCountries();
//     const location = getByValue(data?.locationValue);

//     const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
//         e.stopPropagation();

//         if (disabled) {
//             return;
//         }

//         onAction?.(actionId);
//     }, [onAction, actionId, disabled]);

//     const price = useMemo(() => {
//         if (reservation) {
//             return reservation.totalPrice;
//         }
//         return data.price;
//     }, [reservation, data?.price]);

//     const save = useMemo(() => {
//         if (reservation) {
//             return reservation.totalPrice;
//         }
//         return data.save;
//     }, [reservation, data?.save]);

//     const reservationDate = useMemo(() => {
//         if (!reservation) {
//             return null;
//         }

//         const start = new Date(reservation.startDate);
//         const end = new Date(reservation.endDate);

//         return `${format(start, 'pp')} - ${format(end, 'pp')}`;
//     }, [reservation]);

//     const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
//     const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
//     const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

//     return (
//         <div className="embla">
//             <div className="embla__viewport" ref={emblaRef}>
//                 <div className="embla__container">
//                     {[data, data, data, data].map((tour, index) => (
//                         <div key={index} className="embla__slide grid grid-cols-1 gap-4">
//                             <div
//                                 onClick={() => router.push(`/tours/${tour?.id}`)}
//                                 className="col-span-1 cursor-pointer group rounded-xl pb-3 shadow-md bg-white"
//                             >
//                                 <div className="flex h-[50vh] flex-col gap-2 w-full main-image-small-screen">
//                                     <div className="aspect-square w-full relative overflow-hidden rounded-t-xl">
//                                         <Image
//                                             fill
//                                             alt="Listing"
//                                             src={tour?.imageSrc[0]}
//                                             className="object-cover h-full w-full transition group-hover:scale-110"
//                                         />
//                                     </div>
//                                     <div className="gap-0">
//                                         <div className="flex flex-row px-4 py-1 justify-between items-center">
//                                             <div className="font-semibold text-md truncate max-w-[20rem]">
//                                                 <span className="text-neutral-700">{tour.title}</span>
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-row px-4 py-2 justify-between items-center">
//                                             <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
//                                                 <SlCalender size={18} /> <span>{tour.days}</span> days
//                                             </div>
//                                             <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
//                                                 <IoLocationOutline size={18} /> <span>{tour.locs}</span> locations
//                                             </div>
//                                             <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
//                                                 <GiWorld size={18} /> <span>{tour.counts}</span> countries
//                                             </div>
//                                         </div>
//                                         <div className="px-4 py-2">
//                                             <hr />
//                                         </div>
//                                         <div className="flex flex-row justify-between px-4 py-1 items-center gap-1">
//                                             <div>
//                                                 from <span className="font-bold text-md">${price}</span>
//                                             </div>
//                                             {save !== 0 && (
//                                                 <div className="text-blue-600">
//                                                     save <span className="font-bold text-md">${save}</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="embla__buttons">
//                 <button className="embla__prev text-black pt-3" onClick={scrollPrev}>
//                     <CiCircleChevLeft size={32} />
//                 </button>
//                 <button className="embla__next text-black pt-3" onClick={scrollNext}>
//                     <CiCircleChevRight size={32} />
//                 </button>
//                 {onAction && actionLabel && (
//                     <Button
//                         disabled={disabled}
//                         small
//                         label={actionLabel}
//                         onClick={handleCancel}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }

// export default TourPriceCard;



// 'use client'

// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { format } from 'date-fns'; // Import format from date-fns
// import { SlCalender } from "react-icons/sl";
// import { IoLocationOutline } from "react-icons/io5";
// import { GiWorld } from "react-icons/gi";
// import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
// import { SafeUser, safeTour, safeReservation } from "@/app/types";
// import useCountries from "@/app/hooks/useCountries";
// import Button from "../container/Button";

// interface ListingCardProps {
//     data: safeTour;
//     reservation?: safeReservation;
//     onAction?: (id: string) => void;
//     disabled?: boolean;
//     actionLabel?: string;
//     actionId?: string;
//     currentUser?: SafeUser | null;
// }

// const TourPriceCard: React.FC<ListingCardProps> = ({
//     data,
//     reservation,
//     onAction,
//     disabled,
//     actionLabel,
//     actionId = "",
//     currentUser
// }) => {
//     const router = useRouter();
//     const { getByValue } = useCountries();
//     const location = getByValue(data?.locationValue);

//     const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
//         e.stopPropagation();

//         if (disabled) {
//             return;
//         }

//         onAction?.(actionId);
//     }, [onAction, actionId, disabled]);

//     const price = useMemo(() => {
//         if (reservation) {
//             return reservation.totalPrice;
//         }
//         return data.price;
//     }, [reservation, data?.price]);

//     const save = useMemo(() => {
//         if (reservation) {
//             return reservation.totalPrice;
//         }
//         return data.save;
//     }, [reservation, data?.save]);

//     const reservationDate = useMemo(() => {
//         if (!reservation) {
//             return null;
//         }

//         const start = new Date(reservation.startDate);
//         const end = new Date(reservation.endDate);

//         return `${format(start, 'pp')} - ${format(end, 'pp')}`;
//     }, [reservation]);

//     const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
//     const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
//     const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

//     return (
//         <div className="embla">
//             <div className="embla__viewport" ref={emblaRef}>
//                 <div className="embla__container">
//                     {[data, data, data, data].map((tour, index) => (
//                         <div key={index} className="embla__slide grid grid-cols-1 gap-4">
//                             <div
//                                 onClick={() => router.push(`/tours/${tour?.id}`)}
//                                 className="col-span-1 cursor-pointer group rounded-xl pb-3 shadow-md bg-white"
//                             >
//                                 <div className="flex h-[50vh] flex-col gap-2 w-full main-image-small-screen">
//                                     <div className="aspect-square w-full relative overflow-hidden rounded-t-xl">
//                                         <Image
//                                             fill
//                                             alt="Listing"
//                                             src={tour?.imageSrc[0]}
//                                             className="object-cover h-full w-full transition group-hover:scale-110"
//                                         />
//                                     </div>
//                                     <div className="gap-0">
//                                         <div className="flex flex-row px-4 py-1 justify-between items-center">
//                                             <div className="font-semibold text-md truncate max-w-[20rem]">
//                                                 <span className="text-neutral-700">{tour.title}</span>
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-row px-4 py-2 justify-between items-center">
//                                             <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
//                                                 <SlCalender size={18} /> <span>{tour.days}</span> days
//                                             </div>
//                                             <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
//                                                 <IoLocationOutline size={18} /> <span>{tour.locs}</span> locations
//                                             </div>
//                                             <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
//                                                 <GiWorld size={18} /> <span>{tour.counts}</span> countries
//                                             </div>
//                                         </div>
//                                         <div className="px-4 py-2">
//                                             <hr />
//                                         </div>
//                                         <div className="flex flex-row justify-between px-4 py-1 items-center gap-1">
//                                             <div>
//                                                 from <span className="font-bold text-md">${price}</span>
//                                             </div>
//                                             {save !== 0 && (
//                                                 <div className="text-blue-600">
//                                                     save <span className="font-bold text-md">${save}</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                     {onAction && actionLabel && (
//                                         <Button
//                                             disabled={disabled}
//                                             small
//                                             label={actionLabel}
//                                             onClick={handleCancel}
//                                         />
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <button className="embla__prev text-black pt-3" onClick={scrollPrev}>
//                 <CiCircleChevLeft size={32} />
//             </button>
//             <button className="embla__next text-black pt-3" onClick={scrollNext}>
//                 <CiCircleChevRight size={32} />
//             </button>
//         </div>
//     );
// }

// export default TourPriceCard;
