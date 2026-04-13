'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { SearchCatalogProduct, SearchDepartment, searchCatalogProducts } from '@/data/products/search';
import { formatCurrencyFromPKR } from '@/lib/currency';
import { useSelectedCurrency } from '@/hooks/use-selected-currency';

const categoryOptions = ['All', 'Men', 'Women', 'Kids'] as const;

type SearchCategory = (typeof categoryOptions)[number];

interface SearchResultsViewProps {
  initialQuery: string;
  initialCategory: SearchCategory;
}

function filterProducts(products: SearchCatalogProduct[], query: string, category: SearchCategory, inStockOnly: boolean) {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    if (category !== 'All' && product.department !== (category as SearchDepartment)) {
      return false;
    }

    if (inStockOnly && !product.inStock) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return [product.name, product.brand, product.category, ...product.tags]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);
  });
}

export function SearchResultsView({ initialQuery, initialCategory }: SearchResultsViewProps) {
  const selectedCurrency = useSelectedCurrency();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<SearchCategory>(initialCategory);
  const [inStockOnly, setInStockOnly] = useState(false);

  const results = useMemo(
    () => filterProducts(searchCatalogProducts, query, category, inStockOnly),
    [query, category, inStockOnly],
  );

  return (
    <div className="space-y-6">
      <h1 className="text-[1.2rem] font-semibold tracking-tight text-[#111827] sm:text-[1.5rem]">Search Results</h1>

      <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <label className="relative min-w-[126px]">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as SearchCategory)}
            className="h-11 w-full appearance-none rounded-none border border-[#d6d8db] bg-white pl-3 pr-9 text-[15px] text-[#383f49] outline-none sm:rounded-[11px]"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4b5563]" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>
        <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-none border border-[#d6d8db] bg-white px-4 py-2 text-[15px] text-[#383f49] sm:rounded-[11px]">
          Category ({category === 'All' ? '3' : '1'})
        </button>
        <button className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-none border border-[#d6d8db] bg-white text-[#383f49] sm:rounded-[11px]">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M6.5 10h7M8.5 14h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
        <button className="shrink-0 whitespace-nowrap rounded-none border border-[#d6d8db] bg-white px-4 py-2 text-[15px] text-[#383f49] sm:rounded-[11px]">Sort By</button>
        <button
          type="button"
          onClick={() => setInStockOnly((prev) => !prev)}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-none border border-[#d6d8db] bg-white px-4 py-2 text-[15px] text-[#383f49] sm:rounded-[11px]"
        >
          In-stock
          <span className={`relative h-6 w-11 rounded-full transition ${inStockOnly ? 'bg-[#111827]' : 'bg-[#e5e7eb]'}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${inStockOnly ? 'left-[22px]' : 'left-0.5'}`} />
          </span>
        </button>
        <button className="shrink-0 whitespace-nowrap rounded-none border border-[#d6d8db] bg-white px-4 py-2 text-[15px] text-[#383f49] sm:rounded-[11px]">Fabric</button>
        <button className="shrink-0 whitespace-nowrap rounded-none border border-[#d6d8db] bg-white px-4 py-2 text-[15px] text-[#383f49] sm:rounded-[11px]">Price</button>
        <button className="shrink-0 whitespace-nowrap rounded-none border border-[#d6d8db] bg-white px-4 py-2 text-[15px] text-[#383f49] sm:rounded-[11px]">Size</button>
        <button className="shrink-0 whitespace-nowrap rounded-none border border-[#d6d8db] bg-white px-4 py-2 text-[15px] text-[#383f49] sm:rounded-[11px]">Color</button>
        <button className="shrink-0 whitespace-nowrap rounded-none border border-[#d6d8db] bg-white px-4 py-2 text-[15px] text-[#383f49] sm:rounded-[11px]">Brands</button>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <Link key={product.id} href={`/search/${product.id}`} className="group product-card block cursor-pointer">
              <div className="relative overflow-hidden rounded-none bg-[#f0f2f4] sm:rounded-[10px]" style={{ aspectRatio: '1/1.05' }}>
                <span className="absolute left-2 top-2 z-10 rounded-none bg-[#eb1f24] px-2 py-0.5 text-[12px] font-semibold text-white sm:rounded-[6px]">-{product.discount}%</span>
                <span className="absolute right-2 top-2 z-10 text-[#c5c7cc]" aria-hidden="true">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="product-vibrate-image cursor-pointer object-cover transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="pt-2.5">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[1rem] font-semibold leading-none text-[#e74b3c] sm:text-[1.1rem] lg:text-[1.2rem]">{formatCurrencyFromPKR(product.price, selectedCurrency)}</p>
                    <p className="text-[0.8rem] leading-none text-[#6b7280] line-through sm:text-[0.9rem] lg:text-[0.85rem]">{formatCurrencyFromPKR(product.originalPrice, selectedCurrency)}</p>
                  </div>
                  <span className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-none border border-[#d9dde3] bg-white text-[#2f3640] sm:rounded-full" aria-hidden="true">
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M8 7V6a4 4 0 1 1 8 0v1" />
                      <path d="M5 8h14l-1 11H6L5 8Z" />
                      <path d="M12 11v5M9.5 13.5h5" />
                    </svg>
                  </span>
                </div>

                <p className="line-clamp-1 pt-2 text-[14px] font-semibold text-[#1f2937]">{product.brand}</p>
                <p className="line-clamp-1 text-[13px] text-[#4b5563]">{product.name}</p>

                <span className="mt-1.5 inline-flex items-center gap-1 rounded-none bg-[#1d63df] px-2 py-0.5 text-[11px] font-semibold text-white sm:rounded-[8px]">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 0 7 10h4l-2 10 6-12h-4l2-8Z" />
                  </svg>
                  Express
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-none border border-dashed border-[#d6d8db] p-10 text-center sm:rounded-[12px]">
          <p className="text-[18px] font-semibold text-[#111827]">No products found</p>
          <p className="mt-1 text-[14px] text-[#6b7280]">Try another keyword or switch Men/Women/Kids category.</p>
        </div>
      )}
    </div>
  );
}