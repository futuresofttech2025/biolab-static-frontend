import { useState } from 'react';
import { Search, Plus, Mail, MoreVertical, UserPlus } from 'lucide-react';
import { StatusBadge, PageHead, Modal, Toast, Pagination, FilterBar } from '../components/UI';

const allUsers = [
  { name:'PharmaCorp Inc.', email:'admin@pharmacorp.com', role:'Buyer', status:'Active', projects:4, joined:'Nov 2024' },
  { name:'Dr. Sarah Chen', email:'s.chen@frontierbiolabs-alpha.com', role:'Supplier', status:'Active', projects:7, joined:'Sep 2024' },
  { name:'GeneTech Labs', email:'ops@genetech.io', role:'Buyer', status:'Active', projects:3, joined:'Oct 2024' },
  { name:'BioVista Research', email:'info@biovista.com', role:'Buyer', status:'Active', projects:2, joined:'Dec 2024' },
  { name:'Dr. Marcus Taylor', email:'m.taylor@frontierbiolabs-beta.com', role:'Supplier', status:'Active', projects:5, joined:'Aug 2024' },
  { name:'NovaBio Therapeutics', email:'admin@novabio.com', role:'Buyer', status:'Active', projects:1, joined:'Jan 2025' },
  { name:'ClearPath Pharma', email:'ops@clearpath.io', role:'Buyer', status:'Suspended', projects:0, joined:'Dec 2024' },
  { name:'Dr. Anna Park', email:'a.park@frontierbiolabs-gamma.com', role:'Supplier', status:'Active', projects:6, joined:'Jul 2024' },
  { name:'Vertex Bio', email:'contact@vertexbio.com', role:'Buyer', status:'Active', projects:3, joined:'Feb 2025' },
  { name:'OmniCell Research', email:'team@omnicell.io', role:'Buyer', status:'Active', projects:2, joined:'Mar 2025' },
  { name:'SynBio Solutions', email:'hello@synbio.com', role:'Supplier', status:'Active', projects:4, joined:'Jun 2024' },
  { name:'Elara Therapeutics', email:'ops@elara-tx.com', role:'Buyer', status:'Active', projects:1, joined:'Apr 2025' },
  { name:'CoreGen Labs', email:'info@coregenl.com', role:'Supplier', status:'Active', projects:8, joined:'May 2024' },
  { name:'Nexus Pharma', email:'admin@nexuspharma.io', role:'Buyer', status:'Active', projects:5, joined:'Jan 2025' },
  { name:'TerraCell Bio', email:'team@terracell.com', role:'Buyer', status:'Active', projects:2, joined:'Nov 2024' },
  { name:'Helix Dynamics', email:'ops@helixdyn.com', role:'Supplier', status:'Active', projects:3, joined:'Oct 2024' },
  { name:'Dr. James Liu', email:'j.liu@frontierbiolabs-delta.com', role:'Supplier', status:'Active', projects:4, joined:'Aug 2024' },
  { name:'Emily Carter', email:'e.carter@medxcorp.com', role:'Buyer', status:'Active', projects:1, joined:'May 2025' },
  { name:'Alex Kim', email:'a.kim@curelogic.com', role:'Buyer', status:'Active', projects:2, joined:'Jun 2025' },
  { name:'Pacific FrontierBioLabs', email:'contact@pacificbl.com', role:'Supplier', status:'Active', projects:9, joined:'Mar 2024' },
  { name:'DataMed Analytics', email:'ops@datamed.io', role:'Buyer', status:'Suspended', projects:0, joined:'Jul 2025' },
  { name:'ZenithCell Inc.', email:'hello@zenithcell.com', role:'Buyer', status:'Active', projects:3, joined:'Apr 2025' },
  { name:'Dr. Priya Mehta', email:'p.mehta@frontierbiolabs-echo.com', role:'Supplier', status:'Active', projects:5, joined:'Sep 2024' },
  { name:'Atlas Research', email:'team@atlasres.com', role:'Buyer', status:'Active', projects:2, joined:'Feb 2025' },
  { name:'BrightPath Pharma', email:'admin@brightpath.io', role:'Buyer', status:'Active', projects:4, joined:'Jan 2025' },
  { name:'MolecuLab', email:'info@moleculab.com', role:'Supplier', status:'Active', projects:7, joined:'Jun 2024' },
  { name:'ProCell Dynamics', email:'team@procell.io', role:'Buyer', status:'Active', projects:1, joined:'Aug 2025' },
  { name:'InnoGene Biotech', email:'ops@innogene.com', role:'Buyer', status:'Active', projects:3, joined:'Jul 2025' },
];

export default function AdminUsers() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [showInvite, setShowInvite] = useState(false);
  const [toast, setToast] = useState('');
  const [invForm, setInvForm] = useState({ email:'', name:'', role:'buyer', message:'' });

  const setF = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
  const clearF = () => { setFilters({}); setPage(1); };

  const filtered = allUsers.filter(u =>
    (u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())) &&
    (!filters.role || filters.role === 'All' || u.role === filters.role) &&
    (!filters.status || filters.status === 'All' || u.status === filters.status)
  );
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const sendInvite = () => {
    if (!invForm.email || !invForm.name) return;
    setShowInvite(false);
    setToast(`Invitation sent to ${invForm.email}`);
    setInvForm({ email:'', name:'', role:'buyer', message:'' });
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <PageHead title="Users" sub={`${allUsers.length} registered accounts`} />
        <button onClick={() => setShowInvite(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm hover:-translate-y-0.5 transition-all"><Plus size={16} /> Invite User</button>
      </div>
      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Search users..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
      </div>
      <FilterBar filters={[
        { key:'role', label:'Role', options:['Buyer','Supplier'] },
        { key:'status', label:'Status', options:['Active','Suspended'] },
      ]} values={filters} onChange={setF} onClear={clearF} />

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md hidden md:block">
        <table className="w-full">
          <thead><tr className="bg-slate-50 border-b-2 border-slate-200">
            {['User','Role','Status','Projects','Joined','Actions'].map(h => (
              <th key={h} className={`px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{paged.map((u, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-teal-50/30 transition-colors">
              <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">{u.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div><div><p className="text-sm font-bold text-slate-800">{u.name}</p><p className="text-xs text-slate-400">{u.email}</p></div></div></td>
              <td className="px-5 py-4 text-sm text-slate-600 font-medium">{u.role}</td>
              <td className="px-5 py-4"><StatusBadge status={u.status} /></td>
              <td className="px-5 py-4 text-sm text-slate-600">{u.projects}</td>
              <td className="px-5 py-4 text-xs text-slate-400">{u.joined}</td>
              <td className="px-5 py-4 text-right"><div className="flex items-center justify-end gap-1"><button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"><Mail size={15} /></button><button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"><MoreVertical size={15} /></button></div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">{paged.map((u, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 shadow-md">
          <div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">{u.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div><div><p className="text-sm font-bold text-slate-900">{u.name}</p><p className="text-xs text-slate-500">{u.role}</p></div></div><StatusBadge status={u.status} /></div>
        </div>
      ))}</div>
      <Pagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />

      <Modal open={showInvite} onClose={() => setShowInvite(false)} wide>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg"><UserPlus size={20} className="text-white" /></div>
            <div><h3 className="text-lg font-extrabold text-slate-900 font-display">Invite User</h3><p className="text-xs text-slate-500 font-medium">Send an invitation to join FrontierBioLabs</p></div>
          </div>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label><input value={invForm.name} onChange={e => setInvForm(p=>({...p,name:e.target.value}))} placeholder="Dr. Jane Smith" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label><input type="email" value={invForm.email} onChange={e => setInvForm(p=>({...p,email:e.target.value}))} placeholder="jane@company.com" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
            </div>
            <div><label className="block text-sm font-semibold text-slate-700 mb-2">Role</label><div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{[{id:'buyer',label:'Buyer',desc:'Request services'},{id:'supplier',label:'Supplier',desc:'Provide services'},{id:'admin',label:'Admin',desc:'Platform admin'}].map(r=>(
              <button key={r.id} onClick={()=>setInvForm(p=>({...p,role:r.id}))} className={`p-3 rounded-xl border-2 text-left transition-all ${invForm.role===r.id?'border-teal-500 bg-teal-50':'border-slate-200 bg-white hover:border-slate-300'}`}><p className={`text-sm font-bold ${invForm.role===r.id?'text-teal-700':'text-slate-700'}`}>{r.label}</p><p className="text-[10px] text-slate-400 font-medium">{r.desc}</p></button>
            ))}</div></div>
            <div><label className="block text-sm font-semibold text-slate-700 mb-2">Message <span className="text-slate-400 font-normal">(optional)</span></label><textarea value={invForm.message} onChange={e=>setInvForm(p=>({...p,message:e.target.value}))} rows={3} placeholder="Welcome to FrontierBioLabs!" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button onClick={()=>setShowInvite(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
            <button onClick={sendInvite} disabled={!invForm.email||!invForm.name} className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"><Mail size={15} /> Send Invitation</button>
          </div>
        </div>
      </Modal>
      <Toast show={!!toast} message={toast} onClose={()=>setToast('')} />
    </div>
  );
}
