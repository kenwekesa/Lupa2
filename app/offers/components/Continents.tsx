'use client'
import { useRef, useState } from 'react';
import { GiAfrica } from "react-icons/gi";

interface Product {
  id: number;
  name: string;
  price: number;
  length: number;
}

interface ProductListProps {
  products: Product[];
  setMaximumPrice:React.Dispatch<React.SetStateAction<number>>;  
}
 
const Continents: React.FC<ProductListProps> = ({ products, setMaximumPrice }) => {
  const [sortOption, setSortOption] = useState<string>('popularity');
  const [sortDirection, setSortDirection] = useState<boolean>(true);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [tempValue, setTempValue] = useState(500);
  const sliderRef = useRef(null);

  const sortedProducts = (): Product[] => {
    const sorted = products
      .filter(product => product.price <= maxPrice)
      .slice()
      .sort((a, b) => {
        const multiplier = sortDirection ? 1 : -1;
        switch (sortOption) {
          case 'priceLowestFirst':
            return multiplier * (a.price - b.price);
          case 'priceHighestFirst':
            return multiplier * (b.price - a.price);
          case 'lengthShortestFirst':
            return multiplier * (a.length - b.length);
          case 'lengthLongestFirst':
            return multiplier * (b.length - a.length);
          default:
            // 'popularity' or default sorting
            return 0;
        }
      });
    return sorted;
  };


  const handleMouseUp = () => {

    const stepSize = 50; // Set the desired step size here (10 in this case)

    const roundedPrice = Math.round(tempValue / stepSize) * stepSize;  // Round to nearest multiple
    setMaxPrice(roundedPrice);
    setMaximumPrice(roundedPrice)
    setMaxPrice(tempValue);
    // Perform any additional actions when the price changes
    console.log('Price changed to:', tempValue);
  };


  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const stepSize = 50; // Set the desired step size here (10 in this case)

    // const roundedPrice = Math.round((parseInt(e.target.value)) / stepSize) * stepSize;  // Round to nearest multiple
    // setMaxPrice(roundedPrice);
    // setMaximumPrice(roundedPrice)
    setTempValue(parseInt(e.target.value));
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const stepSize = 50; // Set the desired step size here (10 in this case)

  const roundedPrice = Math.round(value / stepSize) * stepSize;  // Round to nearest multiple

  // Update your price state or logic here (assuming `maxPrice` is your state)
  // setMaxPrice(roundedPrice);
  //   if (!isNaN(value)) {
  //     setMaxPrice(roundedPrice);
  //     setMaximumPrice(roundedPrice)
  //   }
   };

  return (
    <div className='border-[1px] border-solid border-neutral-300 outline-none shadow-sm py-4 px-2 rounded-xl'>
      {/* <span>Your budget for the offer:</span> */}
      {/* <div className='py-3'>
        <hr />
      </div> */}
      {/* <div className='flex flex-col'>
        <p>Ksh 0 - Ksh {tempValue}</p>
        <input
          type='range'
          min='0'
          max='1000'
          value={maxPrice}
          // onInput={handlePriceChange}
          onChange={handlePriceChange}
          onMouseUp={handleMouseUp}
          className='w-full'
        />
        <input
          type='number'
          value={maxPrice}
          onChange={handlePriceInputChange}
          className='mt-2 p-2 border rounded'
        />
      </div> */}
      {/* <ul>
        {sortedProducts().map((product) => (
          <li key={product.id}>
            {product.name} - Price: ${product.price} - Length: {product.length} units
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Continents;
