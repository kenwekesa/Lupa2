'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeListing, safeReservation, safeProperty, safeLand } from "@/app/types";
//import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { Key, useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../container/HeartButton";
import Button from "../container/Button";


interface ListingCardProps {
    data: safeLand;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const LandCardMain: React.FC<ListingCardProps> = ({
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
        onClick={() => router.push(`/lands/${data?.id}`)} //added ?
        className="col-span-1 bg-white shadow-md pb-3 rounded-xl cursor-pointer group"
      >
          <div className="flex h-[50vh] flex-col gap-[6px] w-full main-image-small-screen">
              <div className="aspect-square w-full relative overflow-hidden rounded-t-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0]} //added ?
                      className="object-cover h-full w-full transition group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                      {/* <HeartButton
                          listingId={data?.id} //added ?
                          currentUser={currentUser}
                      /> */}
                  </div>
              </div>
              <div className="flex flex-row justify-between px-4">
              <div>
                <span className="font-bold text-neutral-800">{data.title}</span>      
              </div>
             </div>
              <div className="flex flex-row gap-1 items-center px-4">
              <div>
                <span className="font-bold text-neutral-800">{data.county},</span>      
              </div>
              <div className="text-sm truncate max-w-[10rem]">
                 {data.town}
              </div>
             </div>
              {/* <div className="flex flex-row items-center gap-1 font-light px-4 text-neutral-400">
                  <span className="text-sm text-neutral-900 bg-green-400 py-[5px] px-[7px] rounded-bl-xl rounded-tr-xl">{data.ratings}</span>
                  <span className="text-sm text-neutral-900">Excellent .</span>
                  <span className="text-sm text-neutral-500">Reviews</span>
              </div> */}
              <div className="px-4">
                  <hr />
              </div>
              <div className="flex flex-row px-4 justify-between items-center gap-1">
                  {/* <div className="font-semibold">
                     from ${price}
                  </div> */}
                  <div>
                     {/* from <span className="font-semibold">${price}</span>  */}
                  </div>
                  { data.offerPrice !== 0 && (
                      <div>
                          <span className="text-neutral-800">Price: </span> <span className="font-semibold text-neutral-600">Ksh. {data.price}</span>
                      </div>
                  )}
                  {/* {!reservation && (
                      <div className="font-light">night</div>
                  )} */}
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

export default LandCardMain