'use client'

import { BiSearch } from "react-icons/bi"

import useSearchModal from "@/app/hooks/useSearchModal"
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {

  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');


  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [getByValue, locationValue])


  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1
      }

      return `${diff} Days`;
    }

    return 'Any Week'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests'
  }, [guestCount]);

  return (
      <div className="main-search">
      <div
        onClick={searchModal.onOpen}
        className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-6">
                {locationLabel} 
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
               {durationLabel}  
              </div>
            <div className="hidden sm:block"> {guestLabel}   
            </div>
            <div className="p-2 bg-indigo-500 rounded-full text-white search-background-icon">
            <BiSearch size={18} />
            </div> 
          </div>
      </div>
  )
}

export default Search