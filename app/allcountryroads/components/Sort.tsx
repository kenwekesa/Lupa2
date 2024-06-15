'use client'
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  length: number;
}

interface ProductListProps {
  products: Product[];
}

const Sort: React.FC<ProductListProps> = ({ products }) => {
  const [sortOption, setSortOption] = useState<string>('popularity');

  const sortedProducts = (): Product[] => {
    switch (sortOption) {
      case 'priceLowestFirst':
        return products.slice().sort((a, b) => a.price - b.price);
      case 'priceHighestFirst':
        return products.slice().sort((a, b) => b.price - a.price);
      case 'lengthShortestFirst':
        return products.slice().sort((a, b) => a.length - b.length);
      case 'lengthLongestFirst':
        return products.slice().sort((a, b) => b.length - a.length);
      default:
        // 'popularity' or default sorting
        return products;
    }
  };

  const handleSortChange = (option: string): void => {
    setSortOption(option);
  };

  return (
    <div>
      <label>
        Sort by:
        <select className='p-2 bg-slate-200 outline-none hover:outline-none text-neutral-800 rounded-xl' value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="popularity">Popularity</option>
          <option value="priceLowestFirst">Price (Lowest First)</option>
          <option value="priceHighestFirst">Price (Highest First)</option>
          <option value="lengthShortestFirst">Length (Shortest First)</option>
          <option value="lengthLongestFirst">Length (Longest First)</option>
        </select>
      </label>

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



export default Sort