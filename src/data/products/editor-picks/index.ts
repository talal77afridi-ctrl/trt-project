import { haseneaProducts, HaseneaProduct } from '@/data/products/haseena/haseena-products';

export type EditorPickCatalog = {
  slug: string;
  name: string;
  products: HaseneaProduct[];
};

const editorPickNames: Record<string, string> = {
  'meeral-luxe': 'Meeral Luxe',
  'ahmad-raza': 'Ahmad Raza',
  'farah-talib-aziz': 'Farah Talib Aziz',
  'alliyas-by-farooqkhalid': 'Alliyas_By_Farooqkhalid',
  'muntaha-by-shanzay': 'Muntaha By Shanzay',
  'wardrobe-essentials': 'Wardrobe Essentials',
  'daak-co': 'Daak & Co.',
  'yashfa-studio': 'Yashfa Studio',
};

export const editorPickSlugs = Object.keys(editorPickNames);

const picksImagePool = [
  '/assets/picks/dress.webp',
  '/assets/picks/dress1.webp',
  '/assets/picks/dress2.webp',
  '/assets/picks/dress3.webp',
  '/assets/picks/dress4.webp',
  '/assets/picks/dress5.webp',
  '/assets/picks/dress6.webp',
  '/assets/picks/dress7.webp',
  '/assets/trending-products/dress.webp',
  '/assets/trending-products/dress1.webp',
  '/assets/trending-products/dress2.webp',
  '/assets/trending-products/dress3.webp',
  '/assets/trending-products/dress4.webp',
  '/assets/trending-products/dress5.webp',
  '/assets/trending-products/dress6.webp',
  '/assets/trending-products/dress7.webp',
  '/assets/trending-products/dress8.webp',
  '/assets/trending-products/dress9.webp',
  '/assets/trending-products/dress10.webp',
  '/assets/trending-products/dress11.webp',
  '/assets/popular/dress.webp',
  '/assets/popular/dress1.webp',
  '/assets/popular/dress2.webp',
  '/assets/popular/dress3.webp',
];

function getProductImages(startIndex: number): string[] {
  return [
    picksImagePool[startIndex % picksImagePool.length],
    picksImagePool[(startIndex + 1) % picksImagePool.length],
    picksImagePool[(startIndex + 2) % picksImagePool.length],
  ];
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getEditorPickCatalog(slug: string): EditorPickCatalog {
  const brandName = editorPickNames[slug] ?? slugToTitle(slug);

  const products = haseneaProducts.map((product, index) => ({
    ...product,
    id: `ep${String(index + 1).padStart(3, '0')}`,
    brand: brandName,
    images: getProductImages(index * 3),
  }));

  return {
    slug,
    name: brandName,
    products,
  };
}
