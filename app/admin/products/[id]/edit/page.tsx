"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { haseneaProducts } from "@/data/products/haseena/haseena-products";

const categories = [
  "Women - Clothing",
  "Women - Eastern Stitched",
  "Women - Unstitched",
  "Women - Eastern Ready to wear",
  "Women - Kurta Set",
];

const fabrics = ["Cotton Silk Blend", "Embroidered Silk", "Pure Silk", "Cotton Linen", "Organza Silk", "Cotton Silk", "Organza with Embroidery"];
const colors = ["Maroon", "Grey", "Navy", "Gold", "Pink", "Blue", "Mint Green", "Black", "White", "Beige", "Ivory"];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const existing = haseneaProducts.find((p) => p.id === productId);

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: existing?.name ?? "",
    brand: existing?.brand ?? "Haseens Official",
    category: existing?.category ?? categories[0],
    price: String(existing?.price ?? ""),
    originalPrice: String(existing?.originalPrice ?? ""),
    discount: String(existing?.discount ?? ""),
    description: existing?.description ?? "",
    fabric: existing?.fabric ?? fabrics[0],
    color: existing?.color ?? colors[0],
    stock: String(existing?.stock ?? ""),
    tags: existing?.tags?.join(", ") ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!existing) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-96">
        <svg className="text-gray-200 mb-4" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>
        <h2 className="text-lg font-bold text-[#111111]">Product not found</h2>
        <p className="text-sm text-gray-400 mt-1 mb-4">The product you're looking for doesn't exist.</p>
        <Link href="/admin/products" className="text-sm font-semibold text-[#111111] underline">Back to Products</Link>
      </div>
    );
  }

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
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    router.push("/admin/products");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/admin" className="hover:text-gray-600 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/admin/products" className="hover:text-gray-600 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-[#111111] font-medium">Edit Product</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Edit Product</h1>
          <p className="text-sm text-gray-400 mt-0.5">SKU: <span className="font-mono font-semibold text-gray-600">{existing.id.toUpperCase()}</span></p>
        </div>
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Products
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 bg-white ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Brand</label>
                    <input
                      type="text"
                      value={form.brand}
                      onChange={(e) => set("brand", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => set("category", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
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
                    rows={4}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 bg-white resize-none ${errors.description ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  />
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tags</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    placeholder="embroidered, gharara, wedding  (comma separated)"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Pricing</h2>
              <div className="grid grid-cols-3 gap-4">
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
                      className={`w-full pl-11 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 bg-white ${errors.price ? "border-red-400 bg-red-50" : "border-gray-200"}`}
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
                      className={`w-full pl-11 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 bg-white ${errors.originalPrice ? "border-red-400 bg-red-50" : "border-gray-200"}`}
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
                      readOnly
                      className="w-full pr-8 px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50"
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
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Inventory</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock Quantity <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => set("stock", e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-gray-400 bg-white ${errors.stock ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                />
                {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Product Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Fabric</label>
                  <select value={form.fabric} onChange={(e) => set("fabric", e.target.value)} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white">
                    {fabrics.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Color</label>
                  <select value={form.color} onChange={(e) => set("color", e.target.value)} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white">
                    {colors.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Images Preview */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Product Images</h2>
              {existing.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {existing.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                      <img src={img} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors cursor-pointer">
                <p className="text-xs font-semibold text-gray-400">+ Add more images</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <Link
            href={`/haseena/${existing.id}`}
            target="_blank"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#111111] font-medium transition-colors"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            View on Store
          </Link>
          <div className="flex gap-3">
            <Link
              href="/admin/products"
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white admin-primary-bg rounded-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
