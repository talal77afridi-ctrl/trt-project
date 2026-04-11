"use client";

import { useEffect, useState } from "react";

const slides = [
  { image: "/assets/banner/banner.webp", alt: "TRT banner 1" },
  { image: "/assets/banner/banner1.webp", alt: "TRT banner 2" },
  { image: "/assets/banner/banner2.webp", alt: "TRT banner 3" },
] as const;

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="-mx-4 sm:mx-0">
      <figure className="relative h-[180px] overflow-hidden rounded-none bg-[#2a1b13] sm:h-[250px] sm:rounded-[18px] lg:h-[320px] xl:h-[340px]">

        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
            role="img"
            aria-label={slide.alt}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}

      </figure>
    </section>
  );
}