// import { useRouter } from "next/navigation";
import getCurrentUser from "./actions/getCurrentUsers";
import getListings, { IListingsParams } from "./actions/getListings";
import getTours, { IToursParams } from "./actions/getTours";
import Carousel from "./components/container/Carousel";
import Container from "./components/container/Container";
import EmptyState from "./components/container/EmptyState";
import Slider from "./components/container/Slider";
import ListingCard from "./components/listing/ListingCard";
import Banner from "./mainpage/components/Banner";
import SearchMain from "./mainpage/components/SearchMain";
import MainButton from "./components/container/MainButton";
import Link from "next/link";
import CardDisplay from "./mainpage/components/CardDisplay";
import { FaStar } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { MdFoodBank } from "react-icons/md";
import { GiClockwork } from "react-icons/gi";
import Categoriess from "./mainpage/components/Categoriess";
import BookingCard from "./mainpage/components/BookingCard";
import ListingValue from "./components/listing/ListingValue";
import TourCard from "./components/listing/TourCard";
import useCountries from "./hooks/useCountries";
import TourPriceCard from "./components/listing/TourPriceCard";
import ListingCardMain from "./components/listing/ListingCardMain";
import TourCardSecondary from "./components/listing/TourCardSecondary";

// Define the interface for the Home component props
interface HomeProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  tourParams: IToursParams;
}

// Home component is defined as an asynchronous function
const Home = async ({ searchParams, tourParams }: HomeProps) => {
  // Fetch listings and current user asynchronously
  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  const listings = await getListings(searchParams);
  const tours = await getTours(tourParams);

  const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);

  const filteredTourss = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(4, 8);

  const filteredToursss = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 20);

  // const filteredListings = listings.filter(listing => listing.tourists.length < listing.guestCount).slice(4, 8);
 
  // const router = useRouter();
  // const isEmpty = true;

  // Check if there are no listings, display EmptyState component
  if (listings.length === 0 && tours.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  return (
    <div>
    <div className="w-full carousel-main-div-carousel">
        <Carousel />
    </div>
      <div className="carousel-main-div banner-btn-r relative flex flex-col justify-center items-center">
        <Banner />
      </div>
      <div className="SearchMain-page">
        <SearchMain />
      </div>

      {filteredTours && filteredTours.length > 0 && (
        <Container>
          <div className="flex flex-col gap-1 pt-12">
            <h1 className="main-header-black w-full text-center">AMAZING <span className="main-header-gradient">UPCOMING TOURS</span></h1>
            <p className="text-neutral-500 text-sm w-full text-center">Don&lsquo;t miss out on these incredible, once-in-a-lifetime travel experiences launching soon - book your spot today for the adventure of a lifetime.</p>
          </div>
          <div className="grid-cols-page-s pt-9 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {filteredTours.map((tour: any) => (
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
            ))} 
          </div>
        </Container>
      )}

      <div className="tour-inconfort flex flex-col py-12 my-9 items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white-page pb-4">Tour in comfort and style</h1>

          <Container>
            <div className="booking-card booking-card-nine grid w-full px-5 gap-32 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 sm:my-3 sm:py-2 md:py-4 lg:py-5 xl:py-7 2xl:py-7 my-9">
            <CardDisplay
              icon={FaStar}
              // label="Insightful experiences"
              label="1000+ Insightful Experiences"
              />
              <CardDisplay
              icon={FaThreads}
              // label="Make travel matter"
              label="60+ ways to make travel matter"
              />
              <CardDisplay
              icon={MdFoodBank}
              label="800+ Superior first class hotels"
              />
              <CardDisplay
              icon={GiClockwork}
              label="20+ years of experience"
                />
            </div>
            </Container>
      </div>

      {listings && listings.length > 0 && (
      <Container>
        <div className="flex flex-col gap-1 pt-1">
          <h1 className="main-header-black w-full text-center">INTERCONTINENTAL <span className="main-header-gradient">CLASS HOTELS</span></h1>
          <p className="text-neutral-500 text-sm w-full text-center">Experience timeless luxury and impeccable service at our handpicked collection of iconic five-star hotels spanning the globe.</p>
        </div>
        <div className="grid-cols-page-s pt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {listings.slice(0, 4).map((listing: any) => (
            <ListingCardMain
              currentUser={currentUser ? {
                ...currentUser,
                createdAt: currentUser.createdAt.toISOString(),
                updatedAt: currentUser.updatedAt.toISOString(),
                emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          ))}
        </div>
      </Container>
    )}

      {/* The categories page */}
      <Container>
        <div className="page-main-ctry">
        <div className="flex flex-col gap-1 pt-14">
        <h1 className="main-header-black w-full text-center">EXPLORE OUR <span className="main-header-gradient">PRIME DESTINATIONS</span></h1>
        <p className="text-neutral-500 text-sm w-full text-center">Indulge in timeless luxury and impeccable service at our curated selection of iconic world tourist destinations. Discover the pinnacle of hospitality with Intercontinental Tours.</p>
        </div>
        <div className="pt-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
        <Categoriess />
        </div>
        <div className="w-full text-center pt-14">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/hotels">View our prime destinations</Link>
          </div>
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

      {/* second last */}
      {filteredTourss && filteredTourss.length > 0 && (
      <Container>
        <div className="flex flex-col gap-1 pt-1">
          <h1 className="main-header-black w-full text-center">CLASSIC <span className="main-header-gradient">ADVENTURE TOURS</span></h1>
          <p className="text-neutral-500 text-sm w-full text-center">Experience the thrill of a lifetime on our curated selection of active, immersive tours full of adrenaline, culture and natural wonder.</p>
        </div>
        <div className="grid-cols-page-s pt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {/* Map through the listings array and render ListingCard components */}
          {filteredTourss.map((tour: any) => (
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
          ))}
        </div>
        <div className="w-full text-center pt-4">
          <Link className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md" href="/alldestinations">View classic adventure tours</Link>
        </div>
      </Container>
      )}
      
      {/* last part of the code */}

      {filteredToursss && filteredToursss.length > 0 && (
      <Container>
        <div className="flex w-full py-6 h-auto flex-col gap-1 pt-11">
          <h1 className="main-header-black w-full text-center">PREMIUM <span className="main-header-gradient">TRENDING TOURS</span></h1>
          <p className="text-neutral-500 text-sm w-full text-center">Be the envy of your friends by booking one of our highly coveted, limited-availability tours to the world&lsquo;s hottest, must-visit destinations.</p>
        </div>
        <div className="trending-list-main-page pt-4 pl-16 pb-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-6">
          {filteredToursss.map((tour: any) => (
            <ListingValue
              data={tour}
              key={tour.id}
              title={tour.title} 
              locationValue={""}              
            />
          ))}
        </div>
      </Container>
    )}


    </div>
  );
};

export default Home;

