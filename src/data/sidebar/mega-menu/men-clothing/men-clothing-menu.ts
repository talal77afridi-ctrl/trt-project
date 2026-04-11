import type { ClothingMenuItem, ClothingMenuSectionRow } from "../women-clothing-menu";

export const menClothingMenuTitle = "Eastern";

export const menClothingMenuItems: ClothingMenuItem[] = [
  { title: "Shop All", featured: true },
  { title: "Waistcoat", imageSrc: "/assets/sidebar/men/clothing/dress.webp", imageAlt: "Waistcoat" },
  { title: "Shalwar Kameez", imageSrc: "/assets/sidebar/men/clothing/dress.webp", imageAlt: "Shalwar kameez" },
  { title: "Kurta Set", imageSrc: "/assets/sidebar/men/clothing/dress.webp", imageAlt: "Kurta set" },
  { title: "Kurta", imageSrc: "/assets/sidebar/men/clothing/dress.webp", imageAlt: "Kurta" },
  { title: "Sherwani", imageSrc: "/assets/sidebar/men/clothing/dress.webp", imageAlt: "Sherwani" },
  { title: "Prince Coat", imageSrc: "/assets/sidebar/men/clothing/dress.webp", imageAlt: "Prince coat" },
  { title: "Unstitched", imageSrc: "/assets/sidebar/men/clothing/dress.webp", imageAlt: "Unstitched" },
  { title: "Trousers", imageSrc: "/assets/sidebar/men/clothing/dress.webp", imageAlt: "Trousers" },
  { title: "Shalwar", imageSrc: "/assets/sidebar/men/clothing/dress.webp", imageAlt: "Shalwar" },
];

export const menClothingMenuSectionRows: ClothingMenuSectionRow[] = [
  {
    title: "Western",
    items: [
      { title: "Shop All", featured: true },
      { title: "Blazer", imageSrc: "/assets/sidebar/men/clothing/dress2.webp", imageAlt: "Blazer" },
      { title: "Jacket", imageSrc: "/assets/sidebar/men/clothing/dress2.webp", imageAlt: "Jacket" },
      { title: "Shirt", imageSrc: "/assets/sidebar/men/clothing/dress2.webp", imageAlt: "Shirt" },
      { title: "Jeans", imageSrc: "/assets/sidebar/men/clothing/dress2.webp", imageAlt: "Jeans" },
      { title: "T-Shirt", imageSrc: "/assets/sidebar/men/clothing/dress2.webp", imageAlt: "T-shirt" },
    ],
  },
  {
    title: "Activewear",
    items: [
      { title: "Shop All", featured: true },
      { title: "Tracksuit", imageSrc: "/assets/sidebar/men/clothing/dress1.webp", imageAlt: "Tracksuit" },
      { title: "Joggers", imageSrc: "/assets/sidebar/men/clothing/dress1.webp", imageAlt: "Joggers" },
      { title: "Trousers", imageSrc: "/assets/sidebar/men/clothing/dress1.webp", imageAlt: "Trousers" },
      { title: "Hoodie", imageSrc: "/assets/sidebar/men/clothing/dress1.webp", imageAlt: "Hoodie" },
      { title: "Shorts", imageSrc: "/assets/sidebar/men/clothing/dress1.webp", imageAlt: "Shorts" },
    ],
  },
];
