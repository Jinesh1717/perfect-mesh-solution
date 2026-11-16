'use client';

import { useState, useMemo } from 'react';
import { Search, Lock, Unlock, Phone, Download, ShieldCheck, Filter } from 'lucide-react';

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  location: string;
  createdAt: string;
}

export default function AdminDashboard({ leads }: { leads: LeadItem[] }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('admin_auth') === 'true';
    }
    return false;
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'scheduled'>('all');

  // Verify PIN (default PIN: mesh2026)
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'mesh2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.location.toLowerCase().includes(q);
      return matchesSearch;
    });
  }, [leads, searchQuery]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID,Name,Phone,Location,SubmittedAt'];
    const rows = filteredLeads.map(
      (l) => `"${l.id}","${l.name}","${l.phone}","${l.location}","${l.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If not authenticated, render luxury passcode lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070809] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0e1013] border border-white/10 shadow-2xl text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-zinc-300 mb-6">
            <Lock size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Staff Authentication</h2>
          <p className="text-xs text-zinc-400 mb-6">
            Enter the administrative security PIN to access customer measurement leads.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter PIN (mesh2026)"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-center font-mono text-lg tracking-widest text-white focus:outline-none focus:border-white transition-all"
            />
            {pinError && (
              <p className="text-xs text-red-400 font-mono">Incorrect security PIN. Please try again.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070809] text-white p-6 sm:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-white/[0.08] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>Portal Active</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Lead Management Dashboard
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              {leads.length} Total Captured Inquiries • Sorted newest first
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-all cursor-pointer"
            >
              <Unlock size={14} />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, phone or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white transition-all"
            />
          </div>

          <div className="text-xs text-zinc-500 font-mono sm:ml-auto">
            Showing {filteredLeads.length} of {leads.length} inquiries
          </div>
        </div>

        {/* Table View */}
        <div className="bg-[#0e1013] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/[0.08] text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4">Locality / City</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4 text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-zinc-500 text-sm">
                      No matching inquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-semibold text-white text-sm">{lead.name}</td>
                      <td className="p-4 text-zinc-300 font-mono text-xs">
                        <a href={`tel:${lead.phone}`} className="hover:text-white hover:underline flex items-center gap-1.5">
                          <Phone size={12} className="text-zinc-500" />
                          <span>{lead.phone}</span>
                        </a>
                      </td>
                      <td className="p-4 text-zinc-300 text-xs">{lead.location}</td>
                      <td className="p-4 text-zinc-500 text-xs font-mono">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs hover:bg-emerald-500/20 transition-all"
                        >
                          <Phone size={11} />
                          <span>Call Client</span>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
