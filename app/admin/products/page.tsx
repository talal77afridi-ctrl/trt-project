"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { haseneaProducts, type HaseneaProduct } from "@/data/products/haseena/haseena-products";

const ITEMS_PER_PAGE = 10;

const categories = ["All Categories", "Women - Clothing", "Women - Eastern Stitched", "Women - Unstitched", "Women - Eastern Ready to wear", "Women - Kurta Set"];
const brands = ["All Brands", "Haseens Official"];
const statusOptions = ["All Status", "In Stock", "Low Stock", "Out of Stock"];

function getStockStatus(stock: number): { label: string; class: string } {
  if (stock === 0) return { label: "Out of Stock", class: "bg-red-50 text-red-600" };
  if (stock <= 5) return { label: "Low Stock", class: "bg-amber-50 text-amber-700" };
  return { label: "In Stock", class: "bg-emerald-50 text-emerald-700" };
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<HaseneaProduct[]>(haseneaProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
    const matchBrand = selectedBrand === "All Brands" || p.brand === selectedBrand;
    const matchStatus =
      selectedStatus === "All Status" ||
      (selectedStatus === "In Stock" && p.stock > 5) ||
      (selectedStatus === "Low Stock" && p.stock > 0 && p.stock <= 5) ||
      (selectedStatus === "Out of Stock" && p.stock === 0);
    return matchSearch && matchCategory && matchBrand && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    setCurrentPage((prev) => Math.min(prev, Math.max(1, Math.ceil((filtered.length - 1) / ITEMS_PER_PAGE))));
  };

  const inStock = products.filter((p) => p.stock > 5).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/add"
          style={{ color: "#ffffff" }}
          className="flex items-center gap-2 admin-primary-bg px-4 py-2.5 text-sm font-semibold rounded-md transition-colors"
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#ffffff" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          { label: "Total Products", value: products.length, color: "text-[#111111]" },
          { label: "In Stock", value: inStock, color: "text-emerald-600" },
          { label: "Low Stock", value: lowStock, color: "text-amber-600" },
          { label: "Out of Stock", value: outOfStock, color: "text-red-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg md:rounded-xl border border-gray-100 px-3 md:px-5 py-3 md:py-4">
            <p className="text-[10px] md:text-xs text-gray-400 font-medium truncate">{s.label}</p>
            <p className={`text-lg md:text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-3 md:p-4 mb-5 space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-3 md:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-full md:min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-gray-50 transition-all"
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-auto text-xs md:text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-gray-50 text-gray-700 transition-all cursor-pointer"
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>

        {/* Brand filter */}
        <select
          value={selectedBrand}
          onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-auto text-xs md:text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-gray-50 text-gray-700 transition-all cursor-pointer"
        >
          {brands.map((b) => <option key={b}>{b}</option>)}
        </select>

        {/* Status filter */}
        <select
          value={selectedStatus}
          onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
          className="w-full md:w-auto text-xs md:text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-gray-50 text-gray-700 transition-all cursor-pointer"
        >
          {statusOptions.map((s) => <option key={s}>{s}</option>)}
        </select>

        {/* Clear filters */}
        {(search || selectedCategory !== "All Categories" || selectedBrand !== "All Brands" || selectedStatus !== "All Status") && (
          <button
            onClick={() => { setSearch(""); setSelectedCategory("All Categories"); setSelectedBrand("All Brands"); setSelectedStatus("All Status"); setCurrentPage(1); }}
            className="w-full md:w-auto text-xs md:text-sm text-gray-500 hover:text-red-500 flex items-center justify-center md:justify-start gap-1.5 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Products Table/Cards */}
      <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-sm">
                    <svg className="mx-auto mb-2 text-gray-200" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>
                    No products found
                  </td>
                </tr>
              ) : (
                paginated.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Product image + name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                            {product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#111111] truncate">{product.name}</p>
                            <p className="text-[10px] text-gray-400 truncate mt-0.5">{product.color}</p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-4 py-3.5">
                        <p className="text-xs font-semibold text-gray-600 font-mono truncate">{product.id}</p>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md font-medium truncate inline-block max-w-[100px]">
                          {product.category.substring(0, 15)}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3.5">
                        <p className="text-xs font-bold text-[#111111]">PKR {(product.price / 1000).toFixed(0)}k</p>
                        <p className="text-[10px] text-emerald-600 font-semibold">{product.discount}% OFF</p>
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-3.5">
                        <div>
                          <p className="text-xs font-semibold text-[#111111]">{product.stock}</p>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full inline-block mt-0.5 ${stockStatus.class}`}>
                            {stockStatus.label.split(' ')[0]}
                          </span>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-0.5">
                          <svg className="text-amber-400" width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span className="text-xs font-semibold text-[#111111]">{product.rating}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-1.5 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            title="Edit"
                          >
                            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="p-1.5 text-red-500 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3 p-4">
          {paginated.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto mb-2 text-gray-200" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>
              <p className="text-sm text-gray-400 font-medium">No products found</p>
            </div>
          ) : (
            paginated.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <div key={product.id} className="bg-gray-50 rounded-lg p-3.5 border border-gray-100 space-y-2.5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#111111] truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{product.color} · {product.fabric}</p>
                        <p className="text-xs font-mono text-gray-400 mt-0.5 truncate">SKU: {product.id}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap shrink-0 ${stockStatus.class}`}>
                      {stockStatus.label}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-200">
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium">Price</p>
                      <p className="text-xs font-bold text-[#111111] mt-0.5">PKR {(product.price / 1000).toFixed(0)}k</p>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{product.discount}% OFF</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium">Stock</p>
                      <p className="text-xs font-bold text-[#111111] mt-0.5">{product.stock}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">units</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium">Rating</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        <svg className="text-amber-400" width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-xs font-semibold text-[#111111]">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1 border-t border-gray-200">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 text-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 md:px-5 md:py-3.5 border-t border-gray-100 bg-gray-50/50 gap-3 md:gap-0">
            <p className="text-xs text-gray-500 text-center md:text-left w-full md:w-auto">
              Page {safePage} of {totalPages} • {filtered.length} products
            </p>
            <div className="flex items-center gap-1 flex-wrap justify-center">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-2 md:px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page = i + 1;
                if (totalPages > 5 && safePage > 3) page = safePage - 2 + i;
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 text-xs font-medium rounded-lg border transition-colors ${
                      page === safePage
                        ? "admin-primary-bg text-white border-transparent"
                        : "border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-2 md:px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg className="text-red-500" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-[#111111] text-center">Delete Product?</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-5">
              This will permanently remove the product from your catalog. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
