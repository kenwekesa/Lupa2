'use client';
import { useState } from 'react';
import { GiAfrica, GiSpeedBoat } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";

interface Product {
  id: number;
  name: string;
  length: number;
  category: string;
}

interface ProductListProps {
  products: Product[];
}

const TourSize: React.FC<ProductListProps> = ({ products }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredProducts = (): Product[] => {
    return selectedCategories.length === 0
      ? products
      : products.filter(product => selectedCategories.includes(product.category));
  };

  const handleCategoryChange = (category: string): void => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  return (
    <div className='bg-white outline-none shadow-md py-4 px-2 rounded-xl'>
      <ul>
        <div className='flex flex-row items-center gap-2'>
          <FaPeopleGroup size={25} />
          <p>Group Size</p>
              </div>
        <div className='py-3'>
          <hr />
        </div>
        <li className='w-full flex flex-col justify-start gap-4'>
          <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('adventure')}
              onChange={() => handleCategoryChange('adventure')}
              className='p-2 h-5 w-5'
            />
            1 - 10 tourists
            </label>
            <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('discovery')}
              onChange={() => handleCategoryChange('discovery')}
              className='p-2 h-5 w-5'
            />
            11 - 20 tourists
            </label>
           <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('wildlife')}
              onChange={() => handleCategoryChange('wildlife')}
              className='p-2 h-5 w-5'
            />
            21 - 30 tourists
            </label>
             <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('regional')}
              onChange={() => handleCategoryChange('regional')}
              className='p-2 h-5 w-5'
            />
            31 - 40 tourists
            </label>
        </li>
        {/* Add similar checkboxes for other categories */}
      </ul>

      <ul>
        {filteredProducts().map((product) => (
          <li key={product.id}>
            {/* Display your product information here */}
            {product.name} - Length: {product.length} units - Category: {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourSize;
