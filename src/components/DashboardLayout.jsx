import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FlaskConical, Home, Layers, Settings, FileText, CreditCard, MessageSquare, Search, Bell, LogOut, Menu, X, Users, BarChart3, ShieldCheck, Database, ChevronRight, ChevronLeft } from 'lucide-react';

const navMap = {
  supplier: [
    { to:'/supplier/dashboard', label:'Dashboard', icon:Home },
    { to:'/supplier/projects',  label:'Projects',  icon:Layers },
    { to:'/supplier/services',  label:'Services',  icon:Settings },
    { to:'/supplier/requests',  label:'Requests',  icon:FileText },
    { to:'/supplier/invoicing', label:'Invoicing',  icon:CreditCard },
    { to:'/supplier/messages',  label:'Messages',  icon:MessageSquare },
    { to:'/supplier/settings',  label:'Settings',  icon:Settings },
  ],
  buyer: [
    { to:'/buyer/dashboard', label:'Dashboard', icon:Home },
    { to:'/buyer/browse',    label:'Browse',    icon:Search },
    { to:'/buyer/projects',  label:'Projects',  icon:Layers },
    { to:'/buyer/messages',  label:'Messages',  icon:MessageSquare },
    { to:'/buyer/invoices',  label:'Invoices',  icon:CreditCard },
    { to:'/buyer/settings',  label:'Settings',  icon:Settings },
  ],
  admin: [
    { to:'/admin/dashboard',  label:'Overview',  icon:BarChart3 },
    { to:'/admin/users',      label:'Users',     icon:Users },
    { to:'/admin/projects',   label:'All Projects', icon:Layers },
    { to:'/admin/invoices',   label:'All Invoices', icon:CreditCard },
    { to:'/admin/services',   label:'Catalog',   icon:Database },
    { to:'/admin/compliance', label:'Compliance', icon:ShieldCheck },
    { to:'/admin/settings',   label:'Settings',  icon:Settings },
  ],
};

export default function DashboardLayout({ role }) {
  const { pathname } = useLocation();
  const links = navMap[role] || [];
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const isActive = to => pathname === to || (to !== `/${role}/dashboard` && pathname.startsWith(to));

  return (
    <div className="bg-dashboard">
      {/* Desktop Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 bg-slate-900 z-40 hidden lg:flex flex-col transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : ''} gap-3 py-5 ${collapsed ? 'px-2' : 'px-5'} border-b border-white/[.06]`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30 flex-shrink-0">
            <FlaskConical size={18} className="text-white" />
          </div>
          {!collapsed && <span className="text-white font-extrabold font-display text-[15px]">FrontierBioLabs</span>}
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className={collapsed ? 'px-1' : 'px-2'}>
            {links.map(l => (
              <Link key={l.to} to={l.to} title={collapsed ? l.label : undefined}
                className={`relative flex items-center gap-3 px-4 py-2.5 mx-2 my-0.5 rounded-xl text-[13px] font-semibold transition-all overflow-hidden whitespace-nowrap ${
                  collapsed ? 'justify-center px-2 mx-1' : ''
                } ${isActive(l.to) ? 'text-white bg-gradient-to-r from-teal-500/15 to-emerald-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {isActive(l.to) && <span className="absolute left-0 w-[3px] h-[60%] rounded-r-full bg-gradient-to-b from-teal-400 to-emerald-500" />}
                <l.icon size={18} strokeWidth={1.8} className="flex-shrink-0" />
                {!collapsed && <span>{l.label}</span>}
              </Link>
            ))}
          </div>
        </nav>
        <div className={`${collapsed ? 'px-2' : 'px-3'} pb-2`}>
          <button className={`relative flex items-center gap-3 w-full px-4 py-2.5 mx-0 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-[13px] font-semibold transition-all ${collapsed ? 'justify-center px-2' : ''}`}>
            <div className="relative flex-shrink-0"><Bell size={18} strokeWidth={1.8} /><span className="absolute -top-0.5 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900" /></div>
            {!collapsed && <><span className="flex-1 text-left">Notifications</span><span className="text-[10px] font-bold bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-full">3</span></>}
          </button>
        </div>
        <div className={`${collapsed ? 'px-2' : 'px-3'} pb-4 pt-3 border-t border-white/[.06]`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-2'}`}>
            {!collapsed && <>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">SC</div>
              <div className="flex-1 min-w-0"><p className="text-white text-[13px] font-bold truncate">Dr. Sarah Chen</p><p className="text-[10px] text-slate-400">Supplier</p></div>
            </>}
            <button onClick={() => setCollapsed(!collapsed)} className="p-1 text-slate-400 hover:text-white transition-colors">
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
          <Link to="/" className={`flex items-center gap-3 mt-2 px-4 py-2 mx-0 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold transition-all ${collapsed ? 'justify-center px-2' : ''}`}>
            <LogOut size={16} className="flex-shrink-0" />{!collapsed && <span>Log Out</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
            <FlaskConical size={16} className="text-white" />
          </div>
          <span className="text-white font-extrabold font-display text-sm">FrontierBioLabs</span>
        </div>
        <button onClick={() => setDrawer(true)} className="text-white p-1"><Menu size={22} /></button>
      </div>

      {/* Mobile Drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-slate-900 flex flex-column animate-[modalIn_0.2s_ease-out] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/[.08]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                  <FlaskConical size={16} className="text-white" />
                </div>
                <span className="text-white font-extrabold font-display text-sm">FrontierBioLabs</span>
              </div>
              <button onClick={() => setDrawer(false)} className="text-white p-1"><X size={20} /></button>
            </div>
            <div className="flex-1 p-3">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setDrawer(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold mb-1 transition-all ${
                    isActive(l.to) ? 'text-white bg-white/5' : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}>
                  <l.icon size={18} />{l.label}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-white/[.06]">
              <Link to="/" className="flex items-center gap-2 text-slate-400 text-sm"><LogOut size={16} /> Log Out</Link>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <main className={`transition-all duration-300 p-3 sm:p-5 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}`}>
        <div className="max-w-[1200px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
