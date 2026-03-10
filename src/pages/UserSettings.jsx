import { useState } from 'react';
import { User, KeyRound, Bell, Settings, Camera, Save, Mail, Building, Copy, CheckCircle, Smartphone, Key, ShieldCheck } from 'lucide-react';
import { PageHead, Modal, Toast } from '../components/UI';

const Tab = ({ active, icon: Icon, label, onClick }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
    active ? 'bg-slate-900 text-white shadow-md border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
  }`}><Icon size={16} /> {label}</button>
);

/* ─── Profile Tab ──────────────────────────────────── */
function ProfileTab({ toast }) {
  const [showPw, setShowPw] = useState(false);
  return (<>
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100">
      <div className="flex items-center gap-5 mb-7">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">SC</div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-md hover:bg-slate-50">
            <Camera size={14} className="text-slate-500" />
          </button>
        </div>
        <div><h3 className="text-lg font-bold text-slate-900 font-display">Dr. Sarah Chen</h3><p className="text-sm text-slate-500 font-medium">Supplier · FrontierBioLabs Alpha</p></div>
      </div>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-slate-700 mb-2"><User size={14} className="inline mr-1.5 text-slate-400" />First Name</label>
            <input defaultValue="Sarah" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
          <div><label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
            <input defaultValue="Chen" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
        </div>
        <div><label className="block text-sm font-semibold text-slate-700 mb-2"><Mail size={14} className="inline mr-1.5 text-slate-400" />Email</label>
          <input type="email" defaultValue="sarah.chen@frontierbiolabs.com" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
        <div><label className="block text-sm font-semibold text-slate-700 mb-2"><Building size={14} className="inline mr-1.5 text-slate-400" />Organization</label>
          <input defaultValue="FrontierBioLabs Alpha" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
        <div><label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
          <input type="tel" defaultValue="+1 (555) 234-5678" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
        <div><label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
          <textarea rows={3} defaultValue="PhD in Biochemistry from MIT. Specializing in enzyme kinetics and protein characterization." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
        <button onClick={() => setShowPw(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50"><KeyRound size={15} /> Change Password</button>
        <button onClick={() => toast('Profile updated successfully')} className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-200/30 text-sm hover:-translate-y-0.5 transition-all"><Save size={16} /> Save Changes</button>
      </div>
    </div>

    {/* Side cards */}
    <div className="bg-white rounded-xl p-5 shadow-md border border-slate-100 mt-5">
      <h4 className="text-sm font-bold text-slate-900 mb-3">Account Details</h4>
      {[['Role','Supplier'],['Member Since','Jan 2024'],['Last Login','Today, 9:41 AM'],['MFA','Enabled']].map(([k,v],i) => (
        <div key={i} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
          <span className="text-xs text-slate-500 font-medium">{k}</span>
          <span className="text-xs text-slate-900 font-bold">{v}</span>
        </div>
      ))}
    </div>

    {/* Change password modal */}
    <Modal open={showPw} onClose={() => setShowPw(false)}>
      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-extrabold text-slate-900 font-display mb-4">Change Password</h3>
        <div className="space-y-4">
          <div><label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
          <div><label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
            <input type="password" placeholder="Min 12 characters" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
          <div><label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
            <input type="password" placeholder="Repeat password" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" /></div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setShowPw(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
          <button onClick={() => { setShowPw(false); toast('Password changed successfully'); }} className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl shadow-lg">Update Password</button>
        </div>
      </div>
    </Modal>
  </>);
}

/* ─── MFA Tab ──────────────────────────────────────── */
function MfaTab({ toast }) {
  const [method, setMethod] = useState('app');
  const [enabled, setEnabled] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [code, setCode] = useState('');
  const backupCodes = ['4F8A-9B2C','7D3E-1A5F','2C6B-8E4D','9A1F-3C7B','5E2D-6F8A','8B4C-2A9E'];

  const verify = () => {
    if (code.length >= 6) { setEnabled(true); setShowVerify(false); setCode(''); toast('MFA enabled successfully!'); }
  };

  return (<>
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl ${enabled ? 'bg-emerald-100' : 'bg-amber-100'} flex items-center justify-center`}>
          <ShieldCheck size={24} className={enabled ? 'text-emerald-600' : 'text-amber-600'} />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 font-display">MFA Status</h3>
          <p className={`text-sm font-semibold ${enabled ? 'text-emerald-600' : 'text-amber-600'}`}>{enabled ? 'Enabled — Your account is protected' : 'Not Enabled — Your account is at risk'}</p>
        </div>
      </div>

      <h4 className="text-sm font-bold text-slate-900 mb-3">Choose verification method</h4>
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {[
          { id: 'app', icon: Smartphone, label: 'Authenticator App', desc: 'Google Authenticator, Authy, etc.' },
          { id: 'email', icon: Mail, label: 'Email Verification', desc: 'Code sent to your email address' },
        ].map(m => (
          <button key={m.id} onClick={() => setMethod(m.id)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
              method === m.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-white hover:border-slate-300'
            }`}>
            <m.icon size={22} className={method === m.id ? 'text-teal-600' : 'text-slate-400'} />
            <div><p className={`text-sm font-bold ${method === m.id ? 'text-teal-700' : 'text-slate-700'}`}>{m.label}</p><p className="text-[11px] text-slate-400 font-medium">{m.desc}</p></div>
          </button>
        ))}
      </div>

      {method === 'app' && (
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-5">
          <h4 className="text-sm font-bold text-slate-900 mb-3">Setup with Authenticator App</h4>
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-36 h-36 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center flex-shrink-0">
              <div className="w-28 h-28 bg-slate-100 rounded-lg flex items-center justify-center"><Key size={32} className="text-slate-400" /></div>
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium mb-3">Scan this QR code with your authenticator app, or enter the secret key manually:</p>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-slate-200 mb-3">
                <code className="text-sm font-mono font-bold text-slate-800 select-all">JBSWY3DPEHPK3PXP</code>
                <button onClick={() => { navigator.clipboard?.writeText('JBSWY3DPEHPK3PXP'); toast('Copied!'); }} className="p-1 text-slate-400 hover:text-teal-500"><Copy size={14} /></button>
              </div>
              <p className="text-xs text-slate-400 font-medium">This key is unique to your account. Keep it safe.</p>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowVerify(true)} className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-200/30 text-sm hover:-translate-y-0.5 transition-all">
        {enabled ? 'Reconfigure MFA' : 'Enable MFA'}
      </button>
    </div>

    {enabled && <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mt-5">
      <h3 className="text-base font-bold text-slate-900 font-display mb-1">Backup Codes</h3>
      <p className="text-sm text-slate-500 font-medium mb-4">Save these codes securely. Each can only be used once.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {backupCodes.map((c, i) => <div key={i} className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 text-center"><code className="text-sm font-mono font-bold text-slate-800">{c}</code></div>)}
      </div>
    </div>}

    <div className="bg-white rounded-xl p-5 shadow-md border border-slate-100 mt-5">
      <h4 className="text-sm font-bold text-slate-900 mb-3">Why MFA?</h4>
      {['Prevents unauthorized access','Required for HIPAA compliance','Protects sensitive research data','Blocks 99.9% of automated attacks'].map((t, i) => (
        <div key={i} className="flex items-start gap-2.5 mb-3 last:mb-0">
          <CheckCircle size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-slate-600 font-medium">{t}</p>
        </div>
      ))}
    </div>

    <Modal open={showVerify} onClose={() => setShowVerify(false)}>
      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-extrabold text-slate-900 font-display mb-2">Enter Verification Code</h3>
        <p className="text-sm text-slate-500 font-medium mb-5">Enter the 6-digit code from your {method === 'app' ? 'authenticator app' : 'email'}</p>
        <input value={code} onChange={e => setCode(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="000000"
          className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-xl text-2xl font-mono font-bold text-center tracking-[0.3em] text-slate-900 focus:outline-none focus:border-teal-500 shadow-sm" autoFocus />
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setShowVerify(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
          <button onClick={verify} disabled={code.length < 6} className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed">Verify & Enable</button>
        </div>
      </div>
    </Modal>
  </>);
}

/* ─── Notifications Tab ────────────────────────────── */
function NotificationsTab({ toast }) {
  const Toggle = ({ label, sub, defaultOn = false }) => {
    const [on, setOn] = useState(defaultOn);
    return (
      <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
        <div><p className="text-sm font-semibold text-slate-900">{label}</p><p className="text-xs text-slate-500 font-medium">{sub}</p></div>
        <button onClick={() => setOn(!on)} className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-teal-500' : 'bg-slate-300'}`}>
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${on ? 'translate-x-5' : ''}`} />
        </button>
      </div>
    );
  };
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100">
      <h3 className="text-base font-bold text-slate-900 font-display mb-1">Notification Preferences</h3>
      <p className="text-sm text-slate-500 font-medium mb-4">Choose how you want to be notified</p>
      <Toggle label="Email Notifications" sub="Receive updates via email" defaultOn />
      <Toggle label="Project Updates" sub="Notifications when project status changes" defaultOn />
      <Toggle label="New Messages" sub="Alert when you receive a new message" defaultOn />
      <Toggle label="Invoice Reminders" sub="Payment due date reminders" defaultOn />
      <Toggle label="Security Alerts" sub="Unusual login activity alerts" defaultOn />
      <Toggle label="Marketing & Tips" sub="Product updates and best practices" />
      <div className="flex justify-end mt-6 pt-4 border-t border-slate-200">
        <button onClick={() => toast('Notification preferences saved')} className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-200/30 text-sm hover:-translate-y-0.5 transition-all"><Save size={16} /> Save Preferences</button>
      </div>
    </div>
  );
}

/* ─── Main Settings Page ───────────────────────────── */
export default function UserSettings() {
  const [tab, setTab] = useState('profile');
  const [toastMsg, setToastMsg] = useState('');
  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 2500); };

  return (
    <div>
      <PageHead title="Settings" sub="Manage your profile, security, and preferences" />
      <div className="flex gap-2 mt-5 mb-5 overflow-x-auto pb-1">
        <Tab active={tab === 'profile'} icon={User} label="Profile" onClick={() => setTab('profile')} />
        <Tab active={tab === 'mfa'} icon={KeyRound} label="MFA" onClick={() => setTab('mfa')} />
        <Tab active={tab === 'notifications'} icon={Bell} label="Notifications" onClick={() => setTab('notifications')} />
      </div>

      {tab === 'profile' && <ProfileTab toast={showToast} />}
      {tab === 'mfa' && <MfaTab toast={showToast} />}
      {tab === 'notifications' && <NotificationsTab toast={showToast} />}

      <Toast show={!!toastMsg} message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  );
}
