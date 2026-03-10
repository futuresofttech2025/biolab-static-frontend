import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, DollarSign, FlaskConical, Database, Microscope, BarChart3, Zap, Globe, ArrowRight, Beaker, Dna, TestTube } from 'lucide-react';
import { Pagination } from '../components/UI';

const cats = ['All','Biochemical','Protein Sciences','Cell Biology','Bioprocess','Genomics','Compliance'];
const icons = [FlaskConical, Database, Microscope, BarChart3, Zap, Globe, Beaker, Dna, TestTube, FlaskConical, Database, Microscope];
const imgs = [
  'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1581093458791-9d42e3c2fd7b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80',
];

const allServices = [
  { name:'Enzyme Kinetics Analysis', cat:'Biochemical', price:'$2,800', time:'3–7 days', rating:4.9, reviews:47 },
  { name:'Protein Characterization', cat:'Protein Sciences', price:'$3,500', time:'5–10 days', rating:4.8, reviews:32 },
  { name:'Cell-Based Assays', cat:'Cell Biology', price:'$3,000', time:'5–10 days', rating:4.9, reviews:56 },
  { name:'Stability Studies', cat:'Biochemical', price:'$4,500', time:'6–12 mo', rating:4.9, reviews:24 },
  { name:'Bioprocess Optimization', cat:'Bioprocess', price:'$5,000', time:'6–12 wk', rating:4.7, reviews:18 },
  { name:'Flow Cytometry Panel', cat:'Cell Biology', price:'$1,800', time:'3–5 days', rating:4.8, reviews:38 },
  { name:'Mass Spectrometry', cat:'Biochemical', price:'$3,100', time:'4–8 days', rating:4.8, reviews:29 },
  { name:'Western Blot Analysis', cat:'Protein Sciences', price:'$1,500', time:'2–4 days', rating:4.7, reviews:64 },
  { name:'PCR & qPCR Services', cat:'Genomics', price:'$2,200', time:'2–5 days', rating:4.9, reviews:78 },
  { name:'HPLC Analysis', cat:'Biochemical', price:'$2,600', time:'3–7 days', rating:4.8, reviews:41 },
  { name:'Immunohistochemistry', cat:'Cell Biology', price:'$3,400', time:'5–8 days', rating:4.6, reviews:22 },
  { name:'Gene Expression Profiling', cat:'Genomics', price:'$5,400', time:'7–14 days', rating:4.9, reviews:19 },
  { name:'Binding Assay Suite', cat:'Biochemical', price:'$3,300', time:'5–10 days', rating:4.7, reviews:27 },
  { name:'Protein Purification', cat:'Protein Sciences', price:'$3,900', time:'5–10 days', rating:4.8, reviews:35 },
  { name:'Endotoxin Testing', cat:'Compliance', price:'$1,500', time:'1–3 days', rating:4.9, reviews:88 },
  { name:'Dissolution Studies', cat:'Compliance', price:'$3,600', time:'3–6 wk', rating:4.7, reviews:15 },
  { name:'Metabolomics Panel', cat:'Biochemical', price:'$5,700', time:'7–14 days', rating:4.8, reviews:12 },
  { name:'Cell Line Development', cat:'Cell Biology', price:'$8,500', time:'8–16 wk', rating:4.9, reviews:9 },
  { name:'Microbiome Analysis', cat:'Genomics', price:'$4,800', time:'7–14 days', rating:4.6, reviews:16 },
  { name:'Toxicology Assessment', cat:'Compliance', price:'$8,200', time:'4–8 wk', rating:4.8, reviews:11 },
  { name:'Drug Metabolism Panel', cat:'Biochemical', price:'$6,800', time:'5–10 days', rating:4.7, reviews:14 },
  { name:'Antibody Development', cat:'Protein Sciences', price:'$12,000', time:'12–20 wk', rating:4.9, reviews:8 },
  { name:'Bioavailability Study', cat:'Compliance', price:'$11,500', time:'8–16 wk', rating:4.8, reviews:6 },
  { name:'CHO Cell Optimization', cat:'Bioprocess', price:'$7,200', time:'6–12 wk', rating:4.7, reviews:10 },
];

export default function BrowseServices() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = allServices.filter(s =>
    (filter === 'All' || s.cat === filter) &&
    (!q || s.name.toLowerCase().includes(q.toLowerCase()))
  );
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div className="dash-banner mb-5">
        <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80" alt="Lab" />
        <div className="dash-banner-overlay" />
        <div className="dash-banner-content">
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 mb-3" />
          <h1 className="text-xl sm:text-3xl font-extrabold text-white font-display tracking-tight">Browse Services</h1>
          <p className="text-sm text-slate-300 font-medium mt-1 max-w-md">Find the right lab service for your research project</p>
          <div className="relative w-full sm:w-80 mt-4">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Search services..." className="w-full pl-10 pr-4 py-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl text-sm text-white placeholder:text-white/50 font-medium focus:outline-none focus:ring-2 focus:ring-white/30" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {cats.map(c => (
          <button key={c} onClick={() => { setFilter(c); setPage(1); }} className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            filter === c ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300'
          }`}>{c}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paged.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-md hover:shadow-lg transition-all group">
            <div className="h-36 overflow-hidden">
              <img src={imgs[i % imgs.length]} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">{s.cat}</span>
                <div className="flex items-center gap-1 text-xs"><Star size={13} className="text-amber-400 fill-amber-400" /><span className="font-bold text-slate-800">{s.rating}</span><span className="text-slate-400">({s.reviews})</span></div>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-3">{s.name}</h3>
              <div className="flex items-center gap-4 text-xs mb-4">
                <span className="flex items-center gap-1 text-slate-500 font-semibold"><Clock size={13} /> {s.time}</span>
                <span className="flex items-center gap-1 font-bold text-slate-900"><DollarSign size={13} /> {s.price}</span>
              </div>
              <Link to="/buyer/workspace/1" className="block w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-center text-xs font-bold rounded-lg shadow-sm shadow-teal-200/40 hover:shadow-md transition-all opacity-0 group-hover:opacity-100">
                Request Service <ArrowRight size={13} className="inline ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-md"><p className="text-slate-400 font-medium">No services match your search</p></div>}
      <Pagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />
    </div>
  );
}
