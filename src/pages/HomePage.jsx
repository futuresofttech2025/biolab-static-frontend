import { Link } from 'react-router-dom';
import { FlaskConical, ShieldCheck, Zap, Globe, Microscope, Database, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import { SectionHeader, Particles } from '../components/UI';

const features = [
  {icon:Microscope,title:'Advanced Analytics',desc:'Real-time monitoring with AI-powered insights for every experiment.'},
  {icon:ShieldCheck,title:'Full Compliance',desc:'HIPAA, GDPR, and FDA 21 CFR Part 11 certified platform.'},
  {icon:Database,title:'Secure Data',desc:'End-to-end AES-256 encryption with automated audit trails.'},
  {icon:BarChart3,title:'Smart Reports',desc:'Automated report generation with real-time compliance tracking.'},
  {icon:Zap,title:'Fast Turnaround',desc:'Streamlined workflows reduce project timelines by up to 40%.'},
  {icon:Globe,title:'Global Network',desc:'Access a vetted network of 200+ specialized biotech labs.'},
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-lab-hero relative flex items-center min-h-screen pt-20">
        <Particles n={6} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-2xl">
<h1 className="text-3xl sm:text-5xl font-black font-display text-white mb-5 leading-tight">The Future of<br/><span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">Biotech Services</span></h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-lg mb-8">Enterprise-grade platform connecting researchers with certified labs. From discovery to compliance — all in one place.</p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm flex items-center gap-1">Start Free Trial <ArrowRight size={16} /></Link>
              <Link to="/services" className="px-6 py-3 border-2 border-teal-500 text-teal-400 font-bold rounded-xl text-sm hover:bg-teal-500/10 transition-all">Explore Services</Link>
            </div>
            <div className="flex flex-wrap gap-6 sm:gap-8">
              {[{l:'Projects Delivered'},{l:'Uptime SLA'},{l:'Lab Partners'}].map((s,i)=>(
                <div key={i}><p className="text-teal-300 font-extrabold font-display text-xl sm:text-2xl">Coming soon</p><p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">{s.l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-lab-dna py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><SectionHeader tag="Why FrontierBioLabs" title="Built for Modern Research" desc="Everything you need to manage biotech projects from start to finish." /></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f,i)=>(
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4"><f.icon size={20} /></div>
                <h3 className="font-extrabold font-display text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-lab-tubes relative py-16 sm:py-24">
        <Particles n={4} />
        <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-white font-black font-display text-2xl sm:text-3xl mb-4">Ready to Transform Your Research?</h2>
          <p className="text-slate-300 text-base mb-8">Join 50+ biotech companies already using FrontierBioLabs to accelerate their projects.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg text-sm flex items-center gap-1">Get Started Free <ArrowRight size={16} /></span>
            <Link to="/contact" className="px-6 py-3 border-2 border-teal-500 text-teal-400 font-bold rounded-xl text-sm">Contact Sales</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4">{['No credit card required','14-day free trial','Cancel anytime'].map((t,i)=>(
            <span key={i} className="flex items-center gap-1 text-slate-300 text-xs sm:text-sm font-semibold"><CheckCircle size={14} className="text-emerald-400" />{t}</span>
          ))}</div>
        </div>
      </section>
    </div>
  );
}
