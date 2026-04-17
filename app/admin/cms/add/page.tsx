"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddCMSPage() {
  const [form, setForm] = useState({ title: "", slug: "", content: "", status: "Draft", metaTitle: "", metaDesc: "" });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const autoSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    window.location.href = "/admin/cms";
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/admin/cms" className="hover:text-gray-600">CMS Pages</Link>
        <span>/</span>
        <span className="text-[#111111] font-medium">Add Page</span>
      </div>

      <h1 className="text-2xl font-bold text-[#111111] mb-6">Add CMS Page</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Main content */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Page Title <span className="text-red-500">*</span></label>
            <input required type="text" value={form.title} onChange={(e) => { set("title", e.target.value); set("slug", autoSlug(e.target.value)); }}
              placeholder="e.g. About Us" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 font-mono">/</span>
              <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 font-mono text-gray-600" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Page Content <span className="text-red-500">*</span></label>
            <textarea required value={form.content} onChange={(e) => set("content", e.target.value)} rows={12} placeholder="Write page content here..."
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none font-mono" />
            <p className="text-xs text-gray-400 mt-1">HTML or plain text content</p>
          </div>
        </div>

        {/* SEO + Status */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#111111]">SEO & Settings</h3>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Meta Title</label>
            <input type="text" value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Meta Description</label>
            <textarea value={form.metaDesc} onChange={(e) => set("metaDesc", e.target.value)} rows={2}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
            <div className="flex gap-3">
              {["Draft", "Published"].map((s) => (
                <button key={s} type="button" onClick={() => set("status", s)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${form.status === s ? "admin-primary-bg border-transparent text-white" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  style={form.status === s ? { color: "#fff" } : {}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/cms" className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</Link>
          <button type="submit" disabled={saving} style={{ color: "#fff" }} className="px-6 py-2.5 text-sm font-semibold admin-primary-bg rounded-lg disabled:opacity-60">
            {saving ? "Saving..." : form.status === "Published" ? "Publish Page" : "Save Draft"}
          </button>
        </div>
      </form>
    </div>
  );
}
