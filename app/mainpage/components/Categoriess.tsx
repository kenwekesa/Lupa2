'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaGlobe, FaGlobeEurope } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { GiAfrica, GiEarthAmerica, GiKangaroo } from 'react-icons/gi';
import { BsGlobeAsiaAustralia, BsGlobeCentralSouthAsia } from 'react-icons/bs';

// Updated CategoryBoxProps definition
interface CategoryBoxProps {
  label: string;
  image: string;
  link: string;
  onClick: () => void;
}

// Updated CategoryBox component
const UpdatedCategoryBox: React.FC<CategoryBoxProps> = ({ label, image, link, onClick }) => {

  const router = useRouter();

  const handleImageClick = () => {
    router.push(link);
    onClick(); // Call the onClick handler if needed
  };

  return (
    <div className="col-span-1 cursor-pointer group flex flex-col gap-2 w-full" onClick={handleImageClick}>
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <Image
          fill
          alt={label}
          src={image}
          className="object-cover h-full w-full transition group-hover:scale-110"
        />
      </div>
      <div className='country-labels shadow-xl text-white p-1 font-semibold'>
        {label}
      </div>
    </div>
  );
};

// Updated categoriesData structure
interface ContinentData {
  icon: React.ReactNode;
  countries: {
    label: string;
    image: string;
    link: string;
  }[];
  links: string; // Add a links property for the continent
}

const categoriesData: { [key: string]: ContinentData } = {
  Africa: {
    icon: <GiAfrica size={25} />,
    countries: [
      { label: 'Uganda', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706656723/mmsi6lgaumup7a6tcouf.jpg', link: '/de/ugandanestinations' },
      { label: 'Tanzania', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706655863/ohwvocfyquoo4fgjwf9g.jpg', link: '/de/tanzaniandestinations' },
      { label: 'Kenya', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706654682/vjdst2i5en7fsf6ooswn.jpg', link: '/de/kenyandestinations' },
      { label: 'South Africa', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706656153/dstqm5cnqfjwdqa70r2w.jpg', link: '/de/southafricandestinations' },
    ],
    links: "/allfricandestination",
  },
  Europe: {
    icon: <FaGlobeEurope size={25} />,
    countries: [
      { label: 'United Kingdom', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706773529/jdljafu5ypmfpjoyo8fw.jpg', link: '/de/ukdestinations' },
      { label: 'Spain', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706773533/xrhli2kvf8zdgovolutw.jpg', link: '/de/spanishdestinations' },
      { label: 'France', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706773531/w5dxirkp7pfa3xhljuhr.jpg', link: '/de/frenchdestinations' },
      { label: 'Italy', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706801036/k7zlv1w0bz8eohnl6cms.jpg', link: '/de/italiandestinations' },
    ],
    links: "/alleuropeandestination",
  },
  Americas: {
    icon: <GiEarthAmerica size={25} />,
    countries: [
      { label: 'United States', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805881/q2nzdhdev94hg2yzyozq.jpg', link: '/de/usdestinations' },
      { label: 'Canada', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805878/sikqsj5659wtdsoxqg82.jpg', link: '/de/canadiandestinations' },
      { label: 'Mexico', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805879/tz7ijw5c9rz4fhhzpwgd.jpg', link: '/de/mexicandestinations' },
      { label: 'Brazil', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706805877/uadyoxdygrwsu9lnhpkl.jpg', link: '/de/braziliandestinations' },
    ],
    links: "/allamericandestination",
  },
  Asia: {
    icon: <BsGlobeAsiaAustralia size={25} />,
    countries: [
      { label: 'Singapore', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807737/zuwb65myobne2mtppa0w.jpg', link: '/de/singaporiandestinations' },
      { label: 'China', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807736/ukxnjpnkrxu9kcjcn1de.jpg', link: '/de/chineasedestinations' },
      { label: 'India', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807735/yttxdq5hpem1rsjovq30.jpg', link: '/de/indiandestinations' },
      { label: 'Japan', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706807736/dzerbzzgml29weuna4el.jpg', link: '/de/japaneasedestinations' },
    ],
    links: "/allasiandestination",
  },
  Australia: {
    icon: <GiKangaroo size={25} />,
    countries: [
      { label: 'Sydney', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809531/fg2j3slmxhzlqgmufotn.jpg', link: '/de/australiandestinations' },
      { label: 'Melbourne', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809529/oiosbnercqtsjkc4yhmy.jpg', link: '/de/australiandestinations' },
      { label: 'Hobart', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809531/jdbwjdv9p2ghba9xccr1.jpg', link: '/de/australiandestinations' },
      { label: 'Adelaide', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706809532/gbklrppldg8z2kkaf60p.jpg', link: '/de/australiandestinations' },
    ],
    links: "/allaustraliandestination",
  },
  MiddleEast: {
    icon: <BsGlobeCentralSouthAsia size={25} />,
    countries: [
      { label: 'Saudi Arabia', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/bc6gwxxmglfkpmqxowys.jpg', link: '/de/sadestinations' },
      { label: 'Egypt', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/pleheggycj6zuna2cjg0.jpg', link: '/de/egyptiandestinations' },
      { label: 'UAE', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/lbx7mjgfmhzs6ecxivuc.jpg', link: '/de/uaedestinations' },
      { label: 'Israel', image: 'https://res.cloudinary.com/doamgn1l0/image/upload/v1706813701/y5rbgikqyqyge7oo3xwh.jpg', link: '/de/israelidestinations' },
    ],
    links: "/allmiddleeastdestination",
  },
  // Add similar structures for other continents

};



const Categoriess = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedContinent, setSelectedContinent] = useState<string>('Africa');
  const [selectedCountries, setSelectedCountries] = useState(
    categoriesData.Africa.countries
  ); // Initialize with Africa's countries
  const isHotelPage = pathname === '/';

  if (!isHotelPage) {
    return null;
  }

  const handleHeaderClick = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedCountries(categoriesData[continent].countries);
  };

  const handleCategoryClick = (country: { label: string; link: string }) => {
    router.push(country.link);
  };

  return (
    <div className="grid-cols-page-main place-items-center">
      <div className="country-header-m flex flex-row gap-40">
        {/* <div className="country-header-m grid sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 w-full sm:gap-8 md:gap-10 lg:gap-40 xl:gap-40 2xl:gap-40 max-2xl:gap-40"></div> */}
        {Object.keys(categoriesData).map((continent) => (
          <div
            className="flex gap-2 flex-row cursor-pointer"
            key={continent}
            onClick={() => handleHeaderClick(continent)}
          >
            {continent === selectedContinent ? (
              <>{categoriesData[continent].icon}</>
            ) : (
              React.isValidElement(categoriesData[continent].icon) ? (
                React.cloneElement(
                  categoriesData[continent].icon as React.ReactElement<any>,
                  { color: "gray", size: 25 }
                )
              ) : (
                <span>Icon Not Found</span>
              )
            )}
            {continent}
          </div>
        ))}
      </div>
      <div className="inset-0">
        <div className="py-4 full-width-container">
          <hr />
        </div>
        <div className="full-width-container grid-cols-page-s grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8 w-full">
          {selectedCountries.map((country) => (
            <UpdatedCategoryBox
              key={country.label}
              label={country.label}
              image={country.image}
              link={country.link}
              onClick={() => handleCategoryClick(country)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categoriess;
