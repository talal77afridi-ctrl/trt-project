export type ClothingMenuItem = {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  featured?: boolean;
};

export type ClothingMenuSectionRow = {
  title: string;
  items?: ClothingMenuItem[];
  placement?: "top" | "bottom";
};

export const womenClothingMenuTitle = "Eastern Ready To Wear";

export const womenClothingMenuItems: ClothingMenuItem[] = [
  {
    title: "Shop All",
    featured: true,
  },
  {
    title: "Kurta Set",
    imageSrc: "/assets/sidebar/clothing/dress.webp",
    imageAlt: "Woman in red kurta set",
  },
  {
    title: "Maxi",
    imageSrc: "/assets/sidebar/clothing/dress1.webp",
    imageAlt: "Woman in festive maxi dress",
  },
  {
    title: "Pishwas",
    imageSrc: "/assets/sidebar/clothing/dress.webp",
    imageAlt: "Woman in pishwas dress",
  },
  {
    title: "Lehenga",
    imageSrc: "/assets/sidebar/clothing/dress1.webp",
    imageAlt: "Woman wearing lehenga",
  },
  {
    title: "Gharara",
    imageSrc: "/assets/sidebar/clothing/dress.webp",
    imageAlt: "Woman wearing gharara",
  },
  {
    title: "Sharara",
    imageSrc: "/assets/sidebar/clothing/dress1.webp",
    imageAlt: "Woman in sharara outfit",
  },
  {
    title: "Co Ord Sets",
    imageSrc: "/assets/sidebar/clothing/dress.webp",
    imageAlt: "Woman in co ord set",
  },
  {
    title: "Kaftan",
    imageSrc: "/assets/sidebar/clothing/dress1.webp",
    imageAlt: "Woman in kaftan dress",
  },
  {
    title: "Peplum",
    imageSrc: "/assets/sidebar/clothing/dress.webp",
    imageAlt: "Woman in peplum dress",
  },
  {
    title: "Short Frock",
    imageSrc: "/assets/sidebar/clothing/dress1.webp",
    imageAlt: "Woman in short frock",
  },
  {
    title: "Trousers",
    imageSrc: "/assets/sidebar/clothing/dress.webp",
    imageAlt: "Embroidered trousers",
  },
  {
    title: "Dupatta",
    imageSrc: "/assets/sidebar/clothing/dress1.webp",
    imageAlt: "Printed dupatta",
  },
  {
    title: "Shalwar",
    imageSrc: "/assets/sidebar/clothing/dress.webp",
    imageAlt: "Woman wearing shalwar",
  },
  {
    title: "Wrap",
    imageSrc: "/assets/sidebar/clothing/dress1.webp",
    imageAlt: "Woman in wrap style dress",
  },
];

export const womenClothingMenuSectionRows: ClothingMenuSectionRow[] = [
  {
    title: "Eastern Unstitched",
    items: [
      {
        title: "Shop All",
        featured: true,
      },
      {
        title: "Unstitched",
        imageSrc: "/assets/sidebar/clothing/dress2.webp",
        imageAlt: "Eastern unstitched outfit",
      },
    ],
  },
  {
    title: "Fusion",
    items: [
      {
        title: "Shop All",
        featured: true,
      },
      {
        title: "Fusion",
        imageSrc: "/assets/sidebar/clothing/dress3.webp",
        imageAlt: "Fusion style dress",
      },
    ],
  },
  {
    title: "Modest Wear",
    items: [
      {
        title: "Shop All",
        featured: true,
      },
      {
        title: "Abaya",
        imageSrc: "/assets/sidebar/clothing/dress4.webp",
        imageAlt: "Modest wear abaya",
      },
      {
        title: "Jilbab",
        imageSrc: "/assets/sidebar/clothing/dress5.webp",
        imageAlt: "Modest wear jilbab",
      },
      {
        title: "Veil",
        imageSrc: "/assets/sidebar/clothing/dress6.webp",
        imageAlt: "Modest wear veil",
      },
    ],
  },
  {
    title: "Western",
    items: [
      {
        title: "Shop All",
        featured: true,
      },
      {
        title: "Dress",
        imageSrc: "/assets/sidebar/clothing/dress1.webp",
        imageAlt: "Western style dress",
      },
      {
        title: "Jeans",
        imageSrc: "/assets/sidebar/clothing/dress2.webp",
        imageAlt: "Western style jeans",
      },
      {
        title: "Skirt",
        imageSrc: "/assets/sidebar/clothing/dress3.webp",
        imageAlt: "Western skirt",
      },
      {
        title: "Co Ord Sets",
        imageSrc: "/assets/sidebar/clothing/dress4.webp",
        imageAlt: "Western co ord sets",
      },
      {
        title: "Frock",
        imageSrc: "/assets/sidebar/clothing/dress5.webp",
        imageAlt: "Western frock",
      },
    ],
  },
  {
    title: "Activewear",
    items: [
      {
        title: "Shop All",
        featured: true,
      },
      {
        title: "Tracksuit",
        imageSrc: "/assets/sidebar/clothing/dress6.webp",
        imageAlt: "Activewear tracksuit",
      },
      {
        title: "Trousers",
        imageSrc: "/assets/sidebar/clothing/dress2.webp",
        imageAlt: "Activewear trousers",
      },
      {
        title: "Shorts",
        imageSrc: "/assets/sidebar/clothing/dress3.webp",
        imageAlt: "Activewear shorts",
      },
      {
        title: "Tank Top",
        imageSrc: "/assets/sidebar/clothing/dress4.webp",
        imageAlt: "Activewear tank top",
      },
      {
        title: "Hoodie",
        imageSrc: "/assets/sidebar/clothing/dress5.webp",
        imageAlt: "Activewear hoodie",
      },
    ],
  },
];
