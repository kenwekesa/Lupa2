'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeListing, safeReservation, safeProperty } from "@/app/types";
//import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { Key, useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../container/HeartButton";
import Button from "../container/Button";


interface ListingCardProps {
    data: safeProperty;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const PropertyCardSecondary: React.FC<ListingCardProps> = ({
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
    // const location = getByValue(data?.locationValue); //added ?

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
        onClick={() => router.push(`/property/${data?.id}`)} //added ?
        className="col-spListingCardSecondaryan-1 pb-3 rounded-xl cursor-pointer group"
      >
          <div className="flex h-[50vh] flex-col gap-2 w-full main-image-small-screen main-image-small-screen-x">
              <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0]} //added ?
                      className="object-cover h-full w-full transition group-hover:scale-110 main-image-small-screen-i main-image-small-screen"
                  />
                  <div className="absolute top-3 right-3">
                      {/* <HeartButton
                          listingId={data?.id} //added ?
                          currentUser={currentUser}
                      /> */}
                  </div>
              </div>
              <div className="text-md px-2 pt-1 pb-2 font-semibold text-md truncate max-w-[20rem]">
                 <span className="text-neutral-700">{data.title}</span>
              </div>
              <div className="font-light px-2 flex items-center justify-between mt-[-16px] text-neutral-500">
               <span className="text-neutral-700 text-sm">Price: Ksh. {data.price}</span> <span className="text-neutral-500 text-sm">{data.category}</span>  
              </div>
              <div className="flex flex-row items-center gap-1">
              </div>
              {/* {onAction && actionLabel && (
                  <Button
                      disabled={disabled}
                      small
                      label={actionLabel}
                      onClick={handleCancel}
                  />
              )} */}
          </div>   
    </div>
  )
}

export default PropertyCardSecondary