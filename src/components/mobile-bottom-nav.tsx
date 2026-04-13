'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactElement, useEffect, useState } from 'react';

type NavItem = {
  label: string;
  href: string;
  match: (pathname: string) => boolean;
  icon: (active: boolean) => ReactElement;
};

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    match: (pathname) => pathname === '/',
    icon: (active) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 ${active ? 'text-[#242629]' : 'text-[#70757c]'}`}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Categories',
    href: '/products/haseena',
    match: (pathname) => pathname.startsWith('/products'),
    icon: (active) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 ${active ? 'text-[#242629]' : 'text-[#70757c]'}`}>
        <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: 'Brands',
    href: '/brands/four-season',
    match: (pathname) => pathname.startsWith('/brands'),
    icon: (active) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 ${active ? 'text-[#242629]' : 'text-[#70757c]'}`}>
        <path d="M4 8h16v10H4V8Zm2-3h12v3H6V5Zm1 6h3m2 0h5m-10 3h4m2 0h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'New Arrivals',
    href: '/trending-products/t001',
    match: (pathname) => pathname.startsWith('/trending-products') || pathname.startsWith('/editor-picks'),
    icon: (active) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 ${active ? 'text-[#242629]' : 'text-[#70757c]'}`}>
        <path d="m12 3 2.2 4.6 5.1.7-3.7 3.6.9 5.1L12 14.8 7.5 17l.9-5.1-3.7-3.6 5.1-.7L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Account',
    href: '/bag',
    match: (pathname) => pathname.startsWith('/bag'),
    icon: (active) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 ${active ? 'text-[#242629]' : 'text-[#70757c]'}`}>
        <circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      if (window.innerWidth >= 1024) {
        return;
      }

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= 10) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (delta > 6) {
        setIsVisible(false);
      } else if (delta < -6) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed inset-x-0 bottom-0 z-[95] border-t border-[#d8dadd] bg-white transition-transform duration-300 lg:hidden ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <ul className="grid grid-cols-5 px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2">
        {navItems.map((item) => {
          const active = item.match(pathname);

          return (
            <li key={item.label}>
              <Link href={item.href} className="flex flex-col items-center justify-center gap-0.5 py-1">
                {item.icon(active)}
                <span className={`text-[10px] leading-tight ${active ? 'font-semibold text-[#242629]' : 'font-medium text-[#70757c]'}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}