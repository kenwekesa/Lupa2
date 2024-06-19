'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeListing, safeOffer, safeReservation } from "@/app/types";
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../container/HeartButton";
import Button from "../container/Button";
import { safeTour } from "@/app/types";
import { FaCheck } from "react-icons/fa6";


interface ListingCardProps {
    data: safeOffer;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
   
}

const OfferMainCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    
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

//     if (!data.inclusion || data.inclusion.length === 0) {
//         console.error('data.inclusion is either undefined or empty');
//         console.log('data.inclusion:', data.inclusion);
//     return null; // or handle the case appropriately
//   }

  return (
      <div
        onClick={() => router.push(`/offer/${data?.id}`)} //added ?
        className="col-span-1 group"
      >
          <div className="flex flex-col h-[40vh] w-full border-[1px] rounded-xl border-solid border-neutral-300 py-4 px-4">
            <div className="flex flex-row justify-between items-center ">
            <div className="flex flex-row items-center gap-4">
              <div className="aspect-square h-[35vh] w-[16vw] relative overflow-hidden rounded-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0]} //added ?
                      className="object-cover h-full w-full transition group-hover:scale-110"
                  />
                  {/* <div className="absolute top-3 right-3">
                      <HeartButton
                          listingId={data?.id} //added ?
                          currentUser={currentUser}
                      />
                  </div> */}
                </div>
            
           <div className="w-[32vw] main-image-small-spans">
              <div className="text-lg py-0.5 w-[30vw] font-semibold main-image-small-spans-c-title">
                <span> {data.title} </span>
              </div>
              <div className="font-normal py-0.5 w-[30vw] main-image-small-spans-c text-neutral-800">
                Offer Available for: <span className="text-neutral-500 text-sm">{ data?.days}</span>
              </div>
            <div>
             <span className="text-sm px-3 py-[4px] mb-[6px] border-neutral-300 border-solid border-2 text-neutral-700 rounded-lg">{data?.category }</span>            
            </div>
              <div className="flex flex-row py-0.5 items-center gap-1">
                  <div>
                     <span className="font-normal main-image-small-spans-c">Location:</span> <span className="text-neutral-700 underline">{ data?.county },</span> <span className="text-neutral-500 underline">{ data.town }</span>
                  </div>
                </div> 
            <div className="font-normal py-0.5 w-[30vw] main-image-small-spans-c-main text-neutral-800">
                              <span className="font-normal"></span> <span className="font-light text-sm text-neutral-700">{ data.type}</span>
            </div>
             {data.inclusion.slice(0,2).map((item, index) => (
                    <div key={index} className="font-normal flex gap-3 items-center py-0.5 w-[30vw] main-image-small-spans-c">
                    <span className="font-normal text-green-700">{item}</span>
                    <span className="text-green-700">
                        <FaCheck size={18} />
                    </span>
                    </div>
                ))}
            <div className="font-normal flex gap-3 items-center py-0.5 w-[30vw] main-image-small-spans-c">
                <span className="font-normal text-green-700">Initial deposit</span> <span className="text-green-700"> <FaCheck size={18} /></span>
            </div> 
            {/* <div>
             <span className="text-sm px-2 py-0.5 mb-1 border-red-500 border-solid border-2 text-red-500 rounded-xl">{data.deal}</span>            
            </div>             */}
                </div>
            </div>
                
            <div className="flex flex-col items-center pr-5 gap-3">
            <div className="text-red-600">
                 {/* <div className="text-sm main-image-small-spans-c-btn"><span>Save</span></div>    */}
                <div className="main-image-small-spans-c-btn">Ksh. <span className="text-md line-through">{data.price }</span></div>
              </div>
            <div className="flex flex-row items-center gap-1">
                  <div><span>Price</span></div> 
                  <div>
                      <span className="text-md font-semibold">Ksh. {data.offerprice}</span>
                  </div>
            </div>
                <div>
                  <span className=" border-green-500 text-green-500 border-solid px-4 py-2 border-2 bg-white hover:bg-green-500 hover:text-white cursor-pointer text-md rounded-xl main-image-small-spans-c-btn" >See availability</span>        
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

export default OfferMainCard