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
import getLandById from "@/app/actions/getLandById";
import getLands, {LandParams} from "@/app/actions/getLands.";

// Define the interface for the TourPage component props
interface IParams {
  landId?: string;
  tourParams: LandParams;
}

// TourPage component is defined as an asynchronous function
const TourPage = async ({ params }: { params: IParams }) => {
  const tour = await getLandById(params);
  // const reservations = await getReservations(params);
  const reservations = await getReservations({ listingId: params.landId });
  const currentUser = await getCurrentUser();
  const tours = await getLands(params.tourParams);
  const filteredTours = tours.slice(0, 4);

  // Check if there is no tour, display EmptyState component
  if (!tour) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* Header section */}
      <div className="european-hotel european-hotel-tour flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white">
          {tour.title}
          <span className="color-span-green"></span>
        </h1>
      </div>

      {/* TourClient section */}
      <div className="py-6">
        <TourClient
          tour={tour}
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
      {filteredTours && filteredTours.length > 0 && (
        <Container>
          <div className="mt-4 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">More Land deals</h1>
                <p className="text-neutral-600">More affordable land deals you may find amazing</p> 
              </div>
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
            </div>
           </div>
          <div className="grid-cols-page-s pt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {/* Map through the tours array and render TourCard components */}
            {filteredTours.map((tour: any) => (
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
