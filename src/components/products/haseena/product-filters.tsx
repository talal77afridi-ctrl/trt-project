'use client';

import { useState } from 'react';
import { formatCurrencyFromPKR } from '@/lib/currency';
import { useSelectedCurrency } from '@/hooks/use-selected-currency';

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  category: string[];
  priceRange: [number, number];
  fabric: string[];
  color: string[];
  rating: number;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const selectedCurrency = useSelectedCurrency();
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [10000, 30000],
    fabric: [],
    color: [],
    rating: 0,
  });

  const handleCategoryChange = (category: string) => {
    const updated = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    const newFilters = { ...filters, category: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFabricChange = (fabric: string) => {
    const updated = filters.fabric.includes(fabric)
      ? filters.fabric.filter(f => f !== fabric)
      : [...filters.fabric, fabric];
    const newFilters = { ...filters, fabric: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleColorChange = (color: string) => {
    const updated = filters.color.includes(color)
      ? filters.color.filter(c => c !== color)
      : [...filters.color, color];
    const newFilters = { ...filters, color: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const categories = [
    'Women - Clothing',
    'Women - Eastern Ready to wear',
    'Women - Eastern Stitched',
    'Women - Unstitched',
    'Women - Kurta Set',
  ];

  const fabrics = [
    'Cotton Silk Blend',
    'Pure Silk',
    'Cotton Linen',
    'Organza Silk',
    'Embroidered Silk',
    'Premium Cotton',
  ];

  const colors = [
    'Maroon',
    'Grey',
    'Navy',
    'Gold',
    'Pink',
    'Blue',
    'Mint Green',
    'Cream',
    'Terracotta',
    'Purple',
    'Burgundy',
  ];

  return (
    <div className="sticky top-24 space-y-6">
      {/* Category Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <button className="w-full flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">Category</h3>
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="space-y-3 border-t border-gray-100 pt-4">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="font-bold text-gray-900 text-sm">Price Range</h3>
        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div>
            <label className="text-xs text-gray-600 font-medium">Min: {formatCurrencyFromPKR(filters.priceRange[0], selectedCurrency)}</label>
            <input
              type="range"
              min="10000"
              max="50000"
              value={filters.priceRange[0]}
              onChange={(e) => {
                const newFilters = {
                  ...filters,
                  priceRange: [Number(e.target.value), filters.priceRange[1]] as [number, number],
                };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 font-medium">Max: {formatCurrencyFromPKR(filters.priceRange[1], selectedCurrency)}</label>
            <input
              type="range"
              min="10000"
              max="50000"
              value={filters.priceRange[1]}
              onChange={(e) => {
                const newFilters = {
                  ...filters,
                  priceRange: [filters.priceRange[0], Number(e.target.value)] as [number, number],
                };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Fabric Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="font-bold text-gray-900 text-sm">Fabric</h3>
        <div className="space-y-3 border-t border-gray-100 pt-4 max-h-48 overflow-y-auto">
          {fabrics.map(fabric => (
            <label key={fabric} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.fabric.includes(fabric)}
                onChange={() => handleFabricChange(fabric)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{fabric}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="font-bold text-gray-900 text-sm">Color</h3>
        <div className="space-y-3 border-t border-gray-100 pt-4 max-h-48 overflow-y-auto">
          {colors.map(color => (
            <label key={color} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.color.includes(color)}
                onChange={() => handleColorChange(color)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="font-bold text-gray-900 text-sm">Rating</h3>
        <div className="space-y-3 border-t border-gray-100 pt-4">
          {[5, 4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => {
                  const newFilters = { ...filters, rating };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="w-4 h-4"
              />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? 'fill-yellow-400' : 'fill-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{rating}+</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          const cleared: FilterState = {
            category: [],
            priceRange: [10000, 30000],
            fabric: [],
            color: [],
            rating: 0,
          };
          setFilters(cleared);
          onFilterChange(cleared);
        }}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
      >
        Clear All Filters
      </button>
    </div>
  );
}
