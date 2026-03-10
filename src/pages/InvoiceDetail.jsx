import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Send, CheckCircle, Printer } from 'lucide-react';
import { StatusBadge } from '../components/UI';
import { SAMPLE_INVOICES } from '../constants';

export default function InvoiceDetail() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const base = pathname.startsWith('/admin') ? '/admin' : pathname.startsWith('/buyer') ? '/buyer' : '/supplier';
  const inv = SAMPLE_INVOICES.find(i => i.id === id) || SAMPLE_INVOICES[0];

  return (
    <div className="max-w-[900px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Link to={`${base}/invoicing`} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white transition-colors"><ArrowLeft size={20} /></Link>
          <div>
            <div className="flex items-center gap-3"><h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display font-mono">{inv.id}</h1><StatusBadge status={inv.status} /></div>
            <p className="text-sm text-slate-500 font-medium mt-0.5">{inv.client}</p>
          </div>
        </div>
        <div className="flex gap-2 self-start">
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"><Download size={14} /> Download</button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"><Printer size={14} /> Print</button>
          {inv.status === 'Draft' && <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg shadow-md"><Send size={14} /> Send</button>}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-lg">
        <div className="grid sm:grid-cols-2 gap-6 mb-8 pb-6 border-b border-slate-200/50">
          <div><p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">From</p><p className="text-sm font-bold text-slate-900">FrontierBioLabs Services Hub</p><p className="text-sm text-slate-500 font-medium">100 Discovery Drive<br/>Cambridge, MA 02139</p></div>
          <div><p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">Bill To</p><p className="text-sm font-bold text-slate-900">{inv.client}</p><p className="text-sm text-slate-500 font-medium">Issued: {inv.date}<br/>Due: {inv.due}</p></div>
        </div>
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-3">Items</p>
        <div className="hidden sm:block">
          <table className="w-full table-clean">
            <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th className="!text-right">Amount</th></tr></thead>
            <tbody>{inv.items.map((it, i) => (
              <tr key={i}>
                <td className="text-slate-700 font-medium">{it.desc}</td>
                <td className="text-slate-500">{it.qty}</td>
                <td className="text-slate-500">${it.rate.toLocaleString()}.00</td>
                <td className="text-right font-bold text-slate-900">${(it.qty * it.rate).toLocaleString()}.00</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="sm:hidden space-y-3">
          {inv.items.map((it, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-3">
              <p className="text-sm text-slate-700 font-medium mb-1">{it.desc}</p>
              <div className="flex justify-between text-xs"><span className="text-slate-400">{it.qty} × ${it.rate.toLocaleString()}</span><span className="font-bold text-slate-900">${(it.qty * it.rate).toLocaleString()}.00</span></div>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-slate-900 pt-4 mt-6 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Total Due</span>
          <span className="text-3xl font-extrabold text-slate-900 font-display">${inv.total.toLocaleString()}.00</span>
        </div>
        {inv.status === 'Paid' && inv.paidDate && (
          <div className="mt-4 flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-200">
            <CheckCircle size={16} /><span className="text-sm font-semibold">Paid on {inv.paidDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
