import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getTours, { IToursParams } from "@/app/actions/getTours";
import Container from "@/app/components/container/Container";
import SideBar from "../profile/components/SideBar";
import getUsers, { IUsersParams } from "@/app/actions/getUsers";
import deleteUsers from "@/app/actions/deleteUsers";
import getAdmins from "@/app/actions/getAdmins";
import Image from "next/image";
import ListingCard from "@/app/components/listing/ListingCard";
import getMyListingsHouses from "@/app/aagetMethods/getMyListingsHouses";
import HouseMyCard from "@/app/aahooks/HouseMyCard";
import getMyListingsHotels from "@/app/aagetMethods/getMyListingsHotels";
import ListingBookedMyCard from "@/app/aahooks/ListingMyBookedCard";
import RestrictedEmptyState from "@/app/components/container/RestrictedEmptyState";

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  userParams: IUsersParams;
}

// Home component is defined as an asynchronous function
const AdministratorsPage = async ({ searchParams, userParams }: HotelPageProps) => {
  try {
    // Fetch current user
    const currentUser = await getCurrentUser();
    const all_users = await getUsers({})

    // Ensure currentUser is not null before accessing its properties
    if (!currentUser) {
      throw new Error("Current user not found");
    }

    // Fetch listings for the current user
    const listings = await getMyListingsHotels({ ...searchParams, userId: currentUser.id, hotel: "hotel" });

    // const filteredListings = listings.filter(listing => listing.tourists.length > 0);

    // Render the Home component with the fetched listings
    if(currentUser?.userType !== "admin") {
      // Render link to homepage if the current user is not an admin
      return (
        <RestrictedEmptyState/>
      );
    }

    return (
      <div>
        <div className="all-destinations-main-admin-profile flex flex-col items-center justify-center text-lg font-bold">
          <h1 className="color-h1-destinations-main-admin-profile">
            {currentUser.name ?? "Unknown"} {/* Use nullish coalescing to provide a default value */}
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
                <h1 className="text-2xl font-bold">All Booked  Hotels</h1>
              </div>
              <div className="items-center pb-1">
                {listings.length === 0 ? (
                  <div>No hotels found</div>
                ) : (
                  <div className="pt-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {listings.map((listing: any) => (
                      <ListingBookedMyCard
                        currentUser={{
                          ...currentUser,
                          createdAt: currentUser.createdAt.toISOString(),
                          updatedAt: currentUser.updatedAt.toISOString(),
                          emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                        }} // Pass the current user to each ListingCard
                        key={listing.id} // Use the listing ID as the unique key
                        data={listing} // Pass the listing data to each ListingCard
                        label={true}
                        users ={all_users}
                      />
                    ))}
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
    // return <div>Error occurred: {error.message}</div>;
  }
};

export default AdministratorsPage;

