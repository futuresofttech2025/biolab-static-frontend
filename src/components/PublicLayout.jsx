import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { FlaskConical, ShieldCheck, Menu } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const links = [{to:'/',label:'Home'},{to:'/about',label:'About'},{to:'/services',label:'Services'},{to:'/contact',label:'Contact'}];
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-900/85 backdrop-blur-2xl border-b border-white/[.06]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <FlaskConical size={18} className="text-white" />
            </div>
            <span className="text-white font-extrabold font-display text-[15px]">FrontierBioLabs</span>
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end className={({isActive}) => `px-4 py-2 text-[13px] font-semibold rounded-lg transition-colors ${isActive ? 'text-teal-400' : 'text-slate-300 hover:text-white'}`}>{l.label}</NavLink>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/register" className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl shadow-lg shadow-teal-500/20">Get Started</Link>
          </div>
          {/* Mobile hamburger */}
          <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)}><Menu size={22} /></button>
        </div>
        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-slate-900 border-t border-white/10 px-4 pb-4">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end onClick={() => setOpen(false)}
                className={({isActive}) => `block py-3 text-sm font-semibold border-b border-white/5 ${isActive ? 'text-teal-400' : 'text-slate-300'}`}>{l.label}</NavLink>
            ))}
            <div className="flex gap-2 mt-3">
              <Link to="/register" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl">Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{pathname === '/' ? <Outlet /> : <div className="pt-16"><Outlet /></div>}</main>

      <footer className="bg-slate-900 border-t border-white/[.06]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center"><FlaskConical size={16} className="text-white" /></div>
                <span className="text-white font-extrabold font-display text-sm">FrontierBioLabs</span>
              </div>
              <p className="text-slate-400 text-[13px] max-w-[250px]">Enterprise-grade biotech services platform with full regulatory compliance.</p>
              <div className="flex items-center gap-2 mt-3"><ShieldCheck size={16} className="text-emerald-400" /><span className="text-slate-300 text-xs font-semibold">HIPAA · GDPR · FDA 21 CFR Part 11</span></div>
            </div>
            {[{t:'Platform',i:['Services','Pricing','Security','API']},{t:'Company',i:['About','Careers','Blog','Contact']},{t:'Legal',i:['Privacy','Terms','Compliance','Cookies']}].map((col,ci)=>(
              <div key={ci}>
                <h6 className="text-white font-bold text-xs uppercase tracking-wider mb-3">{col.t}</h6>
                {col.i.map(item => <p key={item} className="mb-2"><a href="#" className="text-slate-400 text-[13px] hover:text-white transition-colors">{item}</a></p>)}
              </div>
            ))}
          </div>
          <div className="pt-6 mt-6 border-t border-white/[.06] text-center"><p className="text-slate-500 text-xs">© 2025 FrontierBioLabs. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}
