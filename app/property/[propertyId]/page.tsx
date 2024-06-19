// Import statements with consistent paths
import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservation";
import getTourById from "@/app/actions/getTourById";
import getTours, { IToursParams } from "@/app/actions/getTours";
import EmptyState from "@/app/components/container/EmptyState";
import Container from "@/app/components/container/Container";
import TourCard from "@/app/components/listing/TourCard";
import Link from "next/link";
import TourClient from "./TourClient";
import TourCardSecondary from "@/app/components/listing/TourCardSecondary";
import getOfferById from "@/app/actions/getOffersById";
import getOffers, {OffersParams} from "@/app/actions/getOffers";
import getPropertyById from "@/app/actions/getPropertyById";

// Define the interface for the TourPage component props
interface IParams {
  // tourId?: string;
  tourParams: IToursParams;
  propertyId?: string;
  offerParams: OffersParams;

}

// TourPage component is defined as an asynchronous function
const TourPage = async ({ params }: { params: IParams }) => {
  // const tour = await getTourById(params);
  // const offer = await getOfferById(params);
  const offer = await getPropertyById({ propertyId: params.propertyId });
  // const reservations = await getReservations(params);
  const reservations = await getReservations({ listingId: params.propertyId });
  const currentUser = await getCurrentUser();
  const tours = await getTours(params.tourParams);
  const offers = await getOffers(params.offerParams)
  // const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);

  // Check if there is no tour, display EmptyState component
  if (!offer) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* Header section */}
      <div className="european-hotel european-hotel-tour flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white">
          {offer.title}
          <span className="color-span-green"></span>
        </h1>
      </div>

      {/* TourClient section */}
      <div className="py-6">
        <TourClient
          tour={offer}
          reservations={reservations}
          currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
          } : null} // Pass the current user to each ListingCard
        />
      </div>

      {/* Classic Adventure Tours section */}
       {offers && offers.length > 0 && (
        <Container>
         <div className="mt-4 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">More Offers</h1>
                <p className="text-neutral-600">More affordable offers you may find amazing</p> 
              </div>
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
            </div>
           </div>
          <div className="grid-cols-page-s pt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {offers.slice(0,4).map((tour: any) => (
              <TourCardSecondary
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id}
                data={tour}
              />
            ))}
          </div>
        </Container>
      )} 
        
    </div>
  );
};

export default TourPage;
