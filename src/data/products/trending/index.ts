import { HaseneaProduct } from '@/data/products/haseena/haseena-products';
import { homeSections } from '@/data/home/home-sections';

export type TrendingQuickBuyProduct = HaseneaProduct & {
  hasVideoIcon: boolean;
  stylingVideoSources: string[];
};

export type TrendingProductsCatalog = {
  products: TrendingQuickBuyProduct[];
};

function toNumber(value: string): number {
  return Number(value.replace(/[^\d]/g, ''));
}

function makeId(index: number): string {
  return `t${String(index + 1).padStart(3, '0')}`;
}

export function getTrendingProductsCatalog(): TrendingProductsCatalog {
  const imagePool = homeSections.trendingProducts.map((product) => product.image);

  const products = homeSections.trendingProducts.map((item, index) => ({
    id: makeId(index),
    name: item.subtitle.split('·')[1]?.trim() || item.name,
    category: 'Women - Clothing',
    price: toNumber(item.price),
    originalPrice: toNumber(item.oldPrice),
    discount: Number(item.discount.replace(/[^\d]/g, '')),
    images: [
      imagePool[index % imagePool.length],
      imagePool[(index + 1) % imagePool.length],
      imagePool[(index + 2) % imagePool.length],
    ],
    description: `${item.name} trending collection with premium quality and modern cuts.`,
    brand: item.name,
    rating: Number(item.rating),
    reviews: Number(item.reviews.replace(/[^\d]/g, '')) || 10,
    fabric: 'Premium Blend',
    color: 'Mixed',
    stock: 25,
    tags: ['trending', 'express', 'new'],
    hasVideoIcon: Boolean(item.hasVideoIcon),
    stylingVideoSources: item.hasVideoIcon ? ['/assets/videos/video.mp4', '/assets/videos/video4.mp4'] : [],
  }));

  return { products };
}
