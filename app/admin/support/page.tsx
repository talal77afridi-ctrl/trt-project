"use client";

import { useState } from "react";

const ticketList = [
  { id: "TKT-001", customer: "Fatima Malik", email: "fatima@gmail.com", subject: "Order not received", status: "Open", priority: "High", created: "Jun 14, 2025", messages: 3 },
  { id: "TKT-002", customer: "Ali Hassan", email: "ali.h@gmail.com", subject: "Wrong item delivered", status: "In Progress", priority: "High", created: "Jun 13, 2025", messages: 5 },
  { id: "TKT-003", customer: "Sara Khan", email: "sara@gmail.com", subject: "Refund request for order #2193", status: "In Progress", priority: "Medium", created: "Jun 12, 2025", messages: 2 },
  { id: "TKT-004", customer: "Usman Raza", email: "usman@gmail.com", subject: "Size exchange request", status: "Open", priority: "Low", created: "Jun 11, 2025", messages: 1 },
  { id: "TKT-005", customer: "Nadia Amjad", email: "nadia@gmail.com", subject: "Payment deducted but no confirmation", status: "Resolved", priority: "High", created: "Jun 8, 2025", messages: 7 },
  { id: "TKT-006", customer: "Bilal Ahmed", email: "bilal@gmail.com", subject: "Product quality issue", status: "Resolved", priority: "Medium", created: "Jun 5, 2025", messages: 4 },
];

const statuses = ["All", "Open", "In Progress", "Resolved"];
const priorities = ["All", "High", "Medium", "Low"];

const statusColors: Record<string, string> = {
  "Open": "bg-red-50 text-red-600",
  "In Progress": "bg-amber-50 text-amber-600",
  "Resolved": "bg-emerald-50 text-emerald-700",
};
const priorityColors: Record<string, string> = {
  "High": "bg-red-50 text-red-500",
  "Medium": "bg-amber-50 text-amber-600",
  "Low": "bg-gray-100 text-gray-500",
};

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState(ticketList);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const filtered = tickets.filter((t) =>
    (statusFilter === "All" || t.status === statusFilter) &&
    (priorityFilter === "All" || t.priority === priorityFilter)
  );

  const updateStatus = (id: string, status: string) => {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, status } : t));
  };

  const selectedTicket = tickets.find((t) => t.id === selected);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Customer Support</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            {tickets.filter((t) => t.status !== "Resolved").length} open tickets
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          { label: "Total Tickets", value: tickets.length },
          { label: "Open", value: tickets.filter((t) => t.status === "Open").length },
          { label: "In Progress", value: tickets.filter((t) => t.status === "In Progress").length },
          { label: "Resolved", value: tickets.filter((t) => t.status === "Resolved").length },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg md:rounded-xl border border-gray-100 px-3 md:px-5 py-3 md:py-4">
            <p className="text-[10px] md:text-xs text-gray-400 font-medium truncate">{s.label}</p>
            <p className="text-lg md:text-2xl font-bold text-[#111111] mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 p-3 md:p-4 mb-5 space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-500 mb-2 md:mb-0">Status:</span>
          <div className="flex gap-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${statusFilter === s ? "admin-primary-bg text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                style={statusFilter === s ? { color: "#fff" } : {}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-500 mb-2 md:mb-0">Priority:</span>
          <div className="flex gap-2 flex-wrap">
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${priorityFilter === p ? "admin-primary-bg text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                style={priorityFilter === p ? { color: "#fff" } : {}}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table - Desktop Only */}
      <div className="hidden md:block bg-white rounded-lg md:rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticket</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">No tickets found</td></tr>
            ) : filtered.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="text-xs font-mono text-gray-400">{ticket.id}</p>
                  <p className="text-sm font-semibold text-[#111111]">{ticket.subject}</p>
                  <p className="text-xs text-gray-400">{ticket.messages} message{ticket.messages !== 1 ? "s" : ""}</p>
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-semibold text-[#111111]">{ticket.customer}</p>
                  <p className="text-xs text-gray-400">{ticket.email}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status]}`}>{ticket.status}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{ticket.created}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setSelected(ticket.id)} style={{ color: "#fff" }} className="px-3 py-1.5 text-xs font-medium admin-primary-bg rounded-md">
                      View
                    </button>
                    {ticket.status !== "Resolved" && (
                      <button onClick={() => updateStatus(ticket.id, "Resolved")} className="px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-md hover:bg-emerald-100">
                        Resolve
                      </button>
                    )}
                  </div>
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
            <p className="text-sm text-gray-400">No tickets found</p>
          </div>
        ) : filtered.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg border border-gray-100 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-gray-400">{ticket.id}</p>
                <p className="text-sm font-semibold text-[#111111] mt-1 line-clamp-2">{ticket.subject}</p>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold shrink-0 ${statusColors[ticket.status]}`}>{ticket.status}</span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm font-medium text-[#111111]">{ticket.customer}</p>
              <p className="text-xs text-gray-400 mt-0.5">{ticket.email}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Priority</p>
                <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-semibold mt-1 ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Created</p>
                <p className="text-xs text-gray-600 mt-1">{ticket.created}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Messages</p>
                <p className="text-xs font-medium text-[#111111] mt-1">{ticket.messages}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setSelected(ticket.id)} style={{ color: "#fff" }} className="flex-1 px-3 py-2 text-xs font-semibold admin-primary-bg rounded-md">
                View
              </button>
              {ticket.status !== "Resolved" && (
                <button onClick={() => updateStatus(ticket.id, "Resolved")} className="flex-1 px-3 py-2 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-md hover:bg-emerald-100">
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Ticket detail modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-mono text-gray-400">{selectedTicket.id}</p>
                <h3 className="text-base font-bold text-[#111111] mt-0.5">{selectedTicket.subject}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{selectedTicket.customer} · {selectedTicket.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Status change */}
            <div className="flex gap-2 mb-4">
              {["Open", "In Progress", "Resolved"].map((s) => (
                <button key={s} onClick={() => updateStatus(selectedTicket.id, s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${selectedTicket.status === s ? "admin-primary-bg text-white" : "bg-gray-100 text-gray-600"}`}
                  style={selectedTicket.status === s ? { color: "#fff" } : {}}>{s}</button>
              ))}
            </div>

            {/* Conversation placeholder */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 min-h-[120px]">
              <p className="text-xs text-gray-400 text-center pt-6">Conversation thread would appear here</p>
            </div>

            {/* Reply box */}
            <div className="space-y-2">
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={3} placeholder="Type your reply..."
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none" />
              <div className="flex justify-end gap-2">
                <button onClick={() => setSelected(null)} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">Close</button>
                <button onClick={() => { setReply(""); }} style={{ color: "#fff" }} className="px-4 py-2 text-sm font-semibold admin-primary-bg rounded-lg">Send Reply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
