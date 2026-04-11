import { homeSections } from "@/data/home/home-sections";
import { PopularCard } from "@/components/home/most-popular/popular-card";

export function TrendingBrandsSection() {
  return (
    <section className="pb-8 pt-8 sm:pt-10">
      <h2 className="text-[1.12rem] font-semibold leading-tight text-[var(--foreground)]">Trending Brands</h2>

      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
        {homeSections.trendingBrands.map((brand) => (
          <li key={brand.name}>
            <PopularCard brand={brand} />
          </li>
        ))}
      </ul>
    </section>
  );
}
