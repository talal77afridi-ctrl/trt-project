'use client';

import { useEffect, useState } from 'react';
import { normalizeCurrencyCode, SupportedCurrency } from '@/lib/currency';

const currencyStorageKey = 'selected-currency';

export function useSelectedCurrency() {
  const [currency, setCurrency] = useState<SupportedCurrency>('PKR');

  useEffect(() => {
    const updateFromStorage = () => {
      const saved = window.localStorage.getItem(currencyStorageKey);
      setCurrency(normalizeCurrencyCode(saved));
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === currencyStorageKey) {
        updateFromStorage();
      }
    };

    updateFromStorage();
    window.addEventListener('storage', onStorage);
    window.addEventListener('selected-currency-updated', updateFromStorage as EventListener);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('selected-currency-updated', updateFromStorage as EventListener);
    };
  }, []);

  return currency;
}