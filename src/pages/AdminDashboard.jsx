import { Link } from 'react-router-dom';
import { Users, Layers, CreditCard, DollarSign, BarChart3, TrendingUp, AlertTriangle, CheckCircle, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { StatCard, StatusBadge } from '../components/UI';

const recentProjects = [
  { title: 'Enzyme Kinetics — PharmaCorp', supplier: 'Dr. Sarah Chen', status: 'In Progress', value: '$8,500' },
  { title: 'Protein Characterization — GeneTech', supplier: 'Dr. Mike Rivera', status: 'Awaiting Review', value: '$12,300' },
  { title: 'Cell Viability — BioVista', supplier: 'Dr. Sarah Chen', status: 'In Progress', value: '$6,750' },
  { title: 'Stability Study — MediSync', supplier: 'Dr. Anna Park', status: 'Completed', value: '$15,200' },
];

const alerts = [
  { text: 'Invoice INV-1050 overdue by 3 days', type: 'warning' },
  { text: 'New supplier registration pending review', type: 'info' },
  { text: 'HIPAA compliance audit due in 14 days', type: 'warning' },
];

const newUsers = [
  { name: 'Dr. James Liu', role: 'Supplier', org: 'NovaBio', date: '2 hours ago' },
  { name: 'Emily Carter', role: 'Buyer', org: 'MedX Corp', date: '5 hours ago' },
  { name: 'Alex Kim', role: 'Buyer', org: 'CureLogic', date: '1 day ago' },
];

export default function AdminDashboard() {
  return (
    <div>
      {/* Banner */}
      <div className="dash-banner mb-5">
        <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80" alt="Lab" />
        <div className="dash-banner-overlay" />
        <div className="dash-banner-content">
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 mb-3" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-slate-300 font-medium mt-1">Platform overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard icon={Users} label="Total Users" value="156" color="teal" trend={15} />
        <StatCard icon={Layers} label="Active Projects" value="34" color="blue" trend={8} />
        <StatCard icon={DollarSign} label="Revenue (Month)" value="$124k" color="amber" trend={22} />
        <StatCard icon={ShieldCheck} label="Compliance" value="100%" color="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200/60">
            <h2 className="text-base font-bold text-slate-900 font-display">Recent Projects</h2>
            <Link to="/admin/projects" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">View all <ArrowRight size={12} /></Link>
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50/80">
                {['Project', 'Supplier', 'Status', 'Value'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {recentProjects.map((p, i) => (
                  <tr key={i} className="border-t border-slate-100 hover:bg-teal-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{p.title}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{p.supplier}</td>
                    <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                    <td className="px-6 py-4 font-bold text-slate-900">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y divide-slate-100">
            {recentProjects.map((p, i) => (
              <div key={i} className="px-4 py-4">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-bold text-slate-900">{p.title}</p>
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{p.supplier} · {p.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle size={16} className="text-amber-500" /> System Alerts</h3>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className={`p-3 rounded-xl text-xs font-medium ${a.type === 'warning' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-blue-50 text-blue-800 border border-blue-200'}`}>
                  {a.text}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900 mb-4">New Users</h3>
            <div className="space-y-3">
              {newUsers.map((u, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
                    {u.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{u.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{u.role} · {u.org} · {u.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
