
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUsers";
import Container from "@/app/components/container/Container";
import SideBar from "../profile/components/SideBar";
import getmyTours, { ImyToursParams } from "@/app/aagetMethods/getmyTours";
import TourMyCard from "@/app/aahooks/TourMyCard";
import TourBookedMyCard from '@/app/aahooks/TourMyBookedCard';
import getUsers from '@/app/actions/getUsers';

import Link from 'next/link'; // Import Link from 'next/link'
import RestrictedEmptyState from '@/app/components/container/RestrictedEmptyState';

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: ImyToursParams; // Search parameters for fetching listings
}


// Home component is defined as an asynchronous function
const AdministratorsPage = async ({ searchParams }: HotelPageProps) => {


  try {
    // Fetch the current user
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      // Handle case where currentUser is null
      return <div>Error: Current user not found.</div>;
    }

    // if(currentUser?.userType !=="admin")
    // {
    //   window.location.href = '/'; // Redirect using client-side JavaScript
    // }

    if(currentUser?.userType !== "admin") {
      // Render link to homepage if the current user is not an admin
      return (
        <RestrictedEmptyState/>
      );
    }
    
    // Fetch tours that match the current user's ID
    const tours = await getmyTours({ ...searchParams });
    const all_users = await getUsers({})
    const filteredTours = tours.filter(tour => tour.tourists.length > 0);

    // Render the component with the fetched tours
    return (
      <div>
        <div className="all-destinations-main-admin-profile flex flex-col items-center justify-center text-lg font-bold">
          <h1 className="color-h1-destinations-main-admin-profile">
            {currentUser.name}
            <span className="color-span-green"></span>
          </h1>
        </div>
        <Container>
          <div className="grid grid-cols-5 gap-10 pt-16">
            <div className="col-span-1">
              <SideBar />
            </div>
            <div className="col-span-4">
              <div className="pb-2">
                <h1 className="text-2xl font-bold">All Booked Tours</h1>
              </div>
              <div className="items-center pb-1">
                {filteredTours.length === 0 ? (
                  <div>Tour not found</div>
                ) : (
                  <div className="pt-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {filteredTours.map((tour: any) =>
                      tour.tourists.length === tour.guestCount ? (
                        <TourBookedMyCard
                          currentUser={currentUser ? {
                            ...currentUser,
                            createdAt: currentUser.createdAt.toISOString(),
                            updatedAt: currentUser.updatedAt.toISOString(),
                            emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                          } : null} // Pass the current user to each ListingCard
                          key={tour.id} // Use the tour ID as the unique key
                          data={tour} // Pass the tour data to each ListingCard
                          label={true}
                          users ={all_users}
                        />
                      ) : (
                        <TourBookedMyCard
                          currentUser={currentUser ? {
                            ...currentUser,
                            createdAt: currentUser.createdAt.toISOString(),
                            updatedAt: currentUser.updatedAt.toISOString(),
                            emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                          } : null} // Pass the current user to each ListingCard
                          key={tour.id} // Use the tour ID as the unique key
                          data={tour} // Pass the tour data to each ListingCard
                          label={false}
                          users ={all_users}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
              {/* <AdminInfo userParams={userParams} /> */}
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    // Handle error as needed
    return <div>Error occurred while fetching data.</div>;
  }
};

export default AdministratorsPage;