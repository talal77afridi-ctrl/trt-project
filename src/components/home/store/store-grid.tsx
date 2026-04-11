import { homeSections } from "@/data/home/home-sections";
import { CategoryTile } from "@/components/home/store/category-tile";

export function StoreGrid() {
  return (
    <section className="px-0 pb-2 pt-8 sm:pt-10">
      <h2 className="text-[1.12rem] font-semibold leading-tight text-gray-900 lg:text-[1.12rem]">Shop Our Stores</h2>

      <ul className="mt-4 flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {homeSections.stores.map((item) => (
          <li key={item.label} className="shrink-0 text-center">
            <CategoryTile item={item} size="small" />
          </li>
        ))}
      </ul>

      <ul className="mt-5 hidden lg:grid lg:grid-cols-6 lg:gap-x-2 lg:gap-y-4">
        {homeSections.stores.map((item) => (
          <li key={item.label} className="text-center">
            <CategoryTile item={item} size="small" />
          </li>
        ))}
      </ul>

      <div className="-mx-4 mt-10 sm:mx-0">
        <img
          src="/assets/landing/offer.png"
          alt="Special offer banner"
          className="w-full rounded-none object-cover sm:rounded-[22px]"
          loading="lazy"
        />
      </div>

      <ul className="mt-6 flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {homeSections.featuredCategories.slice(0, 6).map((item) => (
          <li key={item.label} className="shrink-0 text-center">
            <CategoryTile item={item} size="medium" />
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {homeSections.featuredCategories.slice(6, 12).map((item) => (
          <li key={item.label} className="shrink-0 text-center">
            <CategoryTile item={item} size="medium" />
          </li>
        ))}
      </ul>

      <ul className="mt-10 hidden lg:grid lg:grid-cols-6 lg:gap-x-3 lg:gap-y-6">
        {homeSections.featuredCategories.map((item) => (
          <li key={item.label} className="text-center">
            <CategoryTile item={item} size="medium" />
          </li>
        ))}
      </ul>
    </section>
  );
}
