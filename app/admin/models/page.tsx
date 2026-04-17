"use client";

import { useState } from "react";

const modelList = [
  { id: "M01", name: "Zara", height: "5'7\"", measurements: "34-26-36", assignedProducts: 22, status: "Active" },
  { id: "M02", name: "Aisha", height: "5'8\"", measurements: "34-24-35", assignedProducts: 18, status: "Active" },
  { id: "M03", name: "Sara", height: "5'6\"", measurements: "36-28-38", assignedProducts: 15, status: "Active" },
  { id: "M04", name: "Maira", height: "5'9\"", measurements: "34-25-36", assignedProducts: 12, status: "Active" },
  { id: "M05", name: "Nida", height: "5'7\"", measurements: "35-27-37", assignedProducts: 10, status: "Inactive" },
];

export default function AdminModelsPage() {
  const [models, setModels] = useState(modelList);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", height: "", measurements: "" });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const id = "M" + (models.length + 1).toString().padStart(2, "0");
    setModels((prev) => [...prev, { id, name: form.name, height: form.height, measurements: form.measurements, assignedProducts: 0, status: "Active" }]);
    setForm({ name: "", height: "", measurements: "" }); setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    setModels((prev) => prev.filter((m) => m.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Models</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">{models.length} models registered</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ color: "#fff" }} className="flex items-center justify-center gap-2 admin-primary-bg px-4 py-2.5 text-xs md:text-sm font-semibold rounded-lg w-full md:w-auto">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Model
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        {[{ label: "Total Models", value: models.length }, { label: "Active", value: models.filter((m) => m.status === "Active").length }, { label: "Avg. Products", value: Math.round(models.reduce((s, m) => s + m.assignedProducts, 0) / (models.length || 1)) }].map((s) => (
          <div key={s.label} className="bg-white rounded-lg md:rounded-xl border border-gray-100 px-3 md:px-5 py-3 md:py-4">
            <p className="text-xs text-gray-400 font-medium truncate">{s.label}</p>
            <p className="text-lg md:text-2xl font-bold text-[#111111] mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {models.map((model) => (
          <div key={model.id} className="bg-white rounded-lg border border-gray-100 p-3.5 md:p-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 shrink-0">{model.name.charAt(0)}</div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${model.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{model.status}</span>
            </div>
            <p className="text-base font-bold text-[#111111] mb-1 truncate">{model.name}</p>
            <div className="mt-2 space-y-1 mb-3 py-2 border-y border-gray-100">
              <p className="text-xs text-gray-500 flex items-center justify-between">
                <span className="font-medium text-gray-600">Height:</span>
                <span className="font-semibold text-[#111111]">{model.height}</span>
              </p>
              <p className="text-xs text-gray-500 flex items-center justify-between">
                <span className="font-medium text-gray-600">Measurements:</span>
                <span className="font-semibold text-[#111111]">{model.measurements}</span>
              </p>
              <p className="text-xs text-gray-500 flex items-center justify-between">
                <span className="font-medium text-gray-600">Products:</span>
                <span className="font-semibold text-[#111111]">{model.assignedProducts}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-xs py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium transition-colors border border-gray-200">Edit</button>
              <button onClick={() => setDeleteConfirm(model.id)} className="flex-1 text-xs py-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-medium transition-colors border border-red-200">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] mb-4">Add New Model</h3>
            <div className="space-y-4">
              {([["name", "Model Name", "e.g. Sara"], ["height", "Height", "e.g. 5'7\""], ["measurements", "Measurements", "e.g. 34-26-36"]] as [string, string, string][]).map(([k, l, p]) => (
                <div key={k}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{l}</label>
                  <input type="text" value={form[k as keyof typeof form]} onChange={(e) => set(k, e.target.value)} placeholder={p}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleAdd} style={{ color: "#fff" }} className="flex-1 px-4 py-2.5 text-sm font-semibold admin-primary-bg rounded-lg">Add Model</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] text-center">Delete Model?</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-5">This action cannot be undone.</p>
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
