"use client";

import { useRef } from "react";
import { homeSections } from "@/data/home/home-sections";
import { PopularCard } from "@/components/home/most-popular/popular-card";

export function NewIn2026Section() {
  const sliderRef = useRef<HTMLUListElement | null>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    if (!sliderRef.current) {
      return;
    }

    const card = sliderRef.current.querySelector("li");
    const cardWidth = card?.getBoundingClientRect().width ?? 280;
    const gap = 20;
    const distance = cardWidth + gap;
    const offset = direction === "next" ? distance : -distance;
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="pb-10 pt-8 sm:pt-10">
      <h2 className="text-[1.12rem] font-semibold leading-tight text-[var(--foreground)]">New In - 2026</h2>

      <div className="relative mt-6">
        <ul
          ref={sliderRef}
          className="grid grid-flow-col auto-cols-[78%] gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] sm:auto-cols-[48%] lg:auto-cols-[calc((100%-60px)/4)] [&::-webkit-scrollbar]:hidden"
        >
          {homeSections.newIn2026.map((item) => (
            <li key={item.name} className="min-w-0">
              <PopularCard brand={item} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => scrollByCard("prev")}
          aria-label="Previous new in items"
          className="absolute left-2 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/95 text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-white lg:flex"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
            <path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => scrollByCard("next")}
          aria-label="Next new in items"
          className="absolute right-2 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/95 text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-white lg:flex"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
            <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
