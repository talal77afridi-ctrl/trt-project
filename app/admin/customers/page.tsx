"use client";

import { useState } from "react";

const customers = [
  { id: "C001", name: "Ayesha Khan", email: "ayesha@example.com", phone: "+92 301 1234567", orders: 8, spent: 142000, joined: "Jan 12, 2025", status: "Active" },
  { id: "C002", name: "Sana Mirza", email: "sana@example.com", phone: "+92 332 2345678", orders: 5, spent: 89500, joined: "Feb 3, 2025", status: "Active" },
  { id: "C003", name: "Hira Baig", email: "hira@example.com", phone: "+92 312 3456789", orders: 12, spent: 210000, joined: "Nov 20, 2024", status: "Active" },
  { id: "C004", name: "Nadia Shah", email: "nadia@example.com", phone: "+92 345 4567890", orders: 2, spent: 38400, joined: "Mar 15, 2026", status: "Active" },
  { id: "C005", name: "Zara Ahmed", email: "zara@example.com", phone: "+92 321 5678901", orders: 1, spent: 17900, joined: "Apr 1, 2026", status: "Active" },
  { id: "C006", name: "Farah Naz", email: "farah@example.com", phone: "+92 300 6789012", orders: 6, spent: 115000, joined: "Dec 5, 2024", status: "Inactive" },
  { id: "C007", name: "Bushra Ali", email: "bushra@example.com", phone: "+92 333 7890123", orders: 3, spent: 52500, joined: "Jan 30, 2026", status: "Active" },
  { id: "C008", name: "Mehwish Iqbal", email: "mehwish@example.com", phone: "+92 316 8901234", orders: 9, spent: 198000, joined: "Oct 14, 2024", status: "Active" },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Customers</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">{customers.length} registered customers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          { label: "Total Customers", value: customers.length, color: "text-[#111111]" },
          { label: "Active", value: customers.filter((c) => c.status === "Active").length, color: "text-emerald-600" },
          { label: "Inactive", value: customers.filter((c) => c.status === "Inactive").length, color: "text-gray-400" },
          { label: "Avg. Order Value", value: "PKR " + Math.round(customers.reduce((s, c) => s + c.spent, 0) / customers.reduce((s, c) => s + c.orders, 0)).toLocaleString(), color: "text-violet-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg md:rounded-xl border border-gray-100 px-3 md:px-5 py-3 md:py-4">
            <p className="text-[10px] md:text-xs text-gray-400 font-medium truncate">{s.label}</p>
            <p className={`text-lg md:text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-3 md:p-4 mb-5 space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-3 md:items-center">
        <div className="relative w-full md:flex-1 md:min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-gray-50" />
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {["All", "Active", "Inactive"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${statusFilter === s ? "admin-primary-bg text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table - Desktop Only */}
      <div className="hidden md:block bg-white rounded-lg md:rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-16 text-center text-gray-400 text-sm">No customers found</td></tr>
            ) : filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#6a7f38]/20 flex items-center justify-center text-[#6a7f38] text-xs font-bold shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111111]">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-sm text-[#111111]">{c.email}</p>
                  <p className="text-xs text-gray-400">{c.phone}</p>
                </td>
                <td className="px-5 py-3.5 text-sm font-semibold text-[#111111]">{c.orders}</td>
                <td className="px-5 py-3.5 text-sm font-bold text-[#111111]">PKR {c.spent.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-sm text-gray-400">{c.joined}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${c.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
            <p className="text-sm text-gray-400">No customers found</p>
          </div>
        ) : filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-lg border border-gray-100 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6a7f38]/20 flex items-center justify-center text-[#6a7f38] text-sm font-bold shrink-0">
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#111111] truncate">{c.name}</p>
                <p className="text-xs text-gray-400">{c.id}</p>
                <p className="text-xs text-gray-500 mt-1">{c.email}</p>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold shrink-0 ${c.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                {c.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Orders</p>
                <p className="text-sm font-bold text-[#111111] mt-1">{c.orders}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Total Spent</p>
                <p className="text-sm font-bold text-[#111111] mt-1">PKR {(c.spent / 1000).toFixed(0)}k</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Joined</p>
                <p className="text-xs text-gray-500 mt-1">{c.joined}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
