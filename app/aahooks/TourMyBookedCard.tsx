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
import { MouseEvent } from 'react';
import DialogBox from "./DialogBox";
import { useUsers } from "../actions/useUsers";


interface UserData {
    id: string;
    name: string | null;
    contact: string | null;
    country: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
    favoriteIds: string[];
    userType: string | null;
  }
interface ListingCardProps {
    data: safeTour;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    label: boolean;
    users?:SafeUser[];
}
 
const TourBookedMyCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser, 
    label,
    users
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data?.locationValue || ""); // Handle null locationValue
    const toaster = useToaster();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    //const [users, setUsers] = useState<UserData[]>([]);
 
    const openDialog = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Stop event propagation to parent
        setIsDialogOpen(true);
    };

    const handleDivClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        openDialog(e);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

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

        return data?.price || 0; // Handle null data or price
    }, [reservation, data?.price])

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
        const response = await axios.delete(`/api/tours/${data?.id}`, {
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

    console.log("Getting users------------------")
    const fetchUsers = async () => {
    //   try {
    //    // const currentUser = getCurrentUser()
       
    //     console.log("current User-----", currentUser)
    //     const fetchedUsers = await getUsers({});
    //     console.log('Fetched users:', fetchedUsers); // Log fetched users
    //     setUsers(fetchedUsers);
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   }
    // try {
    //     const response = await axios.get('/api/users', {
    //         headers: {
            
    //           'Content-Type': 'application/json',
    //           // Add other headers as needed
    //         },
    //       }); // Send params as query string
    //     setUsers(response.data); 
    //   } catch (error) {
    //     console.error(error);
    //     // Handle errors (e.g., display an error message to the user)
    //     console.log("Error fetching users axiosss", error) // Return an empty array in case of error (optional)
    //   }
    };
  
    fetchUsers();
  }, []);


  return (
      <div
        onClick={() => router.push(`/tours/${data?.id || ""}`)} // Handle null data or id
        className="col-span-1 cursor-pointer group"
      >
          <div className="flex flex-col gap-2 w-full main-image-small-screen">
              <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0] || ""} // Handle null data or imageSrc
                      className="object-cover h-full w-full transition group-hover:scale-110 main-image-small-screen"
                  />
                  <div className="absolute top-3 right-3">
                      { label ? 
                        <div className="bg-red-400 text-sm text-white outline-1 px-2 py-1 rounded-lg">
                            fully booked
                            </div> :
                            <div className="bg-blue-400 text-sm text-white outline-1 px-2 py-1 rounded-lg">
                            not fully booked   
                            </div>
                        }
                  </div>
              </div>
              <div className="font-semibold text-md truncate max-w-[15rem]">
                 <span>{data.title}</span>
              </div>
              <div className="font-light text-neutral-500">
                Toursts: {data.guestCount} 
              </div>
              <div className="flex flex-row items-center gap-1">
                  <div className="text-sm">
                    {data.depStart} to {data.depEnd}
                  </div>
              </div>
              <div className="flex flex-row items-center gap-1">
                Slots booked:
                  <div className="font-semibold">
                       {data.tourists.length} 
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
          <div className="flex flex-row items-center  gap-1">
                <div className="font-semibold">
                    <button className="outline-main-btn" onClick={handleDelete}>Delete</button>
              </div>
              <div className="font-semibold" onClick={handleDivClick}>
                    <button className="outline-main-btn">View</button>
              </div>
              {isDialogOpen &&
              <DialogBox isOpen={isDialogOpen} onClose={closeDialog} data={data} users={users}>
                 
              </DialogBox>}
              
         </div>
    </div>
  )
}

export default TourBookedMyCard;