"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AdminThemeSwitcher from "./admin-theme-switcher";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    group: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
      },
    ],
  },
  {
    group: "Catalog",
    items: [
      {
        label: "Products",
        href: "/admin/products",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>,
        children: [
          { label: "All Products", href: "/admin/products" },
          { label: "Add Product", href: "/admin/products/add" },
          { label: "Deleted Products", href: "/admin/deleted-products" },
        ],
      },
      {
        label: "Categories",
        href: "/admin/categories",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
        children: [
          { label: "All Categories", href: "/admin/categories" },
          { label: "Add Category", href: "/admin/categories/add" },
          { label: "Sub Categories", href: "/admin/categories/sub" },
        ],
      },
      {
        label: "Colors",
        href: "/admin/colors",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
      },
      {
        label: "Models",
        href: "/admin/models",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      },
    ],
  },
  {
    group: "Sales",
    items: [
      {
        label: "Orders",
        href: "/admin/orders",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      },
      {
        label: "Customers",
        href: "/admin/customers",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      },
      {
        label: "Customer Support",
        href: "/admin/support",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      },
    ],
  },
  {
    group: "Content",
    items: [
      {
        label: "CMS Pages",
        href: "/admin/cms",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        children: [
          { label: "All Pages", href: "/admin/cms" },
          { label: "Add Page", href: "/admin/cms/add" },
        ],
      },
      {
        label: "Content",
        href: "/admin/content",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      },
      {
        label: "Analytics",
        href: "/admin/analytics",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        label: "Admin Management",
        href: "/admin/management",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      },
    ],
  },
];

type AdminSidebarProps = {
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
};

export default function AdminSidebar({
  isMobileMenuOpen = false,
  onCloseMobileMenu,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isGroupOpen = (item: NavItem) => {
    if (openMenus[item.label] !== undefined) return openMenus[item.label];
    // auto-open if any child is active
    return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
  };

  const closeMobileDrawer = () => {
    onCloseMobileMenu?.();
  };

  const handleLogout = () => {
    document.cookie = "admin_auth=; path=/; max-age=0; samesite=lax";
    closeMobileDrawer();
    router.push("/admin-login");
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-72 max-w-[86vw] lg:w-60 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ backgroundColor: "var(--admin-sidebar-bg, #000000)", boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}
    >
      {/* Logo + Theme Switcher */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Link href="/admin" onClick={closeMobileDrawer} className="flex items-center gap-2">
            <span className="text-white font-bold text-xl tracking-widest uppercase">TRT</span>
            <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium mt-0.5">Admin</span>
          </Link>
          <button
            type="button"
            onClick={closeMobileDrawer}
            className="lg:hidden p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close admin menu"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <AdminThemeSwitcher />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.group} className="mb-1">
            <p className="px-4 pt-3 pb-1 text-[9px] font-bold text-white/30 uppercase tracking-widest">
              {group.group}
            </p>
            <div className="px-2 space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const hasChildren = item.children && item.children.length > 0;
                const open = hasChildren && isGroupOpen(item);

                return (
                  <div key={item.href}>
                    {hasChildren ? (
                      <button
                        onClick={() => toggleMenu(item.label)}
                        style={{
                          color: "white",
                          backgroundColor: active ? "var(--admin-sidebar-active, #222222)" : undefined,
                          width: "100%",
                        }}
                        className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 hover:bg-white/10"
                      >
                        <span style={{ color: "white" }}>{item.icon}</span>
                        <span className="flex-1">{item.label}</span>
                        <svg
                          className={`text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                          width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMobileDrawer}
                        style={{
                          color: "white",
                          backgroundColor: active ? "var(--admin-sidebar-active, #222222)" : undefined,
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 hover:bg-white/10"
                      >
                        <span style={{ color: "white" }}>{item.icon}</span>
                        {item.label}
                      </Link>
                    )}

                    {/* Sub-items */}
                    {hasChildren && open && (
                      <div className="ml-3 mt-0.5 pl-3 border-l border-white/10 space-y-0.5">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMobileDrawer}
                            style={{
                              color: pathname === child.href || pathname.startsWith(child.href + "/") ? "white" : "rgba(255,255,255,0.55)",
                              backgroundColor: pathname === child.href || pathname.startsWith(child.href + "/") ? "var(--admin-sidebar-active, #222222)" : undefined,
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 hover:bg-white/10 hover:!text-white"
                          >
                            <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom user area */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "var(--admin-primary, #000000)" }}
          >
            A
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Admin</p>
            <p className="text-white/40 text-[10px]">admin@trt.pk</p>
          </div>
        </div>
        <Link
          href="/"
          onClick={closeMobileDrawer}
          className="mt-3 flex items-center gap-2 text-white/40 hover:text-white text-xs transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Store
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 flex items-center gap-2 text-white/40 hover:text-white text-xs transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
