import Link from "next/link";
import getCurrentUser from "../actions/getCurrentUsers";
import getListings, { IListingsParams } from "../actions/getListings";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import ListingCard from "../components/listing/ListingCard";
import Categories from "../components/navbar/Categories";
import Search from "../components/navbar/Search";
import Categoriess from "../mainpage/components/Categoriess";
import getAfricanHotelLisings from "../acts/getAfricanHotelsListings";
import { Metadata } from "next";

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
}

export const metadata: Metadata =  {
  title: "All Afrian Hotels",
}

// Home component is defined as an asynchronous function
const HotelPage = async ({ searchParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously
  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  const listings = await getAfricanHotelLisings({ ...searchParams, hotel: "hotel", continent: "africa"});
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
    <div className="european-hotel-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white-main">African <span className="color-span-green">Hotels</span></h1>
        <div className="hotel-search">
          <Search /> 
        </div>
      </div>
      <div className="py-4">
        <Categories />
      </div>  
      <Container>
      <div className="pt-0 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
        {/* Map through the listings array and render ListingCard components */}
        {listings.map((listing: any) => {
          return (
            <ListingCard
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

export default HotelPage;


