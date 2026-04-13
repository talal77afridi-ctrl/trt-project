export type SupportedCurrency =
  | 'PKR'
  | 'USD'
  | 'GBP'
  | 'CAD'
  | 'AED'
  | 'AUD'
  | 'QAR'
  | 'SAR'
  | 'ARS'
  | 'INR'
  | 'EUR'
  | 'TRY'
  | 'MYR'
  | 'SGD'
  | 'JPY'
  | 'KRW'
  | 'CNY';

const conversionFromPKR: Record<SupportedCurrency, number> = {
  PKR: 1,
  USD: 0.0036,
  GBP: 0.0028,
  CAD: 0.0049,
  AED: 0.0132,
  AUD: 0.0055,
  QAR: 0.0131,
  SAR: 0.0135,
  ARS: 3.05,
  INR: 0.3,
  EUR: 0.0033,
  TRY: 0.14,
  MYR: 0.017,
  SGD: 0.0048,
  JPY: 0.54,
  KRW: 4.95,
  CNY: 0.026,
};

const zeroDecimalCurrencies = new Set<SupportedCurrency>(['PKR', 'JPY', 'KRW']);

export function normalizeCurrencyCode(value: string | null | undefined): SupportedCurrency {
  if (!value) {
    return 'PKR';
  }

  const upper = value.toUpperCase() as SupportedCurrency;
  return conversionFromPKR[upper] ? upper : 'PKR';
}

export function convertPriceFromPKR(amountPKR: number, currency: SupportedCurrency): number {
  return amountPKR * conversionFromPKR[currency];
}

export function formatCurrencyFromPKR(amountPKR: number, currency: SupportedCurrency): string {
  const convertedValue = convertPriceFromPKR(amountPKR, currency);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: zeroDecimalCurrencies.has(currency) ? 0 : 2,
    maximumFractionDigits: zeroDecimalCurrencies.has(currency) ? 0 : 2,
  }).format(convertedValue);
}

export function parsePriceLabelToPKR(priceLabel: string): number {
  const numeric = Number(priceLabel.replace(/[^\d.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}