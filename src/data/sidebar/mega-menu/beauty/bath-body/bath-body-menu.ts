import type { ClothingMenuItem, ClothingMenuSectionRow } from "../../women-clothing-menu";

export const beautyBathBodyMenuTitle = "Cleansers";

export const beautyBathBodyMenuItems: ClothingMenuItem[] = [
  { title: "Shop All", featured: true },
  { title: "Soap", imageSrc: "/assets/sidebar/beauty/body/soap.webp", imageAlt: "Soap" },
  { title: "Body Wash", imageSrc: "/assets/sidebar/beauty/body/soap.webp", imageAlt: "Body wash" },
];

export const beautyBathBodyMenuSectionRows: ClothingMenuSectionRow[] = [
  {
    title: "Moisturizers",
    items: [
      { title: "Shop All", featured: true },
      { title: "Body Lotion", imageSrc: "/assets/sidebar/beauty/body/lotion.webp", imageAlt: "Body lotion" },
      { title: "Body Butter", imageSrc: "/assets/sidebar/beauty/body/lotion.webp", imageAlt: "Body butter" },
    ],
  },
  {
    title: "Exfoliation",
    items: [
      { title: "Shop All", featured: true },
      { title: "Body Scrub", imageSrc: "/assets/sidebar/beauty/body/scrubs.webp", imageAlt: "Body scrub" },
      { title: "Polishing Scrub", imageSrc: "/assets/sidebar/beauty/body/scrubs.webp", imageAlt: "Polishing scrub" },
    ],
  },
  {
    title: "Hand & Foot Care",
    items: [
      { title: "Shop All", featured: true },
      { title: "Hand Oil", imageSrc: "/assets/sidebar/beauty/body/oil.webp", imageAlt: "Hand oil" },
      { title: "Foot Oil", imageSrc: "/assets/sidebar/beauty/body/oil.webp", imageAlt: "Foot oil" },
    ],
  },
];
