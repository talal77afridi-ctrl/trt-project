import { TopBar } from '@/components/top-bar';
import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Footer } from '@/components/footer';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { ProductDetails } from '@/components/products/haseena';
import { siteSections } from '@/data/site';
import { getTrendingProductsCatalog } from '@/data/products/trending';

interface TrendingProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const catalog = getTrendingProductsCatalog();
  return catalog.products.map((product) => ({ id: product.id }));
}

export default async function TrendingProductPage({ params }: TrendingProductPageProps) {
  const { id } = await params;
  const catalog = getTrendingProductsCatalog();
  const found = catalog.products.find((p) => p.id === id);

  if (!found) {
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

          <section className="px-4 py-6 sm:px-5 lg:ml-[280px] lg:px-8 xl:px-10">
            <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px] py-12 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
              <p className="mt-2 text-gray-600">The product you are looking for does not exist.</p>
            </div>
          </section>
        </main>

        <div className="lg:pl-[280px]">
          <Footer />
        </div>
      </div>
    );
  }

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

        <section className="px-4 py-6 sm:px-5 lg:ml-[280px] lg:px-8 xl:px-10">
          <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px]">
            <ProductDetails
              productId={id}
              products={catalog.products}
              basePath="/trending-products"
              stylingVideoSources={found.stylingVideoSources}
            />
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
