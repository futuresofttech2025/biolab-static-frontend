import { useState } from 'react';
import { Plus, DollarSign, Clock, Tag, FileText, Beaker } from 'lucide-react';
import { StatusBadge, PageHead, Pagination, FilterBar, Modal, Toast } from '../components/UI';

const allServices = [
  { name:'Enzyme Kinetics Profiling', cat:'Biochemical Analysis', status:'Active', supplier:'Dr. Sarah Chen', price:'$4,500', orders:24 },
  { name:'Protein Characterization Suite', cat:'Protein Sciences', status:'Active', supplier:'CoreGen Labs', price:'$6,200', orders:18 },
  { name:'Cell Viability & Proliferation', cat:'Cell Biology', status:'Active', supplier:'Dr. Anna Park', price:'$3,800', orders:31 },
  { name:'ICH Stability Testing', cat:'Compliance', status:'Active', supplier:'Pacific FrontierBioLabs', price:'$9,500', orders:12 },
  { name:'Monoclonal Antibody Dev', cat:'Protein Sciences', status:'Active', supplier:'SynBio Solutions', price:'$12,000', orders:8 },
  { name:'Flow Cytometry Panel', cat:'Cell Biology', status:'Active', supplier:'Dr. James Liu', price:'$2,800', orders:42 },
  { name:'Mass Spectrometry Analysis', cat:'Biochemical Analysis', status:'Active', supplier:'MolecuLab', price:'$3,100', orders:29 },
  { name:'Bioprocess Optimization', cat:'Bioprocess', status:'Active', supplier:'Helix Dynamics', price:'$7,200', orders:15 },
  { name:'Binding Assay Suite', cat:'Biochemical Analysis', status:'Active', supplier:'Dr. Marcus Taylor', price:'$3,300', orders:22 },
  { name:'Gene Expression Profiling', cat:'Genomics', status:'Active', supplier:'Dr. Priya Mehta', price:'$5,400', orders:17 },
  { name:'Drug Metabolism Panel', cat:'Pharmacology', status:'Active', supplier:'CoreGen Labs', price:'$6,800', orders:11 },
  { name:'Toxicology Assessment', cat:'Safety', status:'Active', supplier:'Pacific FrontierBioLabs', price:'$8,200', orders:9 },
  { name:'Formulation Testing', cat:'Bioprocess', status:'Inactive', supplier:'SynBio Solutions', price:'$4,100', orders:6 },
  { name:'Dissolution Studies', cat:'Compliance', status:'Active', supplier:'Dr. Anna Park', price:'$3,600', orders:20 },
  { name:'Western Blot Analysis', cat:'Protein Sciences', status:'Active', supplier:'MolecuLab', price:'$1,800', orders:38 },
  { name:'PCR & qPCR Services', cat:'Genomics', status:'Active', supplier:'Dr. Priya Mehta', price:'$2,200', orders:45 },
  { name:'HPLC Analysis', cat:'Biochemical Analysis', status:'Active', supplier:'Dr. Sarah Chen', price:'$2,600', orders:33 },
  { name:'Immunohistochemistry', cat:'Cell Biology', status:'Active', supplier:'Dr. James Liu', price:'$3,400', orders:14 },
  { name:'Bioavailability Study', cat:'Pharmacology', status:'Inactive', supplier:'Pacific FrontierBioLabs', price:'$11,500', orders:5 },
  { name:'Microbiome Analysis', cat:'Genomics', status:'Active', supplier:'Helix Dynamics', price:'$4,800', orders:10 },
  { name:'Protein Purification', cat:'Protein Sciences', status:'Active', supplier:'CoreGen Labs', price:'$3,900', orders:26 },
  { name:'Cell Line Development', cat:'Cell Biology', status:'Active', supplier:'Dr. Anna Park', price:'$8,500', orders:7 },
  { name:'Metabolomics Panel', cat:'Biochemical Analysis', status:'Active', supplier:'MolecuLab', price:'$5,700', orders:13 },
  { name:'Endotoxin Testing', cat:'Compliance', status:'Active', supplier:'Dr. Marcus Taylor', price:'$1,500', orders:48 },
];

const catOpts = [...new Set(allServices.map(s => s.cat))].sort();
const supplierOpts = [...new Set(allServices.map(s => s.supplier))].sort();

export default function AdminServices() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name:'', cat:'Biochemical Analysis', price:'', time:'', desc:'' });

  const setF = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
  const clearF = () => { setFilters({}); setPage(1); };

  const filtered = allServices.filter(s =>
    (!filters.cat || filters.cat === 'All' || s.cat === filters.cat) &&
    (!filters.status || filters.status === 'All' || s.status === filters.status) &&
    (!filters.supplier || filters.supplier === 'All' || s.supplier === filters.supplier)
  );
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    setShowAdd(false);
    setToast(`Service "${form.name}" added successfully`);
    setForm({ name:'', cat:'Biochemical Analysis', price:'', time:'', desc:'' });
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <PageHead title="Service Catalog" sub={`${allServices.length} services available`} />
        <button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm hover:-translate-y-0.5 transition-all"><Plus size={16} /> Add Service</button>
      </div>
      <FilterBar filters={[
        { key:'cat', label:'Category', options: catOpts },
        { key:'status', label:'Status', options:['Active','Inactive'] },
        { key:'supplier', label:'Supplier', options: supplierOpts },
      ]} values={filters} onChange={setF} onClear={clearF} />

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md hidden md:block">
        <table className="w-full">
          <thead><tr className="bg-slate-50 border-b-2 border-slate-200">
            {['Service','Category','Supplier','Price','Orders','Status'].map(h => (
              <th key={h} className="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>
            ))}
          </tr></thead>
          <tbody>{paged.map((s, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-teal-50/30 transition-colors">
              <td className="px-5 py-4 text-sm font-bold text-slate-800">{s.name}</td>
              <td className="px-5 py-4 text-xs text-slate-500 font-medium">{s.cat}</td>
              <td className="px-5 py-4 text-sm text-slate-600 font-medium">{s.supplier}</td>
              <td className="px-5 py-4 text-sm font-bold text-slate-900">{s.price}</td>
              <td className="px-5 py-4 text-sm text-slate-600">{s.orders}</td>
              <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">{paged.map((s, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 shadow-md">
          <div className="flex items-start justify-between mb-1"><p className="text-sm font-bold text-slate-900">{s.name}</p><StatusBadge status={s.status} /></div>
          <p className="text-xs text-slate-500">{s.cat} · {s.supplier} · {s.price}</p>
        </div>
      ))}</div>
      <Pagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />

      {/* Add Service Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} wide>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg"><Beaker size={20} className="text-white" /></div>
            <div><h3 className="text-lg font-extrabold text-slate-900 font-display">Add New Service</h3><p className="text-xs text-slate-500 font-medium">Add a service to the platform catalog</p></div>
          </div>
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold text-slate-700 mb-2"><FileText size={14} className="inline mr-1.5 text-slate-400" />Service Name *</label>
              <input value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Enzyme Kinetics Analysis" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold text-slate-700 mb-2"><Tag size={14} className="inline mr-1.5 text-slate-400" />Category</label>
                <select value={form.cat} onChange={e => setForm(p=>({...p,cat:e.target.value}))} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm">
                  {catOpts.map(c => <option key={c} value={c}>{c}</option>)}
                </select></div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-2"><DollarSign size={14} className="inline mr-1.5 text-slate-400" />Base Price *</label>
                <input value={form.price} onChange={e => setForm(p=>({...p,price:e.target.value}))} placeholder="$3,500" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
            </div>
            <div><label className="block text-sm font-semibold text-slate-700 mb-2"><Clock size={14} className="inline mr-1.5 text-slate-400" />Estimated Turnaround</label>
              <input value={form.time} onChange={e => setForm(p=>({...p,time:e.target.value}))} placeholder="e.g. 5–10 days" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
            <div><label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea value={form.desc} onChange={e => setForm(p=>({...p,desc:e.target.value}))} rows={3} placeholder="Describe the service, methodology, and deliverables..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button onClick={() => setShowAdd(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
            <button onClick={handleAdd} disabled={!form.name || !form.price} className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all"><Plus size={15} /> Add Service</button>
          </div>
        </div>
      </Modal>
      <Toast show={!!toast} message={toast} onClose={() => setToast('')} />
    </div>
  );
}
