import { ProductDetails } from '@/components/products/haseena';
import { TopBar } from '@/components/top-bar';
import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Footer } from '@/components/footer';
import { haseneaProducts } from '@/data/products/haseena';
import { siteSections } from '@/data/site';

export const metadata = {
  title: 'Haseens Official Product | Premium Traditional Wear | TRT',
  description: 'Discover beautiful and elegant products from Haseens Official collection.',
};

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return haseneaProducts.map(product => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = haseneaProducts.find(p => p.id === id);

  if (!product) {
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
            <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px]">
              <div className="py-12 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
                <p className="mt-2 text-gray-600">The product you are looking for does not exist.</p>
                <a href="/products/haseena" className="mt-6 inline-block rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                  Back to Products
                </a>
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
        <Header />
      </div>

      <main className="w-full pt-0 lg:pt-[112px]">
        <aside className="hidden border-r border-[var(--border)] bg-[var(--background)] lg:fixed lg:top-[112px] lg:bottom-0 lg:left-0 lg:z-40 lg:block lg:w-[280px] lg:overflow-y-auto">
          <SidebarNav items={siteSections.sidebar} />
        </aside>

        <section className="px-4 py-6 sm:px-5 lg:ml-[280px] lg:px-8 xl:px-10">
          <div className="mx-auto w-full max-w-[980px] xl:max-w-[1100px]">
            <ProductDetails productId={id} showEndContent />
          </div>
        </section>
      </main>

      <div className="lg:pl-[280px]">
        <Footer />
      </div>
    </div>
  );
}
