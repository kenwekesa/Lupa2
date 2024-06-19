'use client';
import { useState } from 'react';
import { MdOutlineLocalOffer } from "react-icons/md";

interface Product {
  id: number;
  name: string;
  length: number;
  category: string;
}

interface ProductListProps {
  products: Product[];
}

const TourOperators: React.FC<ProductListProps> = ({ products }) => {
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
    <div className='border-[1px] border-solid border-neutral-300 outline-none shadow-sm py-4 px-2 rounded-xl'>
      <ul>
        <div className='flex flex-row items-center gap-2'>
          <MdOutlineLocalOffer size={25} />
          <p>Offers Types</p>
          </div>
        <div className='py-3'>
          <hr />
        </div>
        <li className='w-full flex flex-col justify-start gap-4'>
          <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Devance')}
              onChange={() => handleCategoryChange('Devance')}
              className='p-2 h-5 w-5'
            />
            Stays
            </label>
            <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Burric')}
              onChange={() => handleCategoryChange('Burric')}
              className='p-2 h-5 w-5'
            />
            Property sales
            </label>
           <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Collete')}
              onChange={() => handleCategoryChange('Collete')}
              className='p-2 h-5 w-5'
            />
            Property rentals
            </label>
             <label className='gap-2 text-sm flex flex-row items-center'>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Contiki')}
              onChange={() => handleCategoryChange('Contiki')}
              className='p-2 h-5 w-5'
            />
            Land sales
            </label>
        </li>
      </ul>

      <ul>
        {filteredProducts().map((product) => (
          <li key={product.id}>
            {product.name} - Length: {product.length} units - Category: {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourOperators;
