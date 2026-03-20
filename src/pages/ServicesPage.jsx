import { FlaskConical, Database, Microscope, BarChart3, Zap, Globe, ArrowRight, Atom, Dna, Beaker, Activity, ScanLine, FileCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader, Particles } from '../components/UI';

const categories = [
  {
    icon: Atom,
    title: 'Small Molecules',
    color: 'bg-blue-50 text-blue-600',
    items: ['Discovery & Lead Optimization','In Vitro Biology & DMPK','In Vivo Pharmacology','Toxicology & Safety','CMC & Early Development','Regulatory & Quality'],
  },
  {
    icon: Dna,
    title: 'Antibody & Protein Therapeutics',
    color: 'bg-teal-50 text-teal-600',
    items: ['Discovery & Engineering','In Vitro Biology & Bioanalytics','In Vivo Pharmacology','Toxicology','Biologics CMC','Regulatory & Quality'],
  },
  {
    icon: Zap,
    title: 'Cell & Gene Therapy',
    color: 'bg-purple-50 text-purple-600',
    items: ['Discovery & Vector Design','In Vitro & Translational Platforms','In Vivo Pharmacology & Safety','CGT CMC & Analytics','CGT Regulatory & Quality'],
  },
  {
    icon: Activity,
    title: 'Bioanalytical & Biomarkers',
    color: 'bg-emerald-50 text-emerald-600',
    items: ['Bioanalysis (LC–MS, LBA)','Immunogenicity & ADA','Flow Cytometry & Cell Analysis','Translational Biomarkers'],
  },
  {
    icon: BarChart3,
    title: 'Omics & Bioinformatics',
    color: 'bg-orange-50 text-orange-600',
    items: ['Genomics & Transcriptomics','Proteomics & Metabolomics','Multi-Omics Integration','Custom Bioinformatics & Biostatistics'],
  },
  {
    icon: ScanLine,
    title: 'Imaging & Histology',
    color: 'bg-pink-50 text-pink-600',
    items: ['Imaging & Microscopy','Histology & Digital Pathology','Image & Spatial Analysis'],
  },
  {
    icon: FileCheck,
    title: 'Regulatory, Quality & Compliance',
    color: 'bg-slate-100 text-slate-600',
    items: ['Regulatory Strategy & Writing','GLP/GMP Consulting & Audits','Biosafety & Viral Safety','Cell Bank & Release Testing'],
  },
  {
    icon: FlaskConical,
    title: 'Enzyme Kinetics',
    color: 'bg-teal-50 text-teal-600',
    items: ['Michaelis-Menten Profiling','Inhibition Studies','Thermal Stability Assessment','Enzyme Activity Quantification'],
  },
  {
    icon: Database,
    title: 'Protein Sciences',
    color: 'bg-blue-50 text-blue-600',
    items: ['Characterization & Purification','Mass Spectrometry','Antibody Development','Structural Analysis'],
  },
  {
    icon: Microscope,
    title: 'Cell Biology',
    color: 'bg-emerald-50 text-emerald-600',
    items: ['Viability Assays','Flow Cytometry','Immunohistochemistry','Cell Line Development'],
  },
  {
    icon: BarChart3,
    title: 'Stability Studies',
    color: 'bg-indigo-50 text-indigo-600',
    items: ['ICH Q1A/Q1B Accelerated Testing','Long-Term Stability Testing','Full Regulatory Reporting','Photostability Studies'],
  },
  {
    icon: Zap,
    title: 'Bioprocess',
    color: 'bg-amber-50 text-amber-600',
    items: ['CHO Cell Optimization','Fermentation Development','Downstream Processing','Scale-Up & Tech Transfer'],
  },
  {
    icon: Globe,
    title: 'Genomics',
    color: 'bg-cyan-50 text-cyan-600',
    items: ['PCR & qPCR','RNA-Seq','Gene Expression Profiling','Microbiome Analysis'],
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-lab-tubes relative flex items-center min-h-[50vh]">
        <Particles n={5}/>
        <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-teal-300 text-xs font-bold tracking-[.15em] uppercase mb-2">Our Services</p>
          <h1 className="text-white font-black font-display text-3xl sm:text-4xl mb-3">Comprehensive Biotech Solutions</h1>
          <p className="text-slate-300 text-base">Access certified laboratories and expert scientists for every stage of your research.</p>
        </div>
      </section>

      {/* All Service Cards */}
      <section className="bg-lab-dna py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
                <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                  <cat.icon size={20}/>
                </div>
                <h3 className="font-extrabold font-display text-slate-900 text-base mb-3">{cat.title}</h3>
                <ul className="flex-1 space-y-1.5 mb-4">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-500">
                      <ChevronRight size={14} className="text-teal-500 mt-0.5 shrink-0"/>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="mt-auto inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold rounded-lg self-start">
                  Request <ArrowRight size={12}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
