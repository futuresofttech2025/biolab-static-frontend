import { Link } from 'react-router-dom';
import { Layers, Eye, MessageSquare, CreditCard, Search, Download, Zap, ArrowRight } from 'lucide-react';
import { StatCard, StatusBadge } from '../components/UI';

const projects = [
  { title: 'Enzyme Kinetics — Batch A', lab: 'FrontierBioLabs Alpha', status: 'Experiment Running', updated: '3 hours ago' },
  { title: 'Protein Purification — mAb-12', lab: 'FrontierBioLabs Beta', status: 'Results Ready', updated: '1 day ago' },
  { title: 'Cell Viability Panel — Q4', lab: 'FrontierBioLabs Alpha', status: 'Protocol Review', updated: '2 days ago' },
  { title: 'Stability Study — Long-term', lab: 'FrontierBioLabs Gamma', status: 'In Progress', updated: '4 days ago' },
];

export default function BuyerDashboard() {
  return (
    <div>
      {/* Welcome banner */}
      <div className="dash-banner mb-5">
        <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80" alt="Lab" />
        <div className="dash-banner-overlay" />
        <div className="dash-banner-content">
          <p className="text-xs text-emerald-400 font-semibold mb-1">Welcome back</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">Jane Smith</h1>
          <p className="text-sm text-slate-300 font-medium mt-1">4 active projects · 1 results ready for review</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-5">
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={Layers} label="Active Projects" value="4" color="teal" trend={8} />
            <StatCard icon={Eye} label="Pending Reviews" value="2" color="blue" />
            <StatCard icon={CreditCard} label="Outstanding" value="$27.5k" color="amber" />
            <StatCard icon={Download} label="Results Ready" value="1" color="purple" />
          </div>

          <div className="bg-white rounded-xl border border-slate-100 sm:rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200/60">
              <h2 className="text-base font-bold text-slate-900 font-display">My Projects</h2>
              <Link to="/buyer/projects" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">View all <ArrowRight size={12} /></Link>
            </div>
            <div className="hidden md:block overflow-x-auto table-wrap">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-50/80">
                  {['Project', 'Lab', 'Status', 'Updated', ''].map(h => (
                    <th key={h} className={`${!h ? 'text-right' : 'text-left'} px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider`}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {projects.map((p, i) => (
                    <tr key={i} className="border-t border-slate-100 hover:bg-teal-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{p.title}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{p.lab}</td>
                      <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                      <td className="px-6 py-4 text-slate-400 text-xs font-medium">{p.updated}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to="/buyer/workspace/1" className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all">View <ArrowRight size={12} /></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden divide-y divide-slate-100">
              {projects.map((p, i) => (
                <Link key={i} to="/buyer/workspace/1" className="block px-4 py-4 hover:bg-teal-50/30">
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="min-w-0 flex-1 mr-3">
                      <p className="text-sm font-bold text-slate-900 truncate">{p.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{p.lab}</p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{p.updated}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Zap size={16} className="text-teal-500" /> Quick Actions</h3>
            <div className="space-y-1">
              {[
                { icon: Search, label: 'Browse Services', to: '/buyer/browse' },
                { icon: MessageSquare, label: 'Messages', to: '/buyer/messages' },
                { icon: CreditCard, label: 'View Invoices', to: '/buyer/invoices' },
              ].map((a, i) => (
                <Link key={i} to={a.to} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-700 font-medium hover:text-teal-700 hover:bg-teal-50/60 transition-all group">
                  <a.icon size={17} className="text-slate-400 group-hover:text-teal-500" /> {a.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="img-card h-40">
            <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80" alt="Lab" loading="lazy" />
            <div className="img-overlay !p-4">
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1">New Service</p>
              <p className="text-xs text-white font-medium">Flow cytometry multi-parameter panels now available with faster turnaround.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Activity</h3>
            <div className="space-y-3.5">
              {[
                { text: 'Results ready for Protein Purification', time: '1h ago', color: 'bg-emerald-500' },
                { text: 'Protocol approved for Cell Viability', time: '5h ago', color: 'bg-blue-500' },
                { text: 'Invoice INV-1048 received', time: '1d ago', color: 'bg-amber-500' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 mt-1.5 rounded-full ${a.color} flex-shrink-0`} />
                  <div><p className="text-xs text-slate-700 font-medium">{a.text}</p><p className="text-[10px] text-slate-400 font-medium">{a.time}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
