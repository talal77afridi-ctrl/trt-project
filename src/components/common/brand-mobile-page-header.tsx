'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MobileCurrencyPicker } from '@/components/common/mobile-currency-picker';

interface BrandMobilePageHeaderProps {
  title: string;
  itemCount: number;
  backHref?: string;
}

export function BrandMobilePageHeader({ title, itemCount, backHref = '/' }: BrandMobilePageHeaderProps) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const syncCartCount = () => {
      setCartCount(Number(window.localStorage.getItem('cart-count') || '0'));
    };

    const onCartCountUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<{ count?: number }>;
      if (typeof customEvent.detail?.count === 'number') {
        setCartCount(customEvent.detail.count);
        return;
      }

      syncCartCount();
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === 'cart-count') {
        syncCartCount();
      }
    };

    syncCartCount();
    window.addEventListener('cart-count-updated', onCartCountUpdated as EventListener);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('cart-count-updated', onCartCountUpdated as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className="border-b border-gray-200 pb-3 lg:hidden">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex items-center gap-2">
          <Link href={backHref} aria-label="Back" className="inline-flex h-7 w-7 items-center justify-center text-[#4a5564]">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 5 7.5 10 12.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <div className="min-w-0">
            <h1 className="truncate text-[1rem] font-semibold tracking-tight text-[#141414]">{title}</h1>
            <p className="text-[0.95rem] text-[#545454]">{itemCount} items</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pl-2">
          <MobileCurrencyPicker />

          <Link href="/search" aria-label="Search" className="rounded-full p-1 text-[#343f4c]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>

          <Link href="/bag" aria-label="Bag" className="relative rounded-full p-1 text-[#343f4c]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path d="M6 7.5h12l-1 10H7L6 7.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9 7.5a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#e41e2d] px-1 text-[9px] font-semibold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </div>
  );
}