/**
 * BioLab — MFA Verification Page (Phase 1)
 * ────────────────────────────────────────────────────────────────────────
 * Shown after login when mfaRequired=true.
 * Calls: POST /api/auth/mfa/verify → AuthResponse (full tokens)
 */
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FlaskConical, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MfaVerifyPage() {
  const { completeMfa, mfaState, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const inputRefs = useRef([]);

  // If no MFA session or already authenticated, redirect
  useEffect(() => {
    if (!mfaState && !isAuthenticated) navigate('/login', { replace: true });
    if (isAuthenticated) navigate('/', { replace: true });
  }, [mfaState, isAuthenticated, navigate]);

  const code = digits.join('');

  const handleDigit = (i, val) => {
    const v = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setError('');
    if (v && i < 5) inputRefs.current[i + 1]?.focus();
    // Auto-submit when all 6 filled
    if (next.every((d) => d !== '') && v) {
      submitCode(next.join(''));
    }
  };

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && i > 0) inputRefs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) {
      setDigits(text.split(''));
      submitCode(text);
    }
    e.preventDefault();
  };

  const submitCode = async (c) => {
    setLoading(true);
    setError('');
    try {
      await completeMfa(c);
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (err.response?.status === 401) {
        setError('Invalid or expired code. Please try again.');
      } else {
        setError(msg || 'Verification failed. Please try again.');
      }
      setDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <FlaskConical size={20} className="text-white" />
            </div>
            <span className="font-extrabold font-display text-slate-900">FrontierBioLabs</span>
          </div>

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border-2 border-teal-100 flex items-center justify-center mb-6 mx-auto">
            <ShieldCheck size={28} className="text-teal-600" />
          </div>

          <h1 className="text-2xl font-black font-display text-slate-900 text-center mb-2">
            Two-Factor Verification
          </h1>
          <p className="text-sm text-slate-500 text-center font-medium mb-8">
            Enter the 6-digit code from your authenticator app or email
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 mb-6">
              <AlertCircle size={16} className="text-rose-500 flex-shrink-0" />
              <p className="text-xs font-semibold text-rose-700">{error}</p>
            </div>
          )}

          {/* Digit inputs */}
          <div className="flex gap-2 justify-center mb-8" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text" inputMode="numeric" maxLength={1}
                value={d}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                autoFocus={i === 0}
                className={`w-12 h-14 text-center text-2xl font-mono font-bold rounded-xl border-2 transition-all focus:outline-none
                  ${d ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 bg-white text-slate-800'}
                  focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10`}
              />
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={() => submitCode(code)}
            disabled={loading || code.length < 6}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0 flex items-center justify-center gap-2 mb-4"
          >
            {loading
              ? <><Loader2 size={16} className="animate-spin" />Verifying…</>
              : 'Verify Code'}
          </button>

          <p className="text-center text-xs text-slate-400">
            Lost your device?{' '}
            <span className="text-teal-600 font-semibold cursor-pointer hover:underline">Use a backup code</span>
          </p>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link to="/login" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
