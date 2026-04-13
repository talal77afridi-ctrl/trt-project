'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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

  const savedTotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity * 0.15, 0),
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

  const getEstimatedShippingDate = () => {
    const today = new Date();
    const shippingDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${shippingDate.getDate()} ${months[shippingDate.getMonth()]}`;
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-[#d9dde2] bg-white p-6 text-center sm:p-8">
        <h1 className="text-[1.15rem] font-semibold text-[#111827] sm:text-[1.5rem]">Your Bag</h1>
        <p className="mt-2 text-[13px] text-[#6b7280] sm:text-[15px]">Your bag is empty. Add products to continue.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-6">
      <section className="space-y-4 rounded-2xl border border-[#d9dde2] bg-white p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-[1.1rem] font-semibold text-[#111827] sm:text-[1.35rem]">Shopping Bag</h1>
          <span className="text-[12px] text-[#6b7280] sm:text-[0.9rem]">{items.length} item(s)</span>
        </div>

        {items.map((item) => (
          <article key={`${item.id}-${item.size}`} className="border-b border-[#e5e7eb] pb-4 last:border-b-0 last:pb-0">
            <div className="mb-2.5 inline-flex rounded-md border border-[#d1d5db] bg-[#f8fafc] px-2.5 py-1 text-[11px] font-medium text-[#475569] sm:text-[12px]">
              Estimated Shipping Date: {getEstimatedShippingDate()}
            </div>

            <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 sm:grid-cols-[102px_minmax(0,1fr)] sm:gap-3.5">
              <div className="relative h-[102px] w-[84px] overflow-hidden rounded-md bg-[#eef1f4] sm:h-[124px] sm:w-[102px]">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="140px" />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="line-clamp-2 text-[14px] font-semibold leading-tight text-[#273449] sm:text-[0.92rem]">{item.brand} - {item.name}</p>
                  <p className="mt-1 text-[12px] text-[#4b5563] sm:mt-1.5 sm:text-[0.82rem]">Size: {item.size}</p>
                </div>

                <div className="mt-2.5 flex items-end justify-between gap-2">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.size)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#d1d5db] bg-white text-[#ef4444]"
                      aria-label="Delete item"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                        <path d="M7 5h10l-1 14H8L7 5Zm2-2h6l1 1h4v2H4V4h4l1-1Z" />
                      </svg>
                    </button>

                    <span className="w-5 text-center text-[15px] text-[#111827] sm:text-[1.05rem]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="h-7 w-7 rounded-md border border-[#d1d5db] bg-white text-[0.9rem] text-[#374151]"
                    >
                      +
                    </button>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <p className="text-[1.05rem] font-semibold text-[#243143] sm:text-[0.95rem]">{formatCurrencyFromPKR(item.price * item.quantity, selectedCurrency)}</p>
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3 text-[#6b7280]">
                      <path d="M3.5 10 8 5.5 12.5 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="h-fit rounded-2xl border border-[#d9dde2] bg-white p-4 sm:p-4.5">
        <h2 className="text-[1.1rem] font-semibold text-[#111827] sm:text-[1.2rem]">
          Item Summary <span className="font-normal text-[#4b5563]">{items.length} Item(s)</span>
        </h2>

        <div className="mt-4 space-y-2 text-[13px] sm:mt-5 sm:text-[0.9rem]">
          <div className="flex items-center justify-between text-[#4b5563]">
            <span>Total Saved</span>
            <span className="font-normal text-[#111827]">{formatCurrencyFromPKR(savedTotal, selectedCurrency)}</span>
          </div>
          <div className="flex items-center justify-between text-[#4b5563]">
            <span>Subtotal</span>
            <span className="font-normal text-[#111827]">{formatCurrencyFromPKR(subtotal, selectedCurrency)}</span>
          </div>
          <div className="mt-3 border-t border-[#e5e7eb] pt-3">
            <div className="flex items-center justify-between text-[1.02rem] text-[#111827] sm:text-[1rem]">
              <span className="font-semibold">Total</span>
              <span className="font-normal">{formatCurrencyFromPKR(subtotal, selectedCurrency)}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-4 w-full rounded-xl border border-[#d1d5db] bg-white py-2 text-[14px] font-semibold text-[#1f2937] transition hover:bg-[#f9fafb] sm:text-[0.92rem]"
        >
          Shop More
        </button>

        <button
          type="button"
          onClick={() => router.push(`/checkout/${Date.now().toString(16)}`)}
          className="mt-2.5 w-full rounded-xl bg-[#1f1f24] py-2 text-[14px] font-semibold text-white transition hover:bg-[#15161a] sm:text-[0.92rem]"
        >
          Checkout
        </button>
      </aside>
    </div>
  );
}
