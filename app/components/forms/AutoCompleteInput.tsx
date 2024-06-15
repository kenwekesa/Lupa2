import getTours from '@/app/actions/getTours';
import { safeTour } from '@/app/types';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

// Define the Tour interface
interface Tour {
  country: string;
  city: string;
  // Add other properties as needed
}

const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  // Add more countries here
];

interface AutocompleteInputProps {
  searchDestination:string;
  setSearchDestination:React.Dispatch<React.SetStateAction<string>>;
}


const AutocompleteInput: React.FC<AutocompleteInputProps> = ({searchDestination, setSearchDestination}) => {
  const [countries, setCountries] = useState<string[]>([]);
 const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

 //const [filteredCountries, setFilteredCountries] = useState<string[]>(countryList);

  const [inputValue, setInputValue] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    // Fetch the tours data
    axios
    .get<Tour[]>('/api/tours')
    .then((response) => {
      console.log("cities response", response) 
      const tours = response.data;
      // Extract the unique countries from the tours data
      const uniqueCountries = [...new Set(tours.map((tour) => tour.country))];
      setCountries(uniqueCountries);
    })
    .catch((error) => console.error(error));
    // getTours({})
    //   .then((tours) => {
    //     // Extract the unique countries from the tours data
    //     const uniqueCountries = [...new Set(tours.map((tour) => tour.country))].filter((country): country is string => country !== null);
    //     setCountries(uniqueCountries);
    //     console.log('Unique Countries', uniqueCountries)
    //   })
    //   .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setSearchDestination(inputValue)

    const filtered = countries.filter((country) =>
      country.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setShowDropdown(false);
  };

  const handleCountryClick = (country: string) => {
    setInputValue(country);
    setSearchDestination(country)
    setShowDropdown(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Enter a country"
        ref={inputRef}
        // className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        className="w-full px-4 py-2 rounded-md outline-none"

      />
      {showDropdown && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-2">
            {filteredCountries.map((country) => (
              <li
                key={country}
                onClick={() => handleCountryClick(country)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;