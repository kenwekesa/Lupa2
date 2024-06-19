'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmptyState from "@/app/components/container/EmptyState";
import StayMainCard from "@/app/components/listing/StayMainCard";
import Container from "@/app/components/container/Container";
import Sort from "./components/Sort";
import Continents from "./components/Continents";
import TourStyles from "./components/TourStyles";
import TourOperators from "./components/TourOperators";
import TourSize from "./components/TourSize";
import { useSearchParams } from 'next/navigation';
import CountyMainCard from "@/app/components/listing/CountyMainCard";
import Loader from "../components/container/Loader";

interface IParams {
  tourId?: string;
  tourParams: any;
  type?: string; // Make county optional
}

// export const metadata: Metadata = {
//   title: "Nairobi stays",
// };

export default function Stay({ tourParams }: IParams) {
  const searchParams = useSearchParams();
  const type = searchParams ? searchParams.get('type') : null;
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(2); // Initial visible count

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/stays', { params: tourParams });
        setTours(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [tourParams]);

  if (loading) return <div><Loader />...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const normalizedCounty = type ? type.toLowerCase() : ""; // Normalize county safely
  const listingsPremium = tours.filter(listing => listing.type && listing.type.toLowerCase() === normalizedCounty);

  const visibleTours = listingsPremium.slice(0, visibleCount);

  const products: any = [];

  if (visibleTours.length === 0) {
    return <EmptyState showReset />;
  }

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 2);
  };

  return (
    <div>
      <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="alldestinations-white-main">
          <span className="text-white">Our {type || "luxurious"} stays</span>
        </h1>
      </div>
      <Container>
        <div className="flex flex-row justify-between items-center pt-10 pb-3">
          <div className="flex font-bold flex-row gap-40 items-center">
            <div className="items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
              <p className="">Filter Results:</p>
            </div>
            <div className="font-semibold text-xl">{visibleTours.length} Properties</div>
          </div>
          <div>
            <Sort products={products} />
          </div>
        </div>
      </Container>
      <Container>
        <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          <div className="col-span-1 flex flex-col gap-6 all-destination-products">
            <Continents products={products} />
            <TourStyles products={products} />
            <TourOperators products={products} />
            <TourSize products={products} />
          </div>
          <div className="col-span-4 all-destination-tour-main-card">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
              {visibleTours.map((tour: any) => (
                <CountyMainCard
                  key={tour.id}
                  data={tour}
                />
              ))}
            </div>
            {visibleCount < listingsPremium.length && (
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={loadMore}
                  className="mx-2 px-10 py-3 text-md border-[1px] border-solid border-green-900 text-green-900 hover:bg-green-900 rounded-lg hover:text-white"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
