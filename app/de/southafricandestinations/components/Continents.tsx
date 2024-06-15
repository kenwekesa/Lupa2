'use client'
import { useState } from 'react';
import { GiAfrica } from "react-icons/gi";

interface Product {
  id: number;
  name: string;
  price: number;
  length: number;
}

interface ProductListProps {
  products: Product[];
}

const Contients: React.FC<ProductListProps> = ({ products }) => {
  const [sortOption, setSortOption] = useState<string>('popularity');
  const [sortDirection, setSortDirection] = useState<boolean>(true);

  const sortedProducts = (): Product[] => {
    const sorted = products.slice().sort((a, b) => {
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

  const handleSortChange = (option: string): void => {
    if (sortOption === option) {
      setSortDirection(!sortDirection); // Toggle direction if the same option is selected
    } else {
      setSortOption(option);
      setSortDirection(true); // Reset direction when a new option is selected
    }
  };

  return (
    <div className='bg-white outline-none shadow-md py-4 px-2 rounded-xl'>
        <ul>
        <div className='flex flex-row items-center gap-2'>
            <GiAfrica size={24} />  
            <p>Africa</p>      
        </div>
        <div className='py-3'>
          <hr />
        </div>
        <li className='w-full flex flex-col justify-start gap-4'>
          <label className='gap-2 flex flex-row items-center'>
            <input
              type="checkbox"
              checked={sortOption === 'popularity'}
                onChange={() => handleSortChange('popularity')}
                className='p-2 h-5 w-5'
            />
            Kenya
          </label>
          <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={sortOption === 'priceLowestFirst'}
              onChange={() => handleSortChange('priceLowestFirst')}
              className='p-2 h-5 w-5'
            />
            Uganda
          </label>
          <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={sortOption === 'priceHighestFirst'}
              onChange={() => handleSortChange('priceHighestFirst')}
              className='p-2 h-5 w-5'
            />
            Tanzania
          </label>
          <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={sortOption === 'lengthShortestFirst'}
              onChange={() => handleSortChange('lengthShortestFirst')}
              className='p-2 h-5 w-5'
            />
            DRC
          </label>
          <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={sortOption === 'lengthLongestFirst'}
              onChange={() => handleSortChange('lengthLongestFirst')}
              className='p-2 h-5 w-5'
            />
            South Africa
          </label>
        </li>
      </ul>

      <ul>
        {sortedProducts().map((product) => (
          <li key={product.id}>
            {/* Display your product information here */}
            {product.name} - Price: ${product.price} - Length: {product.length} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contients;
