import { useState } from 'react';
import { Send, Paperclip, Search, ArrowLeft } from 'lucide-react';

const convos = [
  { name:'PharmaCorp Inc.', avatar:'PC', color:'from-teal-400 to-emerald-500', project:'Enzyme Kinetics', last:'Sample results uploaded', time:'10m', unread:2 },
  { name:'GeneTech Labs', avatar:'GL', color:'from-blue-400 to-indigo-500', project:'Protein Char.', last:'Protocol v3 approved', time:'2h', unread:0 },
  { name:'BioVista Research', avatar:'BR', color:'from-purple-400 to-violet-500', project:'Cell Viability', last:'When can we expect results?', time:'1d', unread:1 },
  { name:'MediSync Pharma', avatar:'MS', color:'from-amber-400 to-orange-500', project:'Stability Study', last:'Final report attached', time:'3d', unread:0 },
];
const messages = [
  { from:'them', text:'Hi, we uploaded the new sample data for Batch 2024-A. Please review at your earliest convenience.', time:'10:15 AM' },
  { from:'me', text:'Thank you! I see the files. I will begin kinetics analysis this afternoon and update you on progress.', time:'10:22 AM' },
  { from:'them', text:'Please include the Michaelis-Menten profiles in the final report.', time:'10:30 AM' },
  { from:'me', text:'Absolutely, that is standard in our analysis package. Expected turnaround is 3–5 business days.', time:'10:45 AM' },
  { from:'them', text:'Perfect. Looking forward to the results.', time:'11:02 AM' },
];

export default function Messages() {
  const [sel, setSel] = useState(0);
  const [showChat, setShowChat] = useState(false);

  const selectConvo = (i) => { setSel(i); setShowChat(true); };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-lg" style={{ height:'calc(100vh - 130px)', minHeight:'480px' }}>
      <div className="flex h-full">
        {/* Conversation list — shown on mobile when chat is not active */}
        <div className={`w-full sm:w-72 border-r border-slate-200/50 flex flex-col ${showChat ? 'hidden sm:flex' : 'flex'}`}>
          <div className="px-4 py-3 border-b border-slate-200/50">
            <div className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="Search..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20" /></div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {convos.map((c, i) => (
              <button key={i} onClick={() => selectConvo(i)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-slate-100 transition-colors ${sel === i ? 'bg-teal-50/50' : 'hover:bg-slate-50'}`}>
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 shadow-sm`}>{c.avatar}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-slate-800 truncate">{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium ml-2">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-teal-600 font-semibold truncate">{c.project}</p>
                  <p className="text-xs text-slate-400 truncate font-medium">{c.last}</p>
                </div>
                {c.unread > 0 && <span className="w-5 h-5 bg-teal-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>
        {/* Chat panel — on mobile: full screen when active */}
        <div className={`flex-col flex-1 ${showChat ? 'flex' : 'hidden sm:flex'}`}>
          <div className="px-4 sm:px-6 py-3 border-b border-slate-200/50 flex items-center gap-3">
            <button onClick={() => setShowChat(false)} className="sm:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 -ml-1"><ArrowLeft size={18} /></button>
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${convos[sel].color} flex items-center justify-center text-white text-[10px] font-bold`}>{convos[sel].avatar}</div>
            <div><p className="text-sm font-bold text-slate-900">{convos[sel].name}</p><p className="text-[11px] text-teal-600 font-semibold">{convos[sel].project}</p></div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                  m.from === 'me' ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-br-md shadow-md' : 'bg-slate-100 text-slate-800 rounded-bl-md'
                }`}>{m.text}<p className={`text-[10px] mt-1.5 font-semibold ${m.from === 'me' ? 'text-teal-100' : 'text-slate-400'}`}>{m.time}</p></div>
              </div>
            ))}
          </div>
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200/50">
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 flex-shrink-0"><Paperclip size={18} /></button>
              <input placeholder="Type your message..." className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
              <button className="p-2.5 sm:p-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl shadow-md flex-shrink-0"><Send size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
