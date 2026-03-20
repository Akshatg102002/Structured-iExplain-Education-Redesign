
import React from 'react';
import { TESTIMONIALS } from '../data.ts';

const Testimonials: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-blue dark:text-white mb-4">Student Stories</h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">Real experiences from students who transformed their careers with iExplain.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-slate-50" />
                <div>
                  <h4 className="font-bold text-brand-blue dark:text-white text-lg">{t.name}</h4>
                  <p className="text-brand-gold font-bold text-xs uppercase tracking-widest">{t.univ}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed italic">
                "{t.text}"
              </p>
              <div className="mt-6 flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
