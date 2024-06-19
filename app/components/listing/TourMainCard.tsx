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

const TourMainCard: React.FC<ListingCardProps> = ({
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
        onClick={() => router.push(`/tours/${data?.id}`)} //added ?
        className="col-span-1 group"
      >
          <div className="flex flex-col h-[50vh] w-full bg-white py-4 px-4 rounded-xl shadow-md gap-3 main-image-small-screen-main-one">
            <div className="flex flex-row justify-between items-center ">
            <div className="flex flex-row items-center gap-4">
              <div className="aspect-square h-[42vh] w-full relative overflow-hidden rounded-xl main-image-small-image-main-one">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0]} //added ?
                      className="object-cover h-full w-full transition group-hover:scale-110 main-image-small-image-main-one-img"
                  />
                  <div className="absolute top-3 right-3">
                      <HeartButton
                          listingId={data?.id} //added ?
                          currentUser={currentUser}
                      />
                  </div>
                </div>
            
           <div className="w-[37vw] main-image-small-spans">
            <div>
             <span className="text-sm px-2 py-0.5 mb-1 border-cyan-500 border-solid border-2 text-cyan-500 rounded-xl">{data.category }</span>            
            </div>
              <div className="text-lg py-0.5 w-[30vw] font-semibold main-image-small-spans-c-title">
                <span> {data.title} </span>
              </div>
              <div className="font-normal py-0.5 w-[30vw] main-image-small-spans-c text-neutral-800">
                <span>{ data.days}</span> Days from {data.locStart} to {data.locEnd}
              </div>
              <div className="flex flex-row py-0.5 items-center gap-1">
                  <div>
                     <span className="font-normal main-image-small-spans-c">Operator:</span> <span className="text-cyan-500 underline">{data.operator}</span>
                  </div>
                </div> 
            <div className="font-normal py-0.5 w-[30vw] main-image-small-spans-c-main text-neutral-800">
                <span className="font-normal">Departures:</span> <span className="font-light text-sm text-neutral-600">{data.depStart}</span> to <span className="font-light text-sm text-neutral-600">{data.depEnd}</span> 
            </div>
             <div className="font-normal py-0.5 w-[30vw] main-image-small-spans-c ">
                <span className="font-normal text-neutral-800">Tour Styles:</span> <span className="font-light text-sm text-neutral-600">{data.tripStyle}</span> 
            </div>
               <div className="font-normal py-0.5 w-[30vw] main-image-small-spans-c">
                <span className="font-normal text-neutral-800">Countries Visited:</span> <span className="font-light text-sm text-neutral-600">{data.countries}</span> 
                </div> 
            <div>
             <span className="text-sm px-2 py-0.5 mb-1 border-red-500 border-solid border-2 text-red-500 rounded-xl">{data.deal}</span>            
            </div>            
                </div>
            </div>
                
            <div className="flex flex-col items-center gap-2">
            <div className="text-cyan-500">
                 <div className="text-sm main-image-small-spans-c-btn"><span>Save</span></div>   
                <div className="main-image-small-spans-c-btn">$ <span className="text-xl">{data.save }</span></div>
              </div>
            <div className="flex flex-row items-center gap-1">
                  <div><span>Price</span></div> 
                  <div>
                      <span className="text-md font-semibold">${data.price} <span className="tour-p-main-c">pp</span></span>
                  </div>
            </div>
                <div>
                  <span className=" border-cyan-500 text-cyan-500 border-solid px-4 py-2 border-2 bg-white hover:bg-cyan-500 hover:text-white cursor-pointer text-md rounded-xl main-image-small-spans-c-btn" >View Tour</span>        
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

export default TourMainCard