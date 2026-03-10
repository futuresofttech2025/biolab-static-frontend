import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import { StatusBadge, PageHead, Pagination, FilterBar } from '../components/UI';

const clientsList = ['PharmaCorp Inc.','GeneTech Labs','BioVista Research','MediSync Pharma','CureLogic Bio','NovaBio Therapeutics','Vertex Bio','OmniCell Research','Elara Therapeutics','Nexus Pharma','TerraCell Bio','Atlas Research','BrightPath Pharma'];
const titlesList = ['Enzyme Kinetics — Batch','Protein Characterization — mAb','Cell Viability Assay Panel','Stability Study — ICH Q1A','Bioprocess Optimization — CHO','Antibody Development — PD-L3','Flow Cytometry — Immune Panel','Mass Spec Analysis','Gene Expression Study','Drug Metabolism — Phase I','Binding Assay — Receptor','Toxicology Panel — Acute','Formulation Testing — Oral'];
const statusList = ['In Progress','Awaiting Review','In Progress','Completed','Overdue','In Progress','In Progress','Awaiting Review','Completed','In Progress','In Progress','Completed','Overdue'];

const allProjects = Array.from({ length: 26 }, (_, i) => ({
  title: `${titlesList[i % titlesList.length]}${i > 12 ? ` ${String.fromCharCode(65 + (i % 6))}` : ''}`,
  client: clientsList[i % clientsList.length],
  status: statusList[i % statusList.length],
  progress: statusList[i % statusList.length] === 'Completed' ? 100 : statusList[i % statusList.length] === 'Overdue' ? 30 + (i * 7) % 30 : 20 + (i * 13) % 70,
  deadline: `${['Jan','Feb','Mar','Apr','May','Jun'][(i + 1) % 6]} ${(i % 28) + 1}, 2026`,
  docs: 3 + (i * 3) % 20,
  msgs: 2 + (i * 5) % 40,
}));

const statusOpts = [...new Set(allProjects.map(p => p.status))];
const clientOpts = [...new Set(allProjects.map(p => p.client))].sort();

export default function ActiveProjects() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const setF = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
  const clearF = () => { setFilters({}); setPage(1); };

  const filtered = allProjects.filter(p =>
    (!filters.status || filters.status === 'All' || p.status === filters.status) &&
    (!filters.client || filters.client === 'All' || p.client === filters.client)
  );
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <PageHead title="Active Projects" sub={`${allProjects.length} ongoing lab projects`} />
      <FilterBar filters={[
        { key:'status', label:'Status', options: statusOpts },
        { key:'client', label:'Client', options: clientOpts },
      ]} values={filters} onChange={setF} onClear={clearF} />
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md">
        <div className="divide-y divide-slate-100">
          {paged.map((p, i) => (
            <Link key={i} to="/supplier/workspace/1" className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-5 sm:px-6 py-5 hover:bg-teal-50/30 transition-colors group">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1"><h3 className="text-sm font-bold text-slate-900">{p.title}</h3><StatusBadge status={p.status} /></div>
                <p className="text-xs text-slate-500 font-medium mb-2">{p.client}</p>
                <div className="max-w-xs h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.status === 'Overdue' ? 'bg-rose-500' : p.progress === 100 ? 'bg-emerald-500' : 'bg-teal-500'}`} style={{ width:`${p.progress}%` }} />
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
