import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Seo } from '../components/Seo';
import { policySeo } from '../../shared/seo';

export const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const policies = [
    {
      icon: "⚖️",
      title: "Reservation Policy",
      description: "Prioritize your slot. Cancellations 72h prior incur a 45% fee. No-shows or last-minute changes (within 72h) are strictly non-refundable."
    },
    {
      icon: "⛈️",
      title: "Unforeseen Circumstances",
      description: "Safety first! Full refunds (minus standard fees) issued if trips are cancelled by us due to natural events or government restrictions."
    },
    {
      icon: "🚧",
      title: "On-the-Road Logic",
      description: "We aren't responsible for delays caused by traffic, weather, or sudden local authority changes once the journey has begun."
    },
    {
      icon: "🚫",
      title: "Conduct Code",
      description: "We are a strictly dry/smoke-free community. Any substance use will lead to immediate removal and a permanent ban from our trips."
    },
    {
      icon: "⏱️",
      title: "Time Integrity",
      description: "Our departures are precise. To respect everyone's time and catch the views, the bus will leave exactly as scheduled."
    },
    {
      icon: "🧤",
      title: "Nature First",
      description: "Leave nothing behind but footprints. Strictly no littering; help us keep the mountains pristine by carrying your waste back."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Seo {...policySeo.terms} />
      {/* Header Spacer */}
      <div className="h-24" />
      
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Policy</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">Terms and <br />Conditions</h1>
          </div>

          {/* Quick Policy Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {policies.map((policy, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col gap-4">
                <span className="text-3xl">{policy.icon}</span>
                <h3 className="font-black text-xs uppercase tracking-wider">{policy.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{policy.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12 pt-12 text-slate-700">
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                <span className="w-12 h-[1px] bg-slate-200" />
                Agreement
              </div>
              <h2 className="text-3xl font-black tracking-tight">Rules & Guidelines</h2>
              <div className="prose prose-slate prose-lg max-w-none">
                <ul className="space-y-4 list-none p-0">
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">01.</span>
                    <p><strong>Team Spirit:</strong> A successful expedition relies on mutual respect and cooperation with your trek captain at all times.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">02.</span>
                    <p><strong>Sober Trails:</strong> We maintain a strictly alcohol and smoke-free environment throughout the entire journey.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">03.</span>
                    <p><strong>Pristine Nature:</strong> Help us protect the wild. Disposal of any plastic or non-biodegradable waste on the trail is strictly forbidden.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">04.</span>
                    <p><strong>Regulatory Compliance:</strong> We respect local authority mandates. While we strive to provide alternatives if access is denied, we are not liable for their final decisions.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">05.</span>
                    <p><strong>Personal Gear:</strong> Participants are solely responsible for their personal items and equipment throughout the trip.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">06.</span>
                    <p><strong>Timeline Variance:</strong> Return and arrival times are estimates. Delays due to weather, traffic, or road conditions are possible.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">07.</span>
                    <p><strong>Aura of Adventure:</strong> Trekking involves basic amenities. Campfires and hot water are communal and subject to weather availability.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">08.</span>
                    <p><strong>Health & Safety:</strong> Signing our mandatory risk and indemnity disclosure is required for all. Minors must have a guardian's authorization.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">09.</span>
                    <p><strong>Secure Protection:</strong> While we prioritize safety, personal travel and medical insurance are strongly advised for all participants.</p>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight">Group Etiquette</h2>
              <p className="text-lg leading-relaxed">
                Stay with the group at all times; inform lead before separating. Participants wandering separately must formally discontinue the trip by providing an official message.
              </p>
              <p className="text-slate-500 italic">
                Adventure Chaarana reserves the right to cancel a batch if minimum participants are not reached. Refunds will be issued excluding gateway fees.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-red-500 uppercase">Emergency & Risks</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">Natural Hazards</h4>
                  <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600">
                    <li>Extreme weather (rain, flash floods, thunderstorms, lighting)</li>
                    <li>Wildlife encounters (bears, snakes, insects) or harmful plants</li>
                    <li>Natural disasters (landslides, earthquakes, whiteouts)</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">Physical Injury</h4>
                  <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600">
                    <li>AMS, Pulminary Edema (HAPE), Cerebral Edema (HACE)</li>
                    <li>Slips, falls, exposure to sun/cold (frostbite, hypothermia)</li>
                    <li>Difficulty in emergency evacuation from remote locations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 text-white p-12 rounded-[3rem] space-y-8">
              <h2 className="text-3xl font-black tracking-tight text-brand-orange">Preparation Guidelines</h2>
              <div className="grid sm:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-brand-orange/60">Do (15 Days Before)</h4>
                  <ul className="text-sm space-y-2 list-none p-0 text-slate-300">
                    <li>• Brisk walk/jog 10-12 km daily</li>
                    <li>• Stair climbing (10-15 floors)</li>
                    <li>• Strength training for legs/core</li>
                    <li>• Cardio: Running, Cycling, Swimming</li>
                    <li>• Consult a doctor before joining</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-xs uppercase tracking-widest text-red-400">Avoid (30 Days Before)</h4>
                  <ul className="text-sm space-y-2 list-none p-0 text-slate-300">
                    <li>• Smoking, Alcohol, Vaping</li>
                    <li>• Sleep Deprivation & Junk Food</li>
                    <li>• Sudden intense new workouts</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6 border-t border-slate-100 pt-12">
              <h2 className="text-3xl font-black tracking-tight">Photography Rights</h2>
              <p className="text-slate-600">
                Adventure Chaarana reserves the right to use trip photos/videos for promotional purposes. Booking grants us a royalty-free license. If you wish to opt-out, notify us before the journey starts.
              </p>
            </section>

            <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 text-red-900">
              <p className="text-sm font-bold leading-relaxed">
                <strong>Liability Clause:</strong> Participants join at their own risk. Adventure Chaarana is not liable for injuries, accidents, death, or loss of personal belongings. Insurance is mandatory.
              </p>
            </div>
            
            <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
              Important: Due to unforeseen circumstances such as natural disasters, roadblocks, local unrest, government mandates, or severe traffic, certain locations in the itinerary may become inaccessible. In such events, Adventure Chaarana shall not be held liable, and no refunds, alternative arrangements, or compensatory claims will be provided.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
