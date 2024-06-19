// 'use client'
// import { useState, useEffect } from "react";
// import getCurrentUser from "../actions/getCurrentUsers";
// import getTours, { IToursParams } from "../actions/getTours";
// import OfferMainCard from "../components/listing/OfferMainCard";
// import EmptyState from "../components/container/EmptyState";

// interface TourComponentProps {
//   tourParams: IToursParams;
// }

// const TourComponent: React.FC<TourComponentProps> = ({ tourParams }) => {
//   const [tours, setTours] = useState<any[]>([]);
//   const [visibleTours, setVisibleTours] = useState<any[]>([]);
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [displayCount, setDisplayCount] = useState(2);

//   useEffect(() => {
//     const fetchToursAndUser = async () => {
//       const fetchedTours = await getTours(tourParams);
//       const fetchedCurrentUser = await getCurrentUser();
//       setTours(fetchedTours);
//       setCurrentUser(fetchedCurrentUser);
//       setVisibleTours(fetchedTours.slice(0, displayCount));
//     };

//     fetchToursAndUser();
//   }, [tourParams, displayCount]);

//   const handleLoadMore = () => {
//     setDisplayCount(prevCount => prevCount + 2);
//     setVisibleTours(tours.slice(0, displayCount + 2));
//   };

//   if (visibleTours.length === 0) {
//     return <EmptyState showReset />;
//   }

//   return (
//     <div>
//       {visibleTours.map((tour: any) => (
//         <OfferMainCard
//           currentUser={currentUser ? {
//             ...currentUser,
//             createdAt: currentUser.createdAt.toISOString(),
//             updatedAt: currentUser.updatedAt.toISOString(),
//             emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
//           } : null}
//           key={tour.id}
//           data={tour}
//         />
//       ))}
//       {visibleTours.length < tours.length && (
//         <div className="flex justify-center items-center mt-4">
//           <button onClick={handleLoadMore} className="mx-2 p-2 bg-gray-500 text-white">Load More Tours</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TourComponent;
'use client'
import { useState } from "react";
import getCurrentUser from "../actions/getCurrentUsers";
import getTours, { IToursParams } from "../actions/getTours";
import OfferMainCard from "../components/listing/OfferMainCard";
import EmptyState from "../components/container/EmptyState";

interface TourComponentProps {
  initialTours: any[];
  initialCurrentUser: any;
  tourParams: IToursParams;
}

const TourComponent: React.FC<TourComponentProps> = ({ initialTours, initialCurrentUser, tourParams }) => {
  const [tours, setTours] = useState<any[]>(initialTours);
  const [visibleTours, setVisibleTours] = useState<any[]>(initialTours.slice(0, 2));
  const [currentUser, setCurrentUser] = useState<any>(initialCurrentUser);
  const [displayCount, setDisplayCount] = useState(2);

  const handleLoadMore = () => {
    const newDisplayCount = displayCount + 2;
    setDisplayCount(newDisplayCount);
    setVisibleTours(tours.slice(0, newDisplayCount));
  };

  if (visibleTours.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <div>
      {visibleTours.map((tour: any) => (
        <OfferMainCard
          currentUser={currentUser ? {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
          } : null}
          key={tour.id}
          data={tour}
        />
      ))}
      {visibleTours.length < tours.length && (
        <div className="flex justify-center items-center mt-4">
          <button onClick={handleLoadMore} className="mx-2 p-2 bg-gray-500 text-white">Load More Tours</button>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const tourParams = {}; // get the tourParams from context or default values
  const initialTours = await getTours(tourParams);
  const initialCurrentUser = await getCurrentUser();

  return {
    props: {
      initialTours,
      initialCurrentUser,
      tourParams
    }
  };
}

export default TourComponent;
