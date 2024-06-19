import getCurrentUser from "../../actions/getCurrentUsers";
import getListings, { IListingsParams } from "../../actions/getListings";
import Container from "../../components/container/Container";
import EmptyState from "../../components/container/EmptyState";
import ListingCard from "../../components/listing/ListingCard";
import Categories from "../../components/navbar/Categories";
import Search from "../../components/navbar/Search";
import Link from "next/link";
import BookingCard from "../../mainpage/components/BookingCard";
import ListingValue from "../../components/listing/ListingValue";
import getTours, { IToursParams } from "../../actions/getTours";
import TourCard from "../../components/listing/TourCard";
import TheCategoriess from "./TheCategoriess";
import getListingsHotels from "../../actions/getListingsHotels";
import { Metadata } from "next";
import TourCardSecondary from "../../components/listing/TourCardSecondary";

import imagebook from "../../../public/images/maint.jpg"
import imageone from "../../../public/images/ps.jpeg"
import imagetwo from "../../../public/images/psa.jpeg"
import imagethree from "../../../public/images/psb.jpg"
import imagefour from "../../../public/images/psc.jpg"
import imagefive from "../../../public/images/ps.jpg"
import imagesix from "../../../public/images/psd.jpg"
import Emblawebsite from "../../mainpage/components/Emblawebsite";
import TourPriceCard from "../../components/listing/TourPriceCard";
import TourCardLists from "../../components/listing/TourCardLists";
import EmblaMobile from "../../mainpage/components/EmblaMobile";
import TourPriceCardMain from "@/app/components/listing/TourPriceCardMain";
import getProperty, {PropertyParams} from "@/app/actions/getProperty";
import PropertyCardMain from "@/app/components/listing/PropertyCardMain";
import PropertyCardSecondary from "@/app/components/listing/PropertyCardSecondary";
import PropertyTartiary from "@/app/components/listing/PropertyTartiary";
import getOffers, {OffersParams} from "@/app/actions/getOffers";
import getCounties, {CountiesParams} from "@/app/actions/getCounties";
import PropertiesTartiaryList from "@/app/components/listing/PropertiesTartiaryList";

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  tourParams: IToursParams;
  propertyParams: PropertyParams;
  offersParams: OffersParams;
  countyParams: CountiesParams;
}

export const metadata: Metadata =  {
  title: "Property rentals",
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams, propertyParams, offersParams, countyParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously

  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  // const listings = await getListingsHotels({ ...searchParams, hotel: "hotel" });
  const counties = await getCounties(countyParams);
  const tours = await getTours(tourParams);
  const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);
  const filteredTourss = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 20);
  const properties = await getProperty(propertyParams); 
  const offers = await getOffers(offersParams);
  const propertyRentals = properties.filter(property => property.type === "rental");
  const propertyPremium = properties.filter(property => property.type === "rental" && property.deal === "premium");
  const propertyTrending = properties.filter(property => property.type === "rental" && property.deal === "affordable");
  const propertyAffordable = properties.filter(property => property.type === "rental" && property.deal === "trending");
  // const isEmpty = true;

  // Check if there are no listings, display EmptyState component
  // if (listings.length && tours.length === 0) {
  //   return (
  //     <EmptyState showReset />
  //   );
  // }

  // Render the Home component with the fetched listings
  return (
    <div>
    <div className="all-main-property-rentals flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-property-sales-main text-white pb-5">TOP TIRE RENTALS AT ECONOMICAL RATES</h1>
        <p className="text-white banner-title-one font-bold text-3xl">Rent our premium properties</p>
        {/* <div className="destination-search">
          <Search /> 
        </div> */}
      </div>
      <div className="pt-1 pb-9">
      {propertyPremium && propertyPremium.length > 0 && (
       <Container>
          <div className="mt-10 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Luxurious rental properties</h1>
              <p className="text-neutral-600">Premium rental villas and homes experience the finest accommodation</p>  
              </div>  
              <div>
                <Link href={{ pathname: '/property-rentals', query: { deal: 'affordable' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
        </div>
          <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {propertyPremium.slice(0,4).map((tour: any) => (
              <PropertyCardMain
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
      </div>
     <div className="first-card-main pt-1 pb-9">
      {propertyTrending && propertyTrending.length > 0 && (
        <Container>
            <div className="mt-9 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Rent our affordable properties</h1>
              <p className="text-neutral-600">Luxurious yet inexpensive rentals where luxury meets affordability.</p>  
              </div>  
              <div>
                <Link href={{ pathname: '/property-rentals', query: { deal: 'affordable' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
        </div>
          <div className="grid-cols-page-s pt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {propertyTrending.slice(0,4).map((tour: any) => (
              <PropertyCardSecondary
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
      </div>
      
    <div className="pt-1 pb-0">
      {propertyAffordable && propertyAffordable.length > 0 && (
          <Container>
        <div className="mt-9 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">High-end properties, reasonable rates</h1>
              <p className="text-neutral-600">Exclusive properties and residences, rates for everyone - elevate your lifestyle.</p>  
              </div>  
              <div>
                <Link href={{ pathname: '/property-rentals', query: { deal: 'trending' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
        </div> 
          <div className="grid-cols-page-s pt-6 pb-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {propertyAffordable.slice(0,4).map((tour: any) => (
              <PropertyTartiary
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
      </div>

  <div className="pt-1 pb-5">
      {propertyRentals && propertyRentals.length > 0 && (
          <Container>
          <div className="mt-3 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Rent our top-tier properties</h1>
              <p className="text-neutral-600">Unlock the extraordinary now - rent top-notch properties and residences!</p>   
              </div>  
              <div>
                <Link href="/stay-s" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
          </div>
          <div className="grid-cols-page-s pt-3 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            <PropertiesTartiaryList
              currentUser={currentUser ? {
                ...currentUser,
                createdAt: currentUser.createdAt.toISOString(),
                updatedAt: currentUser.updatedAt.toISOString(),
                emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              data={counties}
              datas={propertyRentals}
            />
          </div>
        </Container>
      )}
      </div>

  <div className="flex items-center mt-0 justify-center">
        {offers && Array.isArray(offers) && offers.length > 0 && (
    <Container>
      <div className="mt-0">
        <div className="mt-3 mb-4 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Great deals</h1>
              <p className="text-neutral-600">Premium deals and offers for you</p>  
              </div>  
              <div>
                <Link href="/offers" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
        </div>
        <EmblaMobile
          data={offers}
          currentUser={
            currentUser
              ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified
                    ? currentUser.emailVerified.toISOString()
                    : null,
                }
              : null
          }
        />
      </div>
    </Container>
  )}
      </div>

    </div>
  );
};

export default DestinationPage