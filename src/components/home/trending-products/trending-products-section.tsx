import Link from "next/link";
import { homeSections } from "@/data/home/home-sections";

const filters = ["Category", "Sort By", "Fabric", "Price", "Size", "Color", "Brands"];

export function TrendingProductsSection() {
  return (
    <section className="pb-12 pt-10 sm:pt-12">
      <h2 className="text-[1.12rem] font-semibold leading-tight text-[var(--foreground)]">Trending Products</h2>

      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 sm:hidden [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {filters.map((filter) => (
          <button
            key={`mobile-${filter}`}
            type="button"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-black/15 bg-white px-4 py-2 text-[0.95rem] font-semibold text-[#4b5563]"
          >
            {filter}
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
              <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}

        <button type="button" className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-black/15 bg-white px-3 py-2 text-[0.95rem] font-semibold text-[#4b5563]">
          In-stock
          <span className="relative inline-flex h-5 w-9 rounded-full bg-[#ebebeb]">
            <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
          </span>
        </button>

        <button type="button" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white text-[#4b5563]">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
            <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
        {filters.map((filter, index) => (
          <button
            key={filter}
            type="button"
            className={`inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white px-4 py-2 text-[0.95rem] font-semibold text-[#4b5563] ${
              index === 1 ? "pr-5" : ""
            }`}
          >
            {filter}
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
              <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}

        <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white px-4 py-2 text-[0.95rem] font-semibold text-[#4b5563]">
          In-stock
          <span className="relative inline-flex h-5 w-9 rounded-full bg-[#ebebeb]">
            <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
          </span>
        </button>

        <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white text-[#4b5563]">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
            <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-7 lg:grid-cols-4 lg:gap-x-5">
        {homeSections.trendingProducts.map((product, index) => {
          const productId = `t${String(index + 1).padStart(3, '0')}`;
          return (
          <li key={`${product.name}-${product.subtitle}`}>
            <article>
              <Link href={`/trending-products/${productId}`}>
              <figure className="relative h-[250px] overflow-hidden rounded-lg bg-[#ececec] sm:h-[300px]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-[1.04]" loading="lazy" />

                <span className="absolute left-2 top-2 rounded-md bg-[#ef2f2f] px-2 py-0.5 text-[0.94rem] font-semibold text-white">
                  {product.discount}
                </span>

                {product.adTag ? <span className="absolute left-2 top-9 rounded-md bg-white/95 px-2 py-0.5 text-[0.82rem] font-semibold text-[#5f6368]">Ad</span> : null}

                <button type="button" aria-label="Wishlist" className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm">
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
                    <path d="M10 16.5 3.8 10.8A3.8 3.8 0 0 1 9.1 5.3L10 6.2l.9-.9a3.8 3.8 0 0 1 5.3 5.5L10 16.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </button>

                {product.hasVideoIcon ? (
                  <span className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm">
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                      <path d="M7 5.5v9l7-4.5-7-4.5Z" fill="currentColor" />
                    </svg>
                  </span>
                ) : null}
              </figure>
              </Link>

              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[1.15rem] font-semibold leading-tight text-[#e53935] sm:text-[1.28rem]">{product.price}</div>
                  <div className="mt-1 text-[1.02rem] text-[#6b7280] line-through sm:text-[0.96rem]">{product.oldPrice}</div>
                  <h3 className="mt-1 truncate text-[1.02rem] font-medium text-[#3f4752] sm:text-[0.98rem]">{product.name}</h3>
                  <p className="truncate text-[1rem] text-[#6b7280] sm:text-[0.95rem]">{product.subtitle}</p>
                </div>

                <Link href={`/trending-products/${productId}`} aria-label="Add to bag" className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white text-[#4b5563]">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path d="M7 9h10l-1 9H8L7 9Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M9 9a3 3 0 1 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 11.5v4M10 13.5h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center rounded-md bg-[#1f72ff] px-2 py-0.5 text-[0.8rem] font-semibold text-white">⚡ Express</span>
                <span className="inline-flex max-w-full items-center rounded-md bg-[#f6f6f6] px-2 py-0.5 text-[0.8rem] font-semibold text-[#4b5563]">⭐ {product.rating} ({product.reviews})</span>
              </div>
            </article>
          </li>
          );
        })}
      </ul>
    </section>
  );
}
