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

type CheckoutPageViewProps = {
  sessionId?: string;
};

export function CheckoutPageView({ sessionId }: CheckoutPageViewProps) {
  const selectedCurrency = useSelectedCurrency();
  const [items, setItems] = useState<BagItem[]>([]);

  useEffect(() => {
    const parsedItems = JSON.parse(window.localStorage.getItem('cart-items') || '[]') as BagItem[];
    setItems(parsedItems);
  }, [sessionId]);

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

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items],
  );

  const shipping = 140;
  const total = subtotal + shipping;

  const getEstimatedShippingDate = () => {
    const today = new Date();
    const shippingDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${shippingDate.getDate()} ${months[shippingDate.getMonth()]} ${shippingDate.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-[1.35rem] font-semibold tracking-[0.06em] text-[#2b2f35]">TRT</h1>
          <div className="inline-flex items-center gap-2 text-[13px] font-medium text-[#1f2937]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
            </svg>
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-5 px-4 py-6 pb-32 sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px]">
        <section className="space-y-4">
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] text-[#6b7280]">Delivering to | Currency</p>
              <button type="button" className="text-[13px] font-semibold text-[#111827]">Change</button>
            </div>
            <p className="text-[15px] font-semibold text-[#111827]">Pakistan | PKR</p>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
            <h2 className="text-[1.15rem] font-semibold text-[#111827]">Contact Info</h2>
            <div className="mt-3 space-y-2.5">
              <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none" placeholder="Phone number" />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none" placeholder="First name" />
                <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none" placeholder="Last name" />
              </div>
              <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none" placeholder="Email address" />
            </div>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
            <h2 className="text-[1.15rem] font-semibold text-[#111827]">Shipping address</h2>
            <div className="mt-3 space-y-2.5">
              <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none" placeholder="House number, street number, area" />
              <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none" placeholder="Apt, suite, unit, building (optional)" />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none" placeholder="City" />
                <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px] outline-none" placeholder="Zip" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
            <h2 className="text-[1.15rem] font-semibold text-[#111827]">Delivery method</h2>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-[#111827] px-3 py-2.5 text-[14px]">
              <span className="font-medium text-[#111827]">Standard Delivery</span>
              <span className="font-semibold text-[#111827]">{formatCurrencyFromPKR(shipping, selectedCurrency)}</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
            <h2 className="text-[1.15rem] font-semibold text-[#111827]">Payment method</h2>
            <div className="mt-3 space-y-2.5">
              <label className="flex items-center gap-3 rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px]">
                <input type="radio" name="payment" defaultChecked />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px]">
                <input type="radio" name="payment" />
                Credit/Debit Card
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-[#d1d5db] px-3 py-2.5 text-[13px]">
                <input type="radio" name="payment" />
                JazzCash
              </label>
            </div>
          </div>
        </section>

        <aside className="rounded-xl border border-[#e5e7eb] bg-white p-4 lg:sticky lg:top-4 lg:self-start lg:flex lg:h-[calc(100vh-28px)] lg:flex-col lg:overflow-hidden">
          <div className="max-h-[62vh] space-y-3 overflow-y-auto pr-1 lg:max-h-none lg:flex-1">
            {items.map((item) => (
              <article key={`${item.id}-${item.size}`} className="border-b border-[#eceff3] pb-3 last:border-b-0 last:pb-0">
                <p className="mb-2 text-[12px] font-semibold text-[#1f2937]">Estimated shipping date {getEstimatedShippingDate()}</p>
                <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-2.5">
                  <div className="relative h-[96px] w-[76px] overflow-hidden rounded-md bg-[#f3f4f6]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="84px" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="line-clamp-2 text-[12px] font-semibold text-[#273449]">{item.brand} - {item.name}</p>
                      <p className="mt-1 text-[11px] text-[#4b5563]">Size {item.size}</p>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => removeItem(item.id, item.size)} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#d1d5db] text-[#ef4444]">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M7 5h10l-1 14H8L7 5Zm2-2h6l1 1h4v2H4V4h4l1-1Z" /></svg>
                        </button>
                        <span className="text-[13px] text-[#111827]">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#d1d5db] text-[14px] text-[#1f2937]">+</button>
                      </div>
                      <div className="inline-flex items-center gap-1">
                        <p className="text-[0.9rem] font-semibold text-[#1f2937]">{formatCurrencyFromPKR(item.price * item.quantity, selectedCurrency)}</p>
                        <svg viewBox="0 0 16 16" className="h-3 w-3 text-[#6b7280]" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M3.5 10 8 5.5 12.5 10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 border-t border-[#e5e7eb] pt-3 text-[13px]">
            <div className="flex items-center justify-between text-[#4b5563]">
              <span>Subtotal · {items.length} Items</span>
              <span>{formatCurrencyFromPKR(subtotal, selectedCurrency)}</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[#4b5563]">
              <span>Shipping</span>
              <span className="text-[#d94848]">{formatCurrencyFromPKR(shipping, selectedCurrency)}</span>
            </div>
            <div className="mt-2.5 flex items-center justify-between border-t border-[#e5e7eb] pt-2.5 text-[0.95rem] font-semibold text-[#111827]">
              <span>Total</span>
              <span>{formatCurrencyFromPKR(total, selectedCurrency)}</span>
            </div>
          </div>
        </aside>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d1d5db] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div>
            <p className="text-[0.95rem] font-semibold text-[#111827]">Total {formatCurrencyFromPKR(total, selectedCurrency)}</p>
            <p className="text-[12px] text-[#6b7280]">By clicking place order, you agree to our Terms & Conditions.</p>
          </div>
          <button type="button" className="min-w-[220px] rounded-lg bg-[#1f1f24] px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-[#15161a]">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
