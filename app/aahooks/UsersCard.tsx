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
    data: SafeUser;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    
}

interface User {
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

const UsersCard: React.FC<ListingCardProps> = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    
    const [list, setList] = useState<User | null>(null)

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [onAction, actionId, disabled])


    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log("button clicked");
    try {
        const response = await axios.delete(`/api/register/${data?.id}`, {
            method: 'DELETE',
        });
        console.log("try is working")
        toast.success(`${data.name}, deleted successfully`)
        router.push("/admin/profile")
    } catch (error) {
        console.error(error);
        console.log('Failed to delete tour. Please try again.');
    }
    };


    return (
      
      <div
        // onClick={() => router.push(`/register/${data?.id || ""}`)} // Handle null data or id
        className="col-span-4 cursor-pointer group flex flex-row justify-between items-center"
      >
          <div className="flex flex-col gap-2">
              <div className="text-sm">
                  <span>{data.name}</span>
              </div>
              <div className="text-sm">
                 <span>{data.email}</span>
              </div>
              <div className="ftext-sm">
                {data.contact} 
              </div>
          </div>   
          <div className="flex flex-row items-center gap-1">
                 <div className="font-semibold">
                    <button className="outline-main-btn" onClick={handleDelete}>Delete</button>
                </div>
         </div>
    </div>
  )
}

export default UsersCard;