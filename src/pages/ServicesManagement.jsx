import { useState } from 'react';
import { Plus, DollarSign, Clock, Tag, FileText, Beaker } from 'lucide-react';
import { StatusBadge, PageHead, Pagination, FilterBar, Modal, Toast } from '../components/UI';

const allServices = [
  { name:'Enzyme Kinetics Analysis', cat:'Biochemical', price:'$2,800', active:true, requests:12 },
  { name:'Protein Characterization', cat:'Protein Sciences', price:'$3,500', active:true, requests:8 },
  { name:'Cell-Based Assays', cat:'Cell Biology', price:'$3,000', active:true, requests:15 },
  { name:'Bioprocess Optimization', cat:'Bioprocess', price:'$5,000', active:true, requests:6 },
  { name:'Stability Studies', cat:'Biochemical', price:'$4,500', active:false, requests:3 },
  { name:'Flow Cytometry Panel', cat:'Cell Biology', price:'$1,800', active:true, requests:9 },
  { name:'Mass Spectrometry', cat:'Biochemical', price:'$3,100', active:true, requests:11 },
  { name:'Western Blot Analysis', cat:'Protein Sciences', price:'$1,500', active:true, requests:18 },
  { name:'PCR & qPCR Services', cat:'Genomics', price:'$2,200', active:true, requests:22 },
  { name:'HPLC Analysis', cat:'Biochemical', price:'$2,600', active:true, requests:14 },
  { name:'Immunohistochemistry', cat:'Cell Biology', price:'$3,400', active:true, requests:7 },
  { name:'Gene Expression Profiling', cat:'Genomics', price:'$5,400', active:true, requests:10 },
  { name:'Binding Assay Suite', cat:'Biochemical', price:'$3,300', active:true, requests:13 },
  { name:'Protein Purification', cat:'Protein Sciences', price:'$3,900', active:true, requests:16 },
  { name:'Endotoxin Testing', cat:'Compliance', price:'$1,500', active:true, requests:25 },
  { name:'Dissolution Studies', cat:'Compliance', price:'$3,600', active:false, requests:4 },
  { name:'Metabolomics Panel', cat:'Biochemical', price:'$5,700', active:true, requests:5 },
  { name:'Cell Line Development', cat:'Cell Biology', price:'$8,500', active:true, requests:3 },
  { name:'Microbiome Analysis', cat:'Genomics', price:'$4,800', active:true, requests:6 },
  { name:'Toxicology Assessment', cat:'Safety', price:'$8,200', active:true, requests:4 },
];

const catOpts = [...new Set(allServices.map(s => s.cat))].sort();

export default function ServicesManagement() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name:'', cat:'Biochemical', price:'', time:'', desc:'' });

  const setF = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
  const clearF = () => { setFilters({}); setPage(1); };

  const filtered = allServices.filter(s =>
    (!filters.cat || filters.cat === 'All' || s.cat === filters.cat) &&
    (!filters.status || filters.status === 'All' || (filters.status === 'Active' ? s.active : !s.active))
  );
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    setShowAdd(false);
    setToast(`Service "${form.name}" added to your catalog`);
    setForm({ name:'', cat:'Biochemical', price:'', time:'', desc:'' });
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <PageHead title="Services" sub={`${allServices.length} services in your catalog`} />
        <button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm hover:-translate-y-0.5 transition-all"><Plus size={16} /> Add Service</button>
      </div>
      <FilterBar filters={[
        { key:'cat', label:'Category', options: catOpts },
        { key:'status', label:'Status', options:['Active','Inactive'] },
      ]} values={filters} onChange={setF} onClear={clearF} />

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md hidden md:block">
        <table className="w-full">
          <thead><tr className="bg-slate-50 border-b-2 border-slate-200">
            {['Service','Category','Price','Requests','Status','Actions'].map(h => (
              <th key={h} className={`px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{paged.map((s, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-teal-50/30 transition-colors">
              <td className="px-5 py-4 text-sm font-bold text-slate-800">{s.name}</td>
              <td className="px-5 py-4 text-xs text-slate-500 font-medium">{s.cat}</td>
              <td className="px-5 py-4 text-sm font-bold text-slate-900">{s.price}</td>
              <td className="px-5 py-4 text-sm text-slate-600">{s.requests}</td>
              <td className="px-5 py-4"><StatusBadge status={s.active ? 'Active' : 'Inactive'} /></td>
              <td className="px-5 py-4 text-right"><button className="px-3 py-1.5 text-xs font-bold text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 border border-teal-200">Edit</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">{paged.map((s, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 shadow-md">
          <div className="flex items-start justify-between mb-2"><div><p className="text-sm font-bold text-slate-900">{s.name}</p><p className="text-xs text-slate-500 font-medium">{s.cat}</p></div><StatusBadge status={s.active ? 'Active' : 'Inactive'} /></div>
          <div className="flex items-center justify-between mt-2"><span className="text-sm font-bold text-slate-900">{s.price}</span><span className="text-xs text-slate-500 font-medium">{s.requests} requests</span></div>
        </div>
      ))}</div>
      <Pagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />

      {/* Add Service Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} wide>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg"><Beaker size={20} className="text-white" /></div>
            <div><h3 className="text-lg font-extrabold text-slate-900 font-display">Add New Service</h3><p className="text-xs text-slate-500 font-medium">Create a new service offering for your clients</p></div>
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
