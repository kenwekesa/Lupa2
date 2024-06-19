'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmptyState from "@/app/components/container/EmptyState";
import StayMainCard from "@/app/components/listing/StayMainCard";
import Container from "@/app/components/container/Container";
import { useSearchParams } from 'next/navigation';
import CountyMainCard from "@/app/components/listing/CountyMainCard";
import Loader from "../components/container/Loader";

interface IParams {
  tourId?: string;
  tourParams: any;
  county?: string; // Make county optional
}

export default function Stay({ tourParams }: IParams) {
  const searchParams = useSearchParams();
  const county = searchParams ? searchParams.get('county') : null;
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12); // Initial visible count
  const [filters, setFilters] = useState({
    town: [],
    category: [],
    type: [],
    offers: [],
    ratings: []
  });
  const [sortOrder, setSortOrder] = useState(''); // State for sorting order

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

  const normalizedCounty = county ? county.toLowerCase() : ""; // Normalize county safely
  const listingsPremium = tours.filter(listing => listing.county && listing.county.toLowerCase() === normalizedCounty);

  // const filteredTours = listingsPremium.filter(tour => {
  //   return (
  //     (filters.town.length === 0 || filters.town.includes(tour.town)) &&
  //     (filters.category.length === 0 || filters.category.includes(tour.category)) &&
  //     (filters.type.length === 0 || filters.type.includes(tour.type)) &&
  //     (filters.offers.length === 0 || filters.offers.includes(tour.offers)) &&
  //     (filters.ratings.length === 0 || filters.ratings.includes(tour.ratings))
  //   );
  // });

  const filteredTours = listingsPremium.filter(tour => {
    return (
      (filters.town.length === 0 || filters.town.includes(tour.town)) &&
      (filters.category.length === 0 || filters.category.includes(tour.category)) &&
      (filters.type.length === 0 || filters.type.includes(tour.type)) &&
      (filters.offers.length === 0 || tour.offers.some(offer => filters.offers.includes(offer))) &&
      (filters.ratings.length === 0 || filters.ratings.includes(tour.ratings))
    );
  });
  

  const sortedTours = filteredTours.sort((a, b) => {
    if (sortOrder === 'lowest') {
      return a.price - b.price;
    } else if (sortOrder === 'highest') {
      return b.price - a.price;
    }
    return 0;
  });

  const visibleTours = sortedTours.slice(0, visibleCount);

  const towns = Array.from(new Set(listingsPremium.map(tour => tour.town))).slice(0, 5);
  const categories = Array.from(new Set(listingsPremium.map(tour => tour.category))).slice(0, 5);
  const types = Array.from(new Set(listingsPremium.map(tour => tour.type))).slice(0, 5);
  // const offers = Array.from(new Set(listingsPremium.map(tour => tour.offers))).slice(0, 5);
  const offers = Array.from(
    new Set(listingsPremium.flatMap(tour => tour.offers))
  ).slice(0, 5);
  
  const ratings = Array.from(new Set(listingsPremium.map(tour => tour.ratings))).slice(0, 5);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const currentFilters = prevFilters[filterType];
      if (currentFilters.includes(value)) {
        return { ...prevFilters, [filterType]: currentFilters.filter(item => item !== value) };
      } else {
        return { ...prevFilters, [filterType]: [...currentFilters, value] };
      }
    });
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (visibleTours.length === 0) {
    return <EmptyState showReset />;
  }

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  return (
    <div>
      <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="alldestinations-white-main">
          <span className="text-white">Stays in {county || "Nairobi"}</span>
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
            <select className="border-[1px] border-solid border-neutral-300 px-4 py-1 rounded-lg" onChange={handleSortChange} value={sortOrder}>
              <option value="">Sort by price</option>
              <option value="lowest">Price: Lowest to Highest</option>
              <option value="highest">Price: Highest to Lowest</option>
            </select>
          </div>
        </div>
      </Container>
      <Container>
        <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          <div className="col-span-1 flex flex-col gap-6 all-destination-products">
            <div className="border-[1px] border-solid border-neutral-300 rounded-lg px-4 py-6">
              <h3 className="font-semibold">Towns</h3>
              <div className="py-1">
                <hr />
              </div>
              {towns.map(town => (
                <div className="flex pt-1 items-center justify-start" key={town}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={town}
                      className="mr-2 h-[20px] w-[20px]"
                      onChange={() => handleFilterChange('town', town)}
                    />
                    <span className="mr-1">{ town}</span>
                  </label>
                </div>
              ))}
              {listingsPremium.length > 5 && (
                <button>View More</button>
              )}
            </div>
            <div className="border-[1px] border-solid border-neutral-300 rounded-lg px-4 py-6">
              <h3 className="font-semibold">Category</h3>
              <div className="py-1">
                <hr />
              </div>
              {categories.map(category => (
                <div className="flex pt-1 items-center justify-start" key={category}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={category}
                      className="mr-2 p-2 h-[20px] w-[20px]"
                      onChange={() => handleFilterChange('category', category)}
                    />
                    <span className="mr-1">{ category}</span>
                  </label>
                </div>
              ))}
              {listingsPremium.length > 5 && (
                <button>View More</button>
              )}
            </div>
            <div className="border-[1px] border-solid border-neutral-300 rounded-lg px-4 py-6">
              <h3 className="font-semibold">Type</h3>
              <div className="py-1">
                <hr />
              </div>
              {types.map(type => (
                <div className="flex pt-1 items-center justify-start" key={type}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={type}
                      className="mr-2 p-2 h-[20px] w-[20px]"
                      onChange={() => handleFilterChange('type', type)}
                    />
                    <span className="mr-1">{type}</span>
                  </label>
                </div>
              ))}
              {listingsPremium.length > 5 && (
                <button>View More</button>
              )}
            </div>
            <div className="border-[1px] border-solid border-neutral-300 rounded-lg px-4 py-6">
              <h3 className="font-semibold">Deal</h3>
              <div className="py-1">
                <hr />
              </div>
              {offers.map(offers => (
                <div className="flex pt-1 items-center justify-start" key={offers}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={offers}
                      className="mr-2 p-2 h-[20px] w-[20px]"
                      onChange={() => handleFilterChange('offers', offers)}
                    />
                    <span className="mr-1">{offers}</span>
                  </label>
                </div>
              ))}
              {listingsPremium.length > 5 && (
                <button>View More</button>
              )}
            </div>
            <div className="border-[1px] border-solid border-neutral-300 rounded-lg px-4 py-6">
              <h3 className="font-semibold">Ratings</h3>
              <div className="py-1">
                <hr />
              </div>
              {ratings.map(ratings => (
                <div className="flex pt-1 items-center justify-start" key={ratings}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={ratings}
                    className="mr-2 p-2 h-[20px] w-[20px]"
                    onChange={() => handleFilterChange('ratings', ratings)}
                  />
                  <span><span className="mr-1">{ratings}</span><span>reviews</span></span>
                </label>
              </div>
              ))}
              {listingsPremium.length > 5 && (
                <button>View More</button>
              )}
            </div>
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
            {visibleCount < filteredTours.length && (
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