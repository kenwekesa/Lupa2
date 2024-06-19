'use client'
import Link from "next/link";
import getCurrentUser from "../actions/getCurrentUsers";
import getTours, { IToursParams } from "../actions/getTours";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import TourMainCard from "../components/listing/TourMainCard";
import Contients from "./components/Continents";
import Sort from "./components/Sort";
import TourStyles from "./components/TourStyles";
import TourOperators from "./components/TourOperators";
import TourSize from "./components/TourSize";

import { usePathname, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import axios from "axios";
import { SafeUser } from "../types";


// Define the interface for component props
interface IParams { 
  tourId?: string;
  tourParams: IToursParams;
}

interface SearchParams { 
  searchParams:{
  destination:string,
  checkinDate:string,
  checkoutDate:string,
  county:string,
  children:number,
  adults:number,
  rooms:number
  }
}

interface Stay {
  county: string;
 town : string;
  // Add other properties as needed
}
 


// Define the AllDestinationsPage component as a server component
export default function DestinationFilterPage({ searchParams }:SearchParams) {



  //const [destination, setDestination] = useState({})
  const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState<SafeUser | null>(null)
    const [city, setCity] = useState(searchParams.destination)
    const [county, setCounty] = useState(searchParams.county)

    const [checkinDate, setCheckinDate] = useState(searchParams.checkinDate) 
    const [checkoutDate, setCheckoutDate] = useState(searchParams.checkoutDate) 
    const [options, setOptions] = useState({rooms:searchParams.rooms, adults:searchParams.adults, children:searchParams.children})
    // const [continent, set] = useState(searchParams.continent) 
    const [tours, setTours] = useState([])
    const [sortOption, setSortOption] = useState<string>('popularity');
    const [currentPage, setCurrentPage] = useState(1);

    const [cityCountry, setCityCountry] = useState<string[]>([]);
    const [counties, setCounties] = useState<string[]>([])



  console.log("Checkout from  page", checkoutDate)
  console.log("Checkin from  page", checkinDate)
  
 

  useEffect(() => {
    // Fetch the tours data
    axios
    .get<Stay[]>('/api/stays')
    .then((response) => {
      
      const listings = response.data;
      const uniqueCityCounties = Array.from(
        new Map(listings.map(listing => [`${listing.town}-${listing.county}`, listing])).values()
      );
      const uniqueCounties = [...new Set(listings.map((listing) => listing.county))];

      setCounties(uniqueCounties) 
      console.log("UniqueCityCojntries----]]", uniqueCityCounties)
      //setCountries(uniqueCounties);
    })
    .catch((error) => console.error(error));
    // getTours({})
    //   .then((tours) => {
    //     // Extract the unique countries from the tours data
    //     const uniqueCountries = [...new Set(tours.map((tour) => tour.country))].filter((country): country is string => country !== null);
    //     setCountries(uniqueCountries);
    //     console.log('Unique Countries', uniqueCountries)
    //   })
    //   .catch((error) => console.error(error));
  }, []);



  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Searching....");

        // Fetch listings and user data concurrently
        const [listingsResponse,
          //  userResponse
          ] = await Promise.all([
          axios.get(`/api/stays?checkinDate=${checkinDate}
            &checkoutDate=${checkoutDate}
            &city=${city}&county=${county}&adults=${options.adults}
            &children=${options.children}&rooms=${options.rooms}`),
          // axios.get(`/api/user`)
        ]);

        // Handle listings data
        if (!listingsResponse) {
          throw new Error('Failed to fetch listings data');
        }
        const listingsData = listingsResponse.data;

        console.log("listing response", listingsResponse)
        console.log("listingData", listingsData)
        setTours(listingsData);

        // // Handle user data
        // if (!userResponse) {
        //   throw new Error('Failed to fetch user data');
        // }
        // const userData = userResponse.data;
        // setCurrentUser(userData);

   
      } catch (error) {
        //setError(error.message);
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [county, checkinDate, checkoutDate]);
  
  //console.log('destination', destination)

  const GetToursAndRender = async () => {
   //const tours = await getTours(tour_Params);
    //const currentUser = await getCurrentUser();

    console.log("Tours----->", tours)

    const PAGE_SIZE = 15;
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    useEffect(() => {
      setCurrentPage(1);// Reset to the first page whenever sorting option changes
    }, [sortOption]);
  
    const sortedTours = [...tours]
      .filter(tour => 0 < tour.guestCount)
      .sort((a, b) => {
        if (sortOption === 'priceLowestFirst') {
          return a.price - b.price;
        } else if (sortOption === 'priceHighestFirst') {
          return b.price - a.price;
        }
        return 0; // No sorting if sortOption is invalid
      });
  
    const visibleTours = sortedTours.slice(startIndex, startIndex + PAGE_SIZE);
  
   // const visibleTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(startIndex, startIndex + PAGE_SIZE);

    const products: any = [];

    // Check if there are no listings, display EmptyState component
    if (visibleTours?.length === 0) {
      return <EmptyState showReset />;
    }

    const totalPages = Math.ceil(tours?.length / PAGE_SIZE);

    return (
      <div>
        <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
          <h1 className="alldestinations-white-main">
            All Prime <span className="color-span-green">Tour Destinations</span>
          </h1>
        </div>
        <Container>
          <p className="text-neutral-600 leading-8 pt-10 pb-2 text-md">Embark on unparalleled travel experiences with our prime tour selection. Curated by experts, these journeys transport you to sought-after destinations. From African safaris to cruising the Galápagos Islands, immerse yourself in luxurious adventures filled with natural beauty, wildlife, and historic treasures. Explore the Grand Canyon and beyond on helicopter tours, redefining your travel expectations.</p>
        </Container>
        <Container>
          <div className="py-3">
            <hr />
          </div>
        </Container>
        <Container>
          <div className="flex flex-row justify-between items-center py-3">
            <div className="flex font-bold flex-row gap-40 items-center">
              <div className="filter-bg-color rounded-2xl items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
                <p className="">Filter Results</p>
              </div>
              <div className="font-semibold text-xl">{visibleTours?.length} Tours</div>
            </div>
            <div>
              <Sort products={products} sortOption={sortOption} setSortOption={setSortOption}/>
            </div>
          </div>
        </Container>
        <Container>
          <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            <div className="col-span-1 flex flex-col gap-6 all-destination-products">
              <Contients products={products} country={county} setCounty={setCounty} setCity={setCity} counties={counties} /> 
               {/* //country={country} setCountry={setCountry} /> */}
              <TourStyles products={products} />
              <TourOperators products={products} />
              <TourSize products={products}/>
            </div>
            <div className="col-span-4 all-destination-tour-main-card">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
                {/* Map through the visible listings array and render ListingCard components */}
                {visibleTours.map((tour: any) => (
                  
                  <TourMainCard 
                    currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toString(),
                      updatedAt: currentUser.updatedAt.toString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toString() : null
                    } : null}
                     //Pass the current user to each ListingCard
                    key={tour.id} // Use the listing ID as the unique key
                    data={tour} // Pass the listing data to each ListingCard
                  />
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center items-center mt-4">
                {currentPage > 1 && (
                  <Link href={`/alldestinations?page=${currentPage - 1}`}>
                    <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
                  </Link>
                )}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Link key={index} href={`/alldestinations?page=${index + 1}`}>
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
          </div> 
        </Container>
      </div>
    );
  };

  // Return the result of the render function
  return GetToursAndRender();
}