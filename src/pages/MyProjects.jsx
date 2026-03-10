import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import { StatusBadge, PageHead, Pagination, FilterBar } from '../components/UI';

const suppliers = ['FrontierBioLabs Alpha','FrontierBioLabs Beta','FrontierBioLabs Gamma','CoreGen Labs','SynBio Solutions','Pacific FrontierBioLabs','Helix Dynamics','MolecuLab'];
const titles = ['Enzyme Kinetics — Batch','Protein Purification — mAb','Cell Viability Panel','Stability Study — Compound','Antibody Dev — Target','Flow Cytometry — Panel','Mass Spec — Peptide','Gene Expression — RNA','Drug Metabolism — CYP','Binding Assay — GPCR','Toxicology — Acute','Formulation — Oral','Bioprocess — CHO','Dissolution — Extended'];
const statuses = ['Experiment Running','Results Ready','Protocol Review','In Progress','In Progress','Results Ready','Experiment Running','In Progress','Protocol Review','In Progress','Results Ready','In Progress','Experiment Running','In Progress'];

const allProjects = Array.from({ length: 22 }, (_, i) => ({
  title: `${titles[i % titles.length]} ${String.fromCharCode(65 + (i % 8))}`,
  supplier: suppliers[i % suppliers.length],
  status: statuses[i % statuses.length],
  progress: statuses[i % statuses.length] === 'Results Ready' ? 95 : statuses[i % statuses.length] === 'Protocol Review' ? 15 : 25 + (i * 11) % 60,
  deadline: `${['Jan','Feb','Mar','Apr','May','Jun'][(i + 1) % 6]} ${(i % 28) + 1}, 2026`,
  docs: 2 + (i * 3) % 18,
  msgs: 3 + (i * 4) % 35,
}));

const statusOpts = [...new Set(allProjects.map(p => p.status))];
const supplierOpts = [...new Set(allProjects.map(p => p.supplier))].sort();

export default function MyProjects() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const setF = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
  const clearF = () => { setFilters({}); setPage(1); };

  const filtered = allProjects.filter(p =>
    (!filters.status || filters.status === 'All' || p.status === filters.status) &&
    (!filters.supplier || filters.supplier === 'All' || p.supplier === filters.supplier)
  );
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <PageHead title="My Projects" sub={`${allProjects.length} biotech projects`} />
      <FilterBar filters={[
        { key:'status', label:'Status', options: statusOpts },
        { key:'supplier', label:'Supplier', options: supplierOpts },
      ]} values={filters} onChange={setF} onClear={clearF} />
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md">
        <div className="divide-y divide-slate-100">
          {paged.map((p, i) => (
            <Link key={i} to="/buyer/workspace/1" className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-5 sm:px-6 py-5 hover:bg-teal-50/30 transition-colors group">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1"><h3 className="text-sm font-bold text-slate-900">{p.title}</h3><StatusBadge status={p.status} /></div>
                <p className="text-xs text-slate-500 font-medium mb-2">{p.supplier}</p>
                <div className="max-w-xs h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.progress > 90 ? 'bg-emerald-500' : 'bg-teal-500'}`} style={{ width:`${p.progress}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-5 text-xs text-slate-500 font-semibold flex-shrink-0">
                <span className="flex items-center gap-1"><Calendar size={13} /> {p.deadline}</span>
                <span className="flex items-center gap-1"><FileText size={13} /> {p.docs}</span>
                <span className="flex items-center gap-1"><MessageSquare size={13} /> {p.msgs}</span>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Pagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />
    </div>
  );
}
