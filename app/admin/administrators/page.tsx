import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getTours, { IToursParams } from "@/app/actions/getTours";
import Container from "@/app/components/container/Container";
import SideBar from "../profile/components/SideBar";
import getUsers, { IUsersParams } from "@/app/actions/getUsers";
import deleteUsers from "@/app/actions/deleteUsers";
import getHosts from "@/app/actions/getHost";
import getOperators from "@/app/actions/getOperators";
import axios from "axios";
import deleteBtn from "@/app/actions/deleteBtn";
import DeleteButton from "@/app/actions/deleteBtn";
import UsersCard from "@/app/aahooks/UsersCard";
import getClients from "@/app/actions/getClients";
import getAdmins from "@/app/actions/getAdmins";
import RestrictedEmptyState from "@/app/components/container/RestrictedEmptyState";
// import toast from "react-hot-toast";
// import Router, { useRouter } from "next/navigation";

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  tourParams: IToursParams;
  userParams: IUsersParams;
}

// Home component is defined as an asynchronous function
const HostPage = async ({ searchParams, tourParams, userParams }: HotelPageProps) => {
  // Fetch listings, current user, and users asynchronously
  const currentUser = await getCurrentUser();
  const users = await getAdmins({ ...userParams, userType: "admin" });
  // const handleDelete = deleteBtn()

  // const router = useRouter();
  // const delt = deleteBtn();

  
  const handleDelete = async (id: string) => {
        // e.stopPropagation();
        console.log("button clicked");
    try {
        const response = await axios.delete(`/api/register/${id}`, {
            method: 'DELETE',
        });
        console.log("try is working")
        // toast.success("User deleted successfully")
        // router.push("/")
    } catch (error) {
        console.error(error);
        console.log('Failed to delete tour. Please try again.');
    }
  };


  if(currentUser?.userType !== "admin") {
      // Render link to homepage if the current user is not an admin
      return (
        <RestrictedEmptyState/>
      );
    }
  
  // const handleDelete = () => {

  // }

  // Render the Home component with the fetched listings
  return (
    <div>
      <div className="all-destinations-main-admin-profile flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-destinations-main-admin-profile">
          {currentUser?.name}
          <span className="color-span-green"></span>
        </h1>
      </div>
      <Container>
        <div className="grid grid-cols-5 gap-10 pt-16">
          <div className="col-span-1">
            <SideBar />
          </div>
          <div className="col-span-4">
            <div className="pb-6">
              <h1 className="text-2xl font-bold">All Administators</h1>
            </div>
            <div className="items-center pb-1">
                {users.length === 0 ? (
                  <div>No client currently registered in the system please come back later!</div>
                ) : (
                  <div className="pt-2 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                    {users.map((listing: any) => (
                      <UsersCard
                        currentUser={currentUser ? {
                          ...currentUser,
                          createdAt: currentUser.createdAt.toISOString(),
                          updatedAt: currentUser.updatedAt.toISOString(),
                          emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                        } : null} // Pass the current user to each ListingCard
                        key={listing.id} // Use the listing ID as the unique key
                        data={listing} // Pass the listing data to each ListingCard
                      />
                    ))}
                    <div className="col-span-4">
                      <hr />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HostPage;

