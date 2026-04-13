'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { formatCurrencyFromPKR } from '@/lib/currency';
import { useSelectedCurrency } from '@/hooks/use-selected-currency';

type BagItem = {
  id: string;
  size: string;
  quantity: number;
  name: string;
  brand: string;
  price: number;
  image: string;
};

export function BagPageView() {
  const selectedCurrency = useSelectedCurrency();
  const [items, setItems] = useState<BagItem[]>([]);

  useEffect(() => {
    const parsedItems = JSON.parse(window.localStorage.getItem('cart-items') || '[]') as BagItem[];
    setItems(parsedItems);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items],
  );

  const updateItems = (nextItems: BagItem[]) => {
    setItems(nextItems);
    window.localStorage.setItem('cart-items', JSON.stringify(nextItems));
    const nextCount = nextItems.reduce((acc, item) => acc + item.quantity, 0);
    window.localStorage.setItem('cart-count', String(nextCount));
    window.dispatchEvent(new CustomEvent('cart-count-updated', { detail: { count: nextCount } }));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    const nextItems = items.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max(1, quantity) }
        : item,
    );
    updateItems(nextItems);
  };

  const removeItem = (id: string, size: string) => {
    const nextItems = items.filter((item) => !(item.id === id && item.size === size));
    updateItems(nextItems);
  };

  if (items.length === 0) {
    return (
      <div className="rounded-none border border-[#d9dde2] bg-white p-6 text-center sm:rounded-2xl sm:p-8">
        <h1 className="text-[1.15rem] font-semibold text-[#111827] sm:text-[1.5rem]">Your Bag</h1>
        <p className="mt-2 text-[13px] text-[#6b7280] sm:text-[15px]">Your bag is empty. Add products to continue.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
      <section className="space-y-3 rounded-none border border-[#d9dde2] bg-white p-3 sm:rounded-2xl sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-[1.05rem] font-semibold text-[#111827] sm:text-[1.5rem]">Your Bag</h1>
          <span className="text-[12px] text-[#6b7280] sm:text-[14px]">{items.length} item(s)</span>
        </div>

        {items.map((item) => (
          <article key={`${item.id}-${item.size}`} className="grid grid-cols-[76px_minmax(0,1fr)] gap-2 rounded-none border border-[#e5e7eb] p-2.5 sm:grid-cols-[90px_minmax(0,1fr)] sm:gap-3 sm:rounded-xl sm:p-3">
            <div className="relative h-[96px] w-[76px] overflow-hidden rounded-none bg-[#eef1f4] sm:h-[110px] sm:w-[90px] sm:rounded-lg">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="100px" />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <p className="line-clamp-1 text-[12px] font-semibold text-[#111827] sm:text-[14px]">{item.brand}</p>
              <p className="line-clamp-2 text-[11px] text-[#4b5563] sm:text-[13px]">{item.name}</p>
              <p className="text-[11px] text-[#4b5563] sm:text-[13px]">Size: {item.size}</p>

              <div className="flex items-center justify-between gap-1.5">
                <p className="text-[0.88rem] font-semibold text-[#e74b3c] sm:text-[1.05rem]">{formatCurrencyFromPKR(item.price * item.quantity, selectedCurrency)}</p>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    className="h-7 w-7 rounded-none border border-[#d1d5db] text-[#374151] sm:rounded-md"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-[12px] text-[#111827] sm:text-[13px]">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    className="h-7 w-7 rounded-none border border-[#d1d5db] text-[#374151] sm:rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id, item.size)}
                className="text-[11px] font-medium text-[#c53030] sm:text-[12px]"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>

      <aside className="h-fit rounded-none border border-[#d9dde2] bg-white p-4 sm:rounded-2xl sm:p-5">
        <h2 className="text-[0.98rem] font-semibold text-[#111827] sm:text-[1.05rem]">Order Summary</h2>

        <div className="mt-3 space-y-2 text-[13px] sm:mt-4 sm:text-[14px]">
          <div className="flex items-center justify-between text-[#4b5563]">
            <span>Subtotal</span>
            <span className="font-semibold text-[#111827]">{formatCurrencyFromPKR(subtotal, selectedCurrency)}</span>
          </div>
          <div className="flex items-center justify-between text-[#4b5563]">
            <span>Shipping</span>
            <span className="font-semibold text-[#111827]">Free</span>
          </div>
          <div className="mt-3 border-t border-[#e5e7eb] pt-3">
            <div className="flex items-center justify-between text-[14px] font-semibold text-[#111827] sm:text-[15px]">
              <span>Total</span>
              <span>{formatCurrencyFromPKR(subtotal, selectedCurrency)}</span>
            </div>
          </div>
        </div>

        <button type="button" className="mt-4 w-full rounded-none bg-[#111827] py-2.5 text-[13px] font-semibold text-white sm:mt-5 sm:rounded-lg sm:text-[14px]">
          Proceed to Checkout
        </button>
      </aside>
    </div>
  );
}