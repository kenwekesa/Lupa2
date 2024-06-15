'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeTour } from "@/app/types";
import { useRouter } from "next/navigation";
import Heading from "../container/Heading";
import Image from "next/image";
import HeartButton from "../container/HeartButton";

interface ListingHeadProps {
  data: safeTour;
  title: string;
  locationValue: string;
  imageSrc?: string;
  currentUser?: SafeUser | null;
}

const ListingValue: React.FC<ListingHeadProps> = ({
  data,
  locationValue,
  title,
}) => {

  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);


  // ... (Rest of your component code)

  const handleClick = () => {
      // Navigate only if id is present
    const id = data?.id;

    if (id) {
      router.push(`/tours/${id}`);
    }
  };

  return (
    <>
      {/* {location?.region} */}
      <div
        className="text-neutral-800 hover:underline hover:cursor-pointer truncate max-w-[7rem]"
        onClick={handleClick}
      >
        {title}
      </div>
    </>
  );
};

export default ListingValue;
