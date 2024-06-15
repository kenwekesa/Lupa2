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

interface IParams {
    listingId?: string;
    tourParams: IToursParams;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params) as any;
    const reservations = await getReservations(params) as any
    const currentUser = await getCurrentUser() as any;
  const tours = await getTours(params.tourParams);
  const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);

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
            <div className="flex flex-col gap-1 pt-5 mt-2">
              <h1 className="main-header-black w-full text-center">
                OUR <span className="main-header-gradient">PREMIUM TOURS</span>
              </h1>
              <p className="text-neutral-500 text-sm w-full text-center">
                You viewed the lavish {listing.title} - continue your luxury adventure with these premium recommendations for our exotic tours handpicked just for you.
              </p>
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
            <div className="w-full text-center pt-8">
              <Link
                className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md"
                href="/hotels"
              >
                View all premium tours
              </Link>
            </div>
        </Container>
        )}

    </div>
        
  )
}

export default ListingPage