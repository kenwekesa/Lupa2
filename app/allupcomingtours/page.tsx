import Link from "next/link";
import getCurrentUser from "../actions/getCurrentUsers";
import getTours, { IToursParams } from "../actions/getTours";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import TourMainCard from "../components/listing/TourMainCard";
import Contients from "./components/Continents";
import Sort from "./components/Sort";
import TourStyles from "./components/TourStyles";
import TourOperators from "./components/TourOperators";
import TourSize from "./components/TourSize";
import TourMainAfricanCard from "../components/listing/TourMainAfricanCard";
import getAfricanTours from "../actions/getAfricanTours";
import getEuropeanTours from "../actions/getEuropeanTours";
import getAsiaTours from "../actions/getAsianTours";
import getUpcomingTours from "../actions/getUpcomingTours";
import { Metadata } from "next";

// Define the interface for component props
interface IParams {
  tourId?: string;
  tourParams: IToursParams;
}

export const metadata: Metadata =  {
  title: "All upcoming Tours",
}
// Define the AllDestinationsPage component as a server component
export default function AllDestinationsPage({ tourParams }: IParams) {
  // Fetch data inside the render function (server component behavior)
  const getToursAndRender = async () => {
    const tours = await getUpcomingTours({ ...tourParams, deal: "upcoming" });
    const currentUser = await getCurrentUser();

    const PAGE_SIZE = 15;
    const currentPage = 1;
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const visibleTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(startIndex, startIndex + PAGE_SIZE);

    const products: any = [];

    // Check if there are no listings, display EmptyState component
    if (visibleTours.length === 0) {
      return <EmptyState showReset />;
    }

    const totalPages = Math.ceil(tours.length / PAGE_SIZE);

    return (
      <div>
        <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
          <h1 className="alldestinations-white-main">
            Prime<span className="color-span-green"> Upcoming Tour</span>
          </h1>
        </div>
        <Container>
          <div className="flex flex-col gap-1 pt-9">
          <p className="text-md text-neutral-600 leading-8 text-md w-full text-justify">Experience a remarkable upcoming global adventure with our premier tour selection. Meticulously curated by experts, these journeys transport you to sought-after destinations across the continent. From breathtaking landscapes in the Himalayas to cultural immersions in vibrant Tokyo, immerse yourself in opulent experiences filled with natural wonders, architectural masterpieces, and rich heritage. Traverse through verdant countryside, majestic temples, and ancient ruins, revealing the essence of globe&lsquo;s diverse landscapes and captivating cultures.</p>
          </div>
        </Container>
        <Container>
          <div className="py-6">
            <hr />
          </div>
        </Container>
        <Container>
          <div className="flex flex-row justify-between items-center pb-11">
            <div className="flex font-bold flex-row gap-40 items-center">
              <div className="filter-bg-color rounded-2xl items-center py-2 pl-2 pr-6 text-start all-destination-filter">
                <p>Filter Results</p>
              </div>
              <div className="font-semibold text-xl">{visibleTours.length} Tours</div>
            </div>
            <div>
              <Sort products={products} />
            </div>
          </div>
        </Container>
        <Container>
          <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            <div className="col-span-1 flex flex-col gap-6 all-destination-products">
              <Contients products={products} />
              <TourStyles products={products} />
              <TourOperators products={products} />
              <TourSize products={products}/>
            </div>
            <div className="col-span-4 all-destination-tour-main-card">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
                {/* Map through the visible listings array and render ListingCard components */}
                {visibleTours.map((tour: any) => (
                  <TourMainCard
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
              {/* Pagination */}
              <div className="flex justify-center items-center mt-4">
                {currentPage > 1 && (
                  <Link href={`/alldestinations?page=${currentPage - 1}`}>
                    <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
                  </Link>
                )}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Link key={index} href={`/alldestinations?page=${index + 1}`}>
                    <p className={`mx-2 p-2 ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"}`}>
                      {index + 1}
                    </p>
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link href={`/alldestinations?page=${currentPage + 1}`}>
                    <p className="mx-2 p-2 bg-gray-500 text-white">Next</p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  };

  // Return the result of the render function
  return getToursAndRender();
}