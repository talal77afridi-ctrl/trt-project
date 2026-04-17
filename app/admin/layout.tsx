"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { AdminThemeProvider } from "@/components/admin/admin-theme-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Prevent background scroll while mobile drawer is open.
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <AdminThemeProvider>
      <div className="min-h-screen bg-[#f5f5f5]">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label="Open admin menu"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-sm font-bold text-[#111111] tracking-wide">TRT Admin</div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">A</div>
        </header>

        <div className="flex min-h-screen lg:min-h-0">
          <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={() => setIsMobileMenuOpen(false)} />

          {/* Backdrop for mobile drawer */}
          {isMobileMenuOpen && (
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/45 backdrop-blur-[1px] z-40"
              aria-label="Close admin menu"
            />
          )}

          <main className="w-full lg:ml-60 flex-1 min-h-[calc(100vh-56px)] lg:min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </AdminThemeProvider>
  );
}
