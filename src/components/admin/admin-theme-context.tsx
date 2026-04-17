"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface AdminTheme {
  id: string;
  label: string;
  sidebarBg: string;
  sidebarActiveBg: string;
  primary: string;
  primaryDot: string;
  accentDot: string;
}

export const adminThemes: AdminTheme[] = [
  {
    id: "indigo-night",
    label: "Indigo Night",
    sidebarBg: "#1e1b4b",
    sidebarActiveBg: "#4338ca",
    primary: "#6366f1",
    primaryDot: "#6366f1",
    accentDot: "#f97316",
  },
  {
    id: "slate-minimal",
    label: "Slate Minimal",
    sidebarBg: "#000000",
    sidebarActiveBg: "#222222",
    primary: "#000000",
    primaryDot: "#000000",
    accentDot: "#ef4444",
  },
  {
    id: "emerald-default",
    label: "Emerald Default",
    sidebarBg: "#064e3b",
    sidebarActiveBg: "#059669",
    primary: "#10b981",
    primaryDot: "#10b981",
    accentDot: "#ef4444",
  },
  {
    id: "ocean-blue",
    label: "Ocean Blue",
    sidebarBg: "#1e3a5f",
    sidebarActiveBg: "#1d4ed8",
    primary: "#3b82f6",
    primaryDot: "#3b82f6",
    accentDot: "#6366f1",
  },
  {
    id: "sunset-amber",
    label: "Sunset Amber",
    sidebarBg: "#78350f",
    sidebarActiveBg: "#d97706",
    primary: "#f59e0b",
    primaryDot: "#f59e0b",
    accentDot: "#ef4444",
  },
  {
    id: "royal-violet",
    label: "Royal Violet",
    sidebarBg: "#3b0764",
    sidebarActiveBg: "#7c3aed",
    primary: "#a855f7",
    primaryDot: "#a855f7",
    accentDot: "#ef4444",
  },
  {
    id: "rose-petal",
    label: "Rose Petal",
    sidebarBg: "#881337",
    sidebarActiveBg: "#e11d48",
    primary: "#f43f5e",
    primaryDot: "#f43f5e",
    accentDot: "#fbbf24",
  },
  {
    id: "teal-breeze",
    label: "Teal Breeze",
    sidebarBg: "#134e4a",
    sidebarActiveBg: "#0d9488",
    primary: "#14b8a6",
    primaryDot: "#14b8a6",
    accentDot: "#ef4444",
  },
];

interface AdminThemeContextValue {
  theme: AdminTheme;
  setThemeById: (id: string) => void;
}

const AdminThemeContext = createContext<AdminThemeContextValue>({
  theme: adminThemes[0],
  setThemeById: () => {},
});

function applyThemeCssVars(t: AdminTheme) {
  const root = document.documentElement;
  root.style.setProperty("--admin-sidebar-bg", t.sidebarBg);
  root.style.setProperty("--admin-sidebar-active", t.sidebarActiveBg);
  root.style.setProperty("--admin-primary", t.primary);
}

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>(adminThemes[0]);

  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    const found = adminThemes.find((t) => t.id === saved) ?? adminThemes[0];
    setTheme(found);
    applyThemeCssVars(found);
  }, []);

  const setThemeById = (id: string) => {
    const found = adminThemes.find((t) => t.id === id);
    if (!found) return;
    setTheme(found);
    applyThemeCssVars(found);
    localStorage.setItem("admin-theme", id);
  };

  return (
    <AdminThemeContext.Provider value={{ theme, setThemeById }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export const useAdminTheme = () => useContext(AdminThemeContext);
