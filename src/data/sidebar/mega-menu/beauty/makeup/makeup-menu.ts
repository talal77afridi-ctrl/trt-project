import type { ClothingMenuItem, ClothingMenuSectionRow } from "../../women-clothing-menu";

export const beautyMakeupMenuTitle = "Face";

export const beautyMakeupMenuItems: ClothingMenuItem[] = [
  { title: "Shop All", featured: true },
  { title: "Blush", imageSrc: "/assets/sidebar/beauty/makeup/blush.webp", imageAlt: "Blush" },
  { title: "Foundation", imageSrc: "/assets/sidebar/beauty/makeup/blush.webp", imageAlt: "Foundation" },
  { title: "Highlighters", imageSrc: "/assets/sidebar/beauty/makeup/blush.webp", imageAlt: "Highlighters" },
  { title: "Concealer", imageSrc: "/assets/sidebar/beauty/makeup/blush.webp", imageAlt: "Concealer" },
  { title: "Setting Spray", imageSrc: "/assets/sidebar/beauty/makeup/blush.webp", imageAlt: "Setting spray" },
  { title: "Contour", imageSrc: "/assets/sidebar/beauty/makeup/blush.webp", imageAlt: "Contour" },
];

export const beautyMakeupMenuSectionRows: ClothingMenuSectionRow[] = [
  {
    title: "Eyes",
    items: [
      { title: "Shop All", featured: true },
      { title: "Mascara", imageSrc: "/assets/sidebar/beauty/makeup/eyel.webp", imageAlt: "Mascara" },
      { title: "Eyeliner", imageSrc: "/assets/sidebar/beauty/makeup/eyel.webp", imageAlt: "Eyeliner" },
      { title: "Eyeshadow", imageSrc: "/assets/sidebar/beauty/makeup/eyel.webp", imageAlt: "Eyeshadow" },
    ],
  },
  {
    title: "Lips",
    items: [
      { title: "Shop All", featured: true },
      { title: "Lipstick", imageSrc: "/assets/sidebar/beauty/makeup/lips.webp", imageAlt: "Lipstick" },
      { title: "Lip Gloss", imageSrc: "/assets/sidebar/beauty/makeup/lips.webp", imageAlt: "Lip gloss" },
      { title: "Lip Liner", imageSrc: "/assets/sidebar/beauty/makeup/lips.webp", imageAlt: "Lip liner" },
    ],
  },
  {
    title: "Nails",
    items: [
      { title: "Shop All", featured: true },
      { title: "Nail Polish", imageSrc: "/assets/sidebar/beauty/makeup/nails.webp", imageAlt: "Nail polish" },
      { title: "Nail Care", imageSrc: "/assets/sidebar/beauty/makeup/nails.webp", imageAlt: "Nail care" },
      { title: "False Nails", imageSrc: "/assets/sidebar/beauty/makeup/nails.webp", imageAlt: "False nails" },
    ],
  },
];
