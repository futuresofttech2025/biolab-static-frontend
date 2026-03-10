import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FlaskConical, Users, Microscope, ShieldCheck, CheckCircle } from 'lucide-react';
import { PasswordStrength, PasswordInput, getPasswordStrength } from '../components/UI';

export default function RegisterPage() {
  const [role, setRole] = useState('buyer');
  const nav = useNavigate();
  const [form, setForm] = useState({ first:'', last:'', email:'', org:'', pw:'', confirmPw:'' });
  const [errors, setErrors] = useState({});
  const u = (k, v) => { setForm(p => ({...p, [k]:v})); setErrors(p => ({...p, [k]:undefined})); };

  const handleSubmit = () => {
    const errs = {};
    if (!form.first.trim()) errs.first = 'First name is required';
    if (!form.last.trim()) errs.last = 'Last name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.org.trim()) errs.org = 'Organization is required';
    if (!form.pw) errs.pw = 'Password is required';
    else if (form.pw.length < 8) errs.pw = 'Password must be at least 8 characters';
    else if (getPasswordStrength(form.pw).bars < 2) errs.pw = 'Password is too weak — add uppercase, numbers or symbols';
    if (!form.confirmPw) errs.confirmPw = 'Please confirm your password';
    else if (form.pw !== form.confirmPw) errs.confirmPw = 'Passwords do not match';
    if (Object.keys(errs).length) return setErrors(errs);
    nav(role === 'buyer' ? '/buyer/dashboard' : '/supplier/dashboard');
  };

  const FieldError = ({ msg }) => msg ? (
    <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
      {msg}
    </p>
  ) : null;

  const inputCls = (k) => `w-full px-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 ${errors[k] ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'}`;

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
          <h2 className="text-white font-extrabold font-display text-3xl mb-3">Join FrontierBioLabs</h2>
          <p className="text-slate-300 text-sm mb-8 max-w-sm">Create your account to access secure biotech experimentation services with full regulatory compliance.</p>
          <div className="flex flex-wrap gap-6 mb-8">
            {[{v:'99.9%',l:'Uptime'},{v:'AES-256',l:'Encryption'},{v:'100%',l:'Compliant'}].map((s,i)=>(
              <div key={i}><p className="text-white font-extrabold font-display text-lg">{s.v}</p><p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">{s.l}</p></div>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-4 border-t border-white/10">
            <ShieldCheck size={16} className="text-emerald-400" /><span className="text-slate-300 text-xs font-semibold">HIPAA · GDPR · FDA 21 CFR Part 11</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center"><FlaskConical size={20} className="text-white" /></div>
            <span className="font-extrabold font-display text-slate-900">FrontierBioLabs</span>
          </div>
          <div className="w-10 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6" />
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mb-1">Create account</h1>
          <p className="text-sm text-slate-500 font-medium mb-6">Choose your role and get started</p>

          {/* Role selection */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[{id:'buyer',label:'Buyer',desc:'Request services',icon:Users},{id:'supplier',label:'Supplier',desc:'Provide services',icon:Microscope}].map(r=>(
              <button key={r.id} onClick={()=>setRole(r.id)} className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all ${role===r.id?'border-teal-500 bg-teal-50':'border-slate-200 bg-white hover:border-slate-300'}`}>
                <r.icon size={20} className={role===r.id?'text-teal-600':'text-slate-400'} />
                <div><p className={`text-sm font-bold ${role===r.id?'text-teal-700':'text-slate-700'}`}>{r.label}</p><p className="text-[11px] text-slate-400 font-medium">{r.desc}</p></div>
              </button>
            ))}
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">First Name</label>
              <input value={form.first} onChange={e => u('first', e.target.value)} className={inputCls('first')} placeholder="Jane" />
              <FieldError msg={errors.first} />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Last Name</label>
              <input value={form.last} onChange={e => u('last', e.target.value)} className={inputCls('last')} placeholder="Smith" />
              <FieldError msg={errors.last} />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-slate-700 block mb-2">Work Email</label>
            <input type="email" value={form.email} onChange={e => u('email', e.target.value)} className={inputCls('email')} placeholder="jane@company.com" />
            <FieldError msg={errors.email} />
          </div>

          {/* Organization */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-slate-700 block mb-2">Organization</label>
            <input value={form.org} onChange={e => u('org', e.target.value)} className={inputCls('org')} placeholder="Your company name" />
            <FieldError msg={errors.org} />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-slate-700 block mb-2">Password</label>
            <PasswordInput value={form.pw} onChange={e => u('pw', e.target.value)} placeholder="Min 8 characters" />
            <FieldError msg={errors.pw} />
            <PasswordStrength password={form.pw} />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 block mb-2">Confirm Password</label>
            <PasswordInput value={form.confirmPw} onChange={e => u('confirmPw', e.target.value)} placeholder="Repeat your password" />
            <FieldError msg={errors.confirmPw} />
            {form.confirmPw && form.pw && form.confirmPw === form.pw && !errors.confirmPw && (
              <p className="text-xs text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                <CheckCircle size={14} /> Passwords match
              </p>
            )}
          </div>

          <button onClick={handleSubmit} className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 mb-4 hover:-translate-y-0.5 transition-all">Create Account</button>
          <p className="text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-bold text-teal-600">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
