import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FlaskConical, ShieldCheck } from 'lucide-react';
import { PasswordInput } from '../components/UI';

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80" alt="Lab" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 to-emerald-900/55" />
        <div className="relative z-10 h-full flex flex-col justify-center p-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400/20 to-emerald-500/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/15">
            <FlaskConical size={24} className="text-emerald-400" />
          </div>
          <h2 className="text-white font-extrabold font-display text-3xl mb-3">Welcome back<br/>to FrontierBioLabs</h2>
          <p className="text-slate-300 text-sm mb-8 max-w-sm">Access your secure laboratory services dashboard with full compliance tracking.</p>
          <div className="flex flex-wrap gap-6 mb-8">
            {[{v:'99.9%',l:'Uptime'},{v:'AES-256',l:'Encryption'},{v:'100%',l:'Compliant'}].map((s,i)=>(
              <div key={i}><p className="text-white font-extrabold font-display text-lg">{s.v}</p><p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">{s.l}</p></div>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-4 border-t border-white/10">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span className="text-slate-300 text-xs font-semibold">HIPAA · GDPR · FDA 21 CFR Part 11</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <FlaskConical size={20} className="text-white" />
            </div>
            <span className="font-extrabold font-display text-slate-900">FrontierBioLabs</span>
          </div>
          <div className="w-10 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6" />
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mb-1">Sign in</h1>
          <p className="text-sm text-slate-500 font-medium mb-6">Enter your credentials to continue</p>

          <div className="mb-4">
            <label className="text-sm font-semibold text-slate-700 block mb-2">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
          </div>

          <div className="mb-2">
            <label className="text-sm font-semibold text-slate-700 block mb-2">Password</label>
            <PasswordInput value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter your password" />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end mb-6">
            <Link to="/forgot-password" className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">
              Forgot Password?
            </Link>
          </div>

          <div className="space-y-2 mb-6">
            <button onClick={() => nav('/supplier/dashboard')} className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm hover:-translate-y-0.5 transition-all">Sign In as Supplier</button>
            <button onClick={() => nav('/buyer/dashboard')} className="w-full py-3 border-2 border-teal-500 text-teal-600 font-bold rounded-xl text-sm hover:bg-teal-50 transition-all">Sign In as Buyer</button>
            <button onClick={() => nav('/admin/dashboard')} className="w-full py-3 border-2 border-purple-300 text-purple-600 font-bold rounded-xl text-sm hover:bg-purple-50 transition-all">Sign In as Admin</button>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck size={14} className="text-teal-500" />
            <span className="text-slate-400 text-xs font-semibold">256-bit Encrypted · HIPAA Compliant</span>
          </div>
          <p className="text-center text-sm text-slate-500">No account? <Link to="/register" className="font-bold text-teal-600">Sign up free</Link></p>
        </div>
      </div>
    </div>
  );
}
