import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Seo } from '../components/Seo';
import { policySeo } from '../../shared/seo';

export const SafetyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Seo {...policySeo.safety} />
      <div className="h-24" />
      <div className="max-w-4xl mx-auto px-6 pb-24 text-slate-700">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Ethics</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">Safety & <br />Conduct</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cyan-50 p-10 rounded-[3rem] border border-cyan-100 flex flex-col gap-6">
              <span className="text-4xl">🌍</span>
              <h3 className="text-xl font-black">Environment First</h3>
              <p className="text-sm leading-relaxed font-medium text-cyan-900/70">
                We maintain a strict <strong>"Leave No Trace"</strong> policy. Every piece of plastic or waste you carry in must be carried back to the city. Respect the local flora and fauna.
              </p>
            </div>
            <div className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100 flex flex-col gap-6">
              <span className="text-4xl">🤝</span>
              <h3 className="text-xl font-black">Group Harmony</h3>
              <p className="text-sm leading-relaxed font-medium text-orange-900/70">
                Respect fellow trekkers and local culture. Disrespectful, harmful, or illegal behavior results in immediate expulsion without refund.
              </p>
            </div>
          </div>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight">Adventure Safety Code</h2>
            <div className="grid gap-4">
              {[
                { title: "No Sustance Use", desc: "Strictly no drinking or smoking during the entire duration of the trip. Safety depends on your alertness.", icon: "🚫" },
                { title: "Listen to Leads", desc: "Follow the Trip Captain's instructions at all times. Do not enter water bodies or explore solo without permission.", icon: "📣" },
                { title: "Stay Together", desc: "Never separate from the group. If you wander off, you must formally discontinue the trip via an official message.", icon: "👫" },
                { title: "Gear Check", desc: "Ensure you are carrying the recommended gear and wearing appropriate shoes. Safety starts with preparation.", icon: "👟" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div className="space-y-1">
                    <h4 className="font-black text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 text-white p-12 rounded-[3.5rem] space-y-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-red-400">Biological & Physical Risks</h2>
              <p className="text-slate-400 text-sm">Every participant must be aware of the inherent risks of adventure travel.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-12 text-sm">
              <div className="space-y-4">
                <h4 className="font-black uppercase tracking-widest text-slate-500">Outdoor Hazards</h4>
                <ul className="space-y-3 list-none p-0 text-slate-300">
                  <li className="flex gap-3"><span className="text-red-400">•</span> Flash floods & thunderstorms</li>
                  <li className="flex gap-3"><span className="text-red-400">•</span> Snake bites & insect stings</li>
                  <li className="flex gap-3"><span className="text-red-400">•</span> Landslides & extreme cold</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-black uppercase tracking-widest text-slate-500">Physical Sickness</h4>
                <ul className="space-y-3 list-none p-0 text-slate-300">
                  <li className="flex gap-3"><span className="text-red-400">•</span> AMS & Pulmonary Edema</li>
                  <li className="flex gap-3"><span className="text-red-400">•</span> Heatstroke / Hypothermia</li>
                  <li className="flex gap-3"><span className="text-red-400">•</span> Slips & falls in remote areas</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 italic text-blue-900 text-sm text-center">
            "We do not inherit the earth from our ancestors, we borrow it from our children." — Let's travel responsibly. 🌲
          </div>
        </motion.div>
      </div>
    </div>
  );
};
