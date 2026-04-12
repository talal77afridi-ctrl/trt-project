export interface HaseneaProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  description: string;
  brand: string;
  rating: number;
  reviews: number;
  fabric: string;
  color: string;
  stock: number;
  tags: string[];
}

export const haseneaProducts: HaseneaProduct[] = [
  {
    id: "h001",
    name: "Radhi - Embroidered Gharara",
    category: "Women - Clothing",
    price: 21500,
    originalPrice: 36500,
    discount: 41,
    images: [
      "/assets/trending-products/dress.webp",
      "/assets/trending-products/dress1.webp",
      "/assets/trending-products/dress2.webp"
    ],
    description: "Elegant embroidered gharara with modern design and premium fabric. Perfect for festive occasions and weddings.",
    brand: "Haseens Official",
    rating: 3.9,
    reviews: 11,
    fabric: "Cotton Silk Blend",
    color: "Maroon",
    stock: 8,
    tags: ["embroidered", "gharara", "wedding"]
  },
  {
    id: "h002",
    name: "Ferzah - Classic Suit",
    category: "Women - Clothing",
    price: 17400,
    originalPrice: 30000,
    discount: 42,
    images: [
      "/assets/trending-products/dress3.webp",
      "/assets/trending-products/dress4.webp",
      "/assets/trending-products/dress5.webp"
    ],
    description: "Traditional suit with fine embroidery work. Crafted with premium fabrics for a sophisticated look.",
    brand: "Haseens Official",
    rating: 4.0,
    reviews: 35,
    fabric: "Embroidered Silk",
    color: "Grey",
    stock: 12,
    tags: ["suit", "traditional", "embroidered"]
  },
  {
    id: "h003",
    name: "Guinezar - Silk Kameez",
    category: "Women - Clothing",
    price: 17900,
    originalPrice: 28000,
    discount: 36,
    images: [
      "/assets/trending-products/dress6.webp",
      "/assets/trending-products/dress7.webp",
      "/assets/trending-products/dress8.webp"
    ],
    description: "Luxurious silk kameez with intricate embroidery and embellishments. Ideal for parties and special occasions.",
    brand: "Haseens Official",
    rating: 3.4,
    reviews: 9,
    fabric: "Pure Silk",
    color: "Maroon",
    stock: 6,
    tags: ["kameez", "silk", "embroidered"]
  },
  {
    id: "h004",
    name: "Soraya - Printed Dress",
    category: "Women - Clothing",
    price: 16000,
    originalPrice: 32000,
    discount: 50,
    images: [
      "/assets/trending-products/dress9.webp",
      "/assets/trending-products/dress10.webp",
      "/assets/trending-products/dress11.webp"
    ],
    description: "Contemporary printed dress with flowing silhouette. Perfect blend of tradition and modern style.",
    brand: "Haseens Official",
    rating: 3.6,
    reviews: 43,
    fabric: "Cotton Linen",
    color: "Navy",
    stock: 15,
    tags: ["printed", "dress", "contemporary"]
  },
  {
    id: "h005",
    name: "Moti - Luxurious Suit",
    category: "Women - Clothing",
    price: 21900,
    originalPrice: 35000,
    discount: 37,
    images: [
      "/assets/trending-products/dress.webp",
      "/assets/trending-products/dress1.webp",
      "/assets/trending-products/dress2.webp"
    ],
    description: "Premium suit with beautiful embroidery and stone work. A statement piece for special celebrations.",
    brand: "Haseens Official",
    rating: 5.0,
    reviews: 2,
    fabric: "Organza Silk",
    color: "Gold",
    stock: 4,
    tags: ["luxurious", "suit", "embroidered"]
  },
  {
    id: "h006",
    name: "Noor - Eastern Stitched",
    category: "Women - Eastern Stitched",
    price: 19500,
    originalPrice: 35000,
    discount: 44,
    images: [
      "/assets/trending-products/dress3.webp",
      "/assets/trending-products/dress4.webp",
      "/assets/trending-products/dress5.webp"
    ],
    description: "Beautifully stitched eastern wear with traditional embellishments. Comfortable and stylish for everyday wear.",
    brand: "Haseens Official",
    rating: 4.5,
    reviews: 18,
    fabric: "Cotton Silk",
    color: "Pink",
    stock: 10,
    tags: ["eastern", "stitched", "traditional"]
  },
  {
    id: "h007",
    name: "Amara - Kurta Set",
    category: "Women - Unstitched",
    price: 12500,
    originalPrice: 22000,
    discount: 43,
    images: [
      "/assets/trending-products/dress6.webp",
      "/assets/trending-products/dress7.webp",
      "/assets/trending-products/dress8.webp"
    ],
    description: "Premium unstitched fabric set with beautiful print. Perfect for customizing to your preference.",
    brand: "Haseens Official",
    rating: 4.2,
    reviews: 27,
    fabric: "Cotton Linen",
    color: "Blue",
    stock: 20,
    tags: ["unstitched", "kurta", "set"]
  },
  {
    id: "h008",
    name: "Zaira - Festive Wear",
    category: "Women - Eastern Ready to wear",
    price: 24500,
    originalPrice: 42000,
    discount: 42,
    images: [
      "/assets/trending-products/dress9.webp",
      "/assets/trending-products/dress10.webp",
      "/assets/trending-products/dress11.webp"
    ],
    description: "Stunning festive wear with elaborate embroidery and stone setting. Made for grand celebrations.",
    brand: "Haseens Official",
    rating: 4.8,
    reviews: 55,
    fabric: "Organza with Embroidery",
    color: "Mint Green",
    stock: 7,
    tags: ["festive", "embroidered", "wedding"]
  },
  {
    id: "h009",
    name: "Layla - Kurta Set",
    category: "Women - Kurta Set",
    price: 18500,
    originalPrice: 33000,
    discount: 44,
    images: [
      "/assets/trending-products/dress.webp",
      "/assets/trending-products/dress1.webp",
      "/assets/trending-products/dress2.webp"
    ],
    description: "Coordinated kurta set with matching dupatta. Versatile for both casual and formal occasions.",
    brand: "Haseens Official",
    rating: 4.1,
    reviews: 33,
    fabric: "Premium Cotton",
    color: "Cream",
    stock: 14,
    tags: ["kurta", "set", "versatile"]
  },
  {
    id: "h010",
    name: "Sahra - Anarkali",
    category: "Women - Clothing",
    price: 23000,
    originalPrice: 38500,
    discount: 40,
    images: [
      "/assets/trending-products/dress3.webp",
      "/assets/trending-products/dress4.webp",
      "/assets/trending-products/dress5.webp"
    ],
    description: "Flowing Anarkali with intricate design and beautiful embroidery. A timeless choice for celebrations.",
    brand: "Haseens Official",
    rating: 4.6,
    reviews: 48,
    fabric: "Georgette Silk",
    color: "Terracotta",
    stock: 9,
    tags: ["anarkali", "flowing", "embroidered"]
  },
  {
    id: "h011",
    name: "Farah - Sharara",
    category: "Women - Clothing",
    price: 22000,
    originalPrice: 39500,
    discount: 44,
    images: [
      "/assets/trending-products/dress6.webp",
      "/assets/trending-products/dress7.webp",
      "/assets/trending-products/dress8.webp"
    ],
    description: "Elegant sharara with premium embroidery and stone details. Perfect for weddings and festivities.",
    brand: "Haseens Official",
    rating: 4.7,
    reviews: 61,
    fabric: "Faux Georgette",
    color: "Purple",
    stock: 11,
    tags: ["sharara", "wedding", "embroidered"]
  },
  {
    id: "h012",
    name: "Yasmin - Lehenga",
    category: "Women - Clothing",
    price: 26000,
    originalPrice: 45000,
    discount: 42,
    images: [
      "/assets/trending-products/dress9.webp",
      "/assets/trending-products/dress10.webp",
      "/assets/trending-products/dress11.webp"
    ],
    description: "Luxurious lehenga choli with full embroidery coverage and matching dupatta. Statement piece for grand occasions.",
    brand: "Haseens Official",
    rating: 4.9,
    reviews: 87,
    fabric: "Bridal Silk",
    color: "Burgundy",
    stock: 5,
    tags: ["lehenga", "bridal", "luxury"]
  }
];
