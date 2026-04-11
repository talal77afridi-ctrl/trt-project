export type SidebarItem = {
  label: string;
  hasChildren?: boolean;
  emphasis?: boolean;
  dividerBefore?: boolean;
  strong?: boolean;
};

export const siteSections: {
  sidebar: SidebarItem[];
} = {
  sidebar: [
    { label: "All", emphasis: true },
    { label: "New Arrivals" },
    { label: "West" },
    { label: "Women", hasChildren: true },
    { label: "Men", hasChildren: true },
    { label: "Beauty", hasChildren: true },
    { label: "Kids", hasChildren: true },
    { label: "Brands" },
    { label: "Top Curations" },
    { label: "Orders" },
    { label: "Rewards" },
    { label: "Wishlist" },
    { label: "Become a Seller" },
    { label: "Blogs" },
    { label: "Help center" },
    { label: "Sign In / Register", dividerBefore: true, strong: true },
  ],
};