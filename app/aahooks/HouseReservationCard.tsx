'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeListing, safeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../components/container/HeartButton";
import Button from "../components/container/Button";
import { safeTour } from "@/app/types";
import prisma from '@/app/libs/prismadb';
import toast, { useToaster } from "react-hot-toast";
import axios from "axios";

interface ListingCardProps {
    data: safeReservation;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    
}

interface Listing {
   id: string;
    title: string;
    house: string | null;
    hotel: string | null;
    hotelLink: string | null;
    description: string;
    imageSrc: string[];
    createAt: Date;
    category: string;
    city: string;
    roomCount: number;
    guestCount: number;
    commonPlace: string | null;
}

const HouseReservationCard: React.FC<ListingCardProps> = ({
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
    // const location = getByValue(data?.locationValue || ""); // Handle null locationValue
    // const toaster = useToaster();
    // const [list, setList] = useState({
    // // id: "",
    // // userId: "",
    // // listingId: "",
    // // numberOfGuests: "",
    // // numberOfRooms: "",
    // // startDate: "",
    // // endDate: "",
    // // totalPrice: "",
    // // paymentDetails: "",
    // // createdAt: "",
    // })
    const [list, setList] = useState<Listing | null>(null)

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [onAction, actionId, disabled])

    // const price = useMemo(() => {
    //     if (reservation) {
    //         return reservation.totalPrice;
    //     }

    //     return data?.price || 0; // Handle null data or price
    // }, [reservation, data?.price])

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate || "");
        const end = new Date(reservation.endDate || "");

        return `${format(start, 'pp')} - ${format(end, 'pp')}`
    }, [reservation])


    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log("button clicked");
    try {
        const response = await axios.delete(`/api/listings/${data?.listingId}`, {
            method: 'DELETE',
        });
        console.log("try is working")
        toast.success("Tour deleted successfully")
        router.push("/")
    } catch (error) {
        console.error(error);
        console.log('Failed to delete tour. Please try again.');
    }
    };
    
    useEffect(() => {
        const getListing = async () => {
            try {
                const response = await axios.get(`/api/listings/${data?.listingId}`);
                setList(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error);
                console.log('Failed to delete tour. Please try again.');
            }
        };

        getListing();
    }, [data?.listingId]);

    // console.log('the data', data.Listing);
    // console.log('the list', data);



  return (
      <div
        onClick={() => router.push(`/listings/${data?.listingId || ""}`)} // Handle null data or id
        className="col-span-1 cursor-pointer group"
      >
          <div className="flex flex-col gap-2 w-full main-image-small-screen">
              <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data.Listing?.imageSrc[0] || ""} // Handle null data or imageSrc
                      className="object-cover h-full w-full transition group-hover:scale-110 main-image-small-screen"
                  />
              </div>
              <div className="font-semibold text-md truncate max-w-[15rem]">
                 <span>{data.Listing?.title}</span>
              </div>
              <div className="font-light text-neutral-500">
                Guests: {data.Listing?.guestCount} 
              </div>
              <div className="flex flex-row items-center gap-1">
                  <div className="text-sm">
                   Location: {data.Listing?.city}
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
          <div className="flex flex-row items-center gap-1">
                 <div className="font-semibold">
                    <button className="outline-main-btn" onClick={handleDelete}>Delete</button>
                </div>
         </div>
    </div>
  )
}

export default HouseReservationCard;