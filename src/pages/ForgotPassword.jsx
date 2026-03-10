import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FlaskConical, ShieldCheck, Mail, KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';
import { PasswordStrength, PasswordInput, getPasswordStrength, Toast } from '../components/UI';

export default function ForgotPassword() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);           // 1=email, 2=reset, 3=success
  const [email, setEmail] = useState('');
  const [tempPw, setTempPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');

  /* ─── Step 1: Send temp password ──────────────────── */
  const handleSendEmail = () => {
    if (!email) return setErrors({ email: 'Email is required' });
    if (!/\S+@\S+\.\S+/.test(email)) return setErrors({ email: 'Enter a valid email address' });
    setErrors({});
    setSending(true);
    // Simulate API call
    setTimeout(() => {
      setSending(false);
      setStep(2);
      setToast('Temporary password sent to your email');
      setTimeout(() => setToast(''), 3000);
    }, 1500);
  };

  /* ─── Step 2: Validate & reset password ───────────── */
  const handleResetPassword = () => {
    const errs = {};
    if (!tempPw) errs.tempPw = 'Enter the temporary password from your email';
    if (!newPw) errs.newPw = 'New password is required';
    else if (newPw.length < 8) errs.newPw = 'Password must be at least 8 characters';
    else if (getPasswordStrength(newPw).bars < 2) errs.newPw = 'Password is too weak';
    if (!confirmPw) errs.confirmPw = 'Please confirm your new password';
    else if (newPw !== confirmPw) errs.confirmPw = 'Passwords do not match';
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep(3);
    }, 1200);
  };

  /* ─── Step 3: Success ─────────────────────────────── */

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
          <h2 className="text-white font-extrabold font-display text-3xl mb-3">Reset Your<br/>Password</h2>
          <p className="text-slate-300 text-sm mb-8 max-w-sm">Don't worry — we'll send a temporary password to your registered email address so you can regain access to your account.</p>
          {/* Steps indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[{n:1,l:'Email'},{n:2,l:'Reset'},{n:3,l:'Done'}].map((s, i) => (
              <div key={s.n} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > s.n ? 'bg-emerald-500 text-white' : step === s.n ? 'bg-white text-slate-900' : 'bg-white/10 text-white/50'
                }`}>
                  {step > s.n ? <CheckCircle size={16} /> : s.n}
                </div>
                <span className={`text-xs font-semibold ${step >= s.n ? 'text-white' : 'text-white/40'}`}>{s.l}</span>
                {i < 2 && <div className={`w-8 h-[2px] rounded-full ${step > s.n ? 'bg-emerald-400' : 'bg-white/10'}`} />}
              </div>
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
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <FlaskConical size={20} className="text-white" />
            </div>
            <span className="font-extrabold font-display text-slate-900">FrontierBioLabs</span>
          </div>

          {/* ── STEP 1: Enter Email ────────────────── */}
          {step === 1 && (
            <div>
              <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 font-semibold mb-5 transition-colors">
                <ArrowLeft size={16} /> Back to Sign In
              </Link>
              <div className="w-10 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6" />
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                <Mail size={22} className="text-teal-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mb-1">Forgot password?</h1>
              <p className="text-sm text-slate-500 font-medium mb-6">Enter your email and we'll send you a temporary password to reset your account.</p>

              <div className="mb-5">
                <label className="text-sm font-semibold text-slate-700 block mb-2">Email Address</label>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors({}); }}
                  placeholder="you@company.com"
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 ${
                    errors.email ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
                  }`}
                  onKeyDown={e => e.key === 'Enter' && handleSendEmail()} />
                {errors.email && <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {errors.email}
                </p>}
              </div>

              <button onClick={handleSendEmail} disabled={sending}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                {sending ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Sending...</>
                ) : (
                  <><Mail size={16} /> Send Temporary Password</>
                )}
              </button>

              <p className="text-center text-sm text-slate-500 mt-5">Remember your password? <Link to="/login" className="font-bold text-teal-600">Sign in</Link></p>
            </div>
          )}

          {/* ── STEP 2: Reset Password ─────────────── */}
          {step === 2 && (
            <div>
              <button onClick={() => { setStep(1); setErrors({}); }} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 font-semibold mb-5 transition-colors">
                <ArrowLeft size={16} /> Back
              </button>
              <div className="w-10 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6" />
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                <KeyRound size={22} className="text-teal-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mb-1">Reset password</h1>
              <p className="text-sm text-slate-500 font-medium mb-2">We sent a temporary password to:</p>
              <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 mb-6">
                <Mail size={14} className="text-teal-600 flex-shrink-0" />
                <span className="text-sm font-bold text-teal-700 truncate">{email}</span>
              </div>

              {/* Temporary Password */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-slate-700 block mb-2">Temporary Password</label>
                <input type="text" value={tempPw} onChange={e => { setTempPw(e.target.value); setErrors(p => ({...p, tempPw:undefined})); }}
                  placeholder="Enter code from email"
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 font-mono tracking-wider ${
                    errors.tempPw ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
                  }`} />
                {errors.tempPw && <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {errors.tempPw}
                </p>}
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-slate-700 block mb-2">New Password</label>
                <PasswordInput value={newPw} onChange={e => { setNewPw(e.target.value); setErrors(p => ({...p, newPw:undefined})); }} placeholder="Min 8 characters" />
                {errors.newPw && <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {errors.newPw}
                </p>}
                <PasswordStrength password={newPw} />
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-slate-700 block mb-2">Repeat New Password</label>
                <PasswordInput value={confirmPw} onChange={e => { setConfirmPw(e.target.value); setErrors(p => ({...p, confirmPw:undefined})); }} placeholder="Repeat your new password" />
                {errors.confirmPw && <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {errors.confirmPw}
                </p>}
                {confirmPw && newPw && confirmPw === newPw && !errors.confirmPw && (
                  <p className="text-xs text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                    <CheckCircle size={14} /> Passwords match
                  </p>
                )}
              </div>

              <button onClick={handleResetPassword} disabled={sending}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                {sending ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Resetting...</>
                ) : (
                  <><KeyRound size={16} /> Reset Password</>
                )}
              </button>

              <button onClick={() => { setSending(true); setTimeout(() => { setSending(false); setToast('New temporary password sent!'); setTimeout(() => setToast(''), 3000); }, 1200); }}
                className="w-full mt-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors">
                Didn't receive the email? <span className="font-bold underline">Resend</span>
              </button>
            </div>
          )}

          {/* ── STEP 3: Success ────────────────────── */}
          {step === 3 && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h1 className="text-2xl font-black font-display text-slate-900 mb-2">Password Reset!</h1>
              <p className="text-sm text-slate-500 font-medium mb-8">Your password has been successfully reset. You can now sign in with your new password.</p>
              <button onClick={() => nav('/login')}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm">
                Back to Sign In
              </button>
              <p className="text-xs text-slate-400 font-medium mt-4">
                <ShieldCheck size={12} className="inline mr-1 text-emerald-500" />
                Your password is encrypted with AES-256
              </p>
            </div>
          )}
        </div>
      </div>

      <Toast show={!!toast} message={toast} onClose={() => setToast('')} />
    </div>
  );
}
