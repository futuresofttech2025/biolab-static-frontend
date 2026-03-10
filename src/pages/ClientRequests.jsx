import { useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { StatusBadge, PageHead, ConfirmModal, UploadModal, Toast, Pagination, FilterBar } from '../components/UI';

const colors = ['from-teal-400 to-emerald-500','from-blue-400 to-indigo-500','from-purple-400 to-violet-500','from-amber-400 to-orange-500','from-rose-400 to-pink-500','from-cyan-400 to-sky-500'];
const clientNames = ['NovaBio Therapeutics','MediSync Pharma','BioVista Research','Vertex Bio','OmniCell Research','Elara Therapeutics','Nexus Pharma','TerraCell Bio','Atlas Research','BrightPath Pharma','CureLogic','InnoGene Biotech','ZenithCell Inc.','CoreGen Labs','PharmaCorp Inc.'];
const serviceNames = ['Antibody Development — PD-L3','Stability Study — New Formulation','Flow Cytometry Panel','Mass Spectrometry — Proteomics','Gene Expression Profiling','Drug Metabolism — Phase I','Binding Assay — Receptor X','Bioprocess Optimization — CHO','Protein Purification — mAb-12','Cell Viability — Acute Tox','Enzyme Kinetics — Batch C','PCR Amplification — 16S rRNA','HPLC Method Development','Western Blot — Phospho Panel','Dissolution Testing — Extended'];
const priorities = ['High','Medium','Low','High','Medium','Low','High','Medium','Medium','Low','High','Low','Medium','High','Low'];
const serviceCats = ['Protein Sciences','Compliance','Cell Biology','Biochemical','Genomics','Pharmacology','Biochemical','Bioprocess','Protein Sciences','Cell Biology','Biochemical','Genomics','Biochemical','Protein Sciences','Compliance'];
const descs = [
  'Custom monoclonal antibody development for novel target. Requires high-throughput screening and characterization.',
  'ICH Q1A accelerated stability study for reformulated compound. 6-month timeline with interim analysis.',
  'Multi-parameter flow cytometry analysis for 4 cell lines. Standard turnaround with full panel reporting.',
  'High-resolution mass spectrometry for peptide mapping and post-translational modification analysis.',
  'Comprehensive gene expression profiling using RNA-seq. Requires differential expression analysis.',
  'In vitro CYP450 metabolism studies for lead compound. Includes metabolite identification.',
  'Radioligand binding assay for novel GPCR target. Competition and saturation studies required.',
  'CHO cell bioprocess optimization for improved titer. DoE-based approach with analytics.',
  'Protein A affinity purification followed by SEC polishing. Purity >95% required.',
  'MTT and LDH cytotoxicity assessment across 8 cell lines. IC50 determination needed.',
  'Michaelis-Menten kinetics profiling for enzyme panel. Includes inhibition studies.',
  'Metagenomic 16S rRNA sequencing for microbiome composition analysis.',
  'HPLC method development and validation for new API. ICH Q2 compliance required.',
  'Multi-target western blot panel for phospho-signaling cascade analysis.',
  'USP dissolution testing with extended release profile. 12-hour sampling required.',
];
const times = ['2 hours ago','1 day ago','3 days ago','4 hours ago','6 hours ago','2 days ago','5 hours ago','1 week ago','12 hours ago','3 hours ago','2 days ago','4 days ago','8 hours ago','1 day ago','5 days ago'];

const allRequests = Array.from({ length: 22 }, (_, i) => ({
  client: clientNames[i % clientNames.length],
  avatar: clientNames[i % clientNames.length].split(' ').map(w => w[0]).join('').slice(0, 2),
  color: colors[i % colors.length],
  service: serviceNames[i % serviceNames.length],
  serviceCat: serviceCats[i % serviceCats.length],
  priority: priorities[i % priorities.length],
  desc: descs[i % descs.length],
  date: times[i % times.length],
}));

export default function ClientRequests() {
  const [requests, setRequests] = useState(allRequests);
  const [confirm, setConfirm] = useState(null);
  const [upload, setUpload] = useState(false);
  const [toast, setToast] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({});

  const setF = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
  const clearF = () => { setFilters({}); setPage(1); };

  const filtered = requests.filter(r =>
    (!filters.priority || filters.priority === 'All' || r.priority === filters.priority) &&
    (!filters.category || filters.category === 'All' || r.serviceCat === filters.category)
  );
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleConfirm = () => {
    if (!confirm) return;
    const globalIdx = confirm.globalIdx;
    const r = filtered[globalIdx];
    if (confirm.action === 'accept') {
      setToast(`Accepted: ${r.service}`);
    } else {
      setRequests(prev => prev.filter(x => x !== r));
      setToast(`Declined: ${r.service}`);
    }
    setConfirm(null);
    setTimeout(() => setToast(''), 2500);
  };

  const catOpts = [...new Set(requests.map(r => r.serviceCat))].sort();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <PageHead title="Client Requests" sub={`${requests.length} incoming project requests`} />
        <button onClick={() => setUpload(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload Protocol
        </button>
      </div>
      <FilterBar filters={[
        { key:'priority', label:'Priority', options:['High','Medium','Low'] },
        { key:'category', label:'Category', options: catOpts },
      ]} values={filters} onChange={setF} onClear={clearF} />

      <div className="space-y-4">
        {paged.map((r, localIdx) => {
          const globalIdx = (page - 1) * perPage + localIdx;
          return (
            <div key={globalIdx} className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-100 hover:shadow-lg transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md`}>{r.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1"><h3 className="text-base font-bold text-slate-900 font-display">{r.client}</h3><StatusBadge status={r.priority} /></div>
                  <p className="text-sm font-semibold text-teal-600 mb-1">{r.service}</p>
                  <p className="text-[11px] text-slate-400 font-semibold mb-2">{r.serviceCat}</p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium mb-2">{r.desc}</p>
                  <p className="text-xs text-slate-400 font-medium flex items-center gap-1"><Clock size={12} /> {r.date}</p>
                </div>
                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <button onClick={() => setConfirm({ globalIdx, action:'accept' })} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl text-xs shadow-md hover:-translate-y-0.5 transition-all">Accept <ArrowRight size={12} /></button>
                  <button onClick={() => setConfirm({ globalIdx, action:'decline' })} className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 hover:border-rose-200 hover:text-rose-600 transition-all">Decline</button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-md"><p className="text-slate-400 font-medium">No requests match your filters</p></div>}
      </div>

      <Pagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />

      <ConfirmModal open={confirm?.action === 'accept'} onClose={() => setConfirm(null)} onConfirm={handleConfirm}
        title="Accept Request?" message={`Are you sure you want to accept "${filtered[confirm?.globalIdx]?.service}"? This will create a new project and notify the client.`} confirmLabel="Accept Request" />
      <ConfirmModal open={confirm?.action === 'decline'} onClose={() => setConfirm(null)} onConfirm={handleConfirm}
        title="Decline Request?" message={`Are you sure you want to decline "${filtered[confirm?.globalIdx]?.service}"? The client will be notified.`} confirmLabel="Decline" danger />
      <UploadModal open={upload} onClose={() => setUpload(false)} />
      <Toast show={!!toast} message={toast} onClose={() => setToast('')} />
    </div>
  );
}
