'use client'
import Container from "@/app/components/container/Container"
import MainItem from "./MainItem"
import { useRouter } from "next/navigation"
import { BiSolidCar } from "react-icons/bi";
import { IoMdBoat } from "react-icons/io";
import { FaPersonSkiingNordic } from "react-icons/fa6";
import { GiSpeedBoat } from "react-icons/gi";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import './search.css' 
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for styling
import AutocompleteInput from "@/app/components/forms/AutoCompleteInput";
import Link from "next/link";
import {FaChildren} from "react-icons/fa6";
import {IoIosPeople} from "react-icons/io";
import { PiBuildings } from "react-icons/pi";

const SearchMain = () => {
    const router = useRouter();
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const numberOfGuestsRef = useRef<HTMLInputElement>(null); 

    const [searchDestination, setSearchDestination] = useState({
        county: '',
        town: ''
    });

    const [options, setOptions] = useState({
        adults: 1,
        children: 0,
        rooms: 0
    });

    const [openOptions, setOpenOptions] = useState(false);

    useEffect(() => {
        console.log("CheckoutDate", checkoutDate);
        console.log("CheckinDate", checkinDate);
    }, [checkinDate, checkoutDate]);

    const toggleOptions = () => {
        setOpenOptions(!openOptions);
    };

    const handleOptions = (name: 'adults' | 'children' | 'rooms', operation: any) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setOpenOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (  
        <div className="shadow-md 2xl:w-[880px] xl:w-[880px] border-[1px] border-solid border-neutral-300 bg-white rounded-full py-2 px-4 flex justify-between items-center">
            <div className="flex flex-1 items-center text-center hover:rounded-full hover:cursor-pointer">
                <div className="flex flex-col w-full">
                    {/* <label htmlFor="search-destination" className="text-sm text-gray-500">Search Destination</label> */}
                    <div className="flex gap-2 items-center">
                        <AutocompleteInput id="search-destination" searchDestination={searchDestination} setSearchDestination={setSearchDestination} />
                    </div>
                </div>
            </div>
            <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-2"/>
            <div className="flex flex-1 items-center text-center hover:rounded-full hover:cursor-pointer">
                <div className="flex flex-col w-full">
                    <label htmlFor="checkin-date" className="text-sm text-gray-800">Check In</label>
                    <DatePicker id="checkin-date" autoComplete="off" selected={checkinDate} onChange={(date) => setCheckinDate(date)} placeholderText="Add date in" minDate={new Date()} className="w-full hover:cursor-pointer outline-none text-center rounded-bl-lg rounded-br-lg items-center"/>
                </div>
            </div>
            <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-2"/>
            <div className="flex flex-1 items-center text-center hover:rounded-full hover:cursor-pointer">
                <div className="flex flex-col w-full">
                    <label htmlFor="checkout-date" className="text-sm text-gray-800">Check Out</label>
                    <DatePicker id="checkout-date" selected={checkoutDate} onChange={(date) => setCheckoutDate(date)} minDate={new Date()} placeholderText="Add date out" autoComplete="off" className="w-full hover:cursor-pointer outline-none text-center rounded-bl-lg rounded-br-lg items-center"/>
                </div>
            </div>
            <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-2"></hr>
            <div className="flex flex-1 items-center text-center hover:rounded-full hover:cursor-pointer relative">
                <div className="flex flex-col w-full" ref={dropdownRef}>
                    {/* <label htmlFor="guests" className="text-sm text-gray-500">Guests</label> */}
                    <input
                        id="guests"
                        type="text"
                        value={options.adults > 1 || options.children > 0 || options.rooms > 0 ? `${options.adults} adults, ${options.children} children, ${options.rooms} rooms` : 'Add guests'}
                        className="w-full py-2 px-2 text-gray-500 leading-tight focus:outline-none focus:shadow-outline overflow-hidden text-ellipsis"
                        onClick={toggleOptions}
                        ref={inputRef}
                        readOnly
                    />
                    {openOptions && (
                        <div className="bg-white py-6 px-5 text-sm text-neutral-500 rounded-lg shadow-md absolute top-full left-0 z-10">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <span className="text-lg flex items-center pr-2"><span className="pr-2 text-neutral-500"><IoIosPeople size={ 24 } /> </span> <span>adults</span> </span>
                                    <div className="flex gap-2 items-center">
                                        <button
                                            className="border rounded-full py-1 px-3 focus:outline-none"
                                            onClick={() => handleOptions("adults", "d")}
                                            disabled={options.adults <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="text-xl">{options.adults}</span>
                                        <button
                                            className="border rounded-full py-1 px-3 focus:outline-none"
                                            onClick={() => handleOptions("adults", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="py-4 text-neutral-500">
                                    <hr />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-lg flex items-center pr-2"><span className="pr-2 text-neutral-500"><FaChildren size={ 24 } /> </span> <span>children</span> </span>
                                    <div className="flex gap-2 items-center">
                                        <button
                                            className="border rounded-full py-1 px-3 focus:outline-none"
                                            onClick={() => handleOptions("children", "d")}
                                            disabled={options.children <= 0}
                                        >
                                            -
                                        </button>
                                        <span className="text-xl">{options.children}</span>
                                        <button
                                            className="border rounded-full py-1 px-3 focus:outline-none"
                                            onClick={() => handleOptions("children", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="py-4 text-neutral-500">
                                    <hr />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-lg flex items-center pr-2"><span className="pr-2 text-neutral-500"><PiBuildings size={ 24 } /> </span> <span>rooms</span> </span>
                                    <div className="flex gap-2 items-center">
                                        <button
                                            className="border rounded-full py-1 px-3 focus:outline-none"
                                            onClick={() => handleOptions("rooms", "d")}
                                            disabled={options.rooms <= 0}
                                        >
                                            -
                                        </button>
                                        <span className="text-xl">{options.rooms}</span>
                                        <button
                                            className="border rounded-full py-1 px-3 focus:outline-none"
                                            onClick={() => handleOptions("rooms", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="px-4 items-center text-center">
                <Link href={{
                    pathname: '/stay',
                    query: {
                        destination: searchDestination.town,
                        county: searchDestination.county,
                        adults: options.adults,
                        children: options.children,
                        rooms: options.rooms,
                        checkinDate: checkinDate ? checkinDate.toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }) : '',
                        checkoutDate: checkoutDate ? checkoutDate.toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }) : '',
                    }
                }}>
                    <button className="bg-neutral-500 p-[8px] rounded-full"><span className="text-white"><IoSearch size={22} /></span></button>
                </Link>
            </div>
        </div>
    );
}

export default SearchMain;