import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, FileText, MessageSquare, Upload, Download, Clock, CheckCircle, Send, Paperclip, LayoutDashboard, FolderOpen, Calendar } from 'lucide-react';
import { StatusBadge } from '../components/UI';

const timeline = [
  { date:'Dec 5', title:'Project Created', desc:'Initial request submitted and accepted', done:true },
  { date:'Dec 8', title:'Protocol Approved', desc:'Experiment protocol reviewed and approved by both parties', done:true },
  { date:'Dec 12', title:'Samples Received', desc:'Physical samples received and logged into LIMS', done:true },
  { date:'Dec 15', title:'Experiment Running', desc:'Michaelis-Menten profiling in progress', done:false, active:true },
  { date:'Dec 22', title:'Data Analysis', desc:'Results compilation and statistical analysis', done:false },
  { date:'Jan 5', title:'Final Report', desc:'Comprehensive report with compliance documentation', done:false },
];

const files = [
  { name:'Protocol_v3_Approved.pdf', size:'2.4 MB', date:'Dec 8', type:'PDF' },
  { name:'Sample_Data_Batch_2024A.xlsx', size:'1.8 MB', date:'Dec 12', type:'Excel' },
  { name:'Preliminary_Results.pdf', size:'3.1 MB', date:'Dec 15', type:'PDF' },
  { name:'Raw_Kinetics_Data.csv', size:'890 KB', date:'Dec 15', type:'CSV' },
];

const msgs = [
  { from:'them', text:'Sample data for Batch 2024-A has been uploaded. Please review.', time:'10:15 AM' },
  { from:'me', text:'Got it! Starting kinetics analysis this afternoon.', time:'10:22 AM' },
  { from:'them', text:'Please include Michaelis-Menten profiles in the final report.', time:'10:30 AM' },
];

export default function ProjectWorkspace() {
  const [tab, setTab] = useState('overview');
  const { pathname } = useLocation();
  const base = pathname.startsWith('/admin') ? '/admin' : pathname.startsWith('/buyer') ? '/buyer' : '/supplier';

  return (
    <div className="max-w-[1100px]">
      {/* Header with lab image */}
      <div className="relative rounded-2xl overflow-hidden mb-6 h-36 sm:h-44">
        <img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80" alt="Lab" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-emerald-900/60 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8">
          <Link to={`${base}/projects`} className="inline-flex items-center gap-1.5 text-xs text-teal-300 font-semibold mb-2 hover:text-white transition-colors"><ArrowLeft size={14} /> Back to Projects</Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-lg sm:text-2xl font-extrabold text-white font-display tracking-tight">Enzyme Kinetics — Batch 2024-A</h1>
            <StatusBadge status="In Progress" />
          </div>
          <p className="text-sm text-slate-200 font-medium mt-1">PharmaCorp Inc. · Due Jan 15, 2026</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {[
          { id:'overview', icon:LayoutDashboard, label:'Overview' },
          { id:'files', icon:FolderOpen, label:'Files' },
          { id:'messages', icon:MessageSquare, label:'Messages' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              tab === t.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
            }`}><t.icon size={16} /> {t.label}</button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 glass rounded-2xl p-6 shadow-lg">
            <h2 className="text-base font-bold text-slate-900 font-display mb-5">Project Timeline</h2>
            <div className="space-y-0">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      t.done ? 'bg-emerald-500 shadow-md shadow-emerald-200' : t.active ? 'bg-teal-500 shadow-md shadow-teal-200 animate-pulse' : 'bg-slate-200'
                    }`}>
                      {t.done ? <CheckCircle size={16} className="text-white" /> : <Clock size={14} className={t.active ? 'text-white' : 'text-slate-400'} />}
                    </div>
                    {i < timeline.length - 1 && <div className={`w-px flex-1 min-h-[40px] ${t.done ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2"><p className="text-sm font-bold text-slate-900">{t.title}</p><span className="text-[10px] text-slate-400 font-semibold">{t.date}</span></div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-lg">
              <h3 className="text-sm font-bold text-slate-900 font-display mb-3">Project Details</h3>
              {[
                { label:'Service', val:'Enzyme Kinetics Analysis' },
                { label:'Started', val:'Dec 5, 2025' },
                { label:'Deadline', val:'Jan 15, 2026' },
                { label:'Budget', val:'$8,500' },
                { label:'Progress', val:'65%' },
              ].map((d, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-xs text-slate-500 font-medium">{d.label}</span>
                  <span className="text-sm font-bold text-slate-800">{d.val}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-lg">
              <h3 className="text-sm font-bold text-slate-900 font-display mb-3">Recent Files</h3>
              {files.slice(0,3).map((f, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                  <FileText size={16} className="text-slate-400" />
                  <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-slate-700 truncate">{f.name}</p><p className="text-[10px] text-slate-400">{f.size}</p></div>
                  <button className="p-1.5 text-slate-400 hover:text-teal-600"><Download size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Files */}
      {tab === 'files' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200/50">
            <h2 className="text-base font-bold text-slate-900 font-display">Project Files</h2>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl text-xs shadow-md"><Upload size={14} /> Upload</button>
          </div>
          <div className="divide-y divide-slate-100">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-4 px-5 sm:px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0"><FileText size={18} className="text-slate-500" /></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-bold text-slate-800 truncate">{f.name}</p><p className="text-xs text-slate-400 font-medium">{f.size} · {f.date}</p></div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase">{f.type}</span>
                <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"><Download size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {tab === 'messages' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden" style={{ height:'400px' }}>
          <div className="flex flex-col h-full">
            <div className="px-6 py-3 border-b border-slate-200/50"><h2 className="text-base font-bold text-slate-900 font-display">Messages</h2></div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                    m.from === 'me' ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-br-md shadow-md' : 'bg-slate-100 text-slate-800 rounded-bl-md'
                  }`}>{m.text}<p className={`text-[10px] mt-1 font-semibold ${m.from === 'me' ? 'text-teal-100' : 'text-slate-400'}`}>{m.time}</p></div>
                </div>
              ))}
            </div>
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200/50 flex items-center gap-2 sm:gap-3">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"><Paperclip size={18} /></button>
              <input placeholder="Type your message..." className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
              <button className="p-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl shadow-md"><Send size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
