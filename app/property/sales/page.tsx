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

import imagebook from "../../../public/images/family3.jpg"
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
import Image from "next/image";
import Emblaland from "@/app/mainpage/components/Emblaland";
import getCounties, { CountiesParams } from "@/app/actions/getCounties";
import getProperty, { PropertyParams } from "@/app/actions/getProperty";
import PropertyTartiary from "@/app/components/listing/PropertyTartiary";
import PropertyCardMain from "@/app/components/listing/PropertyCardMain";
import PropertyCardSecondary from "@/app/components/listing/PropertyCardSecondary";
import PropertyTartiaryList from "@/app/components/listing/PropertyTartiaryList";

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  tourParams: IToursParams;
  countyParams: CountiesParams;
  propertyParams: PropertyParams;
}

export const metadata: Metadata =  {
  title: "Property sales",
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams, countyParams, propertyParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously

  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  // const listings = await getListingsHotels({ ...searchParams, hotel: "hotel" });
  const tours = await getTours(tourParams);

  const properties = await getProperty(propertyParams); 
  const propertySales = properties.filter(property => property.type === "sale");
  const propertyRentals = properties.filter(property => property.type === "rental");
  const propertyPremium = properties.filter(property => property.type === "sale" && property.deal === "premium");
  const propertyTrending = properties.filter(property => property.type === "sale" && property.deal === "affordable");
  const propertyAffordable = properties.filter(property => property.type === "sale" && property.deal === "trending");

  const counties = await getCounties(countyParams);
  const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);
  const filteredTourss = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 20);
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
    <div className="all-main-property-sales flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-property-sales-main text-white pb-5">PREMIUM PROPERTIES ON SALE</h1>
        <p className="text-white banner-title-one font-bold text-3xl">Purchase high-end properties</p>
        {/* <div className="destination-search">
          <Search /> 
        </div> */}
      </div>
      <div className="flex items-center mt-9 pb-0 justify-center">
        {propertySales && propertySales.length > 0 && (
        <Container>
          <div className="mt-0">
            <div className="my-3 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Exclusive properties on sale</h1>
              <p className="text-neutral-600">From Apparments to Heights, buy our premium properties on sale</p>  
              </div>  
              <div>
                <Link href="/stay-s" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
            </div>
            <Emblaland
              data={counties}
              datas={propertySales}
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
          } /> 
          </div>   
        </Container>
        )}
      </div>
      <div className="pt-1 pb-9">
      {propertyPremium && propertyPremium.length > 0 && (
        <Container>
          <div className="mt-6 mb-3 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Our top trending properties</h1>
              <p className="text-neutral-600">Premium choices: highly desirable properties on the market</p>  
              </div>  
              <div>
                <Link href={{ pathname: '/property-sales', query: { deal: 'trending' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
            </div> 
          <div className="grid-cols-page-s pt-2 pb-0 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {propertyPremium.map((tour: any) => (
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
     <div className="first-card-main pt-1 pb-9">
      {propertyTrending && propertyTrending.length > 0 && (
          <Container>
          <div className="mt-9 mb-3 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Hot deals, affordable prices</h1>
              <p className="text-neutral-600">Unbeatable offers, budget-friendly, easy on the wallet</p>  
              </div>  
              <div>
                <Link href={{ pathname: '/property-sales', query: { deal: 'affordable' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
          </div> 
          <div className="grid-cols-page-s pt-3 pb-0 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {propertyTrending.map((tour: any) => (
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
      
    <div className="pt-1 pb-6">
      {propertyAffordable && propertyAffordable.length > 0 && (
          <Container>
          <div className="mt-9 mb-3 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Purchase our great bargains</h1>
              <p className="text-neutral-600">Amazing deals available, lock in fantastic discounts before they&lsquo;re gone</p>  
              </div>  
              <div>
                <Link href={{ pathname: '/property-sales', query: { deal: 'affordable' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
          </div> 
          <div className="grid-cols-page-s pt-3 pb-0 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {propertyAffordable.map((tour: any) => (
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
    
      <div className="pt-1 pb-5">
      {counties && counties.length > 0 && (
          <Container>
          <div className="mt-9 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Secure unbeatable offers today</h1>
              <p className="text-neutral-600">Unparalleled bargains available, seize the opportunity today!</p>   
              </div>  
              <div>
                <Link href="/stay-s" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
          </div>
          <div className="grid-cols-page-s pt-3 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            <PropertyTartiaryList
              currentUser={currentUser ? {
                ...currentUser,
                createdAt: currentUser.createdAt.toISOString(),
                updatedAt: currentUser.updatedAt.toISOString(),
                emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              data={counties}
              datas={propertySales}
            />
          </div>
        </Container>
      )}
      </div>

      <div className="pt-0 pb-0">
        <Container>
          <div className="border flex justify-start gap-9 items-center border-solid border-neutral-400 py-10 px-11 rounded-xl shadow-sm">
            <div>
              <Image src={imagebook} alt=""  className="h-[230px] w-[230px] shadow-md rounded-br-full rounded-t-full"/>
            </div>
            <div>
              <h3 className="pb-5 font-bold text-2xl">Get one in a lifetime affordable deals </h3>
              <p className="pb-5 text-neutral-600">buys our properties at varied discounts, to meet your needs.</p>
              <div className="flex justify-start items-center gap-9">
                <Link href="/" className="bg-green-500 px-6 py-2 rounded-3xl">Sign Up</Link>
                <Link href="/" className="bg-green-500 px-6 py-2 rounded-3xl">Login</Link>
              </div>
            </div>
          </div>
        </Container>
    </div>

    </div>
  );
};

export default DestinationPage