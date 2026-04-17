"use client";

import { useState } from "react";
import Link from "next/link";

const cmsPagesList = [
  { id: "CMS01", title: "About Us", slug: "about-us", status: "Published", updatedAt: "Jun 12, 2025", author: "Admin" },
  { id: "CMS02", title: "Privacy Policy", slug: "privacy-policy", status: "Published", updatedAt: "Jun 10, 2025", author: "Admin" },
  { id: "CMS03", title: "Terms & Conditions", slug: "terms-conditions", status: "Published", updatedAt: "Jun 8, 2025", author: "Admin" },
  { id: "CMS04", title: "Return Policy", slug: "return-policy", status: "Published", updatedAt: "Jun 5, 2025", author: "Admin" },
  { id: "CMS05", title: "Shipping Policy", slug: "shipping-policy", status: "Draft", updatedAt: "Jun 1, 2025", author: "Admin" },
  { id: "CMS06", title: "FAQs", slug: "faqs", status: "Draft", updatedAt: "May 28, 2025", author: "Admin" },
];

export default function AdminCMSPage() {
  const [pages, setPages] = useState(cmsPagesList);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">CMS Pages</h1>
          <p className="text-sm text-gray-500 mt-0.5">{pages.length} pages total · {pages.filter((p) => p.status === "Published").length} published</p>
        </div>
        <Link href="/admin/cms/add" style={{ color: "#fff" }} className="flex items-center gap-2 admin-primary-bg px-4 py-2.5 text-sm font-semibold rounded-md">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Page
        </Link>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{ label: "Total Pages", value: pages.length, color: "" }, { label: "Published", value: pages.filter((p) => p.status === "Published").length, color: "text-emerald-600" }, { label: "Draft", value: pages.filter((p) => p.status === "Draft").length, color: "text-amber-500" }].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400 font-medium">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color || "text-[#111111]"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Page Title</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="text-sm font-semibold text-[#111111]">{page.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs font-mono text-gray-500">/{page.slug}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${page.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-600"}`}>{page.status}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{page.updatedAt}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/cms/${page.id}/edit`} className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-1">
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      Edit
                    </Link>
                    <button onClick={() => setDeleteConfirm(page.id)} className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-md hover:bg-red-100 flex items-center gap-1">
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Delete
                    </button>
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
            <h3 className="text-base font-bold text-[#111111] text-center">Delete CMS Page?</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-5">This page will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
