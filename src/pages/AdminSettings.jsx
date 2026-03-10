import { useState } from 'react';
import { Settings, Shield, Bell, Database, Save } from 'lucide-react';
import { PageHead, Toast } from '../components/UI';

const Tab = ({ active, icon:Icon, label, onClick }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
    active
      ? 'bg-slate-900 text-white shadow-md border-slate-900'
      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
  }`}><Icon size={16} /> {label}</button>
);

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

const Input = ({ label, sub, defaultValue, type = 'text' }) => (
  <div className="py-4 border-b border-slate-100 last:border-0">
    <label className="block text-sm font-semibold text-slate-900 mb-1">{label}</label>
    {sub && <p className="text-xs text-slate-500 font-medium mb-2">{sub}</p>}
    <input type={type} defaultValue={defaultValue} className="w-full sm:w-80 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm" />
  </div>
);

const Select = ({ label, sub, options, defaultValue }) => (
  <div className="py-4 border-b border-slate-100 last:border-0">
    <label className="block text-sm font-semibold text-slate-900 mb-1">{label}</label>
    {sub && <p className="text-xs text-slate-500 font-medium mb-2">{sub}</p>}
    <select defaultValue={defaultValue} className="w-full sm:w-80 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 shadow-sm">
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default function AdminSettings() {
  const [tab, setTab] = useState('general');
  const [toast, setToast] = useState(false);
  const save = () => { setToast(true); setTimeout(() => setToast(false), 2500); };
  return (
    <div>
      <PageHead title="Settings" sub="Platform configuration and preferences" />
      <div className="flex gap-2 mt-5 mb-5 overflow-x-auto pb-1">
        <Tab active={tab==='general'} icon={Settings} label="General" onClick={() => setTab('general')} />
        <Tab active={tab==='security'} icon={Shield} label="Security" onClick={() => setTab('security')} />
        <Tab active={tab==='notifications'} icon={Bell} label="Notifications" onClick={() => setTab('notifications')} />
        <Tab active={tab==='data'} icon={Database} label="Data" onClick={() => setTab('data')} />
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100">
        {tab === 'general' && (<>
          <h3 className="text-base font-bold text-slate-900 font-display mb-1">General Settings</h3>
          <p className="text-sm text-slate-500 font-medium mb-4">Configure basic platform settings</p>
          <Input label="Platform Name" defaultValue="FrontierBioLabs Services Hub" />
          <Input label="Support Email" defaultValue="support@frontierbiolabs.com" type="email" />
          <Select label="Default Language" options={['English','Spanish','French','German']} defaultValue="English" />
          <Select label="Timezone" options={['US/Eastern','US/Pacific','UTC','Europe/London']} defaultValue="US/Eastern" />
          <Toggle label="Maintenance Mode" sub="Temporarily disable platform access" />
          <Toggle label="Allow New Registrations" sub="Enable self-service account creation" defaultOn />
        </>)}
        {tab === 'security' && (<>
          <h3 className="text-base font-bold text-slate-900 font-display mb-1">Security Settings</h3>
          <p className="text-sm text-slate-500 font-medium mb-4">Configure authentication and access controls</p>
          <Toggle label="Enforce Two-Factor Authentication" sub="Require 2FA for all user accounts" defaultOn />
          <Toggle label="IP Allowlisting" sub="Restrict access to approved IP ranges" />
          <Select label="Session Timeout" sub="Automatic logout after inactivity" options={['15 minutes','30 minutes','1 hour','2 hours','4 hours']} defaultValue="1 hour" />
          <Select label="Password Policy" options={['Standard (8+ chars)','Strong (12+ chars, mixed)','Enterprise (16+ chars, mixed, no reuse)']} defaultValue="Strong (12+ chars, mixed)" />
          <Toggle label="Login Attempt Lockout" sub="Lock account after 5 failed attempts" defaultOn />
          <Toggle label="Require Password Rotation" sub="Force password change every 90 days" defaultOn />
          <Input label="Allowed IP Ranges" sub="CIDR notation, comma separated" defaultValue="0.0.0.0/0" />
        </>)}
        {tab === 'notifications' && (<>
          <h3 className="text-base font-bold text-slate-900 font-display mb-1">Notification Settings</h3>
          <p className="text-sm text-slate-500 font-medium mb-4">Configure alerts and notification channels</p>
          <Toggle label="Email Notifications" sub="Send email for platform events" defaultOn />
          <Toggle label="Slack Integration" sub="Post alerts to Slack channel" />
          <Toggle label="Security Alerts" sub="Immediate alerts for security events" defaultOn />
          <Toggle label="Compliance Reminders" sub="Upcoming audit and renewal alerts" defaultOn />
          <Toggle label="New User Notifications" sub="Alert when new users register" defaultOn />
          <Toggle label="Invoice Reminders" sub="Automatic payment reminders" defaultOn />
          <Input label="Alert Email Recipients" sub="Comma-separated email addresses" defaultValue="admin@frontierbiolabs.com, security@frontierbiolabs.com" />
        </>)}
        {tab === 'data' && (<>
          <h3 className="text-base font-bold text-slate-900 font-display mb-1">Data Management</h3>
          <p className="text-sm text-slate-500 font-medium mb-4">Configure data retention and storage</p>
          <Select label="Data Retention Period" sub="Automatic cleanup of old data" options={['1 year','2 years','5 years','7 years','Indefinite']} defaultValue="7 years" />
          <Select label="Primary Data Region" sub="Where primary data is stored" options={['US-East (Virginia)','US-West (Oregon)','EU-West (Ireland)','EU-Central (Frankfurt)']} defaultValue="US-East (Virginia)" />
          <Toggle label="Automatic Backups" sub="Daily encrypted backups" defaultOn />
          <Toggle label="Cross-Region Replication" sub="Replicate data to secondary region" defaultOn />
          <Toggle label="Data Anonymization" sub="Anonymize data in non-production environments" defaultOn />
          <Select label="Backup Retention" options={['30 days','90 days','1 year','Indefinite']} defaultValue="90 days" />
        </>)}
        <div className="flex justify-end mt-6 pt-4 border-t border-slate-200">
          <button onClick={save} className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm hover:-translate-y-0.5 transition-all"><Save size={16} /> Save Changes</button>
        </div>
      </div>
      <Toast show={toast} message="Settings saved successfully" onClose={() => setToast(false)} />
    </div>
  );
}
