import getCurrentUser from "../actions/getCurrentUsers";
import getListings, { IListingsParams } from "../actions/getListings";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import ListingCard from "../components/listing/ListingCard";
import Categories from "../components/navbar/Categories";
import Search from "../components/navbar/Search";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { MdFoodBank } from "react-icons/md";
import { GiClockwork } from "react-icons/gi";
import BookingCard from "../mainpage/components/BookingCard";
import ListingValue from "../components/listing/ListingValue";
import getTours, { IToursParams } from "../actions/getTours";
import TourCard from "../components/listing/TourCard";
import TheCategoriess from "./TheCategoriess";
import TourMainCard from "../components/listing/TourMainCard";
import TourPriceCard from "../components/listing/TourPriceCard";
import TourCardSecondary from "../components/listing/TourCardSecondary";
import ListingCardMain from "../components/listing/ListingCardMain";
import CardDisplay from "../mainpage/components/CardDisplay";
import getAfricanTours from "../actions/getAfricanTours";
import EmptyStates from "../components/container/EmptyStates";
import getAustraliaTours from "../actions/getAustralianTours";
import { Metadata } from "next";

// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
     tourParams: IToursParams;
}

export const metadata: Metadata =  {
  title: "Australian Destinations",
}
// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously
  const currentUser = await getCurrentUser();
  const tours = await getAustraliaTours({ ...tourParams, continent: "australia" });
  const tourss = await getTours(tourParams);
  const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);
  const filteredTourss = tourss.filter(tour => tour.tourists.length < tour.guestCount).slice(2, 6);
  // const isEmpty = true;

  // Check if there are no listings, display EmptyState component
  if (filteredTours.length === 0) {
    return (
      <EmptyStates showReset />
    );
  }

  return (
    <div>
    <div className="all-destinations-main-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-destinations-main">Prime Australian <span className="color-span-green">Destinations</span></h1>
        {/* <div className="destination-search-main">
          <Search /> 
        </div> */}
      </div>
     <Container>
        <div className="flex flex-col gap-1 pt-6 pb-4">
        {/* <h1 className="main-header-black w-full text-center pt-9 pb-0">AUSTRALIAN <span className="main-header-gradient py-1">LISTINGS</span></h1> */}
        <p className="text-md text-neutral-600 leading-8 pt-6 pb-0 text-md w-full text-justify">Embark on unparalleled Australian housing listings with our prime selection. Curated by experts, these properties bring sought-after destinations to your doorstep. From coastal retreats to urban dwellings, immerse yourself in luxurious stays filled with natural beauty, wildlife, and cultural richness. Enhance your experience with personalized tours, redefining your living expectations.</p>
        </div>
      </Container>
      <Container>
          <div className="pb-0">
            <hr />
          </div>
      </Container>
      <Container>
      <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {filteredTours.slice(0, 4).map((tour: any) => {
          return (
            <TourPriceCard
              currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                    } : null} // Pass the current user to each ListingCard
              key={tour.id} // Use the listing ID as the unique key
              data={tour} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
        <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/allaustralianhouseleasing">View Australian House Listings</Link>
        </div>
        </Container>
          
      <div className="tour-inconfort flex flex-col py-12 my-9 items-center justify-center text-lg font-bold">
        <h1 className="ccolor-h1-white-page">Tour in comfort and style</h1>

          <Container>
            <div className="booking-card grid w-full grid-cols-2 px-5 gap-32 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 py-5 my-9">
            <CardDisplay
              icon={FaStar}
              label="Insightful experiences"
              />
              <CardDisplay
              icon={FaThreads}
              label="Make travel matter"
              />
              <CardDisplay
              icon={MdFoodBank}
              label="Superior first class hotels"
              />
              <CardDisplay
              icon={GiClockwork}
              label="20+ years of experience"
                />
            </div>
            </Container>
      </div>
      {filteredTourss && filteredTourss.length > 0 && (
        <Container>
        <div className="flex flex-col gap-1 pt-4">
        <h1 className="main-header-black w-full text-center">FEATURED <span className="main-header-gradient">CLASSIC TOUR</span></h1>
        <p className="text-neutral-500 text-sm w-full text-center">Don&lsquo;t miss out on these incredible, once-in-a-lifetime travel experiences launching soon - book your spot today for the adventure of a lifetime.</p>
        </div>
        <div className="grid-cols-page-s pt-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {filteredTourss.slice(4, 8).map((tour: any) => {
          return (
            <TourCardSecondary
              currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
              key={tour.id} // Use the listing ID as the unique key
              data={tour} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
      </Container>
      )}
    </div>
  );
};

export default DestinationPage