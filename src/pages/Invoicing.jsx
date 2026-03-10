import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DollarSign, CheckCircle, FileText, Clock, Plus, Eye, Download } from 'lucide-react';
import { StatCard, StatusBadge, PageHead, Pagination, FilterBar } from '../components/UI';
import { SAMPLE_INVOICES } from '../constants';

const statusOpts = [...new Set(SAMPLE_INVOICES.map(i => i.status))];
const clientOpts = [...new Set(SAMPLE_INVOICES.map(i => i.client))].sort();

export default function Invoicing() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const base = pathname.startsWith('/admin') ? '/admin' : pathname.startsWith('/buyer') ? '/buyer' : '/supplier';
  const invBase = base === '/buyer' ? `${base}/invoices` : `${base}/invoicing`;
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const setF = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
  const clearF = () => { setFilters({}); setPage(1); };

  const filtered = SAMPLE_INVOICES.filter(inv =>
    (!filters.status || filters.status === 'All' || inv.status === filters.status) &&
    (!filters.client || filters.client === 'All' || inv.client === filters.client)
  );
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <PageHead title="Invoicing" sub="Manage billing and track payments" />
        {base === '/supplier' && <Link to={`${invBase}/new`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm"><Plus size={16} /> Create Invoice</Link>}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
        <StatCard icon={DollarSign} label="Outstanding" value="$34,750" color="amber" />
        <StatCard icon={CheckCircle} label="Paid (Month)" value="$22,100" color="teal" trend={18} />
        <StatCard icon={FileText} label="Invoices Sent" value={`${SAMPLE_INVOICES.length}`} color="blue" />
        <StatCard icon={Clock} label="Avg. Payment" value="14 days" color="purple" />
      </div>
      <FilterBar filters={[
        { key:'status', label:'Status', options: statusOpts },
        { key:'client', label:'Client', options: clientOpts },
      ]} values={filters} onChange={setF} onClear={clearF} />
      <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hidden md:block">
        <table className="w-full">
          <thead><tr className="bg-slate-50 border-b-2 border-slate-200">
            {['Invoice','Client','Project','Amount','Status','Date','Actions'].map(h => (
              <th key={h} className={`px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{paged.map((inv, i) => (
            <tr key={i} onClick={() => navigate(`${invBase}/${inv.id}`)} className="border-b border-slate-100 hover:bg-teal-50/40 transition-colors cursor-pointer">
              <td className="px-5 py-4 font-mono text-sm font-bold text-teal-600">{inv.id}</td>
              <td className="px-5 py-4 font-semibold text-slate-800 text-sm">{inv.client}</td>
              <td className="px-5 py-4 text-slate-500 text-sm max-w-[200px] truncate">{inv.project}</td>
              <td className="px-5 py-4 font-bold text-slate-900 text-sm">${inv.total.toLocaleString()}.00</td>
              <td className="px-5 py-4"><StatusBadge status={inv.status} /></td>
              <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">{inv.date}</td>
              <td className="px-5 py-4 text-right" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-end gap-1">
                  <Link to={`${invBase}/${inv.id}`} className="p-2 text-slate-400 hover:text-teal-600 rounded-lg hover:bg-teal-50"><Eye size={16} /></Link>
                  <button className="p-2 text-slate-400 hover:text-teal-600 rounded-lg hover:bg-teal-50"><Download size={16} /></button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">{paged.map((inv, i) => (
        <Link key={i} to={`${invBase}/${inv.id}`} className="bg-white rounded-xl p-4 block shadow-md border border-slate-100"><div className="flex items-start justify-between"><div><div className="flex items-center gap-2 mb-1"><span className="font-mono text-sm font-bold text-teal-600">{inv.id}</span><StatusBadge status={inv.status} /></div><p className="text-sm font-bold text-slate-900">{inv.client}</p></div><p className="text-lg font-extrabold text-slate-900">${inv.total.toLocaleString()}</p></div></Link>
      ))}</div>
      <Pagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />
    </div>
  );
}
