import { useState } from 'react';
import { Camera, Save, KeyRound, Mail, Building, User } from 'lucide-react';
import { PageHead, Toast, Modal } from '../components/UI';

export default function EditProfile() {
  const [toast, setToast] = useState('');
  const [showPw, setShowPw] = useState(false);
  const save = () => { setToast('Profile updated successfully'); setTimeout(() => setToast(''), 2500); };
  const changePw = () => { setShowPw(false); setToast('Password changed successfully'); setTimeout(() => setToast(''), 2500); };

  return (
    <div>
      <PageHead title="Edit Profile" sub="Manage your account details and preferences" />
      <div className="mt-5 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Profile info */}
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
            <div className="flex justify-end mt-6 pt-4 border-t border-slate-200">
              <button onClick={save} className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-200/30 text-sm hover:-translate-y-0.5 transition-all"><Save size={16} /> Save Changes</button>
            </div>
          </div>

          {/* Password */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 font-display mb-1">Security</h3>
            <p className="text-sm text-slate-500 font-medium mb-4">Manage your password and security settings</p>
            <button onClick={() => setShowPw(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 transition-all"><KeyRound size={16} /> Change Password</button>
          </div>
        </div>

        {/* Side info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-md border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Account Details</h4>
            {[['Role','Supplier'],['Member Since','Jan 2024'],['Last Login','Today, 9:41 AM'],['MFA','Enabled']].map(([k,v],i) => (
              <div key={i} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
                <span className="text-xs text-slate-500 font-medium">{k}</span>
                <span className="text-xs text-slate-900 font-bold">{v}</span>
              </div>
            ))}
          </div>
          <div className="bg-rose-50 rounded-xl p-5 border border-rose-200">
            <p className="text-sm font-bold text-rose-800 mb-1">Danger Zone</p>
            <p className="text-xs text-rose-600 font-medium leading-relaxed mb-3">Permanently delete your account and all data.</p>
            <button className="px-4 py-2 bg-white border-2 border-rose-300 text-rose-600 font-bold rounded-xl text-xs hover:bg-rose-50">Delete Account</button>
          </div>
        </div>
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
            <button onClick={changePw} className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl shadow-lg">Update Password</button>
          </div>
        </div>
      </Modal>
      <Toast show={!!toast} message={toast} onClose={() => setToast('')} />
    </div>
  );
}
