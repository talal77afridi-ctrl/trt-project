"use client";

import { useState } from "react";

const colorList = [
  { id: "COL01", name: "Black", hex: "#000000", products: 48, status: "Active" },
  { id: "COL02", name: "White", hex: "#FFFFFF", products: 41, status: "Active" },
  { id: "COL03", name: "Maroon", hex: "#800000", products: 35, status: "Active" },
  { id: "COL04", name: "Navy Blue", hex: "#001F5B", products: 29, status: "Active" },
  { id: "COL05", name: "Gold", hex: "#FFD700", products: 22, status: "Active" },
  { id: "COL06", name: "Pink", hex: "#FFC0CB", products: 20, status: "Active" },
  { id: "COL07", name: "Grey", hex: "#808080", products: 18, status: "Active" },
  { id: "COL08", name: "Mint Green", hex: "#98FF98", products: 14, status: "Active" },
  { id: "COL09", name: "Ivory", hex: "#FFFFF0", products: 12, status: "Active" },
  { id: "COL10", name: "Beige", hex: "#F5F5DC", products: 10, status: "Inactive" },
  { id: "COL11", name: "Royal Blue", hex: "#4169E1", products: 8, status: "Active" },
  { id: "COL12", name: "Coral", hex: "#FF7F50", products: 6, status: "Active" },
];

export default function AdminColorsPage() {
  const [colors, setColors] = useState(colorList);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newHex, setNewHex] = useState("#000000");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const id = "COL" + (colors.length + 1).toString().padStart(2, "0");
    setColors((prev) => [...prev, { id, name: newName, hex: newHex, products: 0, status: "Active" }]);
    setNewName(""); setNewHex("#000000"); setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    setColors((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Colors</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">{colors.length} colors configured</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ color: "#fff" }} className="flex items-center justify-center gap-2 admin-primary-bg px-4 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-colors w-full md:w-auto">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Color
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {colors.map((color) => (
          <div key={color.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all">
            <div className="h-16 md:h-20 w-full border-b border-gray-100" style={{ backgroundColor: color.hex }} />
            <div className="p-3 md:p-3.5">
              <div className="flex items-start justify-between gap-1 mb-1">
                <p className="text-xs md:text-sm font-semibold text-[#111111] truncate flex-1">{color.name}</p>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${color.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{color.status === "Active" ? "Active" : "Off"}</span>
              </div>
              <p className="text-xs font-mono text-gray-400 mb-0.5 truncate">{color.hex}</p>
              <p className="text-xs text-gray-400 mb-2.5">{color.products} products</p>
              <div className="flex gap-2">
                <button onClick={() => setEditId(color.id)} className="flex-1 text-xs py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium transition-colors border border-gray-200">Edit</button>
                <button onClick={() => setDeleteConfirm(color.id)} className="flex-1 text-xs py-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-medium transition-colors border border-red-200">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Color Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] mb-4">Add New Color</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Color Name</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Maroon"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Color Hex</label>
                <div className="flex gap-3 items-center">
                  <input type="color" value={newHex} onChange={(e) => setNewHex(e.target.value)} className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                  <input type="text" value={newHex} onChange={(e) => setNewHex(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 font-mono" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleAdd} style={{ color: "#fff" }} className="flex-1 px-4 py-2.5 text-sm font-semibold admin-primary-bg rounded-lg">Add Color</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] text-center">Delete Color?</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-5">Products using this color will be unaffected.</p>
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
