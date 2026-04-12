'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { haseneaProducts, HaseneaProduct } from '@/data/products/haseena/haseena-products';

interface ProductDetailsProps {
  productId: string;
  products?: HaseneaProduct[];
  basePath?: string;
  showEndContent?: boolean;
  showNoMoreProducts?: boolean;
  editorialTags?: string[];
  quickBuyOnly?: boolean;
  stylingVideoSources?: string[];
}

const DEFAULT_EDITORIAL_TAGS = [
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
];

export function ProductDetails({
  productId,
  products = haseneaProducts,
  basePath = '/products/haseena',
  showEndContent = false,
  showNoMoreProducts = false,
  editorialTags,
  quickBuyOnly = false,
  stylingVideoSources = [],
}: ProductDetailsProps) {
  const product = products.find((p) => p.id === productId);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addToBagMessage, setAddToBagMessage] = useState('');
  const stylingVideosRef = useRef<HTMLDivElement | null>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (!product) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-600">Product not found</p>
      </div>
    );
  }

  const collectionProducts = products.filter((p) => p.id !== product.id).slice(0, 4);
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productImages = [...product.images, ...product.images.slice(0, 3)];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const selectedTotal = product.price * quantity;

  const ratingBars = [
    { label: '5', value: 66 },
    { label: '4', value: 12 },
    { label: '3', value: 8 },
    { label: '2', value: 17 },
    { label: '1', value: 22 },
  ];

  const resolvedEditorialTags = editorialTags ?? DEFAULT_EDITORIAL_TAGS;

  const styleHooks = [
    'statement embroidery with clean tailoring',
    'modern festive cuts with graceful flow',
    'classic silhouettes with contemporary finish',
    'minimal base with elevated handcrafted accents',
  ];

  const occasionHooks = [
    'ideal for dinners and festive evenings',
    'suited for wedding events and formal gatherings',
    'easy to style for family functions and Eid looks',
    'balanced for semi-formal and party-ready wear',
  ];

  const careHooks = [
    'steam lightly to retain drape and fall',
    'prefer cool wash or dry clean for longevity',
    'store flat to preserve embroidery texture',
    'use mild care to maintain color richness',
  ];

  const variantSeed = product.id
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const styleLine = styleHooks[variantSeed % styleHooks.length];
  const occasionLine = occasionHooks[(variantSeed + 1) % occasionHooks.length];
  const careLine = careHooks[(variantSeed + 2) % careHooks.length];
  const hasStylingVideos = stylingVideoSources.length > 0;
  const mediaItems = [
    ...productImages.map((src) => ({ type: 'image' as const, src })),
    ...stylingVideoSources.map((src) => ({ type: 'video' as const, src })),
  ];
  const selectedMedia = mediaItems[mainImageIndex] ?? mediaItems[0];

  useEffect(() => {
    const container = thumbnailsContainerRef.current;
    const activeThumb = thumbnailRefs.current[mainImageIndex];

    if (!container || !activeThumb) {
      return;
    }

    const thumbTop = activeThumb.offsetTop;
    const thumbHeight = activeThumb.offsetHeight;
    const targetScrollTop = thumbTop - container.clientHeight / 2 + thumbHeight / 2;

    container.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: 'smooth',
    });
  }, [mainImageIndex]);

  return (
    <div className="space-y-8">
      <div className="text-[13px] text-[#637082]">
        Women <span className="px-2">&gt;</span> Clothing <span className="px-2">&gt;</span> Eastern Ready to wear <span className="px-2">&gt;</span> Kurta Set
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <div>
          <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-4 sm:grid-cols-[58px_minmax(0,1fr)]">
            <div ref={thumbnailsContainerRef} className="max-h-[520px] space-y-3 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {mediaItems.map((media, idx) => (
                <button
                  key={`${media.src}-${idx}`}
                  ref={(el) => {
                    thumbnailRefs.current[idx] = el;
                  }}
                  onClick={() => setMainImageIndex(idx)}
                  className={`relative h-[64px] w-[52px] overflow-hidden rounded border ${
                    mainImageIndex === idx ? 'border-[#111]' : 'border-[#d8dce1]'
                  }`}
                  type="button"
                >
                  {media.type === 'image' ? (
                    <Image
                      src={media.src}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className={`object-cover transition-all duration-200 ${
                        mainImageIndex === idx ? 'opacity-100 blur-0' : 'opacity-45 blur-[1px]'
                      }`}
                    />
                  ) : (
                    <>
                      <video
                        src={media.src}
                        className={`h-full w-full object-cover transition-all duration-200 ${
                          mainImageIndex === idx ? 'opacity-100 blur-0' : 'opacity-45 blur-[1px]'
                        }`}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-[10px] text-white">▶</span>
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>

            <div>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-[#eceff1]">
                {selectedMedia?.type === 'video' ? (
                  <video
                    key={selectedMedia.src}
                    src={selectedMedia.src}
                    className="h-full w-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={selectedMedia?.src ?? productImages[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 520px"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setMainImageIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#576273] opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 5 7.5 10 12.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setMainImageIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#576273] opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5 12.5 10 7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mt-4 text-[1rem] font-normal text-[#1a1f27]">Styling Videos</h3>
            <div className="relative mt-3 pr-10">
              <div ref={stylingVideosRef} className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {hasStylingVideos
                  ? stylingVideoSources.map((videoSrc, idx) => (
                      <button
                        key={`v-${idx}`}
                        type="button"
                        onClick={() => setMainImageIndex(productImages.length + idx)}
                        className="relative h-[96px] w-[72px] shrink-0 overflow-hidden rounded bg-[#e7ebef]"
                      >
                        <video src={videoSrc} className="h-full w-full object-cover" muted loop playsInline preload="metadata" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white">▶</span>
                        </span>
                      </button>
                    ))
                  : productImages.map((videoThumb, idx) => (
                      <div key={`v-${idx}`} className="relative h-[96px] w-[72px] shrink-0 overflow-hidden rounded bg-[#e7ebef]">
                        <Image src={videoThumb} alt={`video ${idx + 1}`} fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-[#525c68]">▶</span>
                        </span>
                      </div>
                    ))}
              </div>
              {(hasStylingVideos ? stylingVideoSources.length : productImages.length) > 4 ? (
                <button
                  type="button"
                  onClick={() => stylingVideosRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                  aria-label="More styling videos"
                  className="absolute right-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6dbe1] bg-white text-[#5b6676] shadow"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5 12.5 10 7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-[#d8dde3] bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[1.2rem] font-semibold leading-tight text-[#131821]">{product.brand}</h1>
                <p className="mt-1 text-[14px] text-[#596477]">{product.name.split('-')[0].trim()}</p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6ece9] text-[#9f6f65]">☼</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[34px] font-semibold text-[#141923]">PKR {product.price.toLocaleString()}</p>
              <div className="flex gap-2 text-[#4f5965]">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d6dbe1]">↗</button>
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d6dbe1]">♡</button>
              </div>
            </div>

            <div className="mt-3 inline-flex items-center rounded bg-[#fff4ee] px-2 py-1 text-[12px] text-[#d06945]">
              ⊕ Earn 258 points
            </div>

            <div className="mt-3 flex items-center gap-2 text-[14px] text-[#4b5665]">
              <div className="flex gap-[2px]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-[#f4be24]' : 'fill-[#d2d7de]'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span>{product.rating}</span>
              <span className="text-[#2e3f58] underline">{product.reviews} Reviews</span>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-[#d6dbe1]">
              <div className="border-b border-[#dfe4ea] px-3 py-2 text-[14px] text-[#2a323e]">⚡ Express <span className="ml-2 text-[#4d5867]">Instant dispatch, no delays</span></div>
              <div className="border-b border-[#dfe4ea] px-3 py-2 text-[14px] text-[#2a323e]">▣ Est. shipping by Apr 16, 2026</div>
              <div className="px-3 py-2 text-[14px] text-[#2a323e]">↻ Easy 14 days return and refund</div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[20px] font-semibold text-[#1c2430]">Size</p>
              <button type="button" className="text-[14px] text-[#2e425f] underline">Size Chart</button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[42px] rounded-lg border px-3 py-2 text-[14px] ${
                    selectedSize === size ? 'border-[#131821] bg-[#131821] text-white' : 'border-[#d6dbe1] text-[#343d4a]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-[14px] font-semibold text-[#1f2732]">Quantity</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 rounded-lg border border-[#d6dbe1] text-[#454f5e]"
                >
                  -
                </button>
                <span className="w-6 text-center text-[14px] text-[#1e2732]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="h-8 w-8 rounded-lg border border-[#d6dbe1] text-[#454f5e]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => {
                  if (!selectedSize) {
                    setAddToBagMessage('Please select a size first');
                    return;
                  }

                  const currentCount = Number(window.localStorage.getItem('cart-count') || '0');
                  const nextCount = currentCount + quantity;
                  const existingItems = JSON.parse(window.localStorage.getItem('cart-items') || '[]') as Array<{
                    id: string;
                    size: string;
                    quantity: number;
                    name: string;
                    brand: string;
                    price: number;
                    image: string;
                  }>;

                  const existingIndex = existingItems.findIndex(
                    (item) => item.id === product.id && item.size === selectedSize
                  );

                  if (existingIndex >= 0) {
                    existingItems[existingIndex].quantity += quantity;
                  } else {
                    existingItems.push({
                      id: product.id,
                      size: selectedSize,
                      quantity,
                      name: product.name,
                      brand: product.brand,
                      price: product.price,
                      image: product.images[0],
                    });
                  }

                  window.localStorage.setItem('cart-items', JSON.stringify(existingItems));
                  window.localStorage.setItem('cart-count', String(nextCount));
                  window.dispatchEvent(new CustomEvent('cart-count-updated', { detail: { count: nextCount } }));
                  setAddToBagMessage(`Added ${quantity} item(s) of size ${selectedSize} to bag`);
                }}
                className="w-full rounded-lg bg-[#0f1116] py-2.5 text-[15px] font-semibold text-white"
              >
                Add To Bag
              </button>
              {selectedSize ? (
                <p className="text-[13px] text-[#4d5868]">
                  Selected size: <span className="font-semibold">{selectedSize}</span> · Price: <span className="font-semibold">PKR {selectedTotal.toLocaleString()}</span>
                </p>
              ) : null}
              {addToBagMessage ? <p className="text-[13px] text-[#2e425f]">{addToBagMessage}</p> : null}
              <button type="button" className="w-full rounded-lg border border-[#d6dbe1] py-2.5 text-[15px] text-[#222a34]">Buy Now</button>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-[#d6dbe1] px-3 py-2 text-[14px]">
              <div>
                <span className="text-[#db7a42]">⊕</span>
                <span className="ml-2 text-[#2a3340]">Earn <span className="font-semibold text-[#d06a42]">258 points</span> on this purchase</span>
              </div>
              <span className="text-[#6f7a88]">›</span>
            </div>

            {!quickBuyOnly ? (
            <div className="mt-4">
              <h3 className="text-[20px] font-semibold text-[#1a202a]">Product Details</h3>
              <div className="mt-2 overflow-hidden rounded-lg border border-[#d9dee5]">
                {[
                  ['Bottom Style', 'Plazzo'],
                  ['Color Type', product.color],
                  ['Dupatta Fabric', 'Net'],
                  ['Product ID', `VAY${product.id.replace('h', '')}745`],
                  ['Lining Attached', 'As shown in picture'],
                  ['Number Of Pieces', '3 piece - top + bottom + dupatta'],
                  ['Product Type', 'Festive/party wear'],
                  ['Season', 'All season'],
                  ['Shirt Fabric', 'Poly silk'],
                  ['Top Style', 'Long kurta'],
                  ['Trouser Fabrics', 'Poly silk'],
                  ['Work Technique', 'Embroidered'],
                ].map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[42%_58%] border-b border-[#e1e5ea] last:border-b-0">
                    <div className="bg-[#f8fafc] px-3 py-2 text-[13px] text-[#2d3746]">{key}</div>
                    <div className="px-3 py-2 text-[13px] text-[#2d3746]">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-[14px] leading-6 text-[#27303c]">
                <p className="text-[15px] font-semibold">Additional Description:</p>
                <p>This outfit includes a dupatta measuring less than 2.5 yards, offering a lightweight and manageable drape.</p>
              </div>

              <div className="mt-4 text-[14px] leading-6 text-[#27303c]">
                <p className="text-[15px] font-semibold">Disclaimer:</p>
                <p>Actual product color may vary slightly from the image.</p>
              </div>

              <div className="mt-4">
                <h4 className="text-[20px] font-semibold text-[#16202b]">Shopping Security</h4>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[14px] text-[#0b7749]">
                  <p>✓ Safe Payment</p>
                  <p>✓ Secure Logistics</p>
                  <p>✓ Customer Services</p>
                  <p>✓ Privacy Protection</p>
                </div>
              </div>
            </div>
            ) : null}
          </div>
        </div>
      </div>

      {!quickBuyOnly ? (
      <>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <div className="space-y-3">
          <h3 className="text-[20px] font-semibold text-[#171f29]">Ratings and reviews</h3>
          <div className="rounded-xl border border-[#d8dde3] p-4">
            <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-4">
              <div>
                <p className="text-[52px] font-semibold leading-none text-[#212832]">{product.rating}<span className="text-[38px]">★</span></p>
                <p className="mt-1 text-[13px] text-[#5e6977]">{product.reviews} ratings</p>
              </div>
              <div className="space-y-2">
                {ratingBars.map((bar) => (
                  <div key={bar.label} className="grid grid-cols-[16px_minmax(0,1fr)] items-center gap-2">
                    <span className="text-[12px] text-[#4f5b6a]">{bar.label}</span>
                    <div className="h-2 rounded-full bg-[#eceff3]">
                      <div className="h-2 rounded-full bg-[#50555d]" style={{ width: `${bar.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-[#d8dde3] p-3">
                <p className="text-[#f3be23]">★★★★★</p>
                <p className="mt-1 text-[12px] text-[#5f6a77]">Anonymous · Apr 7, 2026</p>
                <p className="mt-2 text-[14px] text-[#242c37]">It&apos;s medium size I want &ldquo;Large&rdquo; size</p>
              </div>
              <div className="rounded-lg border border-[#d8dde3] p-3">
                <p className="text-[#f3be23]">★★☆☆☆</p>
                <p className="mt-1 text-[12px] text-[#5f6a77]">Anonymous · Apr 4, 2026</p>
                <p className="mt-2 text-[14px] text-[#242c37]">Looking beautiful best for functions 👍</p>
              </div>
            </div>

            <button type="button" className="mt-3 w-full rounded-lg border border-[#d2d8df] py-2 text-[14px] text-[#2d3746]">
              Read more reviews
            </button>
          </div>
        </div>
        <div />
      </div>

      <div className="space-y-8 border-t border-[#dde2e8] pt-8">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[20px] font-semibold text-[#141b25]">More from the collection</h3>
            <div className="flex gap-2">
              <button type="button" className="h-10 w-10 rounded-full border border-[#d3d8df]">‹</button>
              <button type="button" className="h-10 w-10 rounded-full border border-[#d3d8df]">›</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {collectionProducts.map((item) => (
              <Link key={item.id} href={`${basePath}/${item.id}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#edf0f3]">
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  <button type="button" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#6a7480]">♡</button>
                </div>
                <div className="pt-2">
                  <p className="text-[30px] lg:text-[16px] font-semibold text-[#1b212a]">PKR {item.price.toLocaleString()}</p>
                  <p className="text-[34px] lg:text-[13px] text-[#4f5b69]">{item.brand} · {item.name.split('-')[0].trim()}</p>
                  <div className="mt-1 inline-flex items-center gap-1 rounded-[8px] bg-[#1d63df] px-2 py-1 text-[26px] lg:text-[12px] font-semibold text-white">⚡ Express</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[20px] font-semibold text-[#141b25]">Similar Products</h3>
            <div className="flex gap-2">
              <button type="button" className="h-10 w-10 rounded-full border border-[#d3d8df]">‹</button>
              <button type="button" className="h-10 w-10 rounded-full border border-[#d3d8df]">›</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {similarProducts.map((item) => (
              <Link key={item.id} href={`${basePath}/${item.id}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#edf0f3]">
                  <span className="absolute left-3 top-3 z-20 rounded-[7px] bg-[#eb1f24] px-3 py-1 text-[12px] font-semibold text-white">-{item.discount}%</span>
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                </div>
                <div className="pt-2">
                  <p className="text-[30px] lg:text-[16px] font-semibold text-[#1b212a]">PKR {item.price.toLocaleString()}</p>
                  <p className="text-[34px] lg:text-[13px] text-[#4f5b69]">{item.brand}</p>
                  <div className="mt-1 inline-flex items-center gap-1 rounded-[8px] bg-[#1d63df] px-2 py-1 text-[26px] lg:text-[12px] font-semibold text-white">⚡ Express</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {showEndContent ? (
        <section className="border-t border-[#dde2e8] pt-6">
          <h3 className="text-center text-[1rem] font-medium text-[#151515]">No more products</h3>

          <div className="relative mt-4 pr-10">
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {resolvedEditorialTags.map((tag) => (
                <span
                  key={`${product.id}-${tag}`}
                  className="whitespace-nowrap rounded-[10px] bg-[#f1f2f4] px-4 py-2 text-[14px] text-[#333a44]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              aria-label="More story tags"
              className="absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6d8db] bg-white text-[#4a5564]"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5 12.5 10 7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mt-5 border-t border-[#dde2e8] pt-5 text-[14px] leading-7 text-[#1d2530]">
            <h4 className="text-[1rem] font-semibold">{product.brand}</h4>
            <p className="mt-2">Elevate Modest Fashion with {product.brand}</p>
            <p>
              A modern take on modest fashion, {product.brand} offers elegant cuts and premium {product.fabric.toLowerCase()} that blend cultural roots with trend-conscious styling.
            </p>
            <p>Key Trends for 2025:</p>
            <p>{styleLine}</p>
            <p>{product.category} edits with polished finishing and wearable comfort</p>
            <p>{product.color} tones with refined detailing for statement looks</p>
            <p>Why Choose {product.brand} on LAAM:</p>
            <p>Perfect balance between coverage and style</p>
            <p>{occasionLine}</p>
            <p>{careLine}</p>
          </div>
        </section>
        ) : null}

        {showNoMoreProducts && !showEndContent ? (
          <div className="border-t border-[#dde2e8] pt-6 text-center">
            <h3 className="text-[1rem] font-medium text-[#151515]">No more products</h3>
          </div>
        ) : null}
      </div>
      </>
      ) : null}
    </div>
  );
}
