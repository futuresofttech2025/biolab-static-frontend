export const STATUS = {
  'In Progress':'bg-blue-50 text-blue-800 border-blue-200',
  'Awaiting Review':'bg-amber-50 text-amber-800 border-amber-200',
  'Completed':'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Results Ready':'bg-teal-50 text-teal-800 border-teal-200',
  'Protocol Review':'bg-purple-50 text-purple-800 border-purple-200',
  'Experiment Running':'bg-blue-50 text-blue-800 border-blue-200',
  'Overdue':'bg-rose-50 text-rose-800 border-rose-200',
  'Paid':'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Sent':'bg-blue-50 text-blue-800 border-blue-200',
  'Draft':'bg-slate-100 text-slate-700 border-slate-200',
  'Viewed':'bg-amber-50 text-amber-800 border-amber-200',
  'Active':'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Inactive':'bg-slate-100 text-slate-600 border-slate-200',
  'Suspended':'bg-rose-50 text-rose-600 border-rose-200',
  'High':'bg-rose-50 text-rose-700 border-rose-200',
  'Medium':'bg-amber-50 text-amber-700 border-amber-200',
  'Low':'bg-slate-100 text-slate-600 border-slate-200',
  'Pending':'bg-amber-50 text-amber-700 border-amber-200',
};

const clients = ['PharmaCorp Inc.','GeneTech Labs','BioVista Research','MediSync Pharma','NovaBio Therapeutics','CureLogic','ClearPath Pharma','Vertex Bio','OmniCell Research','SynBio Solutions','Elara Therapeutics','CoreGen Labs','Nexus Pharma','TerraCell Bio','Helix Dynamics'];
const projects = ['Enzyme Kinetics — Batch','Protein Characterization','Cell Viability Panel','Stability Study','Antibody Development','Flow Cytometry Panel','Mass Spectrometry','Bioprocess Optimization','Binding Assay Suite','Inhibition Screening','Gene Expression','Drug Metabolism','Toxicology Panel','Formulation Testing','Dissolution Studies'];
const statuses = ['Paid','Sent','Draft','Viewed','Paid','Sent','Paid','Viewed','Draft','Paid','Sent','Paid'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const SAMPLE_INVOICES = Array.from({ length: 32 }, (_, i) => ({
  id: `INV-${1047 + i}`,
  client: clients[i % clients.length],
  project: `${projects[i % projects.length]}${i > 14 ? ` — Phase ${(i % 3) + 1}` : ''}`,
  items: [
    { desc: projects[i % projects.length], qty: 1, rate: 3000 + (i * 500) % 7000 },
    { desc: 'Analysis & Reporting', qty: 1, rate: 1200 + (i * 300) % 3000 },
    { desc: 'Quality Assurance', qty: 1, rate: 800 + (i * 200) % 2000 },
  ],
  status: statuses[i % statuses.length],
  date: `${months[(i + 9) % 12]} ${(i % 28) + 1}, ${i < 20 ? '2025' : '2026'}`,
  due: `${months[(i + 10) % 12]} ${((i + 15) % 28) + 1}, ${i < 18 ? '2025' : '2026'}`,
  total: 5000 + (i * 1700) % 18000,
  ...(statuses[i % statuses.length] === 'Paid' ? { paidDate: `${months[(i + 10) % 12]} ${(i % 20) + 5}, 2025` } : {}),
}));
