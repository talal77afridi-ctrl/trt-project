"use client";

import { useState } from "react";
import Link from "next/link";

const subCategories = [
  { id: "S01", name: "Eastern Ready To Wear", parent: "Women", slug: "eastern-ready-to-wear", products: 43, status: "Active" },
  { id: "S02", name: "Unstitched", parent: "Women", slug: "unstitched", products: 28, status: "Active" },
  { id: "S03", name: "Kurta Set", parent: "Women", slug: "kurta-set", products: 19, status: "Active" },
  { id: "S04", name: "Western Wear", parent: "Women", slug: "western-wear", products: 15, status: "Active" },
  { id: "S05", name: "Lingerie", parent: "Women", slug: "lingerie", products: 12, status: "Active" },
  { id: "S06", name: "Formal Shirts", parent: "Men", slug: "formal-shirts", products: 18, status: "Active" },
  { id: "S07", name: "Trousers", parent: "Men", slug: "trousers", products: 14, status: "Active" },
  { id: "S08", name: "Shalwar Kameez", parent: "Men", slug: "shalwar-kameez", products: 22, status: "Active" },
  { id: "S09", name: "Girls (2-14 yrs)", parent: "Kids", slug: "girls", products: 11, status: "Active" },
  { id: "S10", name: "Boys (2-14 yrs)", parent: "Kids", slug: "boys", products: 10, status: "Active" },
  { id: "S11", name: "Newborn Girls", parent: "Kids", slug: "newborn-girls", products: 8, status: "Inactive" },
  { id: "S12", name: "Skincare", parent: "Beauty", slug: "skincare", products: 9, status: "Active" },
  { id: "S13", name: "Hair Care", parent: "Beauty", slug: "hair-care", products: 7, status: "Active" },
];

const parents = ["All", "Women", "Men", "Kids", "Beauty", "Accessories"];

export default function AdminSubCategoriesPage() {
  const [subs, setSubs] = useState(subCategories);
  const [parentFilter, setParentFilter] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = subs.filter((s) => parentFilter === "All" || s.parent === parentFilter);

  const handleDelete = (id: string) => {
    setSubs((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            <Link href="/admin/categories" className="hover:text-gray-600 transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-[#111111] font-medium">Sub Categories</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111]">Sub Categories</h1>
          <p className="text-sm text-gray-500 mt-0.5">{subs.length} sub-categories total</p>
        </div>
        <Link href="/admin/categories/add" style={{ color: "#fff" }} className="flex items-center gap-2 admin-primary-bg px-4 py-2.5 text-sm font-semibold rounded-md transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Sub Category
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex flex-wrap gap-2">
        {parents.map((p) => (
          <button key={p} onClick={() => setParentFilter(p)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${parentFilter === p ? "admin-primary-bg text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{p}</button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sub Category</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parent</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">No sub-categories found</td></tr>
            ) : filtered.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5 text-sm font-semibold text-[#111111]">{sub.name}</td>
                <td className="px-5 py-3.5"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">{sub.parent}</span></td>
                <td className="px-5 py-3.5 text-xs font-mono text-gray-500">/{sub.slug}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-[#111111]">{sub.products}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${sub.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{sub.status}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Edit</button>
                    <button onClick={() => setDeleteConfirm(sub.id)} className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-md hover:bg-red-100 transition-colors">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] text-center">Delete Sub Category?</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
