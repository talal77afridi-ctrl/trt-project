import type { ClothingMenuItem, ClothingMenuSectionRow } from "../women-clothing-menu";

export const menAccessoriesMenuTitle = "Accessories";

export const menAccessoriesMenuItems: ClothingMenuItem[] = [
  { title: "Shop All", featured: true },
  { title: "Ring", imageSrc: "/assets/sidebar/men/accessories/ring.webp", imageAlt: "Ring" },
  { title: "Cap", imageSrc: "/assets/sidebar/men/accessories/cap.webp", imageAlt: "Cap" },
  { title: "Eyewear", imageSrc: "/assets/sidebar/men/accessories/glass.webp", imageAlt: "Eyewear" },
  { title: "Wallet", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Wallet" },
  { title: "Shawl", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Shawl" },
  { title: "Pocket Square", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Pocket square" },
  { title: "Belt", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Belt" },
  { title: "Tie", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Tie" },
  { title: "Brooch", imageSrc: "/assets/sidebar/men/accessories/ring.webp", imageAlt: "Brooch" },
  { title: "Cufflinks", imageSrc: "/assets/sidebar/men/accessories/ring.webp", imageAlt: "Cufflinks" },
  { title: "Watch", imageSrc: "/assets/sidebar/men/accessories/cap.webp", imageAlt: "Watch" },
];

export const menAccessoriesMenuSectionRows: ClothingMenuSectionRow[] = [
  {
    title: "Jewelry",
    placement: "top",
    items: [
      { title: "Shop All", featured: true },
      { title: "Ring", imageSrc: "/assets/sidebar/men/accessories/ring.webp", imageAlt: "Ring" },
      { title: "Bracelet", imageSrc: "/assets/sidebar/men/accessories/ring.webp", imageAlt: "Bracelet" },
      { title: "Chain", imageSrc: "/assets/sidebar/men/accessories/ring.webp", imageAlt: "Chain" },
      { title: "Necklace", imageSrc: "/assets/sidebar/men/accessories/ring.webp", imageAlt: "Necklace" },
      { title: "Brooch", imageSrc: "/assets/sidebar/men/accessories/ring.webp", imageAlt: "Brooch" },
    ],
  },
  {
    title: "Cap",
    placement: "top",
    items: [
      { title: "Shop All", featured: true },
      { title: "Baseball Cap", imageSrc: "/assets/sidebar/men/accessories/cap.webp", imageAlt: "Baseball cap" },
      { title: "Beanie", imageSrc: "/assets/sidebar/men/accessories/cap.webp", imageAlt: "Beanie" },
      { title: "Flat Cap", imageSrc: "/assets/sidebar/men/accessories/cap.webp", imageAlt: "Flat cap" },
      { title: "Trucker Cap", imageSrc: "/assets/sidebar/men/accessories/cap.webp", imageAlt: "Trucker cap" },
    ],
    placement: "top",
  },
  {
    title: "Eyewear",
    placement: "top",
    items: [
      { title: "Shop All", featured: true },
      { title: "Shawl", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Shawl" },
      { title: "Pocket Square", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Pocket square" },
      { title: "Ihram", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Ihram" },
      { title: "Wallet", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Wallet" },
      { title: "Muffler", imageSrc: "/assets/sidebar/men/accessories/shawls.webp", imageAlt: "Muffler" },
    ],
    placement: "top",
  },
];
