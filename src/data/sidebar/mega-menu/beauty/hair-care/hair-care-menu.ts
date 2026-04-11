import type { ClothingMenuItem, ClothingMenuSectionRow } from "../../women-clothing-menu";

export const beautyHairCareMenuTitle = "Treatments";

export const beautyHairCareMenuItems: ClothingMenuItem[] = [
  { title: "Shop All", featured: true },
  { title: "Hair Serums", imageSrc: "/assets/sidebar/beauty/hair/care.webp", imageAlt: "Hair serums" },
  { title: "Hair Oils", imageSrc: "/assets/sidebar/beauty/hair/care.webp", imageAlt: "Hair oils" },
  { title: "Hair Masks", imageSrc: "/assets/sidebar/beauty/hair/care.webp", imageAlt: "Hair masks" },
];

export const beautyHairCareMenuSectionRows: ClothingMenuSectionRow[] = [
  {
    title: "Cleansers",
    items: [
      { title: "Shop All", featured: true },
      { title: "Shampoo", imageSrc: "/assets/sidebar/beauty/hair/shampo.webp", imageAlt: "Shampoo" },
      { title: "Clarifying Shampoo", imageSrc: "/assets/sidebar/beauty/hair/shampo.webp", imageAlt: "Clarifying shampoo" },
      { title: "Daily Wash", imageSrc: "/assets/sidebar/beauty/hair/shampo.webp", imageAlt: "Daily wash" },
    ],
  },
  {
    title: "Hair Color",
    items: [
      { title: "Shop All", featured: true },
      { title: "Root Touch Up", imageSrc: "/assets/sidebar/beauty/hair/root.webp", imageAlt: "Root touch up" },
      { title: "Permanent Color", imageSrc: "/assets/sidebar/beauty/hair/root.webp", imageAlt: "Permanent hair color" },
      { title: "Color Care", imageSrc: "/assets/sidebar/beauty/hair/root.webp", imageAlt: "Color care" },
    ],
  },
  {
    title: "Styling",
    items: [
      { title: "Shop All", featured: true },
      { title: "Hair Gel", imageSrc: "/assets/sidebar/beauty/hair/gel.webp", imageAlt: "Hair gel" },
      { title: "Wax", imageSrc: "/assets/sidebar/beauty/hair/gel.webp", imageAlt: "Hair wax" },
      { title: "Texture Paste", imageSrc: "/assets/sidebar/beauty/hair/gel.webp", imageAlt: "Texture paste" },
    ],
  },
  {
    title: "Conditioners",
    items: [
      { title: "Shop All", featured: true },
      { title: "Regular Conditioner", imageSrc: "/assets/sidebar/beauty/hair/regular.webp", imageAlt: "Regular conditioner" },
      { title: "Deep Conditioner", imageSrc: "/assets/sidebar/beauty/hair/regular.webp", imageAlt: "Deep conditioner" },
      { title: "Leave In", imageSrc: "/assets/sidebar/beauty/hair/regular.webp", imageAlt: "Leave in conditioner" },
    ],
  },
];
