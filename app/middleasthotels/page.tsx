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

// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
     tourParams: IToursParams;
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously
  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  const listings = await getListings(searchParams);
  const tours = await getTours(tourParams);
  const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);
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
        <h1 className="color-h1-destinations-main">All Prime <span className="color-span-green">House Leases</span></h1>
        {/* <div className="destination-search">
          <Search /> 
        </div> */}
      </div>
      {/* <div className="py-4">
        <Categories />
      </div> */}
      <Container>
        <div className="flex flex-col gap-1 py-9">
        {/* <h1 className="main-header-black w-full text-center">ALL PRIME <span className="main-header-gradient py-1">HOUSE LEASES</span></h1> */}
        <p className="text-neutral-500 text-sm w-full text-justify">Our prime tour selection offers once-in-a-lifetime travel opportunities to the world&lsquo;s most sought-after and awe-inspiring destinations, curated by our experts to provide the ultimate luxurious and immersive experience. From African safaris in search of the Big Five, to cruising the turquoise waters of the Galápagos Islands, to helicopter tours over the Grand Canyon, you&lsquo;ll be transported to magical realms brimming with natural beauty, exotic wildlife, and historic treasures beyond your wildest imagination. With unique access, top-notch guides, luxury accommodations, bespoke services, and unparalleled attention to detail, our prime tours redefine high-end, exclusive travel so you can immerse yourself fully in your choice of remarkable destinations. Don&lsquo;t just dream about that trip of a lifetime - make it a reality with our premium all-inclusive prime tour packages, offering once-in-a-lifetime memories carefully crafted for the discerning traveler.</p>
        </div>
      <div className="grid-cols-page-s pt-0 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
        {/* Map through the listings array and render ListingCard components */}
        {listings.slice(0, 4).map((listing: any) => {
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
        <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/allmiddleasthotels">View prime destinations</Link>
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
    
    {/* The categories page */}
      <Container>
        <div className="flex flex-col gap-1 pt-10">
        <h1 className="main-header-black w-full text-center">SEARCH <span className="main-header-gradient">BY CONTINENT</span></h1>
        <p className="text-neutral-500 text-sm w-full text-center">Experience timeless luxury and impeccable service at our handpicked collection of iconic five-star hotels spanning the globe.</p>
        </div>
        <div className="pt-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
            <TheCategoriess />
        </div>
        <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/alldestinations">View prime destinations</Link>
        </div>
          </Container>
        
      {filteredTours && filteredTours.length > 0 && (
        <Container>
          <div className="flex flex-col gap-1 pt-9">
            <h1 className="main-header-black w-full text-center">FEATURED <span className="main-header-gradient">TOUR OPERATORS</span></h1>
            <p className="text-neutral-500 text-sm w-full text-center">Don&lsquo;t miss out on these incredible, once-in-a-lifetime travel experiences launching soon - book your spot today for the adventure of a lifetime.</p>
          </div>
          <div className="grid-cols-page-s pt-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {/* Map through the listings array and render ListingCard components */}
            {filteredTours.map((tour: any) => {
              return (
                <TourCard
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
          {/* <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/hotels">View all upcoming tours</Link>
        </div> */}
        </Container>
      )}
          
      {filteredTourss && filteredTourss.length > 0 && (
        <Container>
          <div className="flex w-full py-6 h-auto flex-col gap-1 pt-11">
            <h1 className="main-header-black w-full text-center">TRENDING <span className="main-header-gradient"> TOURS</span></h1>
            <p className="text-neutral-500 text-sm w-full text-center">Be the envy of your friends by booking one of our highly coveted, limited-availability tours to the world&lsquo;s hottest, must-visit destinations.</p>
          </div>
          <div className="trending-list-main-page pt-3 pl-16 pb-3 justify-between grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-2">
            {/* Map through the listings array and render ListingCard components */}
            {filteredTourss.map((tour: any) => {
              return (
                <ListingValue
                  data={tour}
                  key={tour.id}
                  title={tour.title} locationValue={""} />
              );
            })}
          </div>
          {/* <div className="w-full text-center pt-8">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/hotels">View all premium trending tours</Link>
        </div> */}
        </Container>
      )}
    </div>
  );
};

export default DestinationPage