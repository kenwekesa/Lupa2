// 'use client'

// import React, { useCallback, useEffect, useState } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import Image from 'next/image';
// import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
// import Link from 'next/link';
// import { safeReservation, SafeUser, safeLand, safeCounty, safeListing, safeProperty } from '@/app/types';
// import './embla.css';

// interface ListingCardProps {
//   data: safeCounty[] | safeCounty;
//   datas: safeProperty[] | safeProperty;
//   reservation?: safeReservation;
//   onAction?: (id: string) => void;
//   disabled?: boolean;
//   actionLabel?: string;
//   actionId?: string;
//   currentUser?: SafeUser | null;
// }

// const Emblaland: React.FC<ListingCardProps> = ({
//   data,
//   datas,
//   reservation,
//   onAction,
//   disabled,
//   actionLabel,
//   actionId = "",
//   currentUser
// }) => {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const scrollPrev = useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev();
//   }, [emblaApi]);

//   const scrollNext = useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext();
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setSelectedIndex(emblaApi.selectedScrollSnap());
//     };

//     onSelect(); // Set initial selected index

//     emblaApi.on('select', onSelect);

//     return () => {
//       if (emblaApi) {
//         emblaApi.off('select', onSelect);
//       }
//     };
//   }, [emblaApi, setSelectedIndex]);

//   // Ensure data and datas are arrays
//   const dataArray = Array.isArray(data) ? data : [data];
//   const datasArray = Array.isArray(datas) ? datas : [datas];

//   // Create a map of county counts from safeListing
//   const countyCountMap: { [key: string]: number } = datasArray.reduce((acc, listing) => {
//     if (listing.county) {
//       acc[listing.county] = (acc[listing.county] || 0) + 1;
//     }
//     return acc;
//   }, {} as { [key: string]: number });

//   // Filter and map dataArray to include only counties that appear in both arrays
//   const filteredDataArray = dataArray.filter(county => county.county && countyCountMap[county.county]);

//   // Chunk the data array into groups of six
//   const chunkedData = filteredDataArray.reduce((acc, _, index, array) => {
//     if (index % 6 === 0) {
//       acc.push(array.slice(index, index + 6));
//     }
//     return acc;
//   }, [] as safeCounty[][]);

//   return (
//     <div className="embla">
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container">
//           {chunkedData.map((slide, slideIndex) => (
//             <div key={slideIndex} className="embla__slide grid grid-cols-6 gap-4">
//               {slide.map((offer, cardIndex) => {
//                 const listingCount = offer.county ? countyCountMap[offer.county] : 0;
//                 return (
//                   <div key={cardIndex} className="grid-cols-1 pb-4 relative">
//                     <div className="h-[20vh] w-full mx-auto shadow-lg rounded-lg mb-4 relative">
//                       <Link href={`/offer/${offer.id}`} className='text-black'>
//                         <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
//                         <Image src={offer.imageSrc} width={300} height={300} alt="Image" className="h-full w-full shadow-sm rounded-lg object-cover" />
//                       </Link>
//                     </div>
//                     <div className="text-start relative">
//                       <p className="text-sm text-gray-600 pb-1">
//                         <Link href={`/offer/${offer.id}`} className='text-black'>{offer.county}</Link>
//                       </p>
//                       <p className="text-sm text-gray-600 pb-1">
//                         <Link href={`/offer/${offer.id}`} className='text-black'>{listingCount} properties</Link>
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="embla__dots">
//         {chunkedData.map((_, index) => (
//           <button
//             key={index}
//             className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
//             onClick={() => emblaApi && emblaApi.scrollTo(index)}
//           />
//         ))}
//       </div>
//       <button className="embla__prev text-black pt-3" onClick={scrollPrev}>
//         <CiCircleChevLeft size={32} />
//       </button>
//       <button className="embla__next text-black pt-3" onClick={scrollNext}>
//         <CiCircleChevRight size={32} />
//       </button>
//     </div>
//   );
// };

// export default Emblaland;


'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import Link from 'next/link';
import { safeReservation, SafeUser, safeCounty, safeListing, safeProperty } from '@/app/types';
import './embla.css';

interface ListingCardProps {
  data: safeCounty[] | safeCounty;
  datas: safeProperty[] | safeProperty;
  reservation?: safeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const Emblaland: React.FC<ListingCardProps> = ({
  data,
  datas,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect(); // Set initial selected index

    emblaApi.on('select', onSelect);

    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
      }
    };
  }, [emblaApi, setSelectedIndex]);

  // Ensure data and datas are arrays
  const dataArray = Array.isArray(data) ? data : [data];
  const datasArray = Array.isArray(datas) ? datas : [datas];

  // Create a map of county counts from safeListing
  const countyCountMap: { [key: string]: number } = datasArray.reduce((acc, listing) => {
    if (listing.county) {
      acc[listing.county] = (acc[listing.county] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  // Filter and map dataArray to include only counties that appear in both arrays
  const filteredDataArray = dataArray.filter(county => county.county && countyCountMap[county.county]);

  // Chunk the data array into groups of six
  const chunkedData = filteredDataArray.reduce((acc, _, index, array) => {
    if (index % 6 === 0) {
      acc.push(array.slice(index, index + 6));
    }
    return acc;
  }, [] as safeCounty[][]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {chunkedData.map((slide, slideIndex) => (
            <div key={slideIndex} className="embla__slide grid grid-cols-6 gap-4">
              {slide.map((offer, cardIndex) => {
                const listingCount = offer?.county ? countyCountMap[offer.county] : 0;
                return (
                  <div key={cardIndex} className="grid-cols-1 pb-4 relative">
                    <div className="h-[20vh] w-full mx-auto shadow-lg rounded-lg mb-4 relative">
                      <Link href={{ pathname: '/property-', query: { county: offer.county }}} className='text-black'>
                        <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                        <Image src={offer.imageSrc} width={300} height={300} alt="Image" className="h-full w-full shadow-sm rounded-lg object-cover" />
                      </Link>
                    </div>
                    <div className="text-start relative">
                      <p className="text-sm text-gray-600 pb-1">
                        <Link href={{ pathname: '/property-', query: { county: offer.county }}} className='text-black'>{offer?.county}</Link>
                      </p>
                      <p className="text-sm text-gray-600 pb-1">
                        <Link href={{ pathname: '/property-', query: { county: offer.county }}} className='text-black'>{listingCount} properties</Link>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="embla__dots">
        {chunkedData.map((_, index) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>
      <button className="embla__prev text-black pt-3" onClick={scrollPrev}>
        <CiCircleChevLeft size={32} />
      </button>
      <button className="embla__next text-black pt-3" onClick={scrollNext}>
        <CiCircleChevRight size={32} />
      </button>
    </div>
  );
};

export default Emblaland;
