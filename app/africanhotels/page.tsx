import getCurrentUser from "../actions/getCurrentUsers";
import getListings, { IListingsParams } from "../actions/getListings";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import ListingCard from "../components/listing/ListingCard";
import Categories from "../components/navbar/Categories";
import Search from "../components/navbar/Search";
import Link from "next/link";
import BookingCard from "../mainpage/components/BookingCard";
import ListingValue from "../components/listing/ListingValue";
import getTours, { IToursParams } from "../actions/getTours";
import TourCard from "../components/listing/TourCard";
import TheCategoriess from "./TheCategoriess";
import getAfricanHotelLisings from "../acts/getAfricanHotelsListings";
import { Metadata } from "next";
import TourCardSecondary from "../components/listing/TourCardSecondary";

// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
     tourParams: IToursParams;
}

export const metadata: Metadata =  {
  title: "African Hotels",
}
// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously
  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  const listings = await getAfricanHotelLisings({ ...searchParams, hotel: "hotel", continent: "africa"});
    const tours = await getTours(tourParams);
  // const isEmpty = true;

  // Check if there are no listings, display EmptyState component
  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  // Render the Home component with the fetched listings
  return (
    <div>
    <div className="all-destinations-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-destinations-main">African <span className="color-span-green">Hotels</span></h1>
        {/* <div className="destination-search">
          <Search /> 
        </div> */}
      </div>
      <Container>
        <div className="flex flex-col gap-1 pt-6 pb-4">
        {/* <h1 className="main-header-black w-full text-center pt-9 pb-0">AFRICAN <span className="main-header-gradient py-1">HOTELS</span></h1> */}
        <p className="text-md text-neutral-600 leading-8 pt-6 pb-0 text-md w-full text-justify">Embark on unparalleled African hotel experiences with our prime selection. Curated by experts, these accommodations bring sought-after destinations to your doorstep. From safari lodges to coastal resorts, immerse yourself in luxurious stays filled with natural beauty, wildlife, and cultural richness. Enhance your experience with guided tours, redefining your travel expectations.</p>
        </div>
      </Container>
      <Container>
          <div className="pb-0">
            <hr />
          </div>
      </Container>
      <Container>
      <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
        {/* Map through the listings array and render ListingCard components */}
        {listings.slice(0, 5).map((listing: any) => {
          return (
            <ListingCard
              currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCar
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
        <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/allafricanhotels">View african hotels</Link>
        </div>
          </Container>
          
     {/* Next part of the page */}
      <div className="tour-booking flex flex-col py-12 my-9 items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white-page">How to book with us</h1>
        <Container>
          <div className="pt-10 pb-5 main-page-cards">
            <BookingCard />
          </div>
        </Container>
      </div>
          
        <Container>
        <div className="flex flex-col gap-1 pt-9">
        <h1 className="main-header-black w-full text-center">FEATURED <span className="main-header-gradient">PREMIUM TOURS</span></h1>
        <p className="text-neutral-500 text-sm w-full text-center">Don&lsquo;t miss out on these incredible, once-in-a-lifetime travel experiences launching soon - book your spot today for the adventure of a lifetime.</p>
        </div>
        <div className="grid-cols-page-s pt-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {/* Map through the listings array and render ListingCard components */}
        {tours.slice(0, 4).map((tour: any) => {
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

          
    <Container>
        <div className="flex w-full py-6 h-auto flex-col gap-1 pt-11">
        <h1 className="main-header-black w-full text-center">TRENDING <span className="main-header-gradient"> TOURS</span></h1>
        <p className="text-neutral-500 text-sm w-full text-center">Be the envy of your friends by booking one of our highly coveted, limited-availability tours to the world&lsquo;s hottest, must-visit destinations.</p>
        </div>
      <div className="trending-list-main-page pt-3 pl-16 pb-3 justify-between grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-2">
        {/* Map through the listings array and render ListingCard components */}
        {tours.slice(0, 20).map((tour: any) => {
          return (
            <ListingValue
              data={tour}
              key={tour.id}
              title={tour.title} locationValue={""}              />
          );
        })}
        </div>
      </Container>
    </div>
  );
};

export default DestinationPage