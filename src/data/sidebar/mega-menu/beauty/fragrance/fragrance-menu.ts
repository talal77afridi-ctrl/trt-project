import type { ClothingMenuItem, ClothingMenuSectionRow } from "../../women-clothing-menu";

export const beautyFragranceMenuTitle = "Fragrance";

export const beautyFragranceMenuItems: ClothingMenuItem[] = [
  { title: "Shop All", featured: true },
  { title: "Mens Perfume", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Mens perfume" },
  { title: "Body Mist", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Body mist" },
  { title: "Women Perfume", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Women perfume" },
];

export const beautyFragranceMenuSectionRows: ClothingMenuSectionRow[] = [
  {
    title: "Mens Perfume",
    items: [
      { title: "Shop All", featured: true },
      { title: "Mens Perfume", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Mens perfume" },
      { title: "Luxury Perfume", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Luxury perfume" },
      { title: "Daily Wear", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Daily wear" },
    ],
  },
  {
    title: "Body Mist",
    items: [
      { title: "Shop All", featured: true },
      { title: "Body Mist", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Body mist" },
      { title: "Fresh Mist", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Fresh mist" },
      { title: "Long Lasting Mist", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Long lasting mist" },
    ],
  },
  {
    title: "Women Perfume",
    items: [
      { title: "Shop All", featured: true },
      { title: "Women Perfume", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Women perfume" },
      { title: "Eau De Parfum", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Eau de parfum" },
      { title: "Floral Scent", imageSrc: "/assets/sidebar/beauty/fragrance/perfium.webp", imageAlt: "Floral scent" },
    ],
  },
];
