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


interface ListingCardProps {
    data: safeTour;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const TourMainAfricanCard: React.FC<ListingCardProps> = ({
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
    const newData = { ...data, continent: "africa" };

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

        return newData.price;
    }, [reservation, newData?.price]) //added ?

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
        onClick={() => router.push(`/tours/${newData?.id}`)} //added ?
        className="col-span-1 group"
      >
          <div className="flex h-[50vh] flex-col w-full bg-white py-4 px-4 rounded-xl shadow-md gap-3 main-image-small-screen">
            <div className="flex flex-row justify-between items-center ">
            <div className="flex flex-row items-center gap-4">
              <div className="aspect-square h-[42vh] w-full relative overflow-hidden rounded-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={newData?.imageSrc[0]} //added ?
                      className="object-cover h-full w-full transition group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                      <HeartButton
                          listingId={newData?.id} //added ?
                          currentUser={currentUser}
                      />
                  </div>
                </div>
            
           <div className="w-[37vw]">
            <div>
             <span className="text-sm px-2 py-0.5 mb-1 border-cyan-500 border-solid border-2 text-cyan-500 rounded-xl">{newData.category }</span>            
            </div>
              <div className="text-lg py-0.5 w-[30vw] font-semibold">
                <span> {newData.title } </span>
              </div>
              <div className="font-normal py-0.5 w-[30vw] text-neutral-800">
                <span>{newData.days}</span> Days from {newData.locStart} to {newData.locEnd}
              </div>
              <div className="flex flex-row py-0.5 items-center gap-1">
                  <div>
                     <span className="font-normal">Operator:</span> <span className="text-cyan-500 underline">{newData.operator}</span>
                  </div>
                </div> 
            <div className="font-normal py-0.5 w-[30vw] text-neutral-800">
                <span className="font-normal">Departures:</span> <span className="font-light text-sm text-neutral-600">{newData.depStart}</span> to <span className="font-light text-sm text-neutral-600">{newData.depEnd}</span> 
            </div>
             <div className="font-normal py-0.5 w-[30vw] ">
                <span className="font-normal text-neutral-800">Tour Styles:</span> <span className="font-light text-sm text-neutral-600">{newData.tripStyle}</span> 
            </div>
               <div className="font-normal py-0.5 w-[30vw] ">
                <span className="font-normal text-neutral-800">Countries Visited:</span> <span className="font-light text-sm text-neutral-600">{newData.countries}</span> 
                </div> 
            <div>
             <span className="text-sm px-2 py-0.5 mb-1 border-red-500 border-solid border-2 text-red-500 rounded-xl">{newData.deal}</span>            
            </div>            
                </div>
            </div>
                
            <div className="flex flex-col items-center gap-2">
            <div className="text-cyan-500">
                 <div className="text-sm"><span>Save</span></div>   
                <div>$ <span className="text-xl">{newData.save }</span></div>
              </div>
            <div className="flex flex-row items-center gap-1">
                  <div><span>Price</span></div> 
                  <div>
                      $ <span className="text-xl font-semibold">{newData.price}</span> pp
                  </div>
                      </div>
                <div>
                  <span className=" border-white text-cyan-500 border-solid px-4 py-2 border-2 bg-cyan-500 hover:bg-cyan-500 cursor-pointer text-md hover:text-cyan-500 rounded-xl" >View Tour</span>        
                </div>
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

export default TourMainAfricanCard