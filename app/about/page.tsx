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
import getListingsHotels from "../actions/getListingsHotels";
import { Metadata } from "next";
import TourCardSecondary from "../components/listing/TourCardSecondary";

import imagebook from "../../public/images/maint.jpg"
import imageone from "../../public/images/ps.jpeg"
import imagetwo from "../../public/images/psa.jpeg"
import imagethree from "../../public/images/psb.jpg"
import imagefour from "../../public/images/psc.jpg"
import imagefive from "../../public/images/ps.jpg"
import imagesix from "../../public/images/psd.jpg"
import Emblawebsite from "../mainpage/components/Emblawebsite";
import TourPriceCard from "../components/listing/TourPriceCard";
import TourCardLists from "../components/listing/TourCardLists";
import EmblaMobile from "../mainpage/components/EmblaMobile";
import TourPriceCardMain from "../components/listing/TourPriceCardMain";

// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
     tourParams: IToursParams;
}

export const metadata: Metadata =  {
  title: "About",
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously

  const cardsData = [
  {
    image: imageone,
    title: 'AmzonCorp',
    country: 'Get prime land?',
    description: 'Brussels is a quick train ride from all the action',
  },
  {
    image: imagetwo,
    title: 'Devancatour',
    country: 'Seize the moment!',
    description: 'Save 15% or more when you book and stay before October 1, 2024',
  },
  {
    image: imagesix,
    title: 'AmzonCorp',
    country: 'Our prime hotel?',
    description: 'Brussels is a quick train ride from all the action',
  },
  {
    image: imagefour,
    title: 'Title 4',
    country: 'Seize the moment!',
    description: 'Save 15% or more when you book and stay before October 1, 2024',
  },
  {
    image: imagefive,
    title: 'Title 5',
    country: 'Seize the moment!',
    description: 'Save 15% or more when you book and stay before October 1, 2024',
  },
  {
    image: imagesix,
    title: 'Title 6',
    country: 'Seize the moment!',
    description: 'Save 15% or more when you book and stay before October 1, 2024',
  },
  {
    image: imageone,
    title: 'Title 7',
    country: 'Country 7',
    description: 'Description 7',
    },
  {
    image: imagesix,
    title: 'Title 8',
    country: 'Country 7',
    description: 'Description 7',
    },
  {
    image: imageone,
    title: 'Title 9',
    country: 'Country 7',
    description: 'Description 7',
  },
  ];
  

const cardsDatas = [
  {
    image: imageone,
    title: 'AmzonCorp',
    country: 'Meru',
    description: '100 properties',
  },
  {
    image: imagetwo,
    title: 'Devancatour',
    country: 'Diani',
    description: '40 properties',
  },
  {
    image: imagesix,
    title: 'AmzonCorp',
    country: 'Kisii',
    description: '140 properties',
  },
  {
    image: imagefour,
    title: 'Title 4',
    country: 'Naivasha',
    description: '20 properties',
  },
  {
    image: imagefive,
    title: 'Title 5',
    country: 'Kakamega',
    description: '30 properties',
  },
  {
    image: imagesix,
    title: 'Title 6',
    country: 'Homabay',
    description: '10 properties',
  },
  {
    image: imageone,
    title: 'Title 7',
    country: 'Machakos',
    description: '30 properties',
    },
  {
    image: imagesix,
    title: 'Title 8',
    country: 'Garisa',
    description: '10 properties',
    },
  {
    image: imageone,
    title: 'Title 9',
    country: 'Kirinyaga',
    description: '64 properties',
  },
  {
    image: imageone,
    title: 'AmzonCorp',
    country: 'Meru',
    description: '100 properties',
  },
  {
    image: imagetwo,
    title: 'Devancatour',
    country: 'Diani',
    description: '40 properties',
  },
  {
    image: imagesix,
    title: 'AmzonCorp',
    country: 'Kisii',
    description: '140 properties',
  },
  {
    image: imagefour,
    title: 'Title 4',
    country: 'Naivasha',
    description: '20 properties',
  },
  {
    image: imagefive,
    title: 'Title 5',
    country: 'Kakamega',
    description: '30 properties',
  },
  {
    image: imagesix,
    title: 'Title 6',
    country: 'Homabay',
    description: '10 properties',
  },
  {
    image: imageone,
    title: 'Title 7',
    country: 'Machakos',
    description: '30 properties',
    },
  {
    image: imagesix,
    title: 'Title 8',
    country: 'Garisa',
    description: '10 properties',
    },
  {
    image: imageone,
    title: 'Title 9',
    country: 'Kirinyaga',
    description: '64 properties',
  },
];

  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  // const listings = await getListingsHotels({ ...searchParams, hotel: "hotel" });
  const tours = await getTours(tourParams);
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
    <div className="all-about flex flex-col items-center justify-center text-lg font-bold">
        {/* <h1 className="color-property-sales-main text-white pb-5">PREMIUM PROPERTIES ON SALE</h1>
        <p className="text-white font-semibold text-2xl">Buy now, save more</p> */}
        <h1 className="banner-title color-property-sales-main text-wheat pb-5">HOME OF PREMIUM PROPERTIES ON RENTAL AND SALE</h1> 
        <h2 className="banner-title-one text-white font-semibold text-2xl">Discounted premium properties available</h2> 
        {/* <div className="destination-search">
          <Search /> 
        </div> */}
      </div>
       <div className="flex items-center mt-6 pb-6 justify-center">
       <Container>
          <div className="mt-5">
            <div className="my-3">
              <h1 className="mb-2 text-2xl font-bold text-black">Properties On Sale</h1>
              <p className="text-neutral-600">From Castle to Villas, our premium properties on sale</p>  
            </div> 
            <Emblawebsite cardsData={cardsDatas} />  
          </div>   
        </Container>
      </div>
      <div className="pt-1 pb-9">
      {filteredTours && filteredTours.length > 0 && (
        <Container>
          <div className="mt-9">
              <h1 className="mb-2 text-2xl font-bold text-black">Luxurious Properties</h1>
              <p className="text-neutral-600">From Castle to Villas, select an exclusive place to stay</p>  
          </div> 
          <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {filteredTours.map((tour: any) => (
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
        </Container>
      )}
      </div>
     <div className="first-card-main pt-1 pb-9">
      {filteredTours && filteredTours.length > 0 && (
        <Container>
          <div className="mt-9">
              <h1 className="mb-2 text-2xl font-bold text-black">Luxurious Properties</h1>
              <p className="text-neutral-600">From Castle to Villas, select an exclusive place to stay</p>  
          </div> 
          <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {filteredTours.map((tour: any) => (
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
        </Container>
      )}
      </div>
      
    <div className="pt-1 pb-9">
      {filteredTours && filteredTours.length > 0 && (
        <Container>
          <div className="mt-9">
              <h1 className="mb-2 text-2xl font-bold text-black">Book our prime unique properties</h1>
              <p className="text-neutral-600">Book from our top rated properties for unforgettable stay</p>  
          </div> 
          <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {filteredTours.map((tour: any) => (
              <TourPriceCardMain
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
    
      <div className="pt-1 pb-9">
      {filteredTourss && filteredTourss.length > 0 && (
        <Container>
          <div className="">
              <h1 className="mb-2 text-2xl font-bold text-black">Trending destinations you will love</h1>
              <p className="text-neutral-600">Luxurious sanctuaries you will find comfortable</p>  
          </div> 
          <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            {filteredTourss.map((tour: any) => (
              <TourCardLists
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

      <div className="flex items-center mt-6 justify-center">
       <Container>
          <div className="mt-5">
            <div className="my-3">
              <h1 className="mb-2 text-2xl font-bold text-black">Great deals</h1>
              <p className="text-neutral-600">Premium deals and great offers for you</p>  
            </div> 
            <EmblaMobile cardsData={cardsData} />  
          </div>   
        </Container>
      </div>

    </div>
  );
};

export default DestinationPage