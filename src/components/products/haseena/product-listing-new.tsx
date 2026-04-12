'use client';

import { useState, useMemo } from 'react';
import { ProductFilters } from './product-filters';
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
}

export function ProductListing({ sortBy = 'newest' }: ProductListingProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [10000, 50000],
    fabric: [],
    color: [],
    rating: 0,
  });

  const [currentSort, setCurrentSort] = useState(sortBy);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...haseneaProducts];

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
  }, [filters, currentSort]);

  return (
    <div className="flex gap-8 -mx-4 px-4">
      {/* Sidebar Filters */}
      <div className="w-64 flex-shrink-0">
        <ProductFilters onFilterChange={setFilters} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Toolbar */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 font-medium">Filters</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Sort by:</span>
            <select
              value={currentSort}
              onChange={(e) => setCurrentSort(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-50 transition-colors"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
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
    </div>
  );
}
