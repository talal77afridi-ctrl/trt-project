"use client";

import { useState } from "react";

const adminList = [
  { id: "A01", name: "Muhammad Ali", email: "ali@trt.pk", role: "Super Admin", status: "Active", lastLogin: "Today, 2:30 PM" },
  { id: "A02", name: "Sara Ahmed", email: "sara@trt.pk", role: "Admin", status: "Active", lastLogin: "Today, 11:00 AM" },
  { id: "A03", name: "Zara Khan", email: "zara@trt.pk", role: "Manager", status: "Active", lastLogin: "Yesterday" },
  { id: "A04", name: "Omar Sheikh", email: "omar@trt.pk", role: "Manager", status: "Inactive", lastLogin: "Jun 8, 2025" },
  { id: "A05", name: "Ayesha Tariq", email: "ayesha@trt.pk", role: "Admin", status: "Active", lastLogin: "Jun 12, 2025" },
];

const roles = ["Super Admin", "Admin", "Manager"];
const roleColors: Record<string, string> = {
  "Super Admin": "bg-purple-50 text-purple-700",
  "Admin": "bg-blue-50 text-blue-700",
  "Manager": "bg-amber-50 text-amber-700",
};

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState(adminList);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "Admin", password: "" });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleAdd = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    const id = "A" + (admins.length + 1).toString().padStart(2, "0");
    setAdmins((prev) => [...prev, { id, name: form.name, email: form.email, role: form.role, status: "Active", lastLogin: "Never" }]);
    setForm({ name: "", email: "", role: "Admin", password: "" });
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  const toggleStatus = (id: string) => {
    setAdmins((prev) => prev.map((a) => a.id === id ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" } : a));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Admin Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{admins.length} admin users · {admins.filter((a) => a.status === "Active").length} active</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ color: "#fff" }} className="flex items-center gap-2 admin-primary-bg px-4 py-2.5 text-sm font-semibold rounded-md">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Admin
        </button>
      </div>

      {/* Role stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {roles.map((role) => (
          <div key={role} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400 font-medium">{role}</p>
            <p className="text-2xl font-bold text-[#111111] mt-1">{admins.filter((a) => a.role === role).length}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">{admin.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-semibold text-[#111111]">{admin.name}</p>
                      <p className="text-xs text-gray-400">{admin.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${roleColors[admin.role]}`}>{admin.role}</span>
                </td>
                <td className="px-5 py-3.5">
                  <button onClick={() => toggleStatus(admin.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${admin.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${admin.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                    {admin.status}
                  </button>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{admin.lastLogin}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Edit</button>
                    {admin.role !== "Super Admin" && (
                      <button onClick={() => setDeleteConfirm(admin.id)} className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-md hover:bg-red-100 transition-colors">Delete</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] mb-4">Add Admin User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name</label>
                <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Sara Ahmed"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="admin@trt.pk"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Role</label>
                <select value={form.role} onChange={(e) => set("role", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white">
                  {roles.filter((r) => r !== "Super Admin").map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Temporary Password</label>
                <input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Min 8 characters"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleAdd} style={{ color: "#fff" }} className="flex-1 px-4 py-2.5 text-sm font-semibold admin-primary-bg rounded-lg">Add Admin</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-[#111111] text-center">Remove Admin?</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-5">This admin user will lose all access immediately.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-lg">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
