import { haseneaProducts, HaseneaProduct } from '@/data/products/haseena/haseena-products';

export type PopularBrandCatalog = {
  slug: string;
  name: string;
  products: HaseneaProduct[];
  editorialTags: string[];
};

const brandEditorialTags: Record<string, string[]> = {
  'four-season': ['Mehrab', 'Kaavish', 'Zeest', 'Roshni', 'Paar', 'Shaam', 'Tarlaan', 'Musafir', 'Bahaaran', 'Ulfat'],
  sahibas: ['Saffron', 'Pareesa', 'Inara', 'Zainab', 'Anokha', 'Noorain', 'Rimal', 'Sahar', 'Zahra', 'Gulnar'],
  'khuda-baksh': ['Gulkari', 'Aangan', 'Phulkari', 'Resham', 'Qashqai', 'Chikankari', 'Kashida', 'Rangrez', 'Kaarigari', 'Dastkari'],
  'diara-couture': ['Mardaan', 'Wajidi', 'Zarrar', 'Achkan', 'Bandhgala', 'Sherwani Edit', 'Rawaan', 'Khasra', 'Nazakat', 'Rumi'],
  'rang-e-haya': ['Poshak', 'Labaas', 'Jilbab', 'Khimaar', 'Tahara', 'Waqar', 'Parda', 'Hayaa', 'Iffat', 'Sakeena'],
  'agha-jaan': ['Kurta Classic', 'Waistcoat Edit', 'Shalwar Set', 'Pathani', 'Sherwani', 'Nazakat', 'Sherazi', 'Rumi', 'Barakah', 'Churidar'],
  'aik-pret': ['Casual Friday', 'Denim Kameez', 'Everyday Kurta', 'Office Edit', 'Pret Set', 'Urbane', 'Dailywear', 'Basics', 'Streetwear', 'All-day'],
  'momin-online': ['Noori', 'Tahir', 'Aman', 'Sakeena', 'Tayyib', 'Barkat', 'Rehmat', 'Nur', 'Halal Fashion', 'Modesty Edit'],
  'laal-clothing': ['Crimson', 'Rouge', 'Scarlet', 'Vermillion', 'Cherry', 'Garnet', 'Ruby', 'Cardinal', 'Maroon', 'Carmine'],
  'abaan-zohan': ['Iqra', 'Zubaan', 'Jawab', 'Aamad', 'Kitaab', 'Kahaani', 'Nuskhah', 'Tasneef', 'Bayaan', 'Qalam'],
  'bin-tayyab': ['Khalis', 'Tayyab', 'Asal', 'Nazif', 'Safa', 'Barakah', 'Paak', 'Roshni', 'Noor', 'Wafa'],
  'noorma-kaamal': ['Kaamal Edit', 'Noor-e-Ishq', 'Mehnat', 'Karigari', 'Wafa', 'Naz', 'Noorani', 'Umar', 'Hunar', 'Tazkaar'],
  truba: ['Spring Pret', 'Lawn Edit', 'Summer Breeze', 'Festive Luxe', 'Bridal Edit', 'Eid Collection', 'Winter Warmth', 'Party Ready', 'Casual Day', 'Classic Pret'],
  'tehzeeb-libas': ['Tehzeeb', 'Aadaab', 'Tameez', 'Libaas', 'Poshak', 'Pehnaawa', 'Raza', 'Waqar', 'Nawab', 'Shukriya'],
  polawn: ['Majestic', 'Sovereign', 'Sceptre', 'Throne', 'Coronet', 'Empire', 'Grandeur', 'Prestige', 'Legacy', 'Regnant'],
  zuri: ['Bloom', 'Petal', 'Flora', 'Garden Edit', 'Blossom', 'Wildflower', 'Meadow', 'Rosette', 'Lavender', 'Jasmine'],
  laleen: ['Laleh', 'Nargis', 'Shirin', 'Dilara', 'Roya', 'Nasreen', 'Mahin', 'Saba', 'Zara', 'Azar'],
  'fresh-birds': ['Sparrow', 'Finch', 'Wren', 'Robin', 'Swallow', 'Lark', 'Warbler', 'Nightingale', 'Dove', 'Cardinal'],
  'panache-apparel': ['Chic Edit', 'Couture Light', 'Parisienne', 'Riviera', 'Luxe Pret', 'Atelier', 'Élite', 'Prestige', 'Mademoiselle', 'Savoir-faire'],
  pehnawa: ['Bin Akram Edit', 'Pehnawa Essentials', 'Bridal Ready', 'Heritage', 'Formal', 'Casual', 'Premium', 'New Season', 'Partywear', 'Kammkaj'],
  'meerak-pret': ['Meerak Basics', 'Everyday Pret', 'Lahori Edit', 'Soft Hues', 'Pastel Edit', 'Minimal Pret', 'Urban Ease', 'Soft Life', 'Comfort Zone', 'Roz Marra'],
  'ayesha-closet': ['Ayesha Originals', 'Closet Edit', 'Her Picks', 'Weekend Wear', 'Workday Edit', 'Party Picks', 'Festive Faves', 'Eid Closet', 'Everyday Her', 'Power Dressing'],
  'chaudhary-arts': ['Chaudhry Heritage', 'Artisan Edit', 'Kaarigari', 'Handcrafted', 'Vintage Arts', 'Thread & Needle', 'Folk Art', 'Jaal Work', 'Shaadi Edit', 'Desi Craft'],
  'maria-b': ['Lawn', 'Pret', 'Bridal', 'Sateen', 'Studio', 'D\'Luxe', 'Basics', 'Eid', 'Festive', 'Winter'],
  qalamkar: ['Luxury Lawn', 'Festive Edit', 'Embroidered Pret', 'Chikankari', 'Premium Lawn', 'Luxury Pret', 'Naqsh', 'Meraj', 'Zarlish', 'Winter Edit'],
  manara: ['Manara Luxe', 'Heritage Weaves', 'Bridal Edit', 'Sharara Set', 'Silk Collection', 'Hand-woven', 'Grand Occasion', 'Couture', 'Dreamy Designs', 'Formal Edit'],
  noor: ['Noor by Saadia', 'Luxury Pret', 'Eid Edit', 'Festive Lawn', 'Embroidered Luxury', 'Signature Edit', 'Printed Lawn', 'Semi-formal', 'Occasion Wear', 'Bridal Pret'],
};

const brandNames: Record<string, string> = {
  'four-season': 'Four Season Boutique',
  sahibas: 'Sahibas By Mirza',
  'khuda-baksh': 'Khuda Baksh Creations',
  'diara-couture': 'Diara Couture',
  'rang-e-haya': 'Rang-e-Haya',
  'agha-jaan': 'Agha Jaan',
  'aik-pret': 'Aik Pret',
  'momin-online': 'Momin Online',
  'laal-clothing': 'Laal Clothing',
  'abaan-zohan': 'Abaan Zohan',
  'bin-tayyab': 'Bin Tayyab',
  'noorma-kaamal': 'Noorma Kaamal',
  truba: 'Truba',
  'tehzeeb-libas': 'Tehzeeb Libas',
  polawn: 'Polawn',
  zuri: 'Zuri',
  laleen: 'Laleen',
  'fresh-birds': 'Fresh Birds',
  'panache-apparel': 'Panache Apparel',
  pehnawa: 'Pehnawa By Bin Akram\'s',
  'meerak-pret': 'Meerak Pret',
  'ayesha-closet': 'Ayesha Closet',
  'chaudhary-arts': 'Chaudhary Arts',
  'maria-b': 'Maria.B',
  qalamkar: 'Qalamkar',
  manara: 'Manara',
  noor: 'Noor By Saadia Asad',
};

export const popularBrandSlugs = Object.keys(brandNames);

const menImagePool = [
  '/assets/sidebar/men/clothing/dress.webp',
  '/assets/sidebar/men/clothing/dress1.webp',
  '/assets/sidebar/men/clothing/dress2.webp',
  '/assets/sidebar/men/accessories/cap.webp',
  '/assets/sidebar/men/accessories/glass.webp',
  '/assets/sidebar/men/accessories/ring.webp',
  '/assets/sidebar/men/accessories/shawls.webp',
  '/assets/sidebar/men/foot/shoes.webp',
  '/assets/sidebar/men/Inner/boxers.webp',
];

const womenImagePool = [
  '/assets/banner/image1.png',
  '/assets/banner/image2.png',
  '/assets/banner/image3.png',
  '/assets/banner/image4.png',
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

const menFocusedBrands = new Set(['diara-couture', 'rang-e-haya', 'agha-jaan', 'aik-pret']);

function getProductImages(startIndex: number, pool: string[]): string[] {
  return [
    pool[startIndex % pool.length],
    pool[(startIndex + 1) % pool.length],
    pool[(startIndex + 2) % pool.length],
  ];
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getPopularBrandCatalog(slug: string): PopularBrandCatalog {
  const brandName = brandNames[slug] ?? slugToTitle(slug);
  const useMenHeavySet = menFocusedBrands.has(slug);
  const mixedPool = [...menImagePool, ...womenImagePool];
  const selectedPool = useMenHeavySet ? [...menImagePool, ...womenImagePool.slice(0, 6)] : mixedPool;
  const requiredBannerSetA = '/assets/banner/image3.png';
  const requiredBannerSetB = '/assets/banner/image1.png';

  const products = haseneaProducts.map((product, index) => ({
    ...product,
    id: `p${String(index + 1).padStart(3, '0')}`,
    brand: brandName,
    images:
      index === 0
        ? [requiredBannerSetA, requiredBannerSetB, selectedPool[index % selectedPool.length]]
        : index === 1
          ? [requiredBannerSetB, requiredBannerSetA, selectedPool[(index + 1) % selectedPool.length]]
          : getProductImages(index * 2, selectedPool),
  }));

  const editorialTags = brandEditorialTags[slug] ?? [
    'New Arrivals',
    'Bestsellers',
    'Featured',
    'Eid Edit',
    'Festive',
    'Premium Pret',
    'Lawn Collection',
    'Party Wear',
    'Casual',
    'Formal',
  ];

  return {
    slug,
    name: brandName,
    products,
    editorialTags,
  };
}
