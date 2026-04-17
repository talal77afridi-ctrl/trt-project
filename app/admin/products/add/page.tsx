"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  "Women - Clothing",
  "Women - Eastern Stitched",
  "Women - Unstitched",
  "Women - Eastern Ready to wear",
  "Women - Kurta Set",
];

const fabrics = ["Cotton Silk Blend", "Embroidered Silk", "Pure Silk", "Cotton Linen", "Organza Silk", "Cotton Silk", "Organza with Embroidery"];
const colors = ["Maroon", "Grey", "Navy", "Gold", "Pink", "Blue", "Mint Green", "Black", "White", "Beige", "Ivory"];

export default function AddProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "Haseens Official",
    category: categories[0],
    price: "",
    originalPrice: "",
    discount: "",
    description: "",
    fabric: fabrics[0],
    color: colors[0],
    stock: "",
    tags: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Valid price is required";
    if (!form.originalPrice || isNaN(Number(form.originalPrice)) || Number(form.originalPrice) <= 0) e.originalPrice = "Valid original price is required";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) e.stock = "Valid stock quantity is required";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    router.push("/admin/products");
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-6 overflow-x-auto">
        <Link href="/admin" className="hover:text-gray-600 transition-colors whitespace-nowrap">Dashboard</Link>
        <span className="text-gray-300">/</span>
        <Link href="/admin/products" className="hover:text-gray-600 transition-colors whitespace-nowrap">Products</Link>
        <span className="text-gray-300">/</span>
        <span className="text-[#111111] font-medium whitespace-nowrap">Add Product</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Add New Product</h1>
        <Link
          href="/admin/products"
          className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 w-full md:w-auto"
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span>Back to Products</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic Info */}
            <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-4 md:p-6">
              <h2 className="text-xs md:text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. Embroidered Gharara"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white transition-all ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Brand</label>
                    <select
                      value={form.brand}
                      onChange={(e) => set("brand", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white transition-all cursor-pointer"
                    >
                      <option>Haseens Official</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => set("category", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white transition-all cursor-pointer"
                    >
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description <span className="text-red-500">*</span></label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Describe the product in detail..."
                    rows={4}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white resize-none transition-all ${errors.description ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  />
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tags</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    placeholder="embroidered, gharara, wedding (comma separated)"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-4 md:p-6">
              <h2 className="text-xs md:text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Sale Price (PKR) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">PKR</span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => {
                        set("price", e.target.value);
                        if (form.originalPrice && e.target.value) {
                          const disc = Math.round(((Number(form.originalPrice) - Number(e.target.value)) / Number(form.originalPrice)) * 100);
                          if (disc >= 0 && disc <= 100) set("discount", String(disc));
                        }
                      }}
                      placeholder="21500"
                      className={`w-full pl-11 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white transition-all ${errors.price ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                  </div>
                  {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Original Price (PKR) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">PKR</span>
                    <input
                      type="number"
                      value={form.originalPrice}
                      onChange={(e) => {
                        set("originalPrice", e.target.value);
                        if (form.price && e.target.value) {
                          const disc = Math.round(((Number(e.target.value) - Number(form.price)) / Number(e.target.value)) * 100);
                          if (disc >= 0 && disc <= 100) set("discount", String(disc));
                        }
                      }}
                      placeholder="36500"
                      className={`w-full pl-11 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white transition-all ${errors.originalPrice ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                  </div>
                  {errors.originalPrice && <p className="text-xs text-red-500 mt-1">{errors.originalPrice}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Discount %</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.discount}
                      onChange={(e) => set("discount", e.target.value)}
                      placeholder="41"
                      className="w-full pr-8 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-gray-50 transition-all"
                      readOnly
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Auto-calculated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Inventory */}
            <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-4 md:p-6">
              <h2 className="text-xs md:text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Inventory</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock Quantity <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => set("stock", e.target.value)}
                  placeholder="10"
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white transition-all ${errors.stock ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                />
                {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-4 md:p-6">
              <h2 className="text-xs md:text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Product Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Fabric</label>
                  <select
                    value={form.fabric}
                    onChange={(e) => set("fabric", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white transition-all cursor-pointer"
                  >
                    {fabrics.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Color</label>
                  <select
                    value={form.color}
                    onChange={(e) => set("color", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 bg-white transition-all cursor-pointer"
                  >
                    {colors.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Image Upload Placeholder */}
            <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-4 md:p-6">
              <h2 className="text-xs md:text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Product Images</h2>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors cursor-pointer">
                <svg className="mx-auto text-gray-300 mb-2" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs font-semibold text-gray-400">Click to upload images</p>
                <p className="text-[10px] text-gray-300 mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          <Link
            href="/admin/products"
            className="flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white admin-primary-bg rounded-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <>
                <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span>Save Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
