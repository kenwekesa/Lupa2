'use client'

import Container from "../container/Container"
import { IoDiamond } from "react-icons/io5";
import {BsSnow} from "react-icons/bs"
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp, GiCaveEntrance, GiCactus, GiBarn } from "react-icons/gi";
import {FaSkiing} from "react-icons/fa"
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../container/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { FaGem } from "react-icons/fa";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { TbBuildingCottage } from "react-icons/tb";


export const categories = [
    {
        label: 'Hotel',
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label: 'Hostel',
        icon: GiWindmill,
        description: "This property is has windmill!"
    },
    {
        label: 'Bed and Breakfast',
        icon: MdOutlineVilla,
        description: "This property is modern!"
    },
    {
        label: 'Inn',
        icon: TbMountain,
        description: "This property is in the countryside!"
    },
    {
        label: 'Motel',
        icon: MdOutlineHolidayVillage,
        description: "This property is Villas!"
    },
    {
        label: 'Resort',
        icon: TbPool,
        description: "This property has a pool!"
    },
    {
        label: 'Villa',
        icon: FaGem,
        description: "This property is a type of Hidden gems!"
    },
    {
        label: 'Cottage',
        icon: GiIsland,
        description: "This property is on an Island!"
    },
    {
        label: 'Cabin',
        icon: TbBuildingCottage,
        description: "This property is a Cottages!"
    },
    {
        label: 'Apartment',
        icon: GiBoatFishing,
        description: "This property is close to a lake!"
    },
    {
        label: 'Condominium',
        icon: FaSkiing,
        description: "This property has skiing activities!"
    },
    {
        label: 'Vacation Rental',
        icon: GiCastle,
        description: "This property is in a castle!"
    },
    {
        label: 'Boutique Hotel',
        icon: GiForestCamp,
        description: "This property has camping activities!"
    },
    {
        label: 'Guesthouse',
        icon: BsSnow,
        description: "This property has camping activities!"
    },
    {
        label: 'Homestay',
        icon: GiCaveEntrance,
        description: "This property is in a cave!"
    },
    {
        label: 'Eco-lodge',
        icon: GiCactus,
        description: "This property is in the desert!"
    },
    {
        label: 'Houseboat',
        icon: GiBarn,
        description: "This property is in the barn!"
    }, 
    {
        label: 'Farmstay',
        icon: IoDiamond,
        description: "This property is in the luxurious!"
    },
     {
        label: 'Ryokan',
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label: 'Treehouse',
        icon: GiWindmill,
        description: "This property is has windmill!"
    },
    {
        label: 'Glamping',
        icon: MdOutlineVilla,
        description: "This property is modern!"
    },
    {
        label: 'Tiny House',
        icon: TbMountain,
        description: "This property is in the countryside!"
    },
    {
        label: 'Yurt',
        icon: MdOutlineHolidayVillage,
        description: "This property is Villas!"
    },
    {
        label: 'Castle',
        icon: TbPool,
        description: "This property has a pool!"
    },
    {
        label: 'Chalet',
        icon: FaGem,
        description: "This property is a type of Hidden gems!"
    },
    {
        label: 'Beach House',
        icon: GiIsland,
        description: "This property is on an Island!"
    },
    {
        label: 'Ranch',
        icon: TbBuildingCottage,
        description: "This property is a Cottages!"
    },
    {
        label: 'Safari Lodge',
        icon: GiBoatFishing,
        description: "This property is close to a lake!"
    },
    {
        label: 'House Swap',
        icon: FaSkiing,
        description: "This property has skiing activities!"
    },
    {
        label: 'Pension',
        icon: GiCastle,
        description: "This property is in a castle!"
    }
]

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const [startIndex, setStartIndex] = useState(0);

    const isHotelPage = pathname === '/hotels';

    // if (!isHotelPage) {
    //     return null;
    // }

    // Function to handle scrolling to the next set of categories
    const handleNextClick = () => {
        const newStartIndex = startIndex + 9;
        setStartIndex(Math.min(newStartIndex, categories.length - 9));
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
                {categories.slice(startIndex, startIndex + 9).map((item) => (
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
                        startIndex + 9 >= categories.length ? 'invisible' : ''
                        }`}
                //   style={{ marginRight: '-10px' }}
                >
                <IoArrowForwardCircleOutline size={24} />
                </button>
            </div>
        </Container>
  )
}

export default Categories