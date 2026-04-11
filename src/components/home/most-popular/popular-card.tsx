import type { MostPopularBrand } from "@/data/home/home-sections";

type PopularCardProps = {
  brand: MostPopularBrand;
};

export function PopularCard({ brand }: PopularCardProps) {
  return (
    <article>
      <figure className="relative h-[300px] overflow-hidden rounded-xl bg-[#e8edf1]">
        <img src={brand.image} alt={brand.name} className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute bottom-3 left-3 rounded-lg bg-[#fff2f1] px-3 py-1 text-[0.97rem] font-semibold text-[#d3554b] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          {brand.discount}
        </span>
      </figure>
      <h3 className="mt-3 text-[1.12rem] font-semibold leading-tight text-[var(--foreground)]">{brand.name}</h3>
      <p className="mt-1 text-[1.02rem] text-[#4b5563]">{brand.items}</p>
    </article>
  );
}
