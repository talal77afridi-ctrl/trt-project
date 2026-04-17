import Link from "next/link";

const stats = [
  {
    label: "Total Products",
    value: "248",
    change: "+12 this month",
    positive: true,
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    ),
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    href: "/admin/products",
  },
  {
    label: "Total Orders",
    value: "1,340",
    change: "+84 this week",
    positive: true,
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    href: "/admin/orders",
  },
  {
    label: "Total Customers",
    value: "5,892",
    change: "+203 this month",
    positive: true,
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    href: "/admin/customers",
  },
  {
    label: "Total Revenue",
    value: "PKR 8.4M",
    change: "-2.1% vs last month",
    positive: false,
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    href: "/admin/analytics",
  },
];

const recentOrders = [
  { id: "#ORD-4821", customer: "Ayesha Khan", product: "Radhi - Embroidered Gharara", amount: "PKR 21,500", status: "Delivered", date: "Apr 16, 2026" },
  { id: "#ORD-4820", customer: "Sana Mirza", product: "Ferzah - Classic Suit", amount: "PKR 17,400", status: "Processing", date: "Apr 16, 2026" },
  { id: "#ORD-4819", customer: "Hira Baig", product: "Soraya - Printed Dress", amount: "PKR 16,000", status: "Shipped", date: "Apr 15, 2026" },
  { id: "#ORD-4818", customer: "Nadia Shah", product: "Moti - Luxurious Suit", amount: "PKR 21,900", status: "Pending", date: "Apr 15, 2026" },
  { id: "#ORD-4817", customer: "Zara Ahmed", product: "Guinezar - Silk Kameez", amount: "PKR 17,900", status: "Cancelled", date: "Apr 14, 2026" },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-violet-50 text-violet-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-600",
};

const topProducts = [
  { name: "Soraya - Printed Dress", brand: "Haseens Official", sales: 43, revenue: "PKR 688,000" },
  { name: "Ferzah - Classic Suit", brand: "Haseens Official", sales: 35, revenue: "PKR 609,000" },
  { name: "Radhi - Embroidered Gharara", brand: "Haseens Official", sales: 28, revenue: "PKR 602,000" },
  { name: "Moti - Luxurious Suit", brand: "Haseens Official", sales: 22, revenue: "PKR 481,800" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, Admin — here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products/add"
            style={{ color: "#ffffff" }}
            className="flex items-center gap-2 admin-primary-bg px-4 py-2 text-sm font-medium rounded-md transition-colors"
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#ffffff" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-[#111111]">{s.value}</p>
                <p className={`text-xs mt-1 font-medium ${s.positive ? "text-emerald-600" : "text-red-500"}`}>
                  {s.change}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center ${s.iconColor}`}>
                {s.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Recent Orders */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-[#111111] text-sm">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#6a7f38] hover:underline font-medium">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#111111]">{order.id}</td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm text-[#111111] font-medium">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.product}</p>
                    </td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#111111]">{order.amount}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-400">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-[#111111] text-sm">Top Products</h2>
            <Link href="/admin/products" className="text-xs text-[#6a7f38] hover:underline font-medium">View all</Link>
          </div>
          <div className="p-4 space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#111111] truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-400">{p.sales} sold • {p.revenue}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="px-4 pb-4 pt-2 border-t border-gray-50 mt-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</p>
            <div className="space-y-2">
              <Link href="/admin/products/add" className="flex items-center gap-2 w-full text-left text-sm text-[#111111] font-medium hover:text-[#6a7f38] transition-colors">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                Add New Product
              </Link>
              <Link href="/admin/orders" className="flex items-center gap-2 w-full text-left text-sm text-[#111111] font-medium hover:text-[#6a7f38] transition-colors">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                View Pending Orders
              </Link>
              <Link href="/admin/analytics" className="flex items-center gap-2 w-full text-left text-sm text-[#111111] font-medium hover:text-[#6a7f38] transition-colors">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
