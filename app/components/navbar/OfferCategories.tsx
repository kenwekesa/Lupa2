'use client'

import Container from "../container/Container"
import CategoryBox from "../container/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { RiGalleryLine } from "react-icons/ri";
import { TbToolsKitchen3 } from "react-icons/tb";
import { GiTreehouse } from "react-icons/gi";
import { GiHouse } from "react-icons/gi";
import { MdOutlineLandslide } from "react-icons/md";

export const offers = [
    {
        label: 'Stays',
        icon: TbToolsKitchen3,
        description: "These are stays offers!"
    },
    {
        label: 'Property Sales',
        icon: GiTreehouse,
        description: "These are property sales offers!"
    },
    {
        label: 'Property rentals',
        icon: GiHouse,
        description: "These are property rental offers!"
    },
    {
        label: 'Land sales',
        icon: MdOutlineLandslide,
        description: "These are land sales offers!"
    }
]

const OfferCategories = () => {

    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const [startIndex, setStartIndex] = useState(0);

    const isHotelPage = pathname === '/hotels';

    if (!isHotelPage) {
        return null;
    }

    // Function to handle scrolling to the next set of categories
    const handleNextClick = () => {
        const newStartIndex = startIndex + 9;
        setStartIndex(Math.min(newStartIndex, offers.length - 9));
    };

    // Function to handle scrolling to the previous set of categories
    const handleBackClick = () => {
        const newStartIndex = startIndex - 9;
        setStartIndex(Math.max(newStartIndex, 0));
    };

  return (
    <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto relative">
                <button
                    onClick={handleBackClick}
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 cursor-pointer ${
                        startIndex === 0 ? 'invisible' : ''
                    }`}
                //   style={{ marginLeft: '-10px' }}
                >
                <IoArrowBackCircleOutline size={24} />
                </button>
                {offers.slice(startIndex, startIndex + 9).map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
                <button
                    onClick={handleNextClick}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 cursor-pointer ${
                        startIndex + 9 >= offers.length ? 'invisible' : ''
                        }`}
                //   style={{ marginRight: '-10px' }}
                >
                <IoArrowForwardCircleOutline size={24} />
                </button>
            </div>
        </Container>
  )
}

export default OfferCategories