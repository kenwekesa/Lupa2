'use client'

import Container from "../container/Container"
import {FaSkiing} from "react-icons/fa"
import CategoryBox from "../container/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { PiTrainRegionalLight, PiPersonSimpleWalkBold, PiCampfireDuotone, PiRoadHorizonThin } from "react-icons/pi";
import { FaRoad } from "react-icons/fa";
import { GiRoad, GiElephant, GiLion, GiSpeedBoat, GiWorld } from "react-icons/gi";
import { MdDownhillSkiing, MdOutlineDirectionsBoatFilled, MdOutlineEmojiNature } from "react-icons/md";
import { FaPersonSkiing, FaPersonCircleCheck } from "react-icons/fa6";
import { SiExpo } from "react-icons/si";
import { FaHippo } from "react-icons/fa6";
import { GiFamilyTree } from "react-icons/gi";
import { GiIsland } from "react-icons/gi";
import { FaHouseTsunami } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { MdEditRoad } from "react-icons/md";
import { SiBroadcom } from "react-icons/si";
import { GiMountainRoad } from "react-icons/gi";
import { GiLovers } from "react-icons/gi";
import { GiHiking } from "react-icons/gi";

export const tours = [
    {
        label: 'Regional',
        icon: PiTrainRegionalLight,
        description: "This a regional tour!"
    },
    {
        label: 'Country Roads',
        icon: FaRoad,
        description: "This a country road tour!"
    },
    {
        label: 'Local Escape',
        icon: GiRoad,
        description: "This a local escape tour!"
    },
    {
        label: 'Easy Pace',
        icon: PiPersonSimpleWalkBold,
        description: "This tour is for elderly people!"
    },
    {
        label: 'Discovery',
        icon: MdDownhillSkiing,
        description: "This tour is for discovery journey!"
    },
    {
        label: 'Camping',
        icon: PiCampfireDuotone,
        description: "This is a camping tour!"
    },
    {
        label: 'Hiking',
        icon: GiHiking,
        description: "This is a hiking tour!"
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: "This is a skiing tour!"
    },
    {
        label: 'Wildlife',
        icon: GiLion,
        description: "This is a wildlife tour!"
    },
    {
        label: 'Game Park',
        icon: GiElephant,
        description: "This is a game park tour!"
    },
    {
        label: 'Yatch',
        icon: GiSpeedBoat,
        description: "This is an ocean yatch tour!"
    },
    {
        label: 'Ocean Cruise',
        icon: MdOutlineDirectionsBoatFilled,
        description: "This is an ocean cruise tour"
    },
    {
        label: 'Solo tours',
        icon: FaPersonCircleCheck,
        description: "This is a solo tour!"
    },
    {
        label: 'Intercontinental',
        icon: GiWorld,
        description: "This is an intercontinental tour!"
    }, 
    {
        label: 'Adventure',
        icon: MdOutlineEmojiNature,
        description: "This is an adventerous tour!"
    }, 
    {
        label: 'Multi-Day tour',
        icon: PiRoadHorizonThin,
        description: "This is a multi-day tour!"
    }, 
    {
        label: 'Expos',
        icon: SiExpo,
        description: "This is an expo tour!"
    }, 
    {
        label: 'Game drive',
        icon: FaHippo,
        description: "This is a game drive tour!"
    }, 
    {
        label: 'Vocation',
        icon: GiFamilyTree,
        description: "This is a vocation tour!"
    }, 
    {
        label: 'Baecation',
        icon: GiIsland,
        description: "This is a baecation tour!"
    }, 
    {
        label: 'Staycation',
        icon: FaHouseTsunami,
        description: "This is a staycation tour!"
    }, 
    {
        label: 'Family vacay',
        icon: MdOutlineFamilyRestroom,
        description: "This is a family vacay tour!"
    }, 
    {
        label: 'Road Trip',
        icon: MdEditRoad,
        description: "This is a road trip tour!"
    }, 
    {
        label: 'Couple vacay',
        icon: GiLovers,
        description: "This is a couple vacay tour!"
    }, 
    {
        label: 'Excursions',
        icon: GiMountainRoad,
        description: "This is a excursions tour!"
    }
]

const ToursCategories = () => {

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
        setStartIndex(Math.min(newStartIndex, tours.length - 9));
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
                {tours.slice(startIndex, startIndex + 9).map((item) => (
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
                        startIndex + 9 >= tours.length ? 'invisible' : ''
                        }`}
                //   style={{ marginRight: '-10px' }}
                >
                <IoArrowForwardCircleOutline size={24} />
                </button>
            </div>
        </Container>
  )
}

export default ToursCategories