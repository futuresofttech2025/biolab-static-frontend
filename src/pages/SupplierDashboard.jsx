import { Link } from 'react-router-dom';
import { Layers, Clock, AlertTriangle, CheckCircle, Search, Filter, Upload, MessageSquare, CreditCard, Users, Zap, ArrowRight } from 'lucide-react';
import { StatCard, StatusBadge } from '../components/UI';

const projects = [
  { client: 'PharmaCorp Inc.', title: 'Enzyme Kinetics — Batch 2024-A', status: 'In Progress', updated: '2 hours ago' },
  { client: 'GeneTech Labs', title: 'Protein Characterization — mAb-7', status: 'Awaiting Review', updated: '5 hours ago' },
  { client: 'BioVista Research', title: 'Cell Viability Assay Panel', status: 'In Progress', updated: '1 day ago' },
  { client: 'MediSync Pharma', title: 'Stability Study — ICH Q1A', status: 'Completed', updated: '2 days ago' },
  { client: 'CureLogic Bio', title: 'Bioprocess Optimization — CHO', status: 'Overdue', updated: '5 days ago' },
];

export default function SupplierDashboard() {
  return (
    <div>
      {/* Welcome banner with lab image */}
      <div className="dash-banner mb-5">
        <img src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1200&q=80" alt="Lab" />
        <div className="dash-banner-overlay" />
        <div className="dash-banner-content">
          <p className="text-xs text-emerald-400 font-semibold mb-1">Good morning</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">Dr. Sarah Chen</h1>
          <p className="text-sm text-slate-300 font-medium mt-1">5 active projects · 3 pending requests · 1 overdue</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-5">
        <div className="space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={Layers} label="Active Projects" value="5" color="teal" trend={12} />
            <StatCard icon={Clock} label="Pending Requests" value="3" color="blue" />
            <StatCard icon={AlertTriangle} label="Overdue" value="1" color="rose" />
            <StatCard icon={CheckCircle} label="Completed" value="8" color="amber" trend={23} />
          </div>

          {/* Project Table */}
          <div className="bg-white rounded-xl border border-slate-100 sm:rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-200/60">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">Active Projects</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input placeholder="Search..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-44 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400" />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100"><Filter size={13} /> Filter</button>
              </div>
            </div>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto table-wrap">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/80">
                    {['Client', 'Project', 'Status', 'Updated', ''].map(h => (
                      <th key={h} className={`${!h ? 'text-right' : 'text-left'} px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p, i) => (
                    <tr key={i} className="border-t border-slate-100 hover:bg-teal-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{p.client}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{p.title}</td>
                      <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                      <td className="px-6 py-4 text-slate-400 text-xs font-medium">{p.updated}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to="/supplier/workspace/1" className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-teal-200/40 hover:shadow-md transition-all">View <ArrowRight size={12} /></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {projects.map((p, i) => (
                <Link key={i} to="/supplier/workspace/1" className="block px-4 py-4 hover:bg-teal-50/30">
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="min-w-0 flex-1 mr-3">
                      <p className="text-sm font-bold text-slate-900 truncate">{p.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{p.client}</p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{p.updated}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Zap size={16} className="text-teal-500" /> Quick Actions</h3>
            <div className="space-y-1">
              {[
                { icon: Upload, label: 'Upload Protocol', to: '/supplier/workspace/1' },
                { icon: MessageSquare, label: 'Send Message', to: '/supplier/messages' },
                { icon: CreditCard, label: 'Create Invoice', to: '/supplier/invoicing' },
                { icon: Users, label: 'View Clients', to: '/supplier/requests' },
              ].map((a, i) => (
                <Link key={i} to={a.to} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-700 font-medium hover:text-teal-700 hover:bg-teal-50/60 transition-all group">
                  <a.icon size={17} className="text-slate-400 group-hover:text-teal-500 transition-colors" /> {a.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Lab tip card with image */}
          <div className="img-card h-40">
            <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80" alt="Lab" loading="lazy" />
            <div className="img-overlay !p-4">
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1">Lab Update</p>
              <p className="text-xs text-white font-medium">New mass spectrometry equipment now available for protein characterization.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-3.5">
              {[
                { text: 'PharmaCorp uploaded new samples', time: '30 m ago', color: 'bg-blue-500' },
                { text: 'GeneTech approved protocol v3', time: '2 h ago', color: 'bg-emerald-500' },
                { text: 'New request from BioVista', time: '5 h ago', color: 'bg-amber-500' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 mt-1.5 rounded-full ${a.color} flex-shrink-0`} />
                  <div><p className="text-xs text-slate-700 font-medium leading-relaxed">{a.text}</p><p className="text-[10px] text-slate-400 font-medium">{a.time}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
