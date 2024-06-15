// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import getTours, { IToursParams } from "@/app/actions/getTours";
// import TourMainCard from "@/app/components/listing/TourMainCard";


// interface IParams {
//   tourId?: string;
//   tourParams: IToursParams;
// }


// const TheTours = async ({ tourParams }: IParams) => {

//     const tours = await getTours(tourParams);
//     const currentUser = await getCurrentUser();

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8">
//                 {/* Map through the listings array and render ListingCard components */}
//                 {tours.map((tour: any) => {
//                 return (
//                     <TourMainCard
//                     currentUser={currentUser} // Pass the current user to each ListingCard
//                     key={tour.id} // Use the listing ID as the unique key
//                     data={tour} // Pass the listing data to each ListingCard
//                 />
//             );
//         })}
//     </div>
//   )
// }

// export default TheTours

// import React, { useState, useEffect } from 'react';
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import getTours, { IToursParams, ITour } from "@/app/actions/getTours";
// import TourMainCard from "@/app/components/listing/TourMainCard";

// interface IParams {
//   tourId?: string;
//   tourParams: IToursParams;
// }

// const PAGE_SIZE = 15;

// const TheTours = ({ tourParams }: IParams) => {
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [tours, setTours] = useState<ITour[]>([]);
//   const [currentUser, setCurrentUser] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = await getCurrentUser();
//         setCurrentUser(user);

//         const response = await getTours({ ...tourParams, page: currentPage, pageSize: PAGE_SIZE });
//         setTours(response.data);
//         setTotalPages(Math.ceil(response.total / PAGE_SIZE));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [currentPage, tourParams]);

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8">
//         {/* Map through the listings array and render ListingCard components */}
//         {tours.map((tour: any) => (
//           <TourMainCard
//             currentUser={currentUser}
//             key={tour.id}
//             data={tour}
//           />
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4">
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-white'}`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TheTours;
