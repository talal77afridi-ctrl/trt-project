import { TopBar } from '@/components/top-bar';
import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Footer } from '@/components/footer';
import { siteSections } from '@/data/site';
import { SearchResultsView } from '@/components/search/search-results-view';

type SearchPageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

const validCategories = new Set(['All', 'Men', 'Women', 'Kids']);

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (params.q ?? '').trim();
  const categoryFromUrl = (params.category ?? 'All').trim();
  const safeCategory = validCategories.has(categoryFromUrl) ? categoryFromUrl : 'All';

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="bg-white lg:fixed lg:inset-x-0 lg:top-0 lg:z-[90]">
        <TopBar />
        <Header />
      </div>

      <main className="w-full pt-0 lg:pt-[112px]">
        <aside className="hidden border-r border-[var(--border)] bg-[var(--background)] lg:fixed lg:bottom-0 lg:left-0 lg:top-[112px] lg:z-40 lg:block lg:w-[280px] lg:overflow-y-auto">
          <SidebarNav items={siteSections.sidebar} />
        </aside>

        <section className="px-4 py-3 sm:px-5 sm:py-4 lg:ml-[280px] lg:px-8 lg:py-5 xl:px-10">
          <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px]">
            <SearchResultsView initialQuery={query} initialCategory={safeCategory as 'All' | 'Men' | 'Women' | 'Kids'} />
          </div>
        </section>
      </main>

      <div className="lg:pl-[280px]">
        <Footer />
      </div>
    </div>
  );
}