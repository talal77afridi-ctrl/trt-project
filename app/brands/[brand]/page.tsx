import { TopBar } from '@/components/top-bar';
import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Footer } from '@/components/footer';
import { ProductListing } from '@/components/products/haseena';
import { siteSections } from '@/data/site';
import { getPopularBrandCatalog, popularBrandSlugs } from '@/data/products/popular';

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return popularBrandSlugs.map((brand) => ({ brand }));
}

export default async function BrandListingPage({ params }: BrandPageProps) {
  const { brand } = await params;
  const catalog = getPopularBrandCatalog(brand);

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
        <Header />
      </div>

      <main className="w-full pt-0 lg:pt-[112px]">
        <aside className="hidden border-r border-[var(--border)] bg-[var(--background)] lg:fixed lg:top-[112px] lg:bottom-0 lg:left-0 lg:z-40 lg:block lg:w-[280px] lg:overflow-y-auto">
          <SidebarNav items={siteSections.sidebar} />
        </aside>

        <section className="px-4 py-3 sm:px-5 sm:py-4 lg:ml-[280px] lg:px-8 lg:py-5 xl:px-10">
          <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px]">
            <div className="border-b border-gray-200 pb-5">
              <h1 className="text-[1.5rem] font-semibold tracking-tight text-[#141414]">{catalog.name}</h1>
              <p className="mt-1 text-[14px] text-[#545454]">{catalog.products.length} items</p>
            </div>

            <div className="border-b border-gray-200 py-4">
              <div className="relative pr-10">
                <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="whitespace-nowrap rounded-[11px] bg-[#f1f2f4] px-4 py-2 text-[15px] font-medium text-[#444f60]"
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="More categories"
                  className="absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6d8db] bg-white text-[#4a5564]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5 12.5 10 7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="py-5">
              <ProductListing sortBy="newest" products={catalog.products} basePath={`/brands/${brand}`} />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-center text-[1rem] font-medium text-[#151515]">No more products</h3>

              <div className="relative mt-4 pr-12">
                <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {catalog.editorialTags.map((tag) => (
                    <span
                      key={tag}
                      className="whitespace-nowrap rounded-[10px] bg-[#f1f2f4] px-4 py-2 text-[14px] text-[#333a44]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="More tags"
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#d6d8db] bg-white text-[#4a5564]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5 12.5 10 7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="mt-5 border-t border-gray-200 pt-5 text-[14px] leading-8 text-[#1d2530]">
                <h4 className="text-[1rem] font-semibold">{catalog.name}</h4>
                <p className="mt-2">Elevate Your Style with {catalog.name}</p>
                <p>Discover the finest collection by {catalog.name} — crafted with premium fabrics and timeless designs that blend cultural heritage with contemporary fashion.</p>
                <p>Key Trends for 2025:</p>
                <p>Statement embroidery with clean, modern tailoring</p>
                <p>Festive co-ord sets with polished finishing and wearable comfort</p>
                <p>Refined color palettes with elevated handcrafted accents</p>
                <p>Why Choose {catalog.name} on TRT:</p>
                <p>Perfect balance between tradition and modern style</p>
                <p>Ideal for festive events, weddings, and special occasions</p>
                <p>New collections added seasonally with fast delivery</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="lg:pl-[280px]">
        <Footer />
      </div>
    </div>
  );
}
