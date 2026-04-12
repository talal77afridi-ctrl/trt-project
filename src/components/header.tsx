"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TRTLogo } from "@/components/logo";

const searchCategories = ["All", "Men", "Women", "Kids"] as const;

type CountryOption = {
  code: string;
  name: string;
  currency: string;
  states: string[];
};

const countries: CountryOption[] = [
  { code: "PK", name: "Pakistan", currency: "PKR", states: ["Punjab", "Sindh", "KPK", "Balochistan"] },
  { code: "US", name: "United States", currency: "USD", states: ["Alabama", "California", "Texas", "New York"] },
  { code: "GB", name: "United Kingdom", currency: "GBP", states: ["England", "Scotland", "Wales", "Northern Ireland"] },
  { code: "CA", name: "Canada", currency: "CAD", states: ["Ontario", "Quebec", "Alberta", "British Columbia"] },
  { code: "AE", name: "United Arab Emirates", currency: "AED", states: ["Abu Dhabi", "Dubai", "Sharjah"] },
  { code: "AU", name: "Australia", currency: "AUD", states: ["New South Wales", "Victoria", "Queensland"] },
  { code: "QA", name: "Qatar", currency: "QAR", states: ["Doha", "Al Rayyan", "Umm Salal"] },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", states: ["Riyadh", "Jeddah", "Dammam"] },
  { code: "AR", name: "Argentina", currency: "ARS", states: ["Buenos Aires", "Cordoba", "Mendoza"] },
  { code: "IN", name: "India", currency: "INR", states: ["Punjab", "Delhi", "Maharashtra", "Karnataka"] },
  { code: "DE", name: "Germany", currency: "EUR", states: ["Berlin", "Bavaria", "Hamburg"] },
  { code: "FR", name: "France", currency: "EUR", states: ["Ile-de-France", "Normandy", "Brittany"] },
  { code: "IT", name: "Italy", currency: "EUR", states: ["Lazio", "Lombardy", "Sicily"] },
  { code: "ES", name: "Spain", currency: "EUR", states: ["Madrid", "Catalonia", "Valencia"] },
  { code: "TR", name: "Turkey", currency: "TRY", states: ["Istanbul", "Ankara", "Izmir"] },
  { code: "MY", name: "Malaysia", currency: "MYR", states: ["Kuala Lumpur", "Selangor", "Johor"] },
  { code: "SG", name: "Singapore", currency: "SGD", states: ["Central", "North-East", "West"] },
  { code: "JP", name: "Japan", currency: "JPY", states: ["Tokyo", "Osaka", "Hokkaido"] },
  { code: "KR", name: "South Korea", currency: "KRW", states: ["Seoul", "Busan", "Incheon"] },
  { code: "CN", name: "China", currency: "CNY", states: ["Beijing", "Shanghai", "Guangdong"] },
];

const flagByCode: Record<string, string> = {
  PK: "/assets/flags/pak.png",
  AR: "/assets/flags/argentina.jpg",
  AU: "/assets/flags/Aus.jpg",
  CA: "/assets/flags/canada.png",
  CN: "/assets/flags/china.png",
  FR: "/assets/flags/france.png",
  DE: "/assets/flags/germany.png",
  IN: "/assets/flags/india.png",
  IT: "/assets/flags/italy.png",
  JP: "/assets/flags/japan.png",
  MY: "/assets/flags/malaysia.png",
  QA: "/assets/flags/qatar.png",
  SA: "/assets/flags/saudi-arabia.png",
  SG: "/assets/flags/singapore.png",
  KR: "/assets/flags/south-korea.png",
  ES: "/assets/flags/spain.png",
  TR: "/assets/flags/turkey.png",
  AE: "/assets/flags/united-arab.png",
  GB: "/assets/flags/united-kingdom.png",
  US: "/assets/flags/united-states.png",
};

function Flag({ code }: { code: string }) {
  const flagPath = flagByCode[code];

  if (!flagPath) {
    return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f3f4f6] text-[0.66rem] font-semibold text-[#666]">{code}</span>;
  }

  return (
    <img src={flagPath} alt={`${code} flag`} title={code} className="h-5 w-5 rounded-full object-cover" loading="lazy" />
  );
}

export function Header() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof searchCategories)[number]>("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const defaultCountry = countries[0];
  const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountry.code);
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCountry.currency);
  const [selectedState, setSelectedState] = useState(defaultCountry.states[0]);

  const [isCurrencyPanelOpen, setIsCurrencyPanelOpen] = useState(false);
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [isCurrencyListOpen, setIsCurrencyListOpen] = useState(false);
  const [isMobileCountrySheetOpen, setIsMobileCountrySheetOpen] = useState(false);
  const [mobileSheetView, setMobileSheetView] = useState<"menu" | "country" | "currency">("menu");
  const [countrySearch, setCountrySearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const categoryRef = useRef<HTMLDivElement | null>(null);
  const currencyRef = useRef<HTMLDivElement | null>(null);
  const mobileCountrySheetRef = useRef<HTMLDivElement | null>(null);

  const selectedCountry = useMemo(
    () => countries.find((country) => country.code === selectedCountryCode) ?? defaultCountry,
    [selectedCountryCode],
  );

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

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    if (!query) {
      return countries;
    }

    return countries.filter((country) => country.name.toLowerCase().includes(query));
  }, [countrySearch]);

  useEffect(() => {
    const onWindowPointerDown = (event: PointerEvent) => {
      if (!categoryRef.current?.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }

      if (!currencyRef.current?.contains(event.target as Node)) {
        setIsCurrencyPanelOpen(false);
        setIsCountryListOpen(false);
        setIsCurrencyListOpen(false);
      }

    };

    window.addEventListener("pointerdown", onWindowPointerDown);
    return () => window.removeEventListener("pointerdown", onWindowPointerDown);
  }, [isMobileCountrySheetOpen]);

  useEffect(() => {
    if (!isMobileCountrySheetOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileCountrySheetOpen]);

  useEffect(() => {
    if (!isMobileCountrySheetOpen) {
      setMobileSheetView("menu");
    }
  }, [isMobileCountrySheetOpen]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const setInitialCartCount = () => {
      setCartCount(Number(window.localStorage.getItem("cart-count") || "0"));
    };

    const onCartCountUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<{ count?: number }>;
      if (typeof customEvent.detail?.count === "number") {
        setCartCount(customEvent.detail.count);
        return;
      }

      setInitialCartCount();
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === "cart-count") {
        setInitialCartCount();
      }
    };

    setInitialCartCount();
    window.addEventListener("cart-count-updated", onCartCountUpdated as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("cart-count-updated", onCartCountUpdated as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <header className="border-b border-[var(--border)] bg-white">
      <div className="w-full px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-0">
          <div className="flex items-center justify-between lg:block lg:pr-4">
            <TRTLogo />

            <div className="flex items-center gap-4 lg:hidden">
              <button
                type="button"
                onClick={() => {
                  setIsCategoryOpen(false);
                  setIsCurrencyPanelOpen(false);
                  setIsCountryListOpen(false);
                  setIsCurrencyListOpen(false);
                  setIsMobileCountrySheetOpen(true);
                  setMobileSheetView("menu");
                }}
                className="inline-flex items-center gap-2 font-semibold text-[var(--foreground)]"
              >
                <Flag code={selectedCountry.code} />
                <span aria-hidden="true" className="h-4 w-px bg-black/15" />
                {selectedCurrency}
              </button>

              <button aria-label="Cart" className="relative rounded-full p-1.5 transition hover:bg-black/5">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-[var(--foreground)]">
                  <path d="M6 7.5h12l-1 10H7L6 7.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M9 7.5a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                {cartCount > 0 ? (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e41e2d] px-1 text-[10px] font-semibold text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                ) : null}
              </button>
            </div>

            {isMobileCountrySheetOpen ? (
              <div className="fixed inset-0 z-[9999] bg-black/55">
                <div className="flex h-full items-end justify-center px-0 sm:px-4">
                  <div
                    ref={mobileCountrySheetRef}
                    className="pointer-events-auto w-full rounded-t-[24px] bg-white shadow-[0_-16px_40px_rgba(0,0,0,0.22)] sm:max-w-[420px]"
                      onPointerDown={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center justify-between px-4 pt-3">
                      <span className="h-6 w-6 rounded-full border border-black/25" aria-hidden="true" />
                      <h2 className="text-[1.02rem] font-medium text-[#222]">
                        {mobileSheetView === "country" ? "Country/Region" : mobileSheetView === "currency" ? "Currency" : ""}
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          if (mobileSheetView === "menu") {
                            setIsMobileCountrySheetOpen(false);
                          } else {
                            setMobileSheetView("menu");
                          }
                        }}
                        aria-label="Close country selector"
                        className="rounded-full p-1.5 text-[#8a8a8a] transition hover:bg-black/5"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                          <path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="px-4 pb-4 pt-2">
                      {mobileSheetView === "menu" ? (
                        <div className="space-y-4">
                          <div>
                            <label className="mb-2 block text-[1rem] font-semibold text-[#434343]">Deliver to</label>
                            <button
                              type="button"
                              onClick={() => {
                                setMobileSheetView("country");
                              }}
                              className="relative flex w-full items-center gap-3 rounded-xl border border-black/15 bg-white py-2.5 pl-4 pr-11 text-[1rem] font-medium text-[#333]"
                            >
                              <Flag code={selectedCountry.code} />
                              {selectedCountry.name}
                              <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4b5563]">
                                <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>

                          <div>
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
                          </div>

                          <div>
                            <label className="mb-2 block text-[1rem] font-semibold text-[#434343]">Show prices in</label>
                            <button
                              type="button"
                              onClick={() => {
                                setMobileSheetView("currency");
                              }}
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
                            onClick={() => setIsMobileCountrySheetOpen(false)}
                            className="w-full rounded-xl bg-[#212225] px-5 py-2.5 text-[1.35rem] font-semibold text-white"
                          >
                            Save
                          </button>
                        </div>
                      ) : null}

                      {mobileSheetView === "country" ? (
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
                                    setCountrySearch("");
                                    setMobileSheetView("menu");
                                  }}
                                  onPointerDown={(event) => event.stopPropagation()}
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

                      {mobileSheetView === "currency" ? (
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
                                    setMobileSheetView("menu");
                                  }}
                                  onPointerDown={(event) => event.stopPropagation()}
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
                </div>
              </div>
            ) : null}
          </div>

          <div className="min-w-0 lg:mx-auto lg:w-full lg:max-w-[980px] xl:max-w-[1100px]">
            <div className="lg:hidden">
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[#f7f7f7] px-3 py-2.5 text-[var(--muted)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input aria-label="Search" placeholder="Search for products, brands and categories" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]" />
              </div>
            </div>

            <div className="hidden items-center gap-4 lg:flex lg:gap-8">
              <div className="relative z-20 flex min-w-0 flex-1 items-center overflow-visible rounded-xl border border-[var(--border)] bg-[#f7f7f7] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div ref={categoryRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCategoryOpen((prev) => !prev)}
                    className="flex items-center gap-2 border-r border-[var(--border)] px-4 py-3 text-sm font-medium text-[var(--foreground)]"
                  >
                    {selectedCategory}
                    <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 text-[var(--muted)] transition ${isCategoryOpen ? "rotate-180" : ""}`}>
                      <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {isCategoryOpen ? (
                    <ul className="absolute left-0 top-[calc(100%+12px)] z-[70] w-[154px] rounded-xl border border-[var(--border)] bg-white p-2 shadow-[0_10px_28px_rgba(0,0,0,0.14)]">
                      {searchCategories.map((category) => (
                        <li key={category}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsCategoryOpen(false);
                            }}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[1rem] font-medium text-[var(--foreground)] hover:bg-black/[0.04]"
                          >
                            {category}
                            {selectedCategory === category ? (
                              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-[var(--foreground)]">
                                <path d="M4.5 10.5 8.5 14.5 15.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : null}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className="flex flex-1 items-center gap-3 px-4 py-3 text-[var(--muted)]">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <input aria-label="Search" placeholder='Search for "sherwani for groom"' className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]" />
                </div>
              </div>

              <div className="items-center gap-8 text-sm lg:flex">
                <div ref={currencyRef} className="relative text-right">
                  <div className="text-[11px] text-[var(--muted)]">Deliver To / Currency</div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryOpen(false);
                      setIsCurrencyPanelOpen((prev) => !prev);
                      setIsCountryListOpen(false);
                      setIsCurrencyListOpen(false);
                      setIsMobileCountrySheetOpen(false);
                    }}
                    className="mt-1 inline-flex items-center gap-2 font-semibold text-[var(--foreground)]"
                  >
                    <Flag code={selectedCountry.code} />
                    {selectedCountry.code} / {selectedCurrency}
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-[var(--muted)]">
                      <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {isCurrencyPanelOpen ? (
                    <div className="absolute right-[-24px] top-[calc(100%+10px)] z-[70] w-[500px] overflow-visible rounded-2xl border border-black/10 bg-white shadow-[0_14px_38px_rgba(0,0,0,0.2)]">
                      <div className="border-b border-black/10 px-6 py-3 text-center text-[1.6rem] font-semibold text-[#262626]">Choose your location</div>

                      <div className="space-y-4 px-5 py-4">
                        <div>
                          <label className="mb-2 block text-[1rem] font-semibold text-[#434343]">Deliver to</label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsCountryListOpen((prev) => !prev)}
                              className="flex w-full items-center gap-3 rounded-xl border border-black/15 bg-white py-2.5 pl-4 pr-11 text-[1rem] font-medium text-[#333]"
                            >
                              <Flag code={selectedCountry.code} />
                              {selectedCountry.name}
                            </button>
                            <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4b5563]">
                              <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            {isCountryListOpen ? (
                              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[80] rounded-xl border border-black/10 bg-white p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                                <div className="relative mb-2">
                                  <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]">
                                    <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
                                    <path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                  </svg>
                                  <input
                                    value={countrySearch}
                                    onChange={(event) => setCountrySearch(event.target.value)}
                                    placeholder="Search"
                                    className="w-full rounded-lg border border-black/10 bg-[#f6f6f6] py-2 pl-9 pr-3 text-[0.95rem] outline-none"
                                  />
                                </div>

                                <ul className="max-h-[320px] overflow-y-auto">
                                  {filteredCountries.map((country) => (
                                    <li key={country.code}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedCountryCode(country.code);
                                          setSelectedCurrency(country.currency);
                                          setSelectedState(country.states[0]);
                                          setIsCountryListOpen(false);
                                          setIsCurrencyListOpen(false);
                                          setCountrySearch("");
                                        }}
                                        className="flex w-full items-center gap-3 border-b border-black/10 px-2 py-2.5 text-left text-[1rem] font-medium text-[#333] hover:bg-black/[0.03]"
                                      >
                                        <Flag code={country.code} />
                                        {country.name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div>
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
                        </div>

                        <div>
                          <label className="mb-2 block text-[1rem] font-semibold text-[#434343]">Show prices in</label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsCurrencyListOpen((prev) => !prev)}
                              className="flex w-full items-center gap-3 rounded-xl border border-black/15 bg-white py-2.5 pl-4 pr-11 text-[1rem] font-medium text-[#333]"
                            >
                              <Flag code={currencyOptions.find((item) => item.currency === selectedCurrency)?.code ?? selectedCountry.code} />
                              {selectedCurrency}
                            </button>
                            <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4b5563]">
                              <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            {isCurrencyListOpen ? (
                              <ul className="absolute left-0 right-0 top-[calc(100%+8px)] z-[80] max-h-[250px] overflow-y-auto rounded-xl border border-black/10 bg-white p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                                {currencyOptions.map((item) => (
                                  <li key={item.currency}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedCurrency(item.currency);
                                        setIsCurrencyListOpen(false);
                                      }}
                                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-[1rem] font-medium text-[#333] hover:bg-black/[0.03]"
                                    >
                                      <Flag code={item.code} />
                                      {item.currency}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </div>

                        <button type="button" onClick={() => setIsCurrencyPanelOpen(false)} className="w-full rounded-xl bg-[#212225] px-5 py-2.5 text-[1.35rem] font-semibold text-white">
                          Save
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>

                <button aria-label="Cart" className="relative rounded-full p-2 transition hover:bg-black/5">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 text-[var(--foreground)]">
                    <path d="M6 7.5h12l-1 10H7L6 7.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M9 7.5a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  {cartCount > 0 ? (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e41e2d] px-1 text-[10px] font-semibold text-white">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  ) : null}
                </button>
              </div>

              {isMobileCountrySheetOpen ? (
                <div className="fixed inset-0 z-[120] bg-black/55">
                  <div className="flex h-full items-end justify-center px-0 sm:px-4">
                    <div
                      ref={mobileCountrySheetRef}
                      className="w-full rounded-t-[24px] bg-white shadow-[0_-16px_40px_rgba(0,0,0,0.22)] sm:max-w-[420px]"
                    >
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="h-6 w-6 rounded-full border border-black/25" aria-hidden="true" />
                        <h2 className="text-[1.02rem] font-medium text-[#222]">Country/Region</h2>
                        <button
                          type="button"
                          onClick={() => setIsMobileCountrySheetOpen(false)}
                          aria-label="Close country selector"
                          className="rounded-full p-1.5 text-[#8a8a8a] transition hover:bg-black/5"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                            <path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>

                      <div className="px-4 pb-4">
                        <div className="flex items-center gap-2 rounded-xl bg-[#f5f5f5] px-3 py-2.5 text-[#8b8b8b]">
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

                        <div className="mt-3 max-h-[58vh] overflow-y-auto pr-1">
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
                                  setIsMobileCountrySheetOpen(false);
                                  setCountrySearch("");
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
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
