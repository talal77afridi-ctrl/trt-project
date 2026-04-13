import { TopBar } from '@/components/top-bar';
import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Footer } from '@/components/footer';
import { ProductListing } from '@/components/products/haseena';
import { BrandMobilePageHeader } from '@/components/common/brand-mobile-page-header';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { siteSections } from '@/data/site';
import { getEditorPickCatalog, editorPickSlugs } from '@/data/products/editor-picks';
import Link from 'next/link';

interface EditorPickPageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return editorPickSlugs.map((brand) => ({ brand }));
}

export default async function EditorPickListingPage({ params }: EditorPickPageProps) {
  const { brand } = await params;
  const catalog = getEditorPickCatalog(brand);

  const categories = [
    'Women',
    'Women - Clothing',
    'Women - Eastern Ready to wear',
    'Women - Kurta Set',
    'Women - Unstitched',
    'Women - Eastern Stitched',
    'Girl',
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="bg-white lg:fixed lg:inset-x-0 lg:top-0 lg:z-[90]">
        <TopBar />
        <div className="hidden lg:block">
          <Header />
        </div>
      </div>

      <main className="w-full pt-0 lg:pt-[112px]">
        <aside className="hidden border-r border-[var(--border)] bg-[var(--background)] lg:fixed lg:top-[112px] lg:bottom-0 lg:left-0 lg:z-40 lg:block lg:w-[280px] lg:overflow-y-auto">
          <SidebarNav items={siteSections.sidebar} />
        </aside>

        <section className="px-4 py-3 sm:px-5 sm:py-4 lg:ml-[280px] lg:px-8 lg:py-5 xl:px-10">
          <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px]">
            <BrandMobilePageHeader title={catalog.name} itemCount={catalog.products.length} />

            <div className="hidden border-b border-gray-200 pb-4 lg:block">
              <div className="flex items-center gap-2">
                <Link href="/" aria-label="Back" className="inline-flex h-7 w-7 items-center justify-center text-[#4a5564]">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 5 7.5 10 12.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <h1 className="text-[1rem] lg:text-[1.5rem] font-semibold tracking-tight text-[#141414]">{catalog.name}</h1>
              </div>
              <p className="mt-1 text-[0.95rem] lg:text-[14px] text-[#545454]">{catalog.products.length} items</p>
            </div>

            <div className="border-b border-gray-200 py-3">
              <div className="relative pr-10">
                <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="whitespace-nowrap rounded-[10px] bg-[#f1f2f4] px-3.5 py-2 text-[12px] font-medium text-[#444f60] sm:text-[14px]"
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="More categories"
                  className="absolute right-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6d8db] bg-white text-[#4a5564] lg:flex"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5 12.5 10 7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="py-5">
              <ProductListing sortBy="newest" products={catalog.products} basePath={`/editor-picks/${brand}`} />
            </div>

            <div className="border-t border-gray-200 pt-6 pb-6 text-center">
              <h3 className="text-[1rem] font-medium text-[#151515]">No more products</h3>
            </div>
          </div>
        </section>
      </main>

      <div className="lg:pl-[280px]">
        <Footer />
      </div>

      <div className="lg:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
}
