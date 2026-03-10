import { useState } from 'react';
import { StatusBadge, PageHead, Pagination, FilterBar } from '../components/UI';

const suppliers = ['Dr. Sarah Chen','Dr. Marcus Taylor','Dr. Anna Park','CoreGen Labs','SynBio Solutions','Helix Dynamics','Dr. James Liu','Pacific FrontierBioLabs','Dr. Priya Mehta','MolecuLab'];
const clients = ['PharmaCorp Inc.','GeneTech Labs','BioVista Research','MediSync Pharma','NovaBio Therapeutics','CureLogic','Vertex Bio','OmniCell Research','Elara Therapeutics','Nexus Pharma','TerraCell Bio','Atlas Research','BrightPath Pharma','InnoGene Biotech','ZenithCell Inc.'];
const titles = ['Enzyme Kinetics','Protein Characterization','Cell Viability Panel','Stability Study','Antibody Development','Flow Cytometry','Mass Spectrometry Analysis','Bioprocess Optimization','Binding Assay Suite','Inhibition Screening','Gene Expression Profiling','Drug Metabolism Panel','Toxicology Assessment','Formulation Testing','Dissolution Studies'];
const statuses = ['In Progress','Awaiting Review','Completed','In Progress','In Progress','Completed','Awaiting Review','In Progress','Completed','In Progress','In Progress','Completed'];
const values = ['$8,500','$12,300','$6,750','$15,200','$9,800','$4,500','$18,600','$7,200','$11,400','$5,900','$14,100','$8,800','$16,500','$6,200','$10,300'];

const allProjects = Array.from({ length: 30 }, (_, i) => ({
  title: `${titles[i % titles.length]} — ${clients[i % clients.length]}`,
  supplier: suppliers[i % suppliers.length],
  status: statuses[i % statuses.length],
  value: values[i % values.length],
}));

const statusOpts = [...new Set(allProjects.map(p => p.status))];
const supplierOpts = [...new Set(allProjects.map(p => p.supplier))].sort();

export default function AdminProjects() {
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
      <PageHead title="All Projects" sub={`${allProjects.length} projects across the platform`} />
      <FilterBar filters={[
        { key:'status', label:'Status', options: statusOpts },
        { key:'supplier', label:'Supplier', options: supplierOpts },
      ]} values={filters} onChange={setF} onClear={clearF} />
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md hidden md:block">
        <table className="w-full">
          <thead><tr className="bg-slate-50 border-b-2 border-slate-200">
            {['Project','Supplier','Status','Value'].map(h => (
              <th key={h} className="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>
            ))}
          </tr></thead>
          <tbody>{paged.map((p, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-teal-50/30 transition-colors">
              <td className="px-5 py-4 text-sm font-bold text-slate-800 max-w-[280px] truncate">{p.title}</td>
              <td className="px-5 py-4 text-sm text-slate-600 font-medium">{p.supplier}</td>
              <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
              <td className="px-5 py-4 text-sm font-bold text-slate-900">{p.value}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">{paged.map((p, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 shadow-md">
          <div className="flex items-start justify-between mb-1"><p className="text-sm font-bold text-slate-900 flex-1 mr-2">{p.title}</p><StatusBadge status={p.status} /></div>
          <p className="text-xs text-slate-500">{p.supplier} · {p.value}</p>
        </div>
      ))}</div>
      <Pagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />
    </div>
  );
}
