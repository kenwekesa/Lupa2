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

export const properties = [
    {
        label: 'Single-Family Homes',
        icon: TbToolsKitchen3,
        description: "These are Single-Family Homes!"
    },
    {
        label: 'Condominiums',
        icon: GiTreehouse,
        description: "These are Condominiums!"
    },
    {
        label: 'Townhouses',
        icon: GiHouse,
        description: "These are Townhouses!"
    },
    {
        label: 'Multi-Family Homes',
        icon: MdOutlineLandslide,
        description: "Multi-Family Homes!"
    },
    {
        label: 'Luxury Homes',
        icon: TbToolsKitchen3,
        description: "These are Luxury Homes!"
    },
    {
        label: 'New Construction Homes',
        icon: GiTreehouse,
        description: "These are New Construction Homes!"
    },
    {
        label: 'Vacation Homes',
        icon: GiHouse,
        description: "These are Vacation Homes!"
    },
    {
        label: 'Investment Properties',
        icon: MdOutlineLandslide,
        description: "These are Investment Properties!"
    },
    {
        label: 'Foreclosures',
        icon: TbToolsKitchen3,
        description: "These are Foreclosures!"
    },
    {
        label: 'Fixer-Uppers',
        icon: GiTreehouse,
        description: "These are Fixer-Uppers!"
    },
    {
        label: 'Mobile Homes',
        icon: GiHouse,
        description: "These are Mobile Homes!"
    },
    {
        label: 'Modular Homes',
        icon: MdOutlineLandslide,
        description: "These are Modular Homes!"
    },
    {
        label: 'Eco-Friendly Homes',
        icon: TbToolsKitchen3,
        description: "These are Eco-Friendly Homes!"
    },
    {
        label: 'Gated Community Homes',
        icon: GiTreehouse,
        description: "These are Gated Community Homes!"
    },
    {
        label: 'Urban Lofts',
        icon: GiHouse,
        description: "These are Urban Lofts!"
    },
    {
        label: 'Rural Homes',
        icon: MdOutlineLandslide,
        description: "These are Rural Homes!"
    },
    {
        label: 'Senior Living Homes',
        icon: GiHouse,
        description: "These are Senior Living Homes!"
    },
    {
        label: 'Golf Course Homes',
        icon: MdOutlineLandslide,
        description: "These are Golf Course Homes!"
    },
    {
        label: 'Apartments',
        icon: TbToolsKitchen3,
        description: "These are Apartments!"
    },
    {
        label: 'Single-Family Rentals',
        icon: GiTreehouse,
        description: "These are Single-Family Rentals!"
    },
    {
        label: 'Townhome Rentals',
        icon: GiHouse,
        description: "These are Townhome Rentals!"
    },
    {
        label: 'Condo Rentals',
        icon: MdOutlineLandslide,
        description: "These are Condo Rentals!"
    },
    {
        label: 'Luxury Rentals',
        icon: TbToolsKitchen3,
        description: "These are Luxury Rentals!"
    },
    {
        label: 'Vacation Rentals',
        icon: GiTreehouse,
        description: "These are Vacation Rentals!"
    },
    {
        label: 'Short-Term Rentals',
        icon: GiHouse,
        description: "These are Short-Term Rentals!"
    },
    {
        label: 'Long-Term Rentals',
        icon: MdOutlineLandslide,
        description: "These are Long-Term Rentals!"
    },
    {
        label: 'Furnished Rentals',
        icon: TbToolsKitchen3,
        description: "These are Furnished Rentals!"
    },
    {
        label: 'Unfurnished Rentals',
        icon: GiTreehouse,
        description: "These are Unfurnished Rentals!"
    },
    {
        label: 'Student Housing',
        icon: GiHouse,
        description: "These are Student Housing!"
    },
    {
        label: 'Corporate Housing',
        icon: MdOutlineLandslide,
        description: "These are Corporate Housing!"
    },
    {
        label: 'Senior Housing',
        icon: TbToolsKitchen3,
        description: "These are Senior Housing!"
    },
    {
        label: 'Studio Apartments',
        icon: GiTreehouse,
        description: "These are Studio Apartments!"
    },
    {
        label: 'Pet-Friendly Rentals',
        icon: GiHouse,
        description: "These are Pet-Friendly Rentals!"
    },
    {
        label: 'Loft Rentals',
        icon: MdOutlineLandslide,
        description: "These are Loft Rentals!"
    },
    {
        label: 'Affordable Housing',
        icon: GiHouse,
        description: "These are Affordable Housing!"
    },
    {
        label: 'Gated Community Rentals',
        icon: MdOutlineLandslide,
        description: "These are Gated Community Rentals!"
    },
    {
        label: 'Co-Living Spaces',
        icon: MdOutlineLandslide,
        description: "These are Co-Living Spaces!"
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
        setStartIndex(Math.min(newStartIndex, properties.length - 9));
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
                {properties.slice(startIndex, startIndex + 9).map((item) => (
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
                        startIndex + 9 >= properties.length ? 'invisible' : ''
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