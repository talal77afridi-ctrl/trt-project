"use client";

import { useState } from "react";

const deletedItems = [
  { id: "P001", name: "Embroidered Lawn Kurta", category: "Women", price: 3499, deletedAt: "Jun 14, 2025", deletedBy: "Admin" },
  { id: "P002", name: "Chiffon Dupatta", category: "Women", price: 1299, deletedAt: "Jun 12, 2025", deletedBy: "Admin" },
  { id: "P003", name: "Printed T-Shirt Men", category: "Men", price: 1999, deletedAt: "Jun 10, 2025", deletedBy: "Admin" },
  { id: "P004", name: "Kids Frock Set", category: "Kids", price: 2499, deletedAt: "Jun 8, 2025", deletedBy: "Admin" },
  { id: "P005", name: "Silk Blouse", category: "Women", price: 4299, deletedAt: "Jun 5, 2025", deletedBy: "Admin" },
];

export default function AdminDeletedProductsPage() {
  const [products, setProducts] = useState(deletedItems);
  const [restoreConfirm, setRestoreConfirm] = useState<string | null>(null);
  const [permanentConfirm, setPermanentConfirm] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleRestore = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setRestoreConfirm(null);
  };

  const handlePermanentDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setPermanentConfirm(null);
  };

  const handleEmptyTrash = () => {
    setProducts([]);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleBulkRestore = () => {
    setProducts((prev) => prev.filter((p) => !selected.has(p.id)));
    setSelected(new Set());
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Deleted Products</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">{products.length} item{products.length !== 1 ? "s" : ""} in trash</p>
        </div>
        <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
          {selected.size > 0 && (
            <button onClick={handleBulkRestore} style={{ color: "#fff" }} className="flex items-center justify-center gap-2 admin-primary-bg px-4 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-colors">
              Restore ({selected.size})
            </button>
          )}
          {products.length > 0 && (
            <button onClick={handleEmptyTrash} className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Empty Trash
            </button>
          )}
        </div>
      </div>

      {/* Notice banner */}
      <div className="bg-amber-50 border border-amber-100 rounded-lg md:rounded-xl px-4 py-3 md:py-3.5 mb-5 flex items-start gap-2 md:gap-3">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-amber-500 flex-shrink-0 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <p className="text-xs text-amber-700 font-medium">Items in trash are permanently removed after 30 days.</p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-8 md:p-16 text-center">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-gray-200 mx-auto mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          <p className="text-sm font-semibold text-gray-400">Trash is empty</p>
          <p className="text-xs text-gray-300 mt-1">Deleted products will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" onChange={(e) => { if (e.target.checked) setSelected(new Set(products.map((p) => p.id))); else setSelected(new Set()); }}
                      checked={selected.size === products.length && products.length > 0}
                      className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-pointer" />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deleted On</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className={`hover:bg-gray-50/60 transition-colors ${selected.has(product.id) ? "bg-gray-50" : ""}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(product.id)} onChange={() => toggleSelect(product.id)}
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-pointer" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-red-300"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" /></svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#111111] truncate">{product.name}</p>
                          <p className="text-xs text-gray-400 truncate">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium whitespace-nowrap">{product.category}</span></td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#111111]">Rs. {product.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs md:text-sm text-gray-500 truncate">{product.deletedAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setRestoreConfirm(product.id)} className="p-1.5 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors" title="Restore">
                          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </button>
                        <button onClick={() => setPermanentConfirm(product.id)} className="p-1.5 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors" title="Delete">
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
            {products.map((product) => (
              <div key={product.id} className={`bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2 ${selected.has(product.id) ? "bg-blue-50 border-blue-200" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <input type="checkbox" checked={selected.has(product.id)} onChange={() => toggleSelect(product.id)}
                    className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer shrink-0 mt-1" />
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-red-300"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" /></svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#111111] truncate">{product.name}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{product.id}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-200">
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Price</p>
                    <p className="text-xs font-bold text-[#111111] mt-1">Rs. {(product.price / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Category</p>
                    <p className="text-xs font-semibold text-gray-600 mt-1 truncate">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Deleted</p>
                    <p className="text-xs text-gray-600 mt-1 truncate">{product.deletedAt}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => setRestoreConfirm(product.id)} className="flex-1 px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200">
                    Restore
                  </button>
                  <button onClick={() => setPermanentConfirm(product.id)} className="flex-1 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Restore confirm */}
      {restoreConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] text-center">Restore Product?</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-5">The product will be moved back to the products list.</p>
            <div className="flex gap-3">
              <button onClick={() => setRestoreConfirm(null)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={() => handleRestore(restoreConfirm)} style={{ color: "#fff" }} className="flex-1 px-4 py-2.5 text-sm font-semibold admin-primary-bg rounded-lg">Restore</button>
            </div>
          </div>
        </div>
      )}

      {/* Permanent delete confirm */}
      {permanentConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] text-center">Permanently Delete?</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-5">This product will be permanently deleted and cannot be recovered.</p>
            <div className="flex gap-3">
              <button onClick={() => setPermanentConfirm(null)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={() => handlePermanentDelete(permanentConfirm)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">Delete Forever</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
