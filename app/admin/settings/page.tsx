export default function AdminSettingsPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111111]">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your store configuration</p>
      </div>

      <div className="space-y-5">
        {/* Store Info */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Store Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Store Name", value: "TRT – The Royal Threads", type: "text" },
              { label: "Store Email", value: "admin@trt.pk", type: "email" },
              { label: "Store Phone", value: "+92 321 0000000", type: "text" },
              { label: "Currency", value: "PKR", type: "text" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{f.label}</label>
                <input type={f.type} defaultValue={f.value} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Store Address</label>
            <textarea defaultValue="123 Fashion Street, Gulberg III, Lahore, Pakistan" rows={2} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white resize-none" />
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Shipping Settings</h2>
          <div className="space-y-3">
            {[
              { label: "Standard Shipping Fee (PKR)", value: "200" },
              { label: "Express Shipping Fee (PKR)", value: "450" },
              { label: "Free Shipping Above (PKR)", value: "5000" },
            ].map((f) => (
              <div key={f.label} className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-600">{f.label}</label>
                <input type="number" defaultValue={f.value} className="w-32 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white text-right" />
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-[#111111] mb-4 pb-3 border-b border-gray-100">Notifications</h2>
          <div className="space-y-3">
            {[
              { label: "New order notifications", checked: true },
              { label: "Low stock alerts (below 5 units)", checked: true },
              { label: "Customer signup alerts", checked: false },
              { label: "Weekly sales report", checked: true },
            ].map((n) => (
              <label key={n.label} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-gray-700">{n.label}</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${n.checked ? "admin-primary-bg" : "bg-gray-200"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${n.checked ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button className="px-6 py-2.5 text-sm font-semibold text-white admin-primary-bg rounded-lg transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
