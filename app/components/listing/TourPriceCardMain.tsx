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

const TourPriceCardMain: React.FC<ListingCardProps> = ({
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
            <div className="flex flex-row px-4 pt-1 justify-between items-center">
              <div className="font-semibold text-md truncate max-w-[20rem]">
                <span className="text-neutral-700">{data.title}</span>
              </div>
            </div>
            <div className="flex flex-row px-4 pt-1 justify-between items-center">
              <div className="font-normal flex gap-1 text-md truncate max-w-[20rem]">
                <span className="text-neutral-600">{data.country}, </span> 
                <span className="text-neutral-800">{data.category}</span> 
              </div>
             </div>
            <div className="flex flex-row px-4 pt-1 justify-between items-center">
              <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
              <span className="bg-green-600 py-[5px] px-[7px] rounded-bl-xl rounded-tr-xl">{data.days}</span> <span className="pt-[5px]">Excellent .</span> <span className="py-[5px] text-neutral-600">Reviews</span>
              </div>
             {/* <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
               <IoLocationOutline size={18} /> <span>{data.locs}</span> locations
               </div>
             <div className="flex flex-row gap-1 text-center text-sm tourpricecard-text">
                <GiWorld size={18} /> <span>{data.counts}</span> countries
               </div> */}
             </div>
                  <div className="px-4 py-2">
                   <hr /> 
                  </div>
              <div className="flex flex-row justify-between px-4 py-1 items-center gap-1">
                  <div>
                       <span className="font-bold text-md"></span>
                      </div>
                      {save !== 0 && (
                        <div className="text-neutral-700">
                            Price: <span className="font-bold text-md">Ksh. {save}</span>
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

export default TourPriceCardMain