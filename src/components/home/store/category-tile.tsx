import type { HomeCategoryItem } from "@/data/home/home-sections";

type CategoryTileProps = {
  item: HomeCategoryItem;
  size?: "small" | "medium";
};

export function CategoryTile({ item, size = "small" }: CategoryTileProps) {
  const cardWidthClass = size === "medium" ? "w-[78px] sm:w-[108px] lg:w-[132px]" : "w-[74px] sm:w-[95px] lg:w-[110px]";
  const figureHeightClass = size === "medium" ? "h-[78px] sm:h-[132px] lg:h-[148px]" : "h-[74px] sm:h-[125px] lg:h-[138px]";

  return (
    <article className={`mx-auto ${cardWidthClass}`}>
      <figure
        className={`${figureHeightClass} w-full rounded-2xl border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]`}
        style={{
          backgroundImage: `url(${item.image}), ${item.background}`,
          backgroundSize: "contain, cover",
          backgroundPosition: "center bottom, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      />
      <figcaption className="mt-2 text-[0.95rem] font-medium leading-tight text-[var(--foreground)] sm:text-base">{item.label}</figcaption>
    </article>
  );
}
