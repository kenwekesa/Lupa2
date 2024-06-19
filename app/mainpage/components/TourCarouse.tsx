'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { CiCircleChevLeft } from 'react-icons/ci';
import { CiCircleChevRight } from 'react-icons/ci';
import Link from 'next/link';
import './embla.css';
import "./mobilecarouse.css";
import TourPriceCard from '@/app/components/listing/TourPriceCard';

const EmblaTwo: React.FC<{ tours: any[], currentUser: any }> = ({ tours, currentUser }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  // Chunk the tours array into groups of three
  const chunkedTours = tours.reduce((acc, _, index, array) => {
    if (index % 3 === 0) {
      acc.push(array.slice(index, index + 3));
    }
    return acc;
  }, [] as any[][]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {chunkedTours.map((slide: any, slideIndex: any) => (
            <div key={slideIndex} className="embla__slide grid grid-cols-3 gap-4">
              {slide.map((tour: any, cardIndex: any) => (
                <div key={tour.id} className={`grid-cols-1 pb-4 relative ${cardIndex % 2 === 0 ? 'even-card' : 'odd-card'}`}>
                  <TourPriceCard
                    currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                    } : null}
                    data={tour}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="embla__dots">
        {chunkedTours.map((_: any, index: any) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
            onClick={() => emblaApi && emblaApi.scrollTo(index * 3)}
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

export default EmblaTwo;
