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
import getListingsHotels from "../actions/getListingsHotels";
import { Metadata } from "next";
import TourCardSecondary from "../components/listing/TourCardSecondary";
import getNews from "../aagetMethods/getNews";
import NewsCard from "../aahooks/NewsCard";
import getBlogs from "../aagetMethods/getBlogs";
import BlogsCard from "../aahooks/BlogsCard";
import getGallery from "../aagetMethods/getGallery";

// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
     tourParams: IToursParams;
}

export const metadata: Metadata =  {
  title: "Gallery",
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously
  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  const listings = await getGallery({ ...searchParams, category: "gallery" });
  const tours = await getTours(tourParams);
  const filteredListings = listings.slice(0, 7);
  const filteredTourss = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 20);
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
        <h1 className="color-h1-destinations-main">Our Authentic <span className="color-span-green">Gallery</span></h1>
        {/* <div className="destination-search">
          <Search /> 
        </div> */}
      </div>
      <Container>
      <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
        {/* Map through the listings array and render ListingCard components */}
        {filteredListings.map((listing: any) => {
          return (
            <BlogsCard
              currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
        </Container>
    </div>
  );
};

export default DestinationPage