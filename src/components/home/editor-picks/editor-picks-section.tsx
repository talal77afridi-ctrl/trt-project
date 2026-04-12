import Link from "next/link";
import { homeSections } from "@/data/home/home-sections";

export function EditorPicksSection() {
  return (
    <section className="pb-12 pt-10 sm:pt-12">
      <h2 className="text-[1.12rem] font-semibold leading-tight text-[var(--foreground)]">Editor's Picks</h2>

      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
        {homeSections.editorPicks.map((pick) => (
          <li key={pick.name}>
            <Link href={`/editor-picks/${pick.slug}`} className="block">
              <article>
                <figure className="relative h-[300px] overflow-hidden rounded-xl bg-[#e8edf1]">
                  <img
                    src={pick.image}
                    alt={pick.name}
                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-[1.04]"
                    loading="lazy"
                  />

                  {pick.adTag ? (
                    <span className="absolute left-2 top-2 rounded-md bg-white/95 px-2 py-0.5 text-[0.86rem] font-semibold text-[#6b7280]">Ad</span>
                  ) : null}

                  <span className="absolute bottom-3 left-3 rounded-lg bg-[#fff2f1] px-3 py-1 text-[0.97rem] font-semibold text-[#d3554b] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    {pick.discount}
                  </span>
                </figure>

                <h3 className="mt-3 text-[1.12rem] font-semibold leading-tight text-[var(--foreground)]">{pick.name}</h3>
                <p className="mt-1 text-[1.02rem] text-[#4b5563]">{pick.items}</p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
