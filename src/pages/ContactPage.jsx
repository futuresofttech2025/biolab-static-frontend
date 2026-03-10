import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SectionHeader, Particles } from '../components/UI';
export default function ContactPage(){return(<div>
  <section className="bg-lab-microscope relative flex items-center min-h-[50vh]"><Particles n={5}/><div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 text-center"><p className="text-teal-300 text-xs font-bold tracking-[.15em] uppercase mb-2">Contact</p><h1 className="text-white font-black font-display text-3xl sm:text-4xl mb-3">Get in Touch</h1><p className="text-slate-300 text-base">Ready to accelerate your research? We'd love to hear from you.</p></div></section>
  <section className="bg-lab-dna py-12 sm:py-16"><div className="max-w-[1000px] mx-auto px-4 sm:px-6"><div className="grid lg:grid-cols-5 gap-8"><div className="lg:col-span-2">
    <h4 className="font-extrabold font-display text-slate-900 text-lg mb-3">Contact Information</h4>
    <p className="text-sm text-slate-500 font-medium mb-6">Our team is available Monday through Friday, 9am to 6pm EST.</p>
    {[{icon:Mail,label:'Email',value:'hello@frontierbiolabs.io'},{icon:Phone,label:'Phone',value:'+1 (555) 123-4567'},{icon:MapPin,label:'Office',value:'Cambridge, MA 02142'},{icon:Clock,label:'Hours',value:'Mon–Fri, 9am–6pm EST'}].map((c,i)=>(
      <div key={i} className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0"><c.icon size={18}/></div><div><p className="text-slate-400 text-xs font-semibold">{c.label}</p><p className="text-slate-800 text-sm font-bold">{c.value}</p></div></div>
    ))}
  </div><div className="lg:col-span-3"><div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-md">
    <h5 className="font-extrabold font-display text-slate-900 mb-4">Send a Message</h5>
    <div className="grid sm:grid-cols-2 gap-3 mb-3"><div><label className="text-sm font-semibold text-slate-700 block mb-1.5">First Name</label><input className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="Jane"/></div><div><label className="text-sm font-semibold text-slate-700 block mb-1.5">Last Name</label><input className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="Smith"/></div></div>
    <div className="mb-3"><label className="text-sm font-semibold text-slate-700 block mb-1.5">Email</label><input type="email" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="jane@company.com"/></div>
    <div className="mb-4"><label className="text-sm font-semibold text-slate-700 block mb-1.5">Message</label><textarea rows={4} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="Tell us about your project..."/></div>
    <button className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20">Send Message</button>
  </div></div></div></div></section>
</div>);}
