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

const TourCard: React.FC<ListingCardProps> = ({
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
        className="col-span-1 cursor-pointer group"
      >
          <div className="flex h-[50vh] flex-col gap-2 w-full main-image-small-screen">
              <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0]} //added ?
                      className="object-cover h-full w-full transition group-hover:scale-110 main-image-small-screen"
                  />
                  <div className="absolute top-3 right-3">
                      <HeartButton
                          listingId={data?.id} //added ?
                          currentUser={currentUser}
                      />
                  </div>
              </div>
              <div className="text-sm">
                 <span>{location?.label},</span> {location?.region}
              </div>
              <div className="font-light text-neutral-500">
                 {reservationDate || data.category} 
              </div>
              <div className="flex flex-row items-center gap-1">
                  <div className="font-semibold">
                      $ {price}
                  </div>
                  {!reservation && (
                      <div className="font-light">night</div>
                  )}
              </div>
              <div className="flex flex-row items-center gap-1">
                Slots booked:
                  <div className="font-semibold">
                       {(data.tourists.filter((item) => item === currentUser?.id)).length} 
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

export default TourCard