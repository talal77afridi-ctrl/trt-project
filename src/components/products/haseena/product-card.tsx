'use client';

import Image from 'next/image';
import { HaseneaProduct } from '@/data/products/haseena/haseena-products';
import Link from 'next/link';
import { formatCurrencyFromPKR } from '@/lib/currency';
import { useSelectedCurrency } from '@/hooks/use-selected-currency';

interface ProductCardProps {
  product: HaseneaProduct;
  basePath?: string;
}

export function ProductCard({ product, basePath = '/products/haseena' }: ProductCardProps) {
  const selectedCurrency = useSelectedCurrency();
  const hasVideo = Number(product.id.replace('h', '')) % 2 === 0;

  return (
    <Link href={`${basePath}/${product.id}`} className="block group">
      <div className="overflow-hidden rounded-none bg-white lg:rounded-md">
        {/* Image Container */}
        <div className="relative w-full overflow-hidden rounded-none bg-[#eceff1] lg:rounded-md" style={{ aspectRatio: '1/1.25' }}>
          {/* Discount Badge - Top Left */}
          {product.discount > 0 && (
            <div className="absolute left-2 top-2 z-20 rounded-none bg-[#eb1f24] px-2.5 py-0.5 text-[11px] font-semibold text-white lg:rounded-[7px]">
              -{product.discount}%
            </div>
          )}

          {/* Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Video Icon - Bottom Right */}
          {hasVideo && (
            <button
              onClick={(e) => e.preventDefault()}
              type="button"
              className="absolute bottom-2 right-2 z-20 hidden h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#4b5563] shadow lg:flex"
            >
              <svg className="ml-0.5 h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          )}

          {/* Wishlist Heart - Top Right */}
          <button
            onClick={(e) => e.preventDefault()}
            type="button"
            className="absolute right-2 top-2 z-20 hidden h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#9aa1a9] shadow lg:flex"
          >
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content Container */}
        <div className="pt-2">
          {/* Pricing Section */}
          <div className="flex items-end justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[1.0rem] lg:text-[16px] font-semibold leading-none text-[#e15e4f]">
                {formatCurrencyFromPKR(product.price, selectedCurrency)}
                </span>
              </div>
              {product.originalPrice > product.price && (
                <div className="text-[0.68rem] lg:text-[13px] leading-none text-[#7c8591] line-through">{formatCurrencyFromPKR(product.originalPrice, selectedCurrency)}</div>
              )}
            </div>
            <button
              onClick={(e) => e.preventDefault()}
              type="button"
              className="mb-0.5 hidden h-9 w-9 items-center justify-center rounded-full border border-[#d7dce2] bg-white text-[#313843] lg:flex lg:h-10 lg:w-10"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M8 7V6a4 4 0 1 1 8 0v1" />
                <path d="M5 8h14l-1 11H6L5 8Z" />
                <path d="M12 11v5M9.5 13.5h5" />
              </svg>
            </button>
          </div>

          {/* Product Name & Brand */}
          <div className="min-h-[2rem] space-y-0.5 pt-1.5">
            <h3 className="line-clamp-1 text-[0.68rem] lg:text-[15px] font-semibold leading-tight text-[#222a33]">
              {product.name}
            </h3>
            <p className="text-[0.72rem] lg:text-[13px] text-[#4f5967]">{product.brand}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 py-1">
            <div className="flex gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-[#f4be24]' : 'fill-[#cfd5dc]'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-[0.66rem] lg:text-[13px] text-[#4f5967]">{product.rating}</span>
            <span className="text-[0.66rem] lg:text-[13px] text-[#6d7683]">({product.reviews})</span>
          </div>

          {/* Express Badge */}
          <span
            onClick={(e) => e.preventDefault()}
            className="mb-1 inline-flex items-center gap-1 rounded-none bg-[#1d63df] px-2 py-0.5 text-[0.64rem] lg:rounded-[7px] lg:text-[12px] font-semibold text-white"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 0 7 10h4l-2 10 6-12h-4l2-8Z" />
            </svg>
            Express
          </span>
        </div>
      </div>
    </Link>
  );
}
