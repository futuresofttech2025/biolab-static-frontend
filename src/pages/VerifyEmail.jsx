import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FlaskConical, CheckCircle, XCircle, Loader2, ShieldCheck } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081';

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const calledRef = useRef(false);

  // 'loading' | 'success' | 'already_used' | 'expired' | 'error'
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Guard: only call API once — prevents double call from React StrictMode
    if (calledRef.current) return;
    calledRef.current = true;

    if (!token) {
      setStatus('error');
      setMessage('No verification token found in the URL.');
      return;
    }

    fetch(`${API_BASE}/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully. You can now log in.');
        } else {
          const msg = data.message || 'Verification failed.';
          if (msg.toLowerCase().includes('already been used')) {
            setStatus('already_used');
          } else if (msg.toLowerCase().includes('expired')) {
            setStatus('expired');
          } else {
            setStatus('error');
          }
          setMessage(msg);
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Unable to reach the server. Please try again later.');
      });
  }, [token]);

  const icons = {
    loading:      <Loader2 size={48} className="text-teal-500 animate-spin" />,
    success:      <CheckCircle size={48} className="text-emerald-500" />,
    already_used: <CheckCircle size={48} className="text-amber-500" />,
    expired:      <XCircle size={48} className="text-rose-500" />,
    error:        <XCircle size={48} className="text-rose-500" />,
  };

  const titles = {
    loading:      'Verifying your email…',
    success:      'Email verified!',
    already_used: 'Already verified',
    expired:      'Link expired',
    error:        'Verification failed',
  };

  const bgColors = {
    loading:      'bg-teal-50 border-teal-200',
    success:      'bg-emerald-50 border-emerald-200',
    already_used: 'bg-amber-50 border-amber-200',
    expired:      'bg-rose-50 border-rose-200',
    error:        'bg-rose-50 border-rose-200',
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
            <FlaskConical size={20} className="text-white" />
          </div>
          <span className="font-extrabold font-display text-slate-900 text-lg">FrontierBioLabs</span>
        </div>

        {/* Card */}
        <div className={`rounded-2xl border p-8 text-center shadow-md ${bgColors[status]}`}>
          <div className="flex justify-center mb-5">{icons[status]}</div>
          <h1 className="text-xl font-extrabold font-display text-slate-900 mb-2">{titles[status]}</h1>
          <p className="text-sm text-slate-600 font-medium mb-6">{message}</p>

          {(status === 'success' || status === 'already_used') && (
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm hover:-translate-y-0.5 transition-all"
            >
              Go to Sign In
            </Link>
          )}

          {status === 'expired' && (
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm hover:-translate-y-0.5 transition-all"
            >
              Request New Link
            </Link>
          )}

          {status === 'error' && (
            <Link
              to="/register"
              className="inline-block px-6 py-3 border-2 border-teal-500 text-teal-600 font-bold rounded-xl text-sm hover:bg-teal-50 transition-all"
            >
              Back to Register
            </Link>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <ShieldCheck size={14} className="text-teal-500" />
          <span className="text-slate-400 text-xs font-semibold">HIPAA · GDPR · FDA 21 CFR Part 11</span>
        </div>
      </div>
    </div>
  );
}
