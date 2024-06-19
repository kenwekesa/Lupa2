'use client';
import Link from "next/link";
import getCurrentUser from "../actions/getCurrentUsers";
import getTours, { IToursParams } from "../actions/getTours";
import Container from "../components/container/Container"; 
import EmptyState from "../components/container/EmptyState";
import TourMainCard from "../components/listing/TourMainCard";
import Continents from "./components/Continents";
import Sort from "./components/Sort";
import TourStyles from "./components/TourStyles";
import TourOperators from "./components/TourOperators";
import TourSize from "./components/TourSize";
import SearchMain from "../mainpage/components/SearchMain";
import OfferMainCard from "../components/listing/OfferMainCard";
import getOffers, { OffersParams } from "../actions/getOffers";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the interface for component props
interface IParams {
  tourId?: string;
  tourParams: IToursParams;
  offerParams: OffersParams;
}

export default function AllDestinationsPage({ tourParams, offerParams }: IParams) {
  const [maximumPrice, setMaximumPrice] = useState<number>(0);
  const [offers, setOffers] = useState([]);
  const [visibleOffers, setVisibleOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>('popularity');
  const PAGE_SIZE = 15;

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const listingsResponse = await axios.get('/api/offers');
        const listingsData = listingsResponse.data;
        setOffers(listingsData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchOffers();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginatedOffers = offers.slice(startIndex, startIndex + PAGE_SIZE);
    setVisibleOffers(paginatedOffers);
  }, [offers, currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page whenever sorting option changes
  }, [sortOption]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const sortedOffers = [...offers]
      .sort((a, b) => {
        if (sortOption === 'priceLowestFirst') {
          return a.price - b.price;
        } else if (sortOption === 'priceHighestFirst') {
          return b.price - a.price;
        }
        return 0; // No sorting if sortOption is invalid
      })
      .slice(startIndex, startIndex + PAGE_SIZE);
    
    setVisibleOffers(sortedOffers);
  }, [offers, sortOption, currentPage]);

  const totalPages = Math.ceil(offers.length / PAGE_SIZE);

  return (
    <div>
      <div className="offers-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="alldestinations-white-main">
          Premium offers <span className="color-span-green"></span>
        </h1>
      </div>
      <Container>
        <div className="Search-main-page w-full flex justify-center items-center text-center rounded-full">
          <SearchMain />
        </div>
      </Container>
      <Container>
        <div className="py-3">
          <hr />
        </div>
      </Container>
      <Container>
        <div className="flex flex-row justify-between items-center py-3">
          <div className="flex font-bold flex-row gap-40 items-center">
            <div className="rounded-2xl items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
              <p className="">Filter By:</p>
            </div>
            <div className="font-semibold text-xl">{offers.length} Offers Available</div>
          </div>
          <div>
            <Sort products={offers} sortOption={sortOption} setSortOption={setSortOption} />
          </div>
        </div>
      </Container>
      <Container>
        <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          <div className="col-span-1 flex flex-col gap-6 all-destination-products">
            {/* <Continents products={offers} setMaximumPrice={setMaximumPrice} />  */}
            <TourStyles products={offers} />
            <TourOperators products={offers} />
          </div>
          {visibleOffers.length === 0 ? <EmptyState showReset /> :
          <div className="col-span-4 all-destination-tour-main-card">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
              {visibleOffers.map((tour: any) => (
                <OfferMainCard
                  key={tour.id}
                  data={tour}
                />
              ))}
            </div>
            <div className="flex justify-center items-center mt-4">
              {currentPage > 1 && (
                <Link href={`/alldestinations?page=${currentPage - 1}`}>
                  <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
                </Link>
              )}
              {Array.from({ length: totalPages }).map((_, index) => (
                <Link key={index} href={`/alldestinations?page={index + 1}`}>
                  <p className={`mx-2 p-2 ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"}`}>
                    {index + 1}
                  </p>
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link href={`/alldestinations?page=${currentPage + 1}`}>
                  <p className="mx-2 p-2 bg-gray-500 text-white">Next</p>
                </Link>
              )}
            </div>
          </div>
          }
        </div>
      </Container>
    </div>
  );
}


//----------------------------------------------------------------------------------------------
// 'use client'
// import Link from "next/link";
// import getCurrentUser from "../actions/getCurrentUsers";
// import getTours, { IToursParams } from "../actions/getTours";
// import Container from "../components/container/Container"; 
// import EmptyState from "../components/container/EmptyState";
// import TourMainCard from "../components/listing/TourMainCard";
// import Contients from "./components/Continents";
// import Sort from "./components/Sort";
// import TourStyles from "./components/TourStyles";

// import TourOperators from "./components/TourOperators";
// import TourSize from "./components/TourSize";
// // import { Metadata } from "next";
// import SearchMain from "../mainpage/components/SearchMain";
// import OfferMainCard from "../components/listing/OfferMainCard";
// import getOffers, { OffersParams } from "../actions/getOffers";
// import { useEffect, useState } from "react";
// import axios from "axios";

// // Define the interface for component props
// interface IParams {
//   tourId?: string;
//   tourParams: IToursParams;
//   offerParams: OffersParams;
// }

// // export const metadata: Metadata =  {
// //   title: "All Destinations",
// // }
// // Define the AllDestinationsPage component as a server component
// export default function AllDestinationsPage({ tourParams, offerParams }: IParams) {
//   // Fetch data inside the render function (server component behavior)
//   const [maximumPrice, setMaximumPrice] = useState<number>(0);
//   const [offers, setOffers] = useState([])
//   const [visibleOffers, setVisibleOffers] = useState([])
//   const [currentPage, setCurrentPage] = useState(1);

//   const [sortOption, setSortOption] = useState<string>('popularity');

//     const PAGE_SIZE = 15;
//      const startIndex = (currentPage - 1) * PAGE_SIZE;
//      useEffect(() => {
//       const handleSearch = async () => {
//         try {
//           console.log("Searching....");
  
//           // Fetch listings data
//           const listingsResponse = await axios.get('/api/offers');
  
//           // Handle listings data
//           if (!listingsResponse) {
//             throw new Error('Failed to fetch listings data');
//           }
//           const listingsData = listingsResponse.data;
  
//           console.log("Listing response", listingsResponse);
//           console.log("Listing data", listingsData);
//           setOffers(listingsData);
//         } catch (error) {
//           console.error("Error fetching data", error);
//         }
//       };
  
//       handleSearch();
//     }, []);
  
//     useEffect(() => {
//       const startIndex = (currentPage - 1) * PAGE_SIZE;
 
//       const paginatedOffers = offers.slice(startIndex, startIndex + PAGE_SIZE);
//       console.log("Visible Offers", paginatedOffers);
//       setVisibleOffers(paginatedOffers);
//     }, [ offers, currentPage]);


//   const GetToursAndRender = async () => {
//     //const tours = await getTours(tourParams);
//    // const currentUser = await getCurrentUser();
    
   
   

 
//     const PAGE_SIZE = 15;
//     const currentPage = 1;
//     const startIndex = (currentPage - 1) * PAGE_SIZE;
//    // const visibleTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(startIndex, startIndex + PAGE_SIZE);
   

//     useEffect(() => {
//       setCurrentPage(1);// Reset to the first page whenever sorting option changes
//     }, [sortOption]);
  
//     const sortedTours = [...offers]
//       .filter(tour => 0 < tour.guestCount)
//       .sort((a, b) => {
//         if (sortOption === 'priceLowestFirst') {
//           return a.price - b.price;
//         } else if (sortOption === 'priceHighestFirst') {
//           return b.price - a.price;
//         }
//         return 0; // No sorting if sortOption is invalid
//       });
  
//     setVisibleOffers(sortedTours.slice(startIndex, startIndex + PAGE_SIZE));

//     const products: any = [];



//     // Check if there are no listings, display EmptyState component
//     // if (visibleOffers.length === 0) {
//     //   return <EmptyState showReset />;
//     // }

//     const totalPages = Math.ceil(offers.length / PAGE_SIZE);

//     return (
//       <div>
//         <div className="offers-main flex flex-col items-center justify-center text-lg font-bold">
//           <h1 className="alldestinations-white-main">
//             Premium offers <span className="color-span-green"></span>
//           </h1>
//         </div>
//         <Container>
//       <div className="Search-main-page w-full flex justify-center items-center text-center rounded-full">
//         <SearchMain />
//       </div>
//       </Container>
//         {/* <Container>
//           <p className="text-neutral-600 leading-8 pt-10 pb-2 text-md">Embark on unparalleled travel experiences with our prime tour selection. Curated by experts, these journeys transport you to sought-after destinations. From African safaris to cruising the Galápagos Islands, immerse yourself in luxurious adventures filled with natural beauty, wildlife, and historic treasures. Explore the Grand Canyon and beyond on helicopter tours, redefining your travel expectations.</p>
//         </Container> */}
//         <Container>
//           <div className="py-3">
//             <hr />
//           </div>
//         </Container>
//         <Container>
//           <div className="flex flex-row justify-between items-center py-3">
//             <div className="flex font-bold flex-row gap-40 items-center">
//               <div className="rounded-2xl items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
//                 <p className="">Filter By:</p>
//               </div>
//               <div className="font-semibold text-xl">{offers.length} Offers Available</div>
//             </div>
//             <div>
//             <Sort products={products} sortOption ={sortOption} setSortOption={setSortOption}/>
//             </div>
//           </div>
//         </Container>
//         <Container>
//           <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//             <div className="col-span-1 flex flex-col gap-6 all-destination-products">
//             <Contients products={products} setMaximumPrice={setMaximumPrice}/> 
//               <TourStyles products={products} />
//               <TourOperators products={products} />
//               {/* <TourSize products={products}/> */}
//             </div>
//             {visibleOffers.length === 0? <EmptyState showReset /> :
//             <div className="col-span-4 all-destination-tour-main-card">
//               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
//                 {/* Map through the visible listings array and render ListingCard components */}
//                 {visibleOffers.map((tour: any) => (
//                   <OfferMainCard
                    
//                     key={tour.id} // Use the listing ID as the unique key
//                     data={tour} // Pass the listing data to each ListingCard
//                   />
//                 ))}
//               </div>
//               {/* Pagination */}
//               <div className="flex justify-center items-center mt-4">
//                 {currentPage > 1 && (
//                   <Link href={`/alldestinations?page=${currentPage - 1}`}>
//                     <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
//                   </Link>
//                 )}
//                 {Array.from({ length: totalPages }).map((_, index) => (
//                   <Link key={index} href={`/alldestinations?page=${index + 1}`}>
//                     <p className={`mx-2 p-2 ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"}`}>
//                       {index + 1}
//                     </p>
//                   </Link>
//                 ))}
//                 {currentPage < totalPages && (
//                   <Link href={`/alldestinations?page=${currentPage + 1}`}>
//                     <p className="mx-2 p-2 bg-gray-500 text-white">Next</p>
//                   </Link>
//                 )}
//               </div>
//             </div>
//   }
//           </div>
//         </Container>
//       </div>
//     );
//   };

//   // Return the result of the render function
//   return GetToursAndRender();
// }


//-----------------------------------------------------------------------------------------------------------------------------------------



















// import React from "react";
// import { Metadata } from "next";
// import Container from "../components/container/Container";
// import SearchMain from "../mainpage/components/SearchMain";
// import Sort from "./components/Sort";
// import Contients from "./components/Continents";
// import TourStyles from "./components/TourStyles";
// import TourOperators from "./components/TourOperators";
// import TourComponent from "./TourComponent";
// import { IToursParams } from "../actions/getTours";

// interface IParams {
//   tourId?: string;
//   tourParams: IToursParams;
// }

// export const metadata: Metadata = {
//   title: "All Destinations",
// };

// export default function AllDestinationsPage({ tourParams }: IParams) {
//   const products: any = [];

//   return (
//     <div>
//       <div className="offers-main flex flex-col items-center justify-center text-lg font-bold">
//         <h1 className="alldestinations-white-main">
//           Premium offers <span className="color-span-green"></span>
//         </h1>
//       </div>
//       <Container>
//         <div className="Search-main-page w-full flex justify-center items-center text-center rounded-full">
//           <SearchMain />
//         </div>
//       </Container>
//       <Container>
//         <div className="py-3">
//           <hr />
//         </div>
//       </Container>
//       <Container>
//         <div className="flex flex-row justify-between items-center py-3">
//           <div className="flex font-bold flex-row gap-40 items-center">
//             <div className="rounded-2xl items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
//               <p className="">Filter By:</p>
//             </div>
//             <div className="font-semibold text-xl">Offers Available</div>
//           </div>
//           <div>
//             <Sort products={products} />
//           </div>
//         </div>
//       </Container>
//       <Container>
//         <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//           <div className="col-span-1 flex flex-col gap-6 all-destination-products">
//             <Contients products={products} />
//             <TourStyles products={products} />
//             <TourOperators products={products} />
//           </div>
//           <div className="col-span-4 all-destination-tour-main-card">
//             <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
//               <TourComponent tourParams={tourParams} />
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }


//-----------------------------------------------------------------------------------------------------------------------

// "use client"; // Add this line at the very top

// import Link from "next/link";
// import getCurrentUser from "../actions/getCurrentUsers";
// import getTours, { IToursParams } from "../actions/getTours";
// import Container from "../components/container/Container"; 
// import EmptyState from "../components/container/EmptyState";
// import TourMainCard from "../components/listing/TourMainCard";
// import Contients from "./components/Continents";
// import Sort from "./components/Sort";
// import TourStyles from "./components/TourStyles";
// import TourOperators from "./components/TourOperators";
// import TourSize from "./components/TourSize";
// import { Metadata } from "next";
// import SearchMain from "../mainpage/components/SearchMain";
// import OfferMainCard from "../components/listing/OfferMainCard";
// import getOffers, { OffersParams } from "../actions/getOffers";
// import { useState, useEffect } from "react"; // Make sure to import useEffect if needed

// // Define the interface for component props
// interface IParams {
//   tourId?: string;
//   tourParams: IToursParams;
//   offerParams: OffersParams;
// }

// // export const metadata: Metadata = {
// //   title: "All Destinations",
// // };

// // Define the AllDestinationsPage component as a client component
// export default function AllDestinationsPage({ tourParams, offerParams }: IParams) {
//   const [maximumPrice, setMaximumPrice] = useState<number>(1000);
//   const [tours, setTours] = useState([]);
//   const [offers, setOffers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const fetchedTours = await getTours(tourParams);
//       const fetchedCurrentUser = await getCurrentUser();
//       const fetchedOffers = await getOffers(offerParams);
//       setTours(fetchedTours);
//       setCurrentUser(fetchedCurrentUser);
//       setOffers(fetchedOffers);
//     };
//     fetchData();
//   }, [tourParams, offerParams]);

//   const PAGE_SIZE = 15;
//   const currentPage = 1;
//   const startIndex = (currentPage - 1) * PAGE_SIZE;
//   const visibleTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(startIndex, startIndex + PAGE_SIZE);
//   const visibleOffers = offers.filter(offer => offer.tourists.length < offer.guestCount).slice(startIndex, startIndex + PAGE_SIZE);

//   const products: any = [];

//   // Check if there are no listings, display EmptyState component
//   if (visibleTours.length === 0) {
//     return <EmptyState showReset />;
//   }

//   const totalPages = Math.ceil(offers.length / PAGE_SIZE);

//   return (
//     <div>
//       <div className="offers-main flex flex-col items-center justify-center text-lg font-bold">
//         <h1 className="alldestinations-white-main">
//           Premium offers <span className="color-span-green"></span>
//         </h1>
//       </div>
//       <Container>
//         <div className="Search-main-page w-full flex justify-center items-center text-center rounded-full">
//           <SearchMain />
//         </div>
//       </Container>
//       <Container>
//         <div className="py-3">
//           <hr />
//         </div>
//       </Container>
//       <Container>
//         <div className="flex flex-row justify-between items-center py-3">
//           <div className="flex font-bold flex-row gap-40 items-center">
//             <div className="rounded-2xl items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
//               <p className="">Filter By:</p>
//             </div>
//             <div className="font-semibold text-xl">{offers.length} Offers Available</div>
//           </div>
//           <div>
//             <Sort products={products} />
//           </div>
//         </div>
//       </Container>
//       <Container>
//         <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//           <div className="col-span-1 flex flex-col gap-6 all-destination-products">
//             <Contients products={products} />
//             <TourStyles products={products} />
//             <TourOperators products={products} />
//           </div>
//           <div className="col-span-4 all-destination-tour-main-card">
//             <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
//               {visibleOffers.map((tour: any) => (
//                 <OfferMainCard
//                   currentUser={currentUser ? {
//                     ...currentUser,
//                     createdAt: currentUser.createdAt.toISOString(),
//                     updatedAt: currentUser.updatedAt.toISOString(),
//                     emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
//                   } : null}
//                   key={tour.id}
//                   data={tour}
//                 />
//               ))}
//             </div>
//             <div className="flex justify-center items-center mt-4">
//               {currentPage > 1 && (
//                 <Link href={`/alldestinations?page=${currentPage - 1}`}>
//                   <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
//                 </Link>
//               )}
//               {Array.from({ length: totalPages }).map((_, index) => (
//                 <Link key={index} href={`/alldestinations?page={index + 1}`}>
//                   <p className={`mx-2 p-2 ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"}`}>
//                     {index + 1}
//                   </p>
//                 </Link>
//               ))}
//               {currentPage < totalPages && (
//                 <Link href={`/alldestinations?page={currentPage + 1}`}>
//                   <p className="mx-2 p-2 bg-gray-500 text-white">Next</p>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }
