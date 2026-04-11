export type HomeCategoryItem = {
  label: string;
  background: string;
  image: string;
};

export type MostPopularBrand = {
  name: string;
  items: string;
  discount: string;
  image: string;
};

export type StylingVideoItem = {
  title: string;
  price: string;
  video: string;
};

export type EditorPickItem = {
  name: string;
  items: string;
  discount: string;
  image: string;
  adTag?: boolean;
};

export type TrendingProductItem = {
  name: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  discount: string;
  image: string;
  rating: string;
  reviews: string;
  adTag?: boolean;
  hasVideoIcon?: boolean;
};

export const homeSections = {
  stores: [
    { label: "Women", background: "linear-gradient(180deg, #9fb4c4 0%, #f7ead6 100%)", image: "/assets/banner/image2.png" },
    { label: "Men", background: "linear-gradient(180deg, #365a79 0%, #dfe6eb 100%)", image: "/assets/banner/image1.png" },
    { label: "Kids", background: "linear-gradient(180deg, #9d7b5c 0%, #eef2f4 100%)", image: "/assets/banner/image3.png" },
    { label: "West", background: "linear-gradient(180deg, #7792a8 0%, #f1f1ec 100%)", image: "/assets/banner/image.png" },
    { label: "Jewelry", background: "linear-gradient(180deg, #b49b72 0%, #f4efe4 100%)", image: "/assets/banner/image4.png" },
    { label: "Retail", background: "linear-gradient(180deg, #2f3c50 0%, #e6d1c6 100%)", image: "/assets/banner/image1.png" },
  ] as HomeCategoryItem[],

  featuredCategories: [
    { label: "Festive Wear", background: "linear-gradient(180deg, #9fbbcf 0%, #f4f0e8 100%)", image: "/assets/banner/image2.png" },
    { label: "Luxury Wear", background: "linear-gradient(180deg, #6d8ba3 0%, #e8edf1 100%)", image: "/assets/banner/image1.png" },
    { label: "Daily Wear", background: "linear-gradient(180deg, #90a7b8 0%, #f2f4f5 100%)", image: "/assets/banner/image3.png" },
    { label: "Fusion", background: "linear-gradient(180deg, #89a2b6 0%, #f0f1ef 100%)", image: "/assets/banner/image.png" },
    { label: "Modest Wear", background: "linear-gradient(180deg, #97acbc 0%, #eceeea 100%)", image: "/assets/banner/image4.png" },
    { label: "Girl Eastern", background: "linear-gradient(180deg, #86a0b3 0%, #f2efe9 100%)", image: "/assets/banner/image1.png" },
    { label: "Women Western", background: "linear-gradient(180deg, #93aabd 0%, #ecefeb 100%)", image: "/assets/banner/image2.png" },
    { label: "Jewelry", background: "linear-gradient(180deg, #9bb0bf 0%, #f3ece3 100%)", image: "/assets/banner/image4.png" },
    { label: "Western", background: "linear-gradient(180deg, #96aabb 0%, #eff1f2 100%)", image: "/assets/banner/image1.png" },
    { label: "Boy Newborn", background: "linear-gradient(180deg, #8ea5b7 0%, #f4f3ef 100%)", image: "/assets/banner/image3.png" },
    { label: "Eastern", background: "linear-gradient(180deg, #8ca3b6 0%, #ecefe9 100%)", image: "/assets/banner/image.png" },
    { label: "Girl Newborn", background: "linear-gradient(180deg, #9cb1c1 0%, #f5efe8 100%)", image: "/assets/banner/image2.png" },
  ] as HomeCategoryItem[],

  mostPopular: [
    { name: "Haseens Official", items: "456 items", discount: "Upto 55% off", image: "/assets/popular/dress.webp" },
    { name: "Four Season Boutique", items: "491 items", discount: "Upto 78% off", image: "/assets/popular/dress1.webp" },
    { name: "Sahibas By Mirza", items: "415 items", discount: "Upto 75% off", image: "/assets/popular/dress2.webp" },
    { name: "Khuda Baksh Creations", items: "116 items", discount: "Upto 60% off", image: "/assets/popular/dress3.webp" },
    { name: "Diara Couture", items: "252 items", discount: "Upto 60% off", image: "/assets/banner/image2.png" },
    { name: "Rang-e-Haya", items: "204 items", discount: "Upto 75% off", image: "/assets/banner/image3.png" },
    { name: "Agha Jaan", items: "186 items", discount: "Upto 79% off", image: "/assets/banner/image4.png" },
    { name: "Aik Pret", items: "109 items", discount: "Upto 63% off", image: "/assets/banner/image1.png" },
  ] as MostPopularBrand[],

  chosenEdit: [
    { name: "Momin Online", items: "251 items", discount: "Upto 74% off", image: "/assets/choose/dress.webp" },
    { name: "Laal Clothing", items: "244 items", discount: "Upto 70% off", image: "/assets/choose/dress1.webp" },
    { name: "Abaan Zohan", items: "87 items", discount: "Upto 70% off", image: "/assets/choose/dress2.webp" },
    { name: "Bin Tayyab", items: "238 items", discount: "Upto 60% off", image: "/assets/choose/dress3.webp" },
    { name: "Noorma Kaamal", items: "202 items", discount: "Upto 63% off", image: "/assets/choose/dress.webp" },
    { name: "Truba", items: "59 items", discount: "Upto 40% off", image: "/assets/choose/dress1.webp" },
    { name: "Tehzeeb Libas", items: "156 items", discount: "Upto 80% off", image: "/assets/choose/dress2.webp" },
    { name: "Polawn", items: "247 items", discount: "Upto 64% off", image: "/assets/choose/dress3.webp" },
  ] as MostPopularBrand[],

  trendingBrands: [
    { name: "Zuri", items: "146 items", discount: "Upto 60% off", image: "/assets/Trending/dress.webp" },
    { name: "Laleen", items: "213 items", discount: "Upto 60% off", image: "/assets/Trending/dress1.webp" },
    { name: "Fresh Birds", items: "221 items", discount: "Upto 60% off", image: "/assets/Trending/dress2.webp" },
    { name: "Panache Apparel", items: "286 items", discount: "Upto 70% off", image: "/assets/Trending/dress3.webp" },
    { name: "Pehnawa By Bin Akram's", items: "136 items", discount: "Upto 65% off", image: "/assets/Trending/dress.webp" },
    { name: "Meerak Pret", items: "136 items", discount: "Upto 60% off", image: "/assets/Trending/dress1.webp" },
    { name: "Ayesha Closet", items: "257 items", discount: "Upto 49% off", image: "/assets/Trending/dress2.webp" },
    { name: "Chaudhary Arts", items: "175 items", discount: "Upto 68% off", image: "/assets/Trending/dress3.webp" },
  ] as MostPopularBrand[],

  newIn2026: [
    { name: "Maria.B | Safari Scape -Vol29", items: "Maria B", discount: "Upto 13% off", image: "/assets/choose/dress.webp" },
    { name: "Qalamkar | Casual Pret '26", items: "Qalamkar", discount: "Upto 5% off", image: "/assets/choose/dress1.webp" },
    { name: "Manara | Eid Pret Collection'26", items: "Manara", discount: "Upto 10% off", image: "/assets/choose/dress2.webp" },
    { name: "Noor Eid Luxe Printskhaas '26", items: "Noor By Saadia Asad", discount: "Upto 10% off", image: "/assets/choose/dress3.webp" },
    { name: "Noorma Kaamal | New Pret", items: "Noorma Kaamal", discount: "Upto 12% off", image: "/assets/popular/dress.webp" },
    { name: "Laleen | Soft Formal", items: "Laleen", discount: "Upto 9% off", image: "/assets/Trending/dress1.webp" },
    { name: "Panache Apparel | New Arrivals", items: "Panache Apparel", discount: "Upto 14% off", image: "/assets/Trending/dress3.webp" },
    { name: "Aik Pret | Signature Edit", items: "Aik Pret", discount: "Upto 11% off", image: "/assets/popular/dress1.webp" },
  ] as MostPopularBrand[],

  stylingVideos: [
    { title: "Pretpret", price: "PKR 3,690", video: "/assets/videos/video.mp4" },
    { title: "Malhaar", price: "PKR 21,999", video: "/assets/videos/video2.mp4" },
    { title: "Sahibas By Mirza", price: "PKR 3,998", video: "/assets/videos/video3.mp4" },
    { title: "Rajdulari", price: "PKR 12,000", video: "/assets/videos/video4.mp4" },
    { title: "Elsa Summer Pret", price: "PKR 9,499", video: "/assets/videos/video5.mp4" },
  ] as StylingVideoItem[],

  editorPicks: [
    { name: "Meeral Luxe", items: "113 items", discount: "Upto 72% off", image: "/assets/picks/dress.webp", adTag: true },
    { name: "Ahmad Raza", items: "354 items", discount: "Upto 40% off", image: "/assets/picks/dress1.webp", adTag: true },
    { name: "Farah Talib Aziz", items: "71 items", discount: "Upto 50% off", image: "/assets/picks/dress2.webp" },
    { name: "Alliyas_By_Farooqkhalid", items: "36 items", discount: "Upto 50% off", image: "/assets/picks/dress3.webp" },
    { name: "Muntaha By Shanzay", items: "50 items", discount: "Upto 20% off", image: "/assets/picks/dress4.webp" },
    { name: "Wardrobe Essentials", items: "27 items", discount: "Upto 20% off", image: "/assets/picks/dress5.webp" },
    { name: "Daak & Co.", items: "21 items", discount: "Upto 25% off", image: "/assets/picks/dress6.webp" },
    { name: "Yashfa Studio", items: "12 items", discount: "Upto 10% off", image: "/assets/picks/dress7.webp" },
  ] as EditorPickItem[],

  trendingProducts: [
    {
      name: "Zeekstore",
      subtitle: "Zeekstore · D200",
      price: "PKR 2,999",
      oldPrice: "PKR 5,998",
      discount: "-50%",
      image: "/assets/trending-products/dress.webp",
      rating: "3.6",
      reviews: "16",
    },
    {
      name: "Ayeza Collection",
      subtitle: "Ayeza Collection · Black Kurta Set 20",
      price: "PKR 6,100",
      oldPrice: "PKR 7,620",
      discount: "-22%",
      image: "/assets/trending-products/dress1.webp",
      rating: "4.1",
      reviews: "28",
      hasVideoIcon: true,
    },
    {
      name: "Kids Mania",
      subtitle: "Kids Mania · Affordable Full Fleece",
      price: "PKR 880",
      oldPrice: "PKR 1,600",
      discount: "-45%",
      image: "/assets/trending-products/dress2.webp",
      rating: "4.0",
      reviews: "41",
    },
    {
      name: "Chaudhary Arts",
      subtitle: "Chaudhary Arts · Aadab Cotton - 3pc",
      price: "PKR 6,359",
      oldPrice: "PKR 11,998",
      discount: "-47%",
      image: "/assets/trending-products/dress3.webp",
      rating: "3.9",
      reviews: "17",
    },
    {
      name: "Agha Jaan",
      subtitle: "Agha Jaan · Mashal",
      price: "PKR 6,990",
      oldPrice: "PKR 23,300",
      discount: "-70%",
      image: "/assets/trending-products/dress4.webp",
      rating: "4.3",
      reviews: "100+",
    },
    {
      name: "Urge Pret",
      subtitle: "Urge Pret · MUNAZA",
      price: "PKR 8,890",
      oldPrice: "PKR 12,700",
      discount: "-30%",
      image: "/assets/trending-products/dress5.webp",
      rating: "4.2",
      reviews: "53",
      adTag: true,
    },
    {
      name: "Haseens Official",
      subtitle: "Haseens Official · Komal",
      price: "PKR 16,896",
      oldPrice: "PKR 35,200",
      discount: "-52%",
      image: "/assets/trending-products/dress6.webp",
      rating: "4.1",
      reviews: "100+",
    },
    {
      name: "Chaudhary Arts",
      subtitle: "Chaudhary Arts · Laaj Embroidered",
      price: "PKR 6,050",
      oldPrice: "PKR 12,100",
      discount: "-50%",
      image: "/assets/trending-products/dress7.webp",
      rating: "3.8",
      reviews: "35",
    },
    {
      name: "Agha Jaan",
      subtitle: "Agha Jaan · Insia Blue",
      price: "PKR 6,810",
      oldPrice: "PKR 22,700",
      discount: "-70%",
      image: "/assets/trending-products/dress8.webp",
      rating: "3.8",
      reviews: "100+",
      hasVideoIcon: true,
    },
    {
      name: "Yolo Pret",
      subtitle: "Yolo Pret · 3Pc Embroidered Raw Silk",
      price: "PKR 6,951",
      oldPrice: "PKR 9,929",
      discount: "-30%",
      image: "/assets/trending-products/dress9.webp",
      rating: "4.3",
      reviews: "42",
      hasVideoIcon: true,
    },
    {
      name: "The Great Masters (TGM)",
      subtitle: "The Great Masters (TGM) · (3 Pc)",
      price: "PKR 11,440",
      oldPrice: "PKR 14,300",
      discount: "-20%",
      image: "/assets/trending-products/dress10.webp",
      rating: "3.9",
      reviews: "45",
      adTag: true,
    },
    {
      name: "Laal Clothing",
      subtitle: "Laal Clothing · JLC-067",
      price: "PKR 6,885",
      oldPrice: "PKR 15,300",
      discount: "-55%",
      image: "/assets/trending-products/dress11.webp",
      rating: "5.0",
      reviews: "4",
    },
  ] as TrendingProductItem[],
};
