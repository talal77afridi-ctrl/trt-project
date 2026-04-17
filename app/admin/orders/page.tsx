"use client";

import { useState } from "react";

const allOrders = [
  { id: "#ORD-4821", customer: "Ayesha Khan", email: "ayesha@example.com", product: "Radhi - Embroidered Gharara", amount: 21500, status: "Delivered", date: "Apr 16, 2026", items: 1 },
  { id: "#ORD-4820", customer: "Sana Mirza", email: "sana@example.com", product: "Ferzah - Classic Suit", amount: 17400, status: "Processing", date: "Apr 16, 2026", items: 1 },
  { id: "#ORD-4819", customer: "Hira Baig", email: "hira@example.com", product: "Soraya - Printed Dress", amount: 16000, status: "Shipped", date: "Apr 15, 2026", items: 1 },
  { id: "#ORD-4818", customer: "Nadia Shah", email: "nadia@example.com", product: "Moti - Luxurious Suit", amount: 21900, status: "Pending", date: "Apr 15, 2026", items: 1 },
  { id: "#ORD-4817", customer: "Zara Ahmed", email: "zara@example.com", product: "Guinezar - Silk Kameez", amount: 17900, status: "Cancelled", date: "Apr 14, 2026", items: 1 },
  { id: "#ORD-4816", customer: "Farah Naz", email: "farah@example.com", product: "Noor - Eastern Stitched", amount: 19500, status: "Delivered", date: "Apr 14, 2026", items: 2 },
  { id: "#ORD-4815", customer: "Bushra Ali", email: "bushra@example.com", product: "Amara - Kurta Set", amount: 12500, status: "Delivered", date: "Apr 13, 2026", items: 1 },
  { id: "#ORD-4814", customer: "Mehwish Iqbal", email: "mehwish@example.com", product: "Zaira - Festive Wear", amount: 24500, status: "Shipped", date: "Apr 13, 2026", items: 1 },
  { id: "#ORD-4813", customer: "Sara Qureshi", email: "sara@example.com", product: "Layla - Kurta Set", amount: 18500, status: "Processing", date: "Apr 12, 2026", items: 1 },
  { id: "#ORD-4812", customer: "Noor Fatima", email: "noor@example.com", product: "Soraya - Printed Dress", amount: 16000, status: "Pending", date: "Apr 12, 2026", items: 1 },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-violet-50 text-violet-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-600",
};

const statusFilters = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allOrders.filter((o) => {
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = allOrders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.amount, 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">{allOrders.length} total orders</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {statusFilters.slice(1).concat(["Total"]).map((s) => {
          const count = s === "Total" ? allOrders.length : allOrders.filter((o) => o.status === s).length;
          const colors: Record<string, string> = { Pending: "text-amber-600", Processing: "text-blue-600", Shipped: "text-violet-600", Delivered: "text-emerald-600", Cancelled: "text-red-600", Total: "text-[#111111]" };
          return (
            <div key={s} className="bg-white rounded-xl border border-gray-100 px-4 py-3.5 cursor-pointer hover:border-gray-200 transition-all" onClick={() => setStatusFilter(s === "Total" ? "All" : s)}>
              <p className="text-xs text-gray-400 font-medium">{s}</p>
              <p className={`text-2xl font-bold mt-1 ${colors[s]}`}>{count}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue banner */}
      <div className="admin-primary-bg rounded-xl p-5 mb-6 flex items-center justify-between">
        <div>
          <p className="text-white/50 text-xs font-medium">Total Revenue (excl. cancelled)</p>
          <p className="text-white text-2xl font-bold mt-1">PKR {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="text-white/20">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search by order ID or customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-gray-50" />
        </div>
        <div className="flex gap-1">
          {statusFilters.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${statusFilter === s ? "admin-primary-bg text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-16 text-center text-gray-400 text-sm">No orders found</td></tr>
            ) : filtered.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5 text-sm font-bold text-[#111111]">{order.id}</td>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-semibold text-[#111111]">{order.customer}</p>
                  <p className="text-xs text-gray-400">{order.email}</p>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{order.product}</td>
                <td className="px-5 py-3.5 text-sm font-bold text-[#111111]">PKR {order.amount.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}>{order.status}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-400">{order.date}</td>
                <td className="px-5 py-3.5 text-right">
                  <select defaultValue={order.status} className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-600 focus:outline-none">
                    {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
