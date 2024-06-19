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

export const lands = [
    {
        label: 'Residential Lots',
        icon: TbToolsKitchen3,
        description: "These are residential lots!"
    },
    {
        label: 'Commercial Land',
        icon: GiTreehouse,
        description: "These are property commercial land!"
    },
    {
        label: 'Industrial Land',
        icon: GiHouse,
        description: "These are property industrial land!"
    },
    {
        label: 'Farm Land',
        icon: MdOutlineLandslide,
        description: "These are land farm land!"
    },
    {
        label: 'Ranch Land',
        icon: TbToolsKitchen3,
        description: "These are ranch land!"
    },
    {
        label: 'Timberland',
        icon: GiTreehouse,
        description: "These are timberland!"
    },
    {
        label: 'Vacant Land',
        icon: GiHouse,
        description: "These are vacant land!"
    },
    {
        label: 'Recreational Land',
        icon: MdOutlineLandslide,
        description: "These are recreational land!"
    },
    {
        label: 'Agricultural Land',
        icon: TbToolsKitchen3,
        description: "These are agricultural land!"
    },
    {
        label: 'Waterfront Properties',
        icon: GiTreehouse,
        description: "These are waterfront properties!"
    },
    {
        label: 'Mountain Land',
        icon: GiHouse,
        description: "These are mountain land!"
    },
    {
        label: 'Desert Land',
        icon: MdOutlineLandslide,
        description: "These are desert land!"
    },
    {
        label: 'Vineyards',
        icon: TbToolsKitchen3,
        description: "These are vineyards!"
    },
    {
        label: 'Orchards',
        icon: GiTreehouse,
        description: "These are orchards!"
    },
    {
        label: 'Urban Land',
        icon: GiHouse,
        description: "These are urban land!"
    },
    {
        label: 'Rural Land',
        icon: MdOutlineLandslide,
        description: "These are Rural Land!"
    }
]

const LandCategories = () => {

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
        setStartIndex(Math.min(newStartIndex, lands.length - 9));
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
                {lands.slice(startIndex, startIndex + 9).map((item) => (
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
                        startIndex + 9 >= lands.length ? 'invisible' : ''
                        }`}
                //   style={{ marginRight: '-10px' }}
                >
                <IoArrowForwardCircleOutline size={24} />
                </button>
            </div>
        </Container>
  )
}

export default LandCategories