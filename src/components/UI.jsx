import { useState, useRef } from 'react';

/* ═══ Particles ═══════════════════════════════════════ */
export const Particles = ({ n = 5 }) => (
  <>{Array.from({ length: n }, (_, i) => (
    <div key={i} className="particle" style={{ width: 4 + (i % 4) * 4, height: 4 + (i % 4) * 4, left: `${10 + (i * 17) % 80}%`, top: `${5 + (i * 23) % 80}%`, animationDelay: `${i * 1.2}s` }} />
  ))}</>
);

/* ═══ Section Header ══════════════════════════════════ */
export const SectionHeader = ({ tag, title, desc, light }) => (
  <div className="mb-8">
    {tag && <p className={`text-xs font-bold tracking-[.15em] uppercase mb-3 ${light ? 'text-white/75' : 'text-teal-600'}`}>{tag}</p>}
    <h2 className={`text-2xl sm:text-3xl font-extrabold font-display mb-3 ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {desc && <p className={`text-[15px] max-w-xl ${light ? 'text-white/75' : 'text-slate-500'} font-medium`}>{desc}</p>}
  </div>
);

/* ═══ Page Head ═══════════════════════════════════════ */
export const PageHead = ({ title, sub }) => (
  <div>
    <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">{title}</h1>
    {sub && <p className="text-xs sm:text-sm text-slate-500 font-medium">{sub}</p>}
  </div>
);

/* ═══ Stat Card ═══════════════════════════════════════ */
const colorMap = { teal:'bg-teal-50 text-teal-600', blue:'bg-blue-50 text-blue-600', amber:'bg-amber-50 text-amber-600', purple:'bg-purple-50 text-purple-600', rose:'bg-rose-50 text-rose-600' };
export const StatCard = ({ icon: Icon, label, value, color = 'teal', trend }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-md">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}><Icon size={20} strokeWidth={1.8} /></div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-slate-500 font-semibold">{label}</p>
        <p className="text-lg sm:text-xl font-extrabold font-display text-slate-900">{value}</p>
      </div>
      {trend && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+{trend}%</span>}
    </div>
  </div>
);

/* ═══ Status Badge ════════════════════════════════════ */
const statusMap = {
  'In Progress':'bg-blue-50 text-blue-800 border-blue-200','Awaiting Review':'bg-amber-50 text-amber-800 border-amber-200',
  'Completed':'bg-emerald-50 text-emerald-800 border-emerald-200','Results Ready':'bg-teal-50 text-teal-800 border-teal-200',
  'Protocol Review':'bg-purple-50 text-purple-800 border-purple-200','Experiment Running':'bg-blue-50 text-blue-800 border-blue-200',
  'Overdue':'bg-rose-50 text-rose-800 border-rose-200','Paid':'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Sent':'bg-blue-50 text-blue-800 border-blue-200','Draft':'bg-slate-100 text-slate-700 border-slate-200',
  'Viewed':'bg-amber-50 text-amber-800 border-amber-200','Active':'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Inactive':'bg-slate-100 text-slate-600 border-slate-200','Suspended':'bg-rose-50 text-rose-600 border-rose-200',
  'High':'bg-rose-50 text-rose-700 border-rose-200','Medium':'bg-amber-50 text-amber-700 border-amber-200',
  'Low':'bg-slate-100 text-slate-600 border-slate-200','Pending':'bg-amber-50 text-amber-700 border-amber-200',
};
export const StatusBadge = ({ status }) => (
  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${statusMap[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>{status}</span>
);

/* ═══ Modal ═══════════════════════════════════════════ */
export const Modal = ({ open, onClose, children, wide }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto animate-[modalIn_0.2s_ease-out]`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

/* ═══ Confirm Modal ═══════════════════════════════════ */
export const ConfirmModal = ({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', danger = false }) => (
  <Modal open={open} onClose={onClose}>
    <div className="p-6 sm:p-8">
      <h3 className="text-lg font-extrabold text-slate-900 font-display mb-2">{title}</h3>
      <p className="text-sm text-slate-500 font-medium mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
        <button onClick={() => { onConfirm?.(); onClose(); }}
          className={`px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg ${danger ? 'bg-gradient-to-r from-rose-500 to-pink-500' : 'bg-gradient-to-r from-teal-500 to-emerald-500'}`}>{confirmLabel}</button>
      </div>
    </div>
  </Modal>
);

/* ═══ Upload Modal ════════════════════════════════════ */
export const UploadModal = ({ open, onClose }) => {
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const ref = useRef();
  const add = fl => setFiles(p => [...p, ...Array.from(fl)]);
  return (
    <Modal open={open} onClose={onClose} wide>
      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-extrabold text-slate-900 font-display mb-4">Upload Files</h3>
        <div className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer mb-4 transition-all ${drag ? 'border-teal-400 bg-teal-50/50' : 'border-slate-200 hover:border-teal-300'}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }} onClick={() => ref.current?.click()}>
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">Drop files here or click to browse</p>
          <p className="text-xs text-slate-400">PDF, DOCX, XLSX, CSV up to 25MB</p>
          <input ref={ref} type="file" className="hidden" multiple accept=".pdf,.docx,.xlsx,.csv" onChange={e => add(e.target.files)} />
        </div>
        {files.length > 0 && <div className="space-y-2 mb-4">{files.map((f, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100">
            <div><p className="text-sm font-semibold text-slate-800">{f.name}</p><p className="text-xs text-slate-400">{(f.size / 1024).toFixed(0)} KB</p></div>
            <button className="text-slate-400 hover:text-rose-500 p-1" onClick={() => setFiles(p => p.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}</div>}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
          <button onClick={onClose} disabled={!files.length} className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl shadow-lg disabled:opacity-40">Upload ({files.length})</button>
        </div>
      </div>
    </Modal>
  );
};

/* ═══ Toast ═══════════════════════════════════════════ */
export const Toast = ({ show, message, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed top-6 right-6 z-[200] bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2 animate-[modalIn_0.25s_ease-out]">
      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
      {message}
    </div>
  );
};

/* ═══ Pagination ══════════════════════════════════════ */
export const Pagination = ({ total, page, perPage, onPageChange, onPerPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) pages.push(i);
    else if (pages[pages.length - 1] !== '...') pages.push('...');
  }
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5 px-1">
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span>Showing {start}–{end} of {total}</span>
        <span className="text-slate-300">|</span>
        <span>Rows:</span>
        <select value={perPage} onChange={e => { onPerPageChange(Number(e.target.value)); onPageChange(1); }}
          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer">
          {[10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}
          className="px-2.5 py-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all">‹ Prev</button>
        {pages.map((p, i) => p === '...'
          ? <span key={i} className="px-1.5 text-slate-400 text-xs">…</span>
          : <button key={i} onClick={() => onPageChange(p)}
              className={`w-8 h-8 text-xs font-bold rounded-lg transition-all ${p === page ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'}`}>{p}</button>
        )}
        <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}
          className="px-2.5 py-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Next ›</button>
      </div>
    </div>
  );
};

/* ═══ Filter Bar ══════════════════════════════════════ */
export const FilterBar = ({ filters, values, onChange, onClear }) => {
  const hasActive = Object.values(values).some(v => v && v !== 'All');
  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      {filters.map(f => (
        <select key={f.key} value={values[f.key] || 'All'} onChange={e => onChange(f.key, e.target.value)}
          className={`appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
            values[f.key] && values[f.key] !== 'All' ? 'bg-teal-50 text-teal-700 border-teal-300' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`} style={{backgroundImage:`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,backgroundPosition:'right .5rem center',backgroundRepeat:'no-repeat',backgroundSize:'1.25em 1.25em'}}>
          <option value="All">{f.label}: All</option>
          {f.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ))}
      {hasActive && <button onClick={onClear} className="px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all">Clear filters</button>}
    </div>
  );
};

/* ═══ Password Strength Meter ═════════════════════════ */
export const getPasswordStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '', bars: 0 };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { score, label:'Weak', color:'bg-rose-500', text:'text-rose-600', bars:1 };
  if (score <= 3) return { score, label:'Fair', color:'bg-amber-500', text:'text-amber-600', bars:2 };
  if (score <= 4) return { score, label:'Good', color:'bg-blue-500', text:'text-blue-600', bars:3 };
  return { score, label:'Strong', color:'bg-emerald-500', text:'text-emerald-600', bars:4 };
};

export const PasswordStrength = ({ password }) => {
  const s = getPasswordStrength(password);
  if (!password) return null;
  const checks = [
    { ok: password.length >= 8, label: 'At least 8 characters' },
    { ok: /[A-Z]/.test(password), label: 'Uppercase letter' },
    { ok: /[a-z]/.test(password), label: 'Lowercase letter' },
    { ok: /[0-9]/.test(password), label: 'Number' },
    { ok: /[^A-Za-z0-9]/.test(password), label: 'Special character (!@#$...)' },
  ];
  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1 flex-1">
          {[1,2,3,4].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= s.bars ? s.color : 'bg-slate-200'}`} />
          ))}
        </div>
        <span className={`text-[11px] font-bold ${s.text}`}>{s.label}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {checks.map((c, i) => (
          <span key={i} className={`text-[11px] font-medium flex items-center gap-1 transition-colors ${c.ok ? 'text-emerald-600' : 'text-slate-400'}`}>
            {c.ok
              ? <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              : <svg className="w-3 h-3" fill="none" viewBox="0 0 20 20" stroke="currentColor"><circle cx="10" cy="10" r="7" strokeWidth="1.5"/></svg>
            }
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ═══ Password Input with Eye Toggle ═════════════════ */
export const PasswordInput = ({ value, onChange, placeholder = 'Enter password', className = '' }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input type={show ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full px-4 py-3 pr-11 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 ${className}`} />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5">
        {show
          ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
        }
      </button>
    </div>
  );
};
