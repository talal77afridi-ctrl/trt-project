'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from './product-card';
import { haseneaProducts, HaseneaProduct } from '@/data/products/haseena/haseena-products';

interface FilterState {
  category: string[];
  priceRange: [number, number];
  fabric: string[];
  color: string[];
  rating: number;
}

interface ProductListingProps {
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating';
  products?: HaseneaProduct[];
  basePath?: string;
  mobileControlMode?: 'full' | 'secondaryOnly';
}

export function ProductListing({
  sortBy = 'newest',
  products = haseneaProducts,
  basePath = '/products/haseena',
  mobileControlMode = 'full',
}: ProductListingProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [10000, 50000],
    fabric: [],
    color: [],
    rating: 0,
  });

  const [currentSort, setCurrentSort] = useState(sortBy);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (filters.category.length > 0) {
      result = result.filter(p => filters.category.includes(p.category));
    }

    if (filters.fabric.length > 0) {
      result = result.filter(p => filters.fabric.includes(p.fabric));
    }

    if (filters.color.length > 0) {
      result = result.filter(p => filters.color.includes(p.color));
    }

    result = result.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.rating > 0) {
      result = result.filter(p => p.rating >= filters.rating);
    }

    // Apply sorting
    switch (currentSort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for 'newest'
        break;
    }

    return result;
  }, [filters, currentSort, products]);

  return (
    <div className="min-w-0">
      <div className="mb-4 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <button
          className={`${mobileControlMode === 'secondaryOnly' ? 'hidden lg:flex' : 'flex'} shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] border border-[#d6d8db] bg-white px-3.5 py-2 text-[14px] text-[#383f49]`}
        >
          Category
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className={`${mobileControlMode === 'secondaryOnly' ? 'hidden lg:flex' : 'flex'} h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] border border-[#d6d8db] bg-white text-[#383f49]`}
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
            <path d="M4 6h12M6.5 10h7M8.5 14h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className={`${mobileControlMode === 'secondaryOnly' ? 'hidden lg:flex' : 'flex'} shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] border border-[#d6d8db] bg-white px-3.5 py-2 text-[14px] text-[#383f49]`}
        >
          Sort By
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className={`${mobileControlMode === 'secondaryOnly' ? 'hidden lg:flex' : 'flex'} shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] border border-[#d6d8db] bg-white px-3.5 py-2 text-[14px] text-[#383f49]`}
        >
          In-stock
          <span className="relative h-6 w-11 rounded-full bg-[#e5e7eb]">
            <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
          </span>
        </button>
        <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] border border-[#d6d8db] bg-white px-3.5 py-2 text-[14px] text-[#383f49]">Fabric</button>
        <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] border border-[#d6d8db] bg-white px-3.5 py-2 text-[14px] text-[#383f49]">Price</button>
        <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] border border-[#d6d8db] bg-white px-3.5 py-2 text-[14px] text-[#383f49]">Size</button>
        <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] border border-[#d6d8db] bg-white px-3.5 py-2 text-[14px] text-[#383f49]">Color (1)</button>
        <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] border border-[#d6d8db] bg-white px-3.5 py-2 text-[14px] text-[#383f49]">Season</button>
      </div>

      <div className="mb-4 hidden items-center justify-end gap-3 sm:flex">
        <span className="text-[14px] text-[#5a6371]">Sort by:</span>
        <select
          value={currentSort}
          onChange={(e) => setCurrentSort(e.target.value as any)}
          className="rounded-[11px] border border-[#d6d8db] bg-white px-4 py-2 text-[14px] text-[#383f49]"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} basePath={basePath} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21l-4.35-4.35m0 0A7.5 7.5 0 103.305 3.305m0 0A7.5 7.5 0 0020 20z" />
            </svg>
            <p className="text-gray-600 text-lg font-medium mb-4">No products found</p>
            <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or sort options</p>
            <button
              onClick={() => setFilters({
                category: [],
                priceRange: [10000, 50000],
                fabric: [],
                color: [],
                rating: 0,
              } as FilterState)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
    </div>
  );
}
