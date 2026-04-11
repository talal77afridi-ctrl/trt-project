import type { ClothingMenuItem, ClothingMenuSectionRow } from "./women-clothing-menu";

export const womenAccessoriesMenuTitle = "Jewelry";

export const womenAccessoriesMenuItems: ClothingMenuItem[] = [
  { title: "Shop All", featured: true },
  { title: "Bangles", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Bangles" },
  { title: "Jewelry Set", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Jewelry set" },
  { title: "Earrings", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Earrings" },
  { title: "Choker", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Choker" },
  { title: "Bracelet", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Bracelet" },
  { title: "Ring", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Ring" },
  { title: "Necklace", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Necklace" },
  { title: "Bindya", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Bindya" },
  { title: "Nose Pin", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Nose pin" },
  { title: "Body Jewelry", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Body jewelry" },
  { title: "Watches", imageSrc: "/assets/sidebar/accessories/watch.webp", imageAlt: "Watches" },
];

export const womenAccessoriesMenuSectionRows: ClothingMenuSectionRow[] = [
  {
    title: "Bag",
    items: [
      { title: "Shop All", featured: true },
      { title: "Clutch", imageSrc: "/assets/sidebar/accessories/bag.webp", imageAlt: "Clutch" },
      { title: "Shoulder Bag", imageSrc: "/assets/sidebar/accessories/bag.webp", imageAlt: "Shoulder bag" },
      { title: "Wallet", imageSrc: "/assets/sidebar/accessories/bag.webp", imageAlt: "Wallet" },
    ],
  },
  {
    title: "Hair Accessories",
    items: [
      { title: "Shop All", featured: true },
      { title: "Hair Pins", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Hair pins" },
      { title: "Headband", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Headband" },
      { title: "Scrunchies", imageSrc: "/assets/sidebar/accessories/jewerly.webp", imageAlt: "Scrunchies" },
    ],
  },
  {
    title: "Eyewear",
    items: [
      { title: "Shop All", featured: true },
      { title: "Sunglasses", imageSrc: "/assets/sidebar/accessories/watch.webp", imageAlt: "Sunglasses" },
      { title: "Frames", imageSrc: "/assets/sidebar/accessories/watch.webp", imageAlt: "Frames" },
      { title: "Reading Glasses", imageSrc: "/assets/sidebar/accessories/watch.webp", imageAlt: "Reading glasses" },
    ],
  },
];
