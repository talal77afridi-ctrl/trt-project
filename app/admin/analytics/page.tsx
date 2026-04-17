const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const revenueData = [620000, 890000, 740000, 1100000, 980000, 840000];
const ordersData = [88, 124, 102, 158, 143, 120];
const maxRevenue = Math.max(...revenueData);
const maxOrders = Math.max(...ordersData);

const topCategories = [
  { name: "Women - Clothing", revenue: 3200000, percent: 38 },
  { name: "Women - Eastern Stitched", revenue: 2100000, percent: 25 },
  { name: "Women - Eastern Ready to wear", revenue: 1680000, percent: 20 },
  { name: "Women - Unstitched", revenue: 1000000, percent: 12 },
  { name: "Women - Kurta Set", revenue: 420000, percent: 5 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Analytics</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-0.5">Last 6 months performance overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6">
        {[
          { label: "Total Revenue", value: "PKR 8.4M", change: "+14.2%", positive: true },
          { label: "Total Orders", value: "735", change: "+8.9%", positive: true },
          { label: "Avg. Order Value", value: "PKR 17,850", change: "+4.1%", positive: true },
          { label: "Return Rate", value: "3.2%", change: "+0.4%", positive: false },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-lg md:rounded-xl border border-gray-100 px-3 md:px-5 py-3 md:py-4">
            <p className="text-[10px] md:text-xs text-gray-400 font-medium truncate">{k.label}</p>
            <p className="text-lg md:text-2xl font-bold text-[#111111] mt-1">{k.value}</p>
            <p className={`text-[10px] md:text-xs mt-1 font-semibold ${k.positive ? "text-emerald-600" : "text-red-500"}`}>
              {k.change} vs prev. period
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5 mb-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg md:rounded-xl border border-gray-100 p-4 md:p-6">
          <h2 className="text-sm font-bold text-[#111111] mb-5">Monthly Revenue</h2>
          <div className="flex items-end gap-3 h-40">
            {revenueData.map((v, i) => (
              <div key={months[i]} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[9px] text-gray-400 font-medium">
                  {v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}K`}
                </span>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${(v / maxRevenue) * 120}px`,
                    background: i === revenueData.length - 1 ? "var(--admin-primary, #111111)" : "#e5e7eb",
                  }}
                />
                <span className="text-[10px] text-gray-500 font-medium">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-4 md:p-6">
          <h2 className="text-sm font-bold text-[#111111] mb-5">Monthly Orders</h2>
          <div className="flex items-end gap-2 h-40">
            {ordersData.map((v, i) => (
              <div key={months[i]} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[9px] text-gray-400 font-medium">{v}</span>
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${(v / maxOrders) * 120}px`,
                    background: i === ordersData.length - 1 ? "#6a7f38" : "#e5e7eb",
                  }}
                />
                <span className="text-[10px] text-gray-500 font-medium">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-4 md:p-6">
        <h2 className="text-sm font-bold text-[#111111] mb-5">Revenue by Category</h2>
        <div className="space-y-3">
          {topCategories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-[#111111]">{cat.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#111111]">PKR {(cat.revenue / 1000000).toFixed(1)}M</span>
                  <span className="text-xs text-gray-400 w-8 text-right">{cat.percent}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full admin-primary-bg rounded-full transition-all"
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
