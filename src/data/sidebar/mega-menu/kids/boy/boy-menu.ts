import type { ClothingMenuItem, ClothingMenuSectionRow } from "../../women-clothing-menu";

export const kidsBoyMenuTitle = "Clothing";

export const kidsBoyMenuItems: ClothingMenuItem[] = [
  { title: "Shop All", featured: true },
  { title: "Western", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Western" },
  { title: "Eastern", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Eastern" },
  { title: "Activewear", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Activewear" },
  { title: "Sets", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Sets" },
  { title: "Kurta", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Kurta" },
];

export const kidsBoyMenuSectionRows: ClothingMenuSectionRow[] = [
  {
    title: "Inner And Sleepwear",
    items: [
      { title: "Shop All", featured: true },
      { title: "Night Suit", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Night suit" },
      { title: "Pajama Set", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Pajama set" },
      { title: "Thermals", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Thermals" },
    ],
  },
  {
    title: "Footwear",
    items: [
      { title: "Shop All", featured: true },
      { title: "Sandals", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Sandals" },
      { title: "Sneakers", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Sneakers" },
      { title: "Boots", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Boots" },
    ],
  },
  {
    title: "Accessories",
    items: [
      { title: "Shop All", featured: true },
      { title: "Cap", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Cap" },
      { title: "Belt", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Belt" },
      { title: "Bag", imageSrc: "/assets/sidebar/kids/boy/boy.webp", imageAlt: "Bag" },
    ],
  },
];
