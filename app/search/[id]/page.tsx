import { ProductDetails } from '@/components/products/haseena';
import { TopBar } from '@/components/top-bar';
import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Footer } from '@/components/footer';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { searchCatalogProducts } from '@/data/products/search';
import { siteSections } from '@/data/site';

interface SearchProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return searchCatalogProducts.map((product) => ({ id: product.id }));
}

export default async function SearchProductPage({ params }: SearchProductPageProps) {
  const { id } = await params;

  const mappedProducts = searchCatalogProducts.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    images: [product.image, product.image, product.image],
    description: `${product.name} by ${product.brand}.`,
    brand: product.brand,
    rating: 4.2,
    reviews: 18,
    fabric: 'Premium Blend',
    color: 'Mixed',
    stock: product.inStock ? 20 : 0,
    tags: product.tags,
  }));

  const selectedProduct = mappedProducts.find((product) => product.id === id);

  if (!selectedProduct) {
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
          <section className="px-4 py-6 sm:px-5 lg:ml-[280px] lg:px-8 xl:px-10">
            <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px]">
              <div className="py-12 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
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

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="bg-white lg:fixed lg:inset-x-0 lg:top-0 lg:z-[90]">
        <TopBar />
        <div className="hidden lg:block">
          <Header />
        </div>
      </div>

      <main className="w-full pt-0 lg:pt-[112px]">
        <aside className="hidden border-r border-[var(--border)] bg-[var(--background)] lg:fixed lg:bottom-0 lg:left-0 lg:top-[112px] lg:z-40 lg:block lg:w-[280px] lg:overflow-y-auto">
          <SidebarNav items={siteSections.sidebar} />
        </aside>

        <section className="px-4 py-6 sm:px-5 lg:ml-[280px] lg:px-8 xl:px-10">
          <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px]">
            <ProductDetails productId={selectedProduct.id} products={mappedProducts} basePath="/search" showEndContent />
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