"use client";

import { useState, useRef, useEffect } from "react";
import { adminThemes, useAdminTheme } from "./admin-theme-context";

export default function AdminThemeSwitcher() {
  const { theme, setThemeById } = useAdminTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
        title="Switch Theme"
      >
        <div className="flex items-center -space-x-1.5">
          <span
            className="w-4 h-4 rounded-full border-2 border-white/30"
            style={{ backgroundColor: theme.primaryDot }}
          />
          <span
            className="w-4 h-4 rounded-full border-2 border-white/30"
            style={{ backgroundColor: theme.accentDot }}
          />
        </div>
        <span className="text-white text-xs font-semibold hidden lg:inline">
          {theme.label}
        </span>
        <svg
          className={`text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[200]">
          <p className="px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
            Switch Theme
          </p>
          <ul className="py-1.5">
            {adminThemes.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => { setThemeById(t.id); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 ${
                    theme.id === t.id ? "bg-gray-50 text-[#111111]" : "text-gray-600"
                  }`}
                >
                  <div className="flex items-center -space-x-1.5 shrink-0">
                    <span
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: t.primaryDot }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: t.accentDot }}
                    />
                  </div>
                  <span>{t.label}</span>
                  {theme.id === t.id && (
                    <svg className="ml-auto text-[#111111]" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
