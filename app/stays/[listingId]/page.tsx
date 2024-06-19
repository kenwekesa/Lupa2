import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/container/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservation";
import { IToursParams } from "@/app/actions/getTours";
import getTourById from "@/app/actions/getTourById";
import getTours from "@/app/actions/getTours";
import Container from "@/app/components/container/Container";
import TourCard from "@/app/components/listing/TourCard";
import Link from "next/link";
import TourCardSecondary from "@/app/components/listing/TourCardSecondary";
import ListingTartiary from "@/app/components/listing/ListingTartiary";
import getListings, {IListingsParams} from "@/app/actions/getListings";

interface IParams {
    listingId?: string;
    tourParams: IListingsParams;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params) as any;
    const reservations = await getReservations(params) as any
    const currentUser = await getCurrentUser() as any;
    const tours = await getListings(params.tourParams);
    const filteredTours = tours.slice(0, 20);

    if (!listing) {
        return (
            <EmptyState />
        )
    }

    return (
        <div>
        <div className="european-hotel flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white color-h1-white-listing">
          {listing.title}
          <span className="color-span-green"></span>
        </h1>
        </div>
            
        <div className="european-hotel-listing py-10 mb-2">
        <ListingClient
            listing={listing}
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
              <h1 className="mb-2 text-2xl font-bold text-black">Similar properties</h1>
                <p className="text-neutral-600">Also find our premium properties, you will find comfortable</p> 
              </div>
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
            </div>
           </div>
            <div className="grid-cols-page-s pt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
              {/* Map through the tours array and render TourCard components */}
              {filteredTours.slice(0,4).map((tour: any) => (
                <ListingTartiary
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
        
  )
}

export default ListingPage
