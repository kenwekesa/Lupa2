'use client';
import { useState } from 'react';
import { GiAfrica, GiSpeedBoat } from "react-icons/gi";

interface Product {
  id: number;
  name: string;
  length: number;
  category: string;
}

interface ProductListProps {
  products: Product[];
}

const TourStyles: React.FC<ProductListProps> = ({ products }) => {
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
          <GiSpeedBoat size={25} />
          <p>Tour Categories</p>
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
            Adventure
            </label>
            <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('discovery')}
              onChange={() => handleCategoryChange('discovery')}
              className='p-2 h-5 w-5'
            />
            Discovery Journey
            </label>
           <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('wildlife')}
              onChange={() => handleCategoryChange('wildlife')}
              className='p-2 h-5 w-5'
            />
            Wildlife
            </label>
             <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('regional')}
              onChange={() => handleCategoryChange('regional')}
              className='p-2 h-5 w-5'
            />
            Regional
                  </label>
            <label className='gap-2 flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('local')}
              onChange={() => handleCategoryChange('local')}
              className='p-2 h-5 w-5'
            />
            Local Escape
            </label>
            <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('hiking')}
              onChange={() => handleCategoryChange('hiking')}
              className='p-2 h-5 w-5'
            />
            Hiking
            </label>
           <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('yatch')}
              onChange={() => handleCategoryChange('yatch')}
              className='p-2 h-5 w-5'
            />
            Yatch
            </label>
             <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('solo')}
              onChange={() => handleCategoryChange('solo')}
              className='p-2 h-5 w-5'
            />
            Solo Tours
                  </label>
            <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('country')}
              onChange={() => handleCategoryChange('country')}
              className='p-2 h-5 w-5'
            />
            Country Roads
            </label>
            <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('easy')}
              onChange={() => handleCategoryChange('easy')}
              className='p-2 h-5 w-5'
            />
            Easy Pace
            </label>
           <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('camping')}
              onChange={() => handleCategoryChange('camping')}
              className='p-2 h-5 w-5'
            />
            Camping
            </label>
            <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('game')}
              onChange={() => handleCategoryChange('game')}
              className='p-2 h-5 w-5'
            />
            Game Pack
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

export default TourStyles;
