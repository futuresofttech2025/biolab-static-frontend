import { Users, Globe, Award, FlaskConical, UserCircle2, Beaker, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader, Particles } from '../components/UI';
import { ArrowRight, CheckCircle } from 'lucide-react';

const stats = [
  {icon: Beaker,   value: '0', label: 'Projects'},
  {icon: Globe,    value: '0', label: 'Lab Partners'},
  {icon: Activity, value: '0', label: 'Uptime'},
  {icon: Users,    value: '0', label: 'Researchers'},
];

const team = [{role:'CEO & Co-Founder'},{role:'CTO'},{role:'VP of Science'},{role:'VP of Engineering'}];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-lab-microscope relative flex items-center min-h-[50vh]">
        <Particles n={5}/>
        <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-teal-300 text-xs font-bold tracking-[.15em] uppercase mb-2">About Us</p>
          <h1 className="text-white font-black font-display text-3xl sm:text-4xl mb-3">Pioneering the Future of Biotech Services</h1>
          <p className="text-slate-300 text-base">We're building the infrastructure that connects researchers with the world's best laboratories.</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-100 py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s,i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-teal-50/60 border border-teal-100 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center mb-3"><s.icon size={22}/></div>
                <p className="text-3xl font-black font-display text-slate-900 mb-1">{s.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white pt-10 pb-20 sm:pt-14 sm:pb-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — mission card */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-teal-50 rounded-full blur-3xl opacity-70"/>
              <div className="absolute -bottom-6 -right-6 w-56 h-56 bg-emerald-50 rounded-full blur-3xl opacity-60"/>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center"><FlaskConical size={20} className="text-teal-400"/></div>
                  <span className="text-teal-400 font-bold text-sm uppercase tracking-widest">Our Mission</span>
                </div>
                <blockquote className="text-white text-lg sm:text-xl font-semibold leading-relaxed mb-6">
                  "Instead of chasing vendors, submit your inquiry once. We handle the rest."
                </blockquote>
                <div className="border-t border-white/10 pt-6 grid grid-cols-2 gap-4">
                  {[{v:'North America',l:'Coverage'},{v:'Single Platform',l:'All Vendors'},{v:'Vetted',l:'Providers'},{v:'End-to-End',l:'Support'}].map((item,i) => (
                    <div key={i}>
                      <p className="text-teal-300 font-bold text-sm">{item.v}</p>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">{item.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — story text */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-bold uppercase tracking-widest mb-4">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 leading-tight mb-6">
                Founded by Scientists,<br/>
                <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">Built for Science</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed">
                <p>Frontier Biolabs was founded by scientists who have dedicated their careers to making discoveries across industry, academia, and beyond. After years of leading research programs across North America, our founder kept noticing a pattern: whether in a biotech startup, a clinical group, or an academic lab, great ideas were held back by one bottleneck—finding reliable, affordable CROs and specialty labs that actually deliver on time.</p>
                <p>Therefore, we developed a solution that we had long envisioned.</p>
                <p>Frontier Biolabs consolidates the world's scientific expertise into a single, trusted ecosystem. Our marketplace connects biotechs, academic researchers, clinical and translational teams, and innovation groups with carefully vetted providers across North America and beyond—covering discovery, preclinical work, bioanalysis, CMC, specialty assays, consulting, and more.</p>
                <p>Our team of experienced scientists personally selects your best-fit options, guides you through decisions, and supports your project from kickoff to final delivery—ensuring clarity, quality, and steady progress every step of the way.</p>
                <p className="font-semibold text-slate-800">No more fragmented outreach. No more wasted time. Just science that progresses—smoothly, transparently, and at the pace discovery demands.</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/services" className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm flex items-center gap-2">Explore Services <ArrowRight size={15}/></Link>
                <Link to="/contact" className="px-6 py-3 border-2 border-teal-500 text-teal-600 font-bold rounded-xl text-sm hover:bg-teal-50 transition-all">Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-lab-cells py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionHeader tag="Our Team" title="Meet the Leaders" desc="The scientists and engineers building the future of biotech."/>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {team.map((t,i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="h-40 sm:h-48 bg-slate-100 flex items-center justify-center"><UserCircle2 size={72} className="text-slate-300"/></div>
                <div className="p-4 text-center"><h6 className="font-bold font-display text-slate-400 text-sm">— Confidential —</h6></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
