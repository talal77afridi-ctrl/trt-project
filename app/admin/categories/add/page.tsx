"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddCategoryPage() {
  const [form, setForm] = useState({ name: "", slug: "", parent: "", status: "Active", description: "" });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const autoSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    window.location.href = "/admin/categories";
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/admin/categories" className="hover:text-gray-600">Categories</Link>
        <span>/</span>
        <span className="text-[#111111] font-medium">Add Category</span>
      </div>

      <h1 className="text-2xl font-bold text-[#111111] mb-6">Add Category</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category Name <span className="text-red-500">*</span></label>
            <input required type="text" value={form.name} onChange={(e) => { set("name", e.target.value); set("slug", autoSlug(e.target.value)); }}
              placeholder="e.g. Women" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Slug</label>
            <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 font-mono text-gray-600" />
            <p className="text-xs text-gray-400 mt-1">Auto-generated from name</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Parent Category</label>
              <select value={form.parent} onChange={(e) => set("parent", e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white">
                <option value="">None (Top Level)</option>
                {["Women", "Men", "Kids", "Beauty", "Accessories"].map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/categories" className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</Link>
          <button type="submit" disabled={saving} style={{ color: "#fff" }} className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold admin-primary-bg rounded-lg disabled:opacity-60">
            {saving ? "Saving..." : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
