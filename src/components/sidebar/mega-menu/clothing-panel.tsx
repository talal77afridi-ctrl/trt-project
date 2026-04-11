"use client";

import Image from "next/image";
import { useState } from "react";
import type { ClothingMenuItem, ClothingMenuSectionRow } from "@/data/sidebar/mega-menu";

type ClothingMegaPanelProps = {
  title: string;
  items: ClothingMenuItem[];
  sectionRows: ClothingMenuSectionRow[];
  defaultOpenSectionTitle?: string | null;
};

export function ClothingMegaPanel({ title, items, sectionRows, defaultOpenSectionTitle = null }: ClothingMegaPanelProps) {
  const [isClothingGridOpen, setIsClothingGridOpen] = useState(true);
  const [openSectionTitle, setOpenSectionTitle] = useState<string | null>(defaultOpenSectionTitle);
  const topRows = sectionRows.filter((row) => row.placement === "top");
  const bottomRows = sectionRows.filter((row) => row.placement !== "top");

  return (
    <div className="h-[calc(100vh-112px)] w-[min(760px,calc(100vw-300px))] rounded-none bg-[#f3f3f3] p-5 shadow-[8px_0_24px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[0.95rem] font-semibold leading-none text-[#212121]">{title}</h3>
        <button
          type="button"
          aria-label={isClothingGridOpen ? "Collapse clothing items" : "Expand clothing items"}
          aria-expanded={isClothingGridOpen}
          onClick={() => setIsClothingGridOpen((previous) => !previous)}
          className="inline-flex h-6 w-6 items-center justify-center rounded-sm text-[#4a4a4a] transition hover:bg-black/5"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 transition-transform ${isClothingGridOpen ? "rotate-180" : "rotate-0"}`}>
            <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="h-[calc(100%-84px)] overflow-y-auto pr-1 [scrollbar-color:#c7c7c7_transparent] [scrollbar-width:thin]">
        {topRows.length > 0 ? (
          <div className="mb-4 border-b border-black/12">
            {topRows.map((row) => (
              <div key={row.title} className="border-b border-black/12">
                <button
                  type="button"
                  onClick={() => {
                    if (!row.items) {
                      return;
                    }

                    setOpenSectionTitle((previous) => (previous === row.title ? null : row.title));
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-[0.82rem] font-semibold leading-none text-[#202020]">{row.title}</span>
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className={`h-4 w-4 text-[#4a4a4a] transition-transform ${openSectionTitle === row.title ? "rotate-180" : "rotate-0"}`}
                  >
                    <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {openSectionTitle === row.title && row.items ? (
                  <ul className="grid grid-cols-3 gap-3 px-1 pb-3">
                    {row.items.map((item) => (
                      <li key={`${row.title}-${item.title}`}>
                        <button type="button" className="group w-full text-left">
                          <div className="overflow-hidden rounded-[10px] bg-[#e9e9e9]">
                            {item.imageSrc ? (
                              <Image
                                src={item.imageSrc}
                                alt={item.imageAlt ?? item.title}
                                width={190}
                                height={200}
                                className="h-[170px] w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-[170px] items-center justify-center bg-[#ececec] px-4 text-center text-[0.82rem] font-semibold uppercase leading-tight tracking-wide text-[#6a6a6a]">
                                <div>
                                  <p>Shop All</p>
                                  <p className="text-[#1f1f1f]">Shop All</p>
                                  <p>Shop All</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <p className={`pt-2 text-center text-[0.82rem] leading-tight text-[#222] ${item.featured ? "font-bold uppercase" : "font-medium"}`}>
                            {item.title}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {isClothingGridOpen ? (
          <ul className="grid grid-cols-3 gap-3">
            {items.map((item) => (
              <li key={item.title}>
                <button type="button" className="group w-full text-left">
                  <div className="overflow-hidden rounded-[10px] bg-[#e9e9e9]">
                    {item.imageSrc ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt ?? item.title}
                        width={190}
                        height={200}
                        className="h-[170px] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-[170px] items-center justify-center bg-[#ececec] px-4 text-center text-[0.82rem] font-semibold uppercase leading-tight tracking-wide text-[#6a6a6a]">
                        <div>
                          <p>Shop All</p>
                          <p className="text-[#1f1f1f]">Shop All</p>
                          <p>Shop All</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className={`pt-2 text-center text-[0.82rem] leading-tight text-[#222] ${item.featured ? "font-bold uppercase" : "font-medium"}`}>
                    {item.title}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {bottomRows.length > 0 ? (
          <div className="mt-4 border-t border-black/12">
            {bottomRows.map((row) => (
              <div key={row.title} className="border-b border-black/12">
                <button
                  type="button"
                  onClick={() => {
                    if (!row.items) {
                      return;
                    }

                    setOpenSectionTitle((previous) => (previous === row.title ? null : row.title));
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-[0.82rem] font-semibold leading-none text-[#202020]">{row.title}</span>
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className={`h-4 w-4 text-[#4a4a4a] transition-transform ${openSectionTitle === row.title ? "rotate-180" : "rotate-0"}`}
                  >
                    <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {openSectionTitle === row.title && row.items ? (
                  <ul className="grid grid-cols-3 gap-3 px-1 pb-3">
                    {row.items.map((item) => (
                      <li key={`${row.title}-${item.title}`}>
                        <button type="button" className="group w-full text-left">
                          <div className="overflow-hidden rounded-[10px] bg-[#e9e9e9]">
                            {item.imageSrc ? (
                              <Image
                                src={item.imageSrc}
                                alt={item.imageAlt ?? item.title}
                                width={190}
                                height={200}
                                className="h-[170px] w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-[170px] items-center justify-center bg-[#ececec] px-4 text-center text-[0.82rem] font-semibold uppercase leading-tight tracking-wide text-[#6a6a6a]">
                                <div>
                                  <p>Shop All</p>
                                  <p className="text-[#1f1f1f]">Shop All</p>
                                  <p>Shop All</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <p className={`pt-2 text-center text-[0.82rem] leading-tight text-[#222] ${item.featured ? "font-bold uppercase" : "font-medium"}`}>
                            {item.title}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
