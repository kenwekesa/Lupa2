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
import { useState } from "react";
import Link from "next/link";
import AutocompleteInput from "@/app/components/forms/AutoCompleteInput";


const SearchMain = () => {
    const router = useRouter();
    const[searchDestination, setSearchDestination]=useState('')

    // function handleDestinationSearch(): void {

    //     router.push(`/destination?destination=${searchDestination}`); 
    // }

  return (
      <Container>
        <div className="bg-white shadow-sm rounded-2xl z-20 pb-6">
          <div className="justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-12 py-8 px-9 shadow-sm">
              <div className="main-item-border">
                  <MainItem onClick={() => router.push('/alldiscoveryjourney')} icon={GiSpeedBoat} label="Discoveries" />
              </div>
               <div className="main-item-border">
                  <MainItem onClick={() => router.push('/alloceancruises')} icon={IoMdBoat} label="Ocean Cruises" />
              </div> 
               <div className="main-item-border">
                  <MainItem onClick={() => router.push('/allregionaljourney')} icon={FaPersonSkiingNordic} label="Regional" />
              </div>
               <div className="main-item-border">
                  <MainItem onClick={() => router.push('/allcountryroads')} icon={BiSolidCar} label="Country Roads" />
              </div>
              <div className="main-item-border">
                  <MainItem onClick={() => router.push('/alldestinations')} icon={TfiMoreAlt} label="More" />
              </div>
              </div>
            <div className="main-item-border-r flex flex-row items-center justify-between mb-8">
                <div className="flex flex-auto gap-4 items-center">
                  <IoSearchOutline size={24} className="flex-none" />
                      {/* <input
                          placeholder="Place to go ?"
                          type="text"
                          className="outline-none flex-auto"
                          onChange={(e)=>setSearchDestination(e.target.value)} 
                      />  */}
                      <AutocompleteInput searchDestination={searchDestination} setSearchDestination={setSearchDestination} />
                </div>
                <div className="flex-none">
                    {/* <button className="btn-main-page" onClick={handleDestinationSearch}>Search</button>  */}
                    {/* <Link href={`/destination?tourParams=${{searchParams: JSON.stringify({searchDestionation: searchDestination})}}`}>
                         <button className="btn-main-page">Search</button>
                    </Link>  */}

                    <Link href={{ pathname: '/destination', query: { destination: searchDestination } }}>
                    <button className="btn-main-page">Search</button>

                    </Link>


                </div>
            </div>
          </div>    
    </Container>
  )
}

export default SearchMain