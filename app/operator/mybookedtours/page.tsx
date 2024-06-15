import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUsers";
import Container from "@/app/components/container/Container";
import SideBar from "../profile/components/SideBar";
import getmyTours, { ImyToursParams } from "@/app/aagetMethods/getmyTours";
import TourMyCard from "@/app/aahooks/TourMyCard";
import TourBookedMyCard from '@/app/aahooks/TourMyBookedCard';
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

    // Fetch tours that match the current user's ID
    const tours = await getmyTours({ ...searchParams, userId: currentUser.id });

    const filteredTours = tours.filter(tour => tour.tourists.length > 0);

    if(currentUser?.userType !== "operator") {
      // Render link to homepage if the current user is not an admin
      return (
        <RestrictedEmptyState/>
      );
    }
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
                <h1 className="text-2xl font-bold">All My Booked Tours</h1>
              </div>
              <div className="items-center pb-1">
                 <div className="pt-2 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                  {filteredTours.length === 0 ? (
                    <div>No tours found</div>
                  ) : (
                    filteredTours.map((tour: any) =>
                      tour.tourists.length === tour.guestCount ? (
                        <TourBookedMyCard
                          currentUser={currentUser ? {
                            ...currentUser,
                            createdAt: currentUser.createdAt.toISOString(),
                            updatedAt: currentUser.updatedAt.toISOString(),
                            emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                          } : null}
                          key={tour.id}
                          data={tour}
                          label={true}
                        />
                      ) : (
                        <TourBookedMyCard
                          currentUser={currentUser ? {
                            ...currentUser,
                            createdAt: currentUser.createdAt.toISOString(),
                            updatedAt: currentUser.updatedAt.toISOString(),
                            emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                          } : null}
                          key={tour.id}
                          data={tour}
                          label={false}
                        />
                      )
                    )
                  )}
                </div>
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

