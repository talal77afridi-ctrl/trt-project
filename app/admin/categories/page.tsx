"use client";

import { useState } from "react";
import Link from "next/link";

const mainCategories = [
  { id: "C01", name: "Women", slug: "women", subCount: 5, products: 148, status: "Active" },
  { id: "C02", name: "Men", slug: "men", subCount: 4, products: 62, status: "Active" },
  { id: "C03", name: "Kids", slug: "kids", subCount: 4, products: 37, status: "Active" },
  { id: "C04", name: "Beauty", slug: "beauty", subCount: 5, products: 24, status: "Active" },
  { id: "C05", name: "Accessories", slug: "accessories", subCount: 3, products: 19, status: "Inactive" },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(mainCategories);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Categories</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">{categories.length} main categories</p>
        </div>
        <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
          <Link href="/admin/categories/sub" className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 text-xs md:text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            <span>Sub Categories</span>
          </Link>
          <Link href="/admin/categories/add" style={{ color: "#fff" }} className="flex items-center justify-center gap-2 admin-primary-bg px-4 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-colors">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            <span>Add Category</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          { label: "Total Categories", value: categories.length },
          { label: "Sub Categories", value: categories.reduce((s, c) => s + c.subCount, 0) },
          { label: "Total Products", value: categories.reduce((s, c) => s + c.products, 0) },
          { label: "Active", value: categories.filter((c) => c.status === "Active").length },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg md:rounded-xl border border-gray-100 px-3 md:px-5 py-3 md:py-4">
            <p className="text-[10px] md:text-xs text-gray-400 font-medium truncate">{s.label}</p>
            <p className="text-lg md:text-2xl font-bold text-[#111111] mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sub Cats</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">{cat.name.charAt(0)}</div>
                      <p className="text-xs md:text-sm font-semibold text-[#111111] truncate">{cat.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-mono text-gray-500 truncate">/{cat.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs md:text-sm font-semibold text-[#111111]">{cat.subCount}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs md:text-sm font-semibold text-[#111111]">{cat.products}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${cat.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/categories/${cat.id}/edit`} className="p-1.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" title="Edit">
                        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </Link>
                      <button onClick={() => setDeleteConfirm(cat.id)} className="p-1.5 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors" title="Delete">
                        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 p-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">{cat.name.charAt(0)}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111111] truncate">{cat.name}</p>
                    <p className="text-xs font-mono text-gray-400 truncate">/{cat.slug}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap shrink-0 ${cat.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                  {cat.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-200">
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Sub Cats</p>
                  <p className="text-sm font-bold text-[#111111] mt-1">{cat.subCount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Products</p>
                  <p className="text-sm font-bold text-[#111111] mt-1">{cat.products}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">ID</p>
                  <p className="text-xs font-mono text-gray-600 mt-1">{cat.id}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Link href={`/admin/categories/${cat.id}/edit`} className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 text-center">
                  Edit
                </Link>
                <button onClick={() => setDeleteConfirm(cat.id)} className="flex-1 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] text-center">Delete Category?</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-5">All sub-categories and linked products will be unlinked.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
