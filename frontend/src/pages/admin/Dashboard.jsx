import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api.js";
import DashboardCard from "../../components/DashboardCard.jsx";
import LeadTable from "../../components/LeadTable.jsx";
import LeadDetails from "../../components/LeadDetails.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import Toast from "../../components/Toast.jsx";

const STATUSES = ["New", "Contacted", "Follow-up", "Qualified", "Site Visit", "Proposal Sent", "Won", "Lost"];
const PAGE_SIZE = 8;

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeLeadId, setActiveLeadId] = useState(null);
  const [toast, setToast] = useState(null);
  const [dbMode, setDbMode] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        api.getLeads({ search, status: statusFilter, page, limit: PAGE_SIZE }),
        api.getStats(),
      ]);
      setLeads(leadsRes.leads);
      setTotal(leadsRes.total);
      setStats(statsRes.stats);
      setDbMode(statsRes.dbMode);
    } catch (err) {
      if (err.message.includes("Session expired") || err.message.includes("Not authorized")) {
        logout();
        navigate("/admin/login");
      } else {
        setToast({ type: "error", message: err.message });
      }
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => { load(); }, [load]);

  function handleCopy(phone) {
    navigator.clipboard.writeText(phone);
    setToast({ type: "success", message: "Phone number copied." });
  }

  const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 md:px-8">
        <div className="flex items-center gap-2 text-gray-900">
          <LayoutDashboard size={20} className="text-bronze" />
          <span className="font-display text-lg">Eleix Sales Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          {dbMode && (
            <span className="hidden rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 sm:inline-block">
              Data: {dbMode === "mongodb" ? "MongoDB" : "Mock demo data"}
            </span>
          )}
          <span className="hidden text-sm text-gray-600 sm:inline">{user?.name}</span>
          <button
            onClick={() => { logout(); navigate("/admin/login"); }}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            <LogOut size={15} /> Log Out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          <DashboardCard label="Total Leads" value={stats?.total ?? "—"} accent />
          {STATUSES.map((s) => <DashboardCard key={s} label={s} value={stats?.[s] ?? "—"} />)}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
              placeholder="Search by name, phone, email, city..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-bronze focus:ring-1 focus:ring-bronze sm:w-auto"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="mt-5">
          {loading ? (
            <LoadingSpinner label="Loading leads..." />
          ) : (
            <LeadTable leads={leads} onOpen={(lead) => setActiveLeadId(lead._id)} onCopy={handleCopy} />
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <LeadDetails
        leadId={activeLeadId}
        open={!!activeLeadId}
        onClose={() => setActiveLeadId(null)}
        onChanged={load}
        onToast={setToast}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
