import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Refund & Cancellation Policy | Adventure Chaarana</title>
        <meta name="description" content="Understand our refund process and cancellation charges. 72h cancellation rules and calamity refunds explained." />
        <link rel="canonical" href="https://adventurechaarana.com/refund-policy" />
      </Helmet>
      <div className="h-24" />
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Transparency</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">Refund <br />Policy</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] space-y-6">
              <h3 className="text-xl font-black">Standard Cancellations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-brand-orange/10 rounded-xl border border-brand-orange/20">
                  <span className="text-brand-orange font-black text-xs block mb-1">🌅 ONE DAY & SUNRISE TREKS</span>
                  <p className="text-xs font-semibold leading-relaxed">Bookings are strictly non-refundable under any circumstances. However, slot rescheduling is allowed up to 24 hours before departure for One Day treks.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-cyan-400 font-black text-xs block mb-1">OTHER TREKS: 72 HOURS OR MORE</span>
                  <p className="text-sm font-medium">45% of total package amount will be deducted as cancellation charges.</p>
                </div>
                <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <span className="text-red-400 font-black text-xs block mb-1">OTHER TREKS: WITHIN 72 HOURS</span>
                  <p className="text-sm font-medium">Strictly no refunds or rescheduling allowed under any circumstances.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-center gap-6">
              <h3 className="text-xl font-black">Natural Calamities</h3>
              <p className="text-slate-600 leading-relaxed">
                If a trip is cancelled by Adventure Chaarana due to natural disasters, political unrest, or forest entry prohibitions before the journey starts, a <strong>Full Refund</strong> will be issued (minus GST or Gateway fees).
              </p>
              <div className="flex items-center gap-3 text-brand-orange">
                <span className="text-2xl">⛈️</span>
                <span className="text-xs font-black uppercase tracking-widest">Weather Protection</span>
              </div>
            </div>
          </div>

          <div className="space-y-12 pt-12">
            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight">Terms of Refund</h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                <ul className="space-y-4 list-none p-0">
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">•</span>
                    <p><strong>Punctuality:</strong> The bus will leave at the scheduled time. No refunds for latecomers as sunset/sunrise waits for no one.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">•</span>
                    <p><strong>Route Blocks:</strong> No refunds or alternative arrangements if the itinerary is blocked by traffic, weather, or authority restrictions during travel.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">•</span>
                    <p><strong>Batch Cancellation:</strong> Adventure Chaarana reserves the right to cancel a batch if minimum participants are not reached. Refunds will be issued excluding gateway fees.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-orange font-bold">•</span>
                    <p><strong>Termination:</strong> Any participant expelled for breach of conduct (smoking, drinking, nuisance) will not be eligible for a refund.</p>
                  </li>
                </ul>
              </div>
            </section>

            <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
              <h3 className="text-lg font-black mb-4">Refund Processing</h3>
              <p className="text-sm text-blue-900 leading-relaxed font-medium">
                Approved refunds are typically processed within 5-7 working days and credited back to the original payment source. For any queries regarding your cancellation, please contact our support team with your booking ID.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
