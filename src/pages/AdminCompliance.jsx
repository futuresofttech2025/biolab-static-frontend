import { useState } from 'react';
import { ShieldCheck, FileText, Clock, CheckCircle, Download } from 'lucide-react';
import { StatCard, PageHead, Pagination } from '../components/UI';

const allAudits = [
  { date:'Dec 15, 2025', type:'HIPAA Assessment', result:'Passed', findings:0 },
  { date:'Nov 20, 2025', type:'GDPR Compliance Review', result:'Passed', findings:1 },
  { date:'Oct 10, 2025', type:'SOC 2 Type II Audit', result:'Passed', findings:0 },
  { date:'Sep 1, 2025', type:'FDA 21 CFR Part 11', result:'Passed', findings:2 },
  { date:'Aug 15, 2025', type:'Penetration Testing', result:'Passed', findings:3 },
  { date:'Jul 5, 2025', type:'ISO 27001 Surveillance', result:'Passed', findings:0 },
  { date:'Jun 20, 2025', type:'Data Privacy Impact Assessment', result:'Passed', findings:1 },
  { date:'May 10, 2025', type:'Business Continuity Test', result:'Passed', findings:0 },
  { date:'Apr 1, 2025', type:'Vendor Security Review', result:'Passed', findings:2 },
  { date:'Mar 15, 2025', type:'Internal Vulnerability Scan', result:'Passed', findings:4 },
  { date:'Feb 10, 2025', type:'HIPAA Risk Assessment', result:'Passed', findings:1 },
  { date:'Jan 5, 2025', type:'SOC 2 Type I Readiness', result:'Passed', findings:0 },
  { date:'Dec 1, 2024', type:'GDPR Annual Review', result:'Passed', findings:2 },
  { date:'Nov 15, 2024', type:'Endpoint Security Audit', result:'Passed', findings:1 },
  { date:'Oct 5, 2024', type:'Cloud Infrastructure Review', result:'Passed', findings:3 },
];

const allPolicies = [
  { name:'Data Protection Policy', ver:'v4.2', updated:'Dec 2025', status:'Current' },
  { name:'Incident Response Plan', ver:'v3.1', updated:'Nov 2025', status:'Current' },
  { name:'Access Control Policy', ver:'v5.0', updated:'Oct 2025', status:'Current' },
  { name:'Encryption Standards', ver:'v2.8', updated:'Dec 2025', status:'Current' },
  { name:'Vendor Security Policy', ver:'v1.5', updated:'Sep 2025', status:'Review' },
  { name:'Acceptable Use Policy', ver:'v3.4', updated:'Aug 2025', status:'Current' },
  { name:'Password Management Policy', ver:'v2.1', updated:'Jul 2025', status:'Current' },
  { name:'Data Retention Policy', ver:'v1.9', updated:'Jun 2025', status:'Current' },
  { name:'Change Management Procedure', ver:'v4.0', updated:'May 2025', status:'Current' },
  { name:'Disaster Recovery Plan', ver:'v2.5', updated:'Apr 2025', status:'Review' },
  { name:'Network Security Policy', ver:'v3.7', updated:'Mar 2025', status:'Current' },
  { name:'Physical Security Policy', ver:'v1.3', updated:'Feb 2025', status:'Current' },
  { name:'Third-Party Risk Framework', ver:'v2.0', updated:'Jan 2025', status:'Current' },
  { name:'Data Classification Guide', ver:'v1.6', updated:'Dec 2024', status:'Review' },
];

export default function AdminCompliance() {
  const [aPage, setAPage] = useState(1);
  const [aPerPage, setAPerPage] = useState(10);
  const [pPage, setPPage] = useState(1);
  const [pPerPage, setPPerPage] = useState(10);

  const pagedAudits = allAudits.slice((aPage - 1) * aPerPage, aPage * aPerPage);
  const pagedPolicies = allPolicies.slice((pPage - 1) * pPerPage, pPage * pPerPage);

  return (
    <div>
      <PageHead title="Compliance" sub="Regulatory compliance and audit management" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5 mb-6">
        <StatCard icon={ShieldCheck} label="Compliance Score" value="98.5%" color="teal" />
        <StatCard icon={CheckCircle} label="Audits Passed" value={`${allAudits.length}/${allAudits.length}`} color="blue" />
        <StatCard icon={FileText} label="Policies" value={`${allPolicies.length}`} color="purple" />
        <StatCard icon={Clock} label="Next Audit" value="Jan 15" color="amber" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Audits */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900 font-display">Audit History</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {pagedAudits.map((a, i) => (
                <div key={i} className="px-5 sm:px-6 py-4 flex items-center gap-4">
                  <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800">{a.type}</p>
                    <p className="text-xs text-slate-400 font-medium">{a.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">{a.result}</span>
                    {a.findings > 0 && <p className="text-[10px] text-amber-600 font-semibold mt-1">{a.findings} findings</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination total={allAudits.length} page={aPage} perPage={aPerPage} onPageChange={setAPage} onPerPageChange={setAPerPage} />
        </div>

        {/* Policies */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900 font-display">Policy Documents</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {pagedPolicies.map((p, i) => (
                <div key={i} className="px-5 sm:px-6 py-4 flex items-center gap-4">
                  <FileText size={18} className="text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{p.ver} · Updated {p.updated}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.status === 'Review' && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Review</span>}
                    <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"><Download size={15} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination total={allPolicies.length} page={pPage} perPage={pPerPage} onPageChange={setPPage} onPerPageChange={setPPerPage} />
        </div>
      </div>
    </div>
  );
}
