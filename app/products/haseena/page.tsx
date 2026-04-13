import { TopBar } from '@/components/top-bar';
import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { ProductListing } from '@/components/products/haseena';
import { Footer } from '@/components/footer';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { BrandMobilePageHeader } from '@/components/common/brand-mobile-page-header';
import { siteSections } from '@/data/site';
import Link from 'next/link';

export const metadata = {
  title: 'Haseens Official - Premium Traditional Wear | TRT',
  description: 'Browse Haseens Official collection of premium traditional wear. Discover beautiful kurtas, suits, sarees, and more with professional styling.',
};

export default function HaseneaListingPage() {
  const categories = [
    'Women',
    'Women - Clothing',
    'Women - Eastern Ready to wear',
    'Women - Kurta Set',
    'Women - Unstitched',
    'Women - Eastern Stitched',
    'Girl',
  ];

  const storyTags = [
    'Nauratan',
    'Riwayat',
    'Saanjh',
    'Sajni vol I & II',
    'Sham-e-Haseen',
    'Saath Saath',
    'Shehrzaad',
    'Rang-e-Ishq',
    'Hayat',
    'Afsaneh',
    'Gehna',
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
            <BrandMobilePageHeader title="Haseens Official" itemCount={40} />

            <div className="hidden border-b border-gray-200 pb-4 lg:block">
              <div className="flex items-center gap-2">
                <Link href="/" aria-label="Back" className="inline-flex h-7 w-7 items-center justify-center text-[#4a5564]">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 5 7.5 10 12.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <h1 className="text-[1rem] lg:text-[1.5rem] font-semibold tracking-tight text-[#141414]">Haseens Official</h1>
              </div>
              <p className="mt-1 text-[0.95rem] lg:text-[14px] text-[#545454]">40 items</p>
            </div>

            <div className="border-b border-gray-200 py-4">
              <div className="relative pr-10">
                <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="rounded-[11px] bg-[#f1f2f4] px-4 py-2 text-[12px] font-medium text-[#444f60] whitespace-nowrap sm:text-[15px]"
                  >
                    {category}
                  </button>
                ))}
                </div>
                <button
                  type="button"
                  aria-label="More categories"
                  className="absolute right-0 top-1/2 hidden -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-[#d6d8db] bg-white text-[#4a5564] lg:flex"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5 12.5 10 7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="py-5">
              <ProductListing sortBy="newest" mobileControlMode="secondaryOnly" />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-center text-[1rem] font-medium text-[#151515]">No more products</h3>

              <div className="relative mt-4 pr-12">
                <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {storyTags.map((tag) => (
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
                  className="absolute right-0 top-1/2 hidden -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-[#d6d8db] bg-white text-[#4a5564] lg:flex"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5 12.5 10 7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="mt-5 border-t border-gray-200 pt-5 text-[14px] leading-8 text-[#1d2530]">
                <h4 className="text-[1rem] font-semibold">Haseens Official</h4>
                <p className="mt-2">Elevate Modest Fashion with Haseens Official</p>
                <p>A modern take on modest fashion, Haseens offers elegant cuts and luxurious fabrics that speak to both cultural roots and trend-conscious styling.</p>
                <p>Key Trends for 2025:</p>
                <p>Kaftans with modern embellishments and belt detailing</p>
                <p>Co-ord sets in Korean silk with flowy cuts</p>
                <p>Muted metallics &amp; embroidered sleeves dominating modestwear</p>
                <p>Why Choose Haseens on LAAM:</p>
                <p>Perfect balance between coverage and style</p>
                <p>Ideal for dinners, festive wear &amp; destination weddings</p>
                <p>Fast delivery with new collections added seasonally</p>
              </div>
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
