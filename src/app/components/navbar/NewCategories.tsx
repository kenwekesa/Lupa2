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
import { SiGooglenews } from "react-icons/si";
import { LiaBlogSolid } from "react-icons/lia";
import { RiGalleryLine } from "react-icons/ri";

export const news = [
    {
        label: 'news',
        icon: SiGooglenews,
        description: "These are news events!"
    },
    {
        label: 'blogs',
        icon: LiaBlogSolid,
        description: "These are blogs events!"
    },
    {
        label: 'gallery',
        icon: RiGalleryLine,
        description: "These are memorable events!"
    }
]

const NewCategories = () => {

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
        setStartIndex(Math.min(newStartIndex, news.length - 9));
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
                {news.slice(startIndex, startIndex + 9).map((item) => (
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
                        startIndex + 9 >= news.length ? 'invisible' : ''
                        }`}
                //   style={{ marginRight: '-10px' }}
                >
                <IoArrowForwardCircleOutline size={24} />
                </button>
            </div>
        </Container>
  )
}

export default NewCategories