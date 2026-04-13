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

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const router = useRouter();
  const selectedCurrency = useSelectedCurrency();
  const [items, setItems] = useState<BagItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const parsedItems = JSON.parse(window.localStorage.getItem('cart-items') || '[]') as BagItem[];
    setItems(parsedItems);
  }, [mounted]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items],
  );

  const saved = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity * 0.15, 0);
  }, [items]);

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

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/40"
          onClick={onClose}
        />
      )}

      {/* Professional Drawer */}
      <div
        className={`fixed right-0 top-0 z-[9999] flex h-full w-full max-w-[540px] flex-col bg-[#f7f7f8] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="border-b border-[#e5e7eb] bg-white px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[1.05rem] leading-none font-semibold text-[#111827] sm:text-[1.2rem]">
              Shopping Bag
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart"
              className="rounded-full p-2 text-[#6b7280] transition hover:bg-[#f3f4f6]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                <path
                  d="M6 6 18 18M18 6 6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <p className="mt-4 text-[0.95rem] text-[#4b5563] sm:text-[1rem]">
            <span className="font-semibold text-[#111827]">Item Summary</span> {items.length} Item(s)
          </p>
        </div>

        {/* Items Container with scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center py-12">
              <div className="text-center">
                <svg viewBox="0 0 24 24" className="mx-auto h-12 w-12 text-[#d1d5db] mb-3">
                  <path d="M6 7.5h12l-1 10H7L6 7.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M9 7.5a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <p className="text-[14px] text-[#6b7280] font-medium">
                  Your bag is empty
                </p>
                <p className="mt-1 text-[13px] text-[#9ca3af]">
                  Add products to continue
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="border-b border-[#d6d9dd] pb-4"
                >
                  <div className="mb-3 inline-flex rounded-md border border-[#cfd5dc] bg-[#f8f9fb] px-3 py-1.5 text-[0.78rem] font-medium text-[#374151]">
                    Estimated Shipping Date: {getEstimatedShippingDate()}
                  </div>

                  <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 sm:grid-cols-[92px_minmax(0,1fr)]">
                    <div className="relative h-[112px] w-[84px] overflow-hidden rounded-md bg-[#eceff3] sm:h-[120px] sm:w-[92px]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="line-clamp-2 text-[0.86rem] leading-tight font-semibold text-[#243143] sm:text-[0.92rem]">
                          {item.brand} - {item.name}
                        </p>
                        <p className="mt-1.5 text-[0.82rem] text-[#4b5563]">Size: {item.size}</p>
                      </div>

                      <div className="flex items-end justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id, item.size)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#d1d5db] bg-white text-[#ef4444]"
                            aria-label="Delete item"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                              <path d="M7 5h10l-1 14H8L7 5Zm2-2h6l1 1h4v2H4V4h4l1-1Z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (item.quantity === 1) {
                                removeItem(item.id, item.size);
                              } else {
                                updateQuantity(item.id, item.size, item.quantity - 1);
                              }
                            }}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#d1d5db] bg-white text-[0.95rem] text-[#374151]"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-[0.9rem] font-semibold text-[#111827]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity + 1)
                            }
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#d1d5db] bg-white text-[0.95rem] text-[#374151]"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-[0.95rem] font-semibold text-[#243143] sm:text-[1.02rem]">
                          {formatCurrencyFromPKR(item.price * item.quantity, selectedCurrency)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Always Visible */}
        {items.length > 0 && (
          <div className="border-t border-[#e5e7eb] bg-white px-6 py-4">
            <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[0.84rem] text-[#374151]">Subtotal</span>
                  <span className="text-[0.84rem] text-[#374151]">
                    {formatCurrencyFromPKR(subtotal, selectedCurrency)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[0.84rem] text-[#374151]">Total Saved</span>
                  <span className="text-[0.84rem] text-[#374151]">
                    {formatCurrencyFromPKR(saved, selectedCurrency)}
                  </span>
                </div>

                <div className="my-2.5 h-px bg-[#e5e7eb]" />

                <div className="flex items-center justify-between">
                  <span className="text-[1.05rem] font-semibold text-[#243143]">Total</span>
                  <span className="text-[1.05rem] font-semibold text-[#243143]">
                    {formatCurrencyFromPKR(subtotal, selectedCurrency)}
                  </span>
                </div>
            </div>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push('/bag');
                }}
                className="w-full rounded-[10px] border border-[#d1d5db] bg-white py-2.5 text-[1rem] font-medium text-[#1f2937] transition hover:bg-[#f9fafb]"
              >
                View Bag
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push(`/checkout/${Date.now().toString(16)}`);
                }}
                className="w-full rounded-[10px] bg-[#1f1f24] py-3 text-[1rem] font-semibold text-white transition hover:bg-[#15161a]"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
