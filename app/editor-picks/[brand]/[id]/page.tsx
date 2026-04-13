import { TopBar } from '@/components/top-bar';
import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Footer } from '@/components/footer';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { ProductDetails } from '@/components/products/haseena';
import { siteSections } from '@/data/site';
import { getEditorPickCatalog, editorPickSlugs } from '@/data/products/editor-picks';

interface EditorPickProductPageProps {
  params: Promise<{ brand: string; id: string }>;
}

export async function generateStaticParams() {
  return editorPickSlugs.flatMap((brand) => {
    const catalog = getEditorPickCatalog(brand);
    return catalog.products.map((product) => ({
      brand,
      id: product.id,
    }));
  });
}

export default async function EditorPickProductPage({ params }: EditorPickProductPageProps) {
  const { brand, id } = await params;
  const catalog = getEditorPickCatalog(brand);
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
              basePath={`/editor-picks/${brand}`}
              showNoMoreProducts
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
