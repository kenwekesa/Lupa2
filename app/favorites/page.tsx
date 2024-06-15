import EmptyState from "../components/container/EmptyState";

import getCurrentUser from "../actions/getCurrentUsers";
import getFavoriteListing from "../actions/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";


const ListingPage = async () => {
    const listings = await getFavoriteListing();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings."
            />
        )
    }

    return (
        <div>
        <div className="all-destinations-main-loader flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-destinations-main-loader">My <span className="color-span-green">Favorites</span></h1>
            </div>
            <div className="pt-10">
        {/** Ensure that you work on this */}
        {/* <FavoritesClient
            listings={listings}
            currentUser={currentUser}
            /> */}
        </div>
      </div>
            
    )
}

export default ListingPage