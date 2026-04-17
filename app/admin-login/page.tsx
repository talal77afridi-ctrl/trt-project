"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminThemes } from "@/components/admin/admin-theme-context";

const STATIC_ADMIN_EMAIL = "admin@trt.pk";
const STATIC_ADMIN_PASSWORD = "Admin@123";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    return next && next.startsWith("/admin") ? next : "/admin";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Read saved theme from localStorage (same key used by admin panel)
  const [themeColors, setThemeColors] = useState({ bg: "#000000", primary: "#000000" });
  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    const found = adminThemes.find((t) => t.id === saved) ?? adminThemes.find((t) => t.id === "slate-minimal") ?? adminThemes[0];
    setThemeColors({ bg: found.sidebarBg, primary: found.primary });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (email.trim() !== STATIC_ADMIN_EMAIL || password !== STATIC_ADMIN_PASSWORD) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    setLoading(true);
    const maxAge = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 24;
    document.cookie = `admin_auth=1; path=/; max-age=${maxAge}; samesite=lax`;
    await new Promise((resolve) => setTimeout(resolve, 350));
    router.push(nextPath);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden" style={{ backgroundColor: themeColors.bg }}>
        {/* Background rings */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute -top-16 -left-16 w-[400px] h-[400px] rounded-full border border-white/5" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full border border-white/5" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full border border-white/5" />
          <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full border border-white/5" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-black font-black text-sm tracking-widest">TRT</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">TRT</p>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">Traditional Wear</p>
            </div>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10">
          <h2 className="text-5xl font-black text-white leading-tight">
            Manage<br />
            Your Store<br />
            <span className="text-white/40">Effortlessly.</span>
          </h2>
          <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-xs">
            Control products, orders, customers, and content — all from one powerful dashboard.
          </p>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-white/25 text-xs tracking-widest uppercase">© 2026 TRT — All rights reserved</p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-[10px]">TRT</span>
            </div>
            <span className="font-bold text-[#111111]">Admin Panel</span>
          </div>

          <h1 className="text-3xl font-black text-[#111111]">Welcome Back!</h1>
          <p className="text-sm text-gray-400 mt-1.5">Sign in to access your admin dashboard.</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@trt.pk"
                className="w-full px-4 py-3 text-sm border-b-2 border-gray-200 focus:border-black focus:outline-none bg-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-10 text-sm border-b-2 border-gray-200 focus:border-black focus:outline-none bg-transparent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-black border-gray-300"
                />
                <span className="text-xs text-gray-500">Keep me signed in</span>
              </label>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-red-400 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white rounded-xl py-3.5 text-sm font-bold tracking-wide disabled:opacity-60 transition-colors mt-2"
              style={{ backgroundColor: themeColors.primary }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Signing in...
                </span>
              ) : "Login Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AdminLoginContent />
    </Suspense>
  );
}
