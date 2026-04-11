import { TopBar } from "@/components/top-bar";
import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import { HeroBanner } from "@/components/hero-banner";
import { Footer } from "@/components/footer";
import { StoreGrid, MostPopularSection, ChosenEditSection, TrendingBrandsSection, NewIn2026Section, StylingVideosSection, EditorPicksSection, TrendingProductsSection } from "@/components/home";
import { siteSections } from "@/data/site";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="bg-white lg:fixed lg:inset-x-0 lg:top-0 lg:z-[90]">
        <TopBar />
        <Header />

        <nav className="border-b border-[var(--border)] bg-white px-4 py-2 lg:hidden">
          <ul className="grid grid-cols-4 items-center text-center">
            {(["West", "Women", "Men", "Kids"] as const).map((tab) => (
              <li key={tab}>
                <button className="w-full py-2 text-[1.05rem] font-semibold text-[#525e6b]">{tab}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <main className="w-full pt-0 lg:pt-[112px]">
        <aside className="hidden border-r border-[var(--border)] bg-[var(--background)] lg:fixed lg:top-[112px] lg:bottom-0 lg:left-0 lg:z-40 lg:block lg:w-[280px] lg:overflow-y-auto">
          <SidebarNav items={siteSections.sidebar} />
        </aside>

        <section className="px-4 py-3 sm:px-5 sm:py-4 lg:ml-[280px] lg:px-8 lg:py-5 xl:px-10">
          <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px]">
            <HeroBanner />
            <StoreGrid />
            <MostPopularSection />
            <ChosenEditSection />
            <TrendingBrandsSection />
            <NewIn2026Section />
            <StylingVideosSection />
            <EditorPicksSection />
            <TrendingProductsSection />
          </div>
        </section>
      </main>

      <div className="lg:pl-[280px]">
        <Footer />
      </div>
    </div>
  );
}
