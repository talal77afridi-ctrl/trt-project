'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type CountryOption = {
  code: string;
  name: string;
  currency: string;
  states: string[];
};

const countries: CountryOption[] = [
  { code: 'PK', name: 'Pakistan', currency: 'PKR', states: ['Punjab', 'Sindh', 'KPK', 'Balochistan'] },
  { code: 'US', name: 'United States', currency: 'USD', states: ['Alabama', 'California', 'Texas', 'New York'] },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', states: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
  { code: 'CA', name: 'Canada', currency: 'CAD', states: ['Ontario', 'Quebec', 'Alberta', 'British Columbia'] },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', states: ['Abu Dhabi', 'Dubai', 'Sharjah'] },
  { code: 'AU', name: 'Australia', currency: 'AUD', states: ['New South Wales', 'Victoria', 'Queensland'] },
  { code: 'QA', name: 'Qatar', currency: 'QAR', states: ['Doha', 'Al Rayyan', 'Umm Salal'] },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', states: ['Riyadh', 'Jeddah', 'Dammam'] },
  { code: 'AR', name: 'Argentina', currency: 'ARS', states: ['Buenos Aires', 'Cordoba', 'Mendoza'] },
  { code: 'IN', name: 'India', currency: 'INR', states: ['Punjab', 'Delhi', 'Maharashtra', 'Karnataka'] },
  { code: 'DE', name: 'Germany', currency: 'EUR', states: ['Berlin', 'Bavaria', 'Hamburg'] },
  { code: 'FR', name: 'France', currency: 'EUR', states: ['Ile-de-France', 'Normandy', 'Brittany'] },
  { code: 'IT', name: 'Italy', currency: 'EUR', states: ['Lazio', 'Lombardy', 'Sicily'] },
  { code: 'ES', name: 'Spain', currency: 'EUR', states: ['Madrid', 'Catalonia', 'Valencia'] },
  { code: 'TR', name: 'Turkey', currency: 'TRY', states: ['Istanbul', 'Ankara', 'Izmir'] },
  { code: 'MY', name: 'Malaysia', currency: 'MYR', states: ['Kuala Lumpur', 'Selangor', 'Johor'] },
  { code: 'SG', name: 'Singapore', currency: 'SGD', states: ['Central', 'North-East', 'West'] },
  { code: 'JP', name: 'Japan', currency: 'JPY', states: ['Tokyo', 'Osaka', 'Hokkaido'] },
  { code: 'KR', name: 'South Korea', currency: 'KRW', states: ['Seoul', 'Busan', 'Incheon'] },
  { code: 'CN', name: 'China', currency: 'CNY', states: ['Beijing', 'Shanghai', 'Guangdong'] },
];

const flagByCode: Record<string, string> = {
  PK: '/assets/flags/pak.png',
  AR: '/assets/flags/argentina.jpg',
  AU: '/assets/flags/Aus.jpg',
  CA: '/assets/flags/canada.png',
  CN: '/assets/flags/china.png',
  FR: '/assets/flags/france.png',
  DE: '/assets/flags/germany.png',
  IN: '/assets/flags/india.png',
  IT: '/assets/flags/italy.png',
  JP: '/assets/flags/japan.png',
  MY: '/assets/flags/malaysia.png',
  QA: '/assets/flags/qatar.png',
  SA: '/assets/flags/saudi-arabia.png',
  SG: '/assets/flags/singapore.png',
  KR: '/assets/flags/south-korea.png',
  ES: '/assets/flags/spain.png',
  TR: '/assets/flags/turkey.png',
  AE: '/assets/flags/united-arab.png',
  GB: '/assets/flags/united-kingdom.png',
  US: '/assets/flags/united-states.png',
};

function Flag({ code }: { code: string }) {
  const flagPath = flagByCode[code];

  if (!flagPath) {
    return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f3f4f6] text-[0.66rem] font-semibold text-[#666]">{code}</span>;
  }

  return <img src={flagPath} alt={`${code} flag`} className="h-5 w-5 rounded-full object-cover" loading="lazy" />;
}

export function MobileCurrencyPicker() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSheetView, setMobileSheetView] = useState<'menu' | 'country' | 'currency'>('menu');
  const [selectedCountryCode, setSelectedCountryCode] = useState('PK');
  const [selectedCurrency, setSelectedCurrency] = useState('PKR');
  const [selectedState, setSelectedState] = useState('Punjab');
  const [countrySearch, setCountrySearch] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedCountry = window.localStorage.getItem('selected-country');
    const savedCurrency = window.localStorage.getItem('selected-currency');

    if (savedCountry && countries.some((country) => country.code === savedCountry)) {
      setSelectedCountryCode(savedCountry);
      const country = countries.find((item) => item.code === savedCountry);
      if (country) {
        setSelectedState(country.states[0]);
      }
    }

    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setMobileSheetView('menu');
      setCountrySearch('');
    }
  }, [isOpen]);

  const selectedCountry = useMemo(
    () => countries.find((country) => country.code === selectedCountryCode) ?? countries[0],
    [selectedCountryCode],
  );

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();

    if (!query) {
      return countries;
    }

    return countries.filter((country) => country.name.toLowerCase().includes(query));
  }, [countrySearch]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const currencyOptions = useMemo(
    () =>
      countries.reduce<Array<{ currency: string; code: string }>>((acc, country) => {
        if (!acc.some((item) => item.currency === country.currency)) {
          acc.push({ currency: country.currency, code: country.code });
        }
        return acc;
      }, []),
    [],
  );

  const saveSelection = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('selected-country', selectedCountryCode);
      window.localStorage.setItem('selected-currency', selectedCurrency);
      window.dispatchEvent(new CustomEvent('selected-currency-updated', { detail: { currency: selectedCurrency } }));
    }

    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Selected currency"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1 text-[1.05rem] font-medium text-[#1f2937]"
      >
        <Flag code={selectedCountryCode} />
        <span>|</span>
        {selectedCurrency}
      </button>

      {isMounted && isOpen
        ? createPortal(
            <div className="fixed inset-0 z-[130] bg-black/55" onClick={() => setIsOpen(false)}>
              <div className="flex h-full items-end justify-center">
                <div
                  className="w-full rounded-t-[22px] bg-white px-4 pb-4 pt-3 sm:max-w-[420px]"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="h-6 w-6 rounded-full border border-black/25" aria-hidden="true" />
                    <h3 className="text-[1.02rem] font-semibold text-[#202733]">
                      {mobileSheetView === 'country' ? 'Country/Region' : mobileSheetView === 'currency' ? 'Currency' : ''}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        if (mobileSheetView === 'menu') {
                          setIsOpen(false);
                        } else {
                          setMobileSheetView('menu');
                        }
                      }}
                      aria-label="Close"
                      className="rounded-full p-1.5 text-[#8a8a8a]"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                        <path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  {mobileSheetView === 'menu' ? (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-[1rem] font-semibold text-[#434343]">Deliver to</label>
                    <button
                      type="button"
                      onClick={() => setMobileSheetView('country')}
                      className="relative flex w-full items-center gap-3 rounded-xl border border-black/15 bg-white py-2.5 pl-4 pr-11 text-[1rem] font-medium text-[#333]"
                    >
                      <Flag code={selectedCountry.code} />
                      {selectedCountry.name}
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4b5563]">
                        <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="relative">
                    <select
                      value={selectedState}
                      onChange={(event) => setSelectedState(event.target.value)}
                      className="w-full appearance-none rounded-xl border border-black/15 bg-white py-2.5 pl-4 pr-11 text-[1rem] font-medium text-[#333] outline-none"
                    >
                      {selectedCountry.states.map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4b5563]">
                      <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div>
                    <label className="mb-2 block text-[1rem] font-semibold text-[#434343]">Show prices in</label>
                    <button
                      type="button"
                      onClick={() => setMobileSheetView('currency')}
                      className="relative flex w-full items-center gap-3 rounded-xl border border-black/15 bg-white py-2.5 pl-4 pr-11 text-[1rem] font-medium text-[#333]"
                    >
                      <Flag code={currencyOptions.find((item) => item.currency === selectedCurrency)?.code ?? selectedCountry.code} />
                      {selectedCurrency}
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4b5563]">
                        <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={saveSelection}
                    className="w-full rounded-xl bg-[#212225] px-5 py-2.5 text-[1.35rem] font-semibold text-white"
                  >
                    Save
                  </button>
                </div>
                  ) : null}

                  {mobileSheetView === 'country' ? (
                <div>
                  <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#f5f5f5] px-3 py-2.5 text-[#8b8b8b]">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
                      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <input
                      value={countrySearch}
                      onChange={(event) => setCountrySearch(event.target.value)}
                      placeholder="Search"
                      className="w-full bg-transparent text-[0.98rem] outline-none placeholder:text-[#9a9a9a]"
                    />
                  </div>

                  <div className="max-h-[58vh] overflow-y-auto pr-1">
                    {filteredCountries.map((country) => {
                      const isSelected = country.code === selectedCountry.code;

                      return (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountryCode(country.code);
                            setSelectedCurrency(country.currency);
                            setSelectedState(country.states[0]);
                            setCountrySearch('');
                            setMobileSheetView('menu');
                          }}
                          className="flex w-full items-center justify-between border-b border-black/8 px-2 py-3 text-left transition hover:bg-black/[0.03]"
                        >
                          <span className="flex items-center gap-3">
                            <Flag code={country.code} />
                            <span className="text-[0.98rem] text-[#343434]">{country.name}</span>
                          </span>

                          {isSelected ? (
                            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4.5 w-4.5 text-[#222]">
                              <path d="M4.5 10.5 8.5 14.5 15.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
                  ) : null}

                  {mobileSheetView === 'currency' ? (
                <div>
                  <div className="max-h-[58vh] overflow-y-auto pr-1">
                    {currencyOptions.map((item) => {
                      const isSelected = item.currency === selectedCurrency;

                      return (
                        <button
                          key={item.currency}
                          type="button"
                          onClick={() => {
                            setSelectedCurrency(item.currency);
                            setMobileSheetView('menu');
                          }}
                          className="flex w-full items-center justify-between border-b border-black/8 px-2 py-3 text-left transition hover:bg-black/[0.03]"
                        >
                          <span className="flex items-center gap-3">
                            <Flag code={item.code} />
                            <span className="text-[0.98rem] text-[#343434]">{item.currency}</span>
                          </span>

                          {isSelected ? (
                            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4.5 w-4.5 text-[#222]">
                              <path d="M4.5 10.5 8.5 14.5 15.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
