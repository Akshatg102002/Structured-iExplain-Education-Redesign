
import React from 'react';
import { ProgramDetailData } from '../types.ts';
import ContactForm from './ContactForm.tsx';

import { useNavigate } from 'react-router-dom';

interface ProgramDetailPageProps {
  data: ProgramDetailData;
  type: 'course' | 'country';
}

const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({ data, type }) => {
  const navigate = useNavigate();
  if (!data) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-fade-in bg-white dark:bg-slate-900">
      <div className="w-24 h-24 bg-brand-light dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <i className="fa-solid fa-earth-americas text-4xl text-brand-gold"></i>
      </div>
      <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-4">Content Coming Soon</h2>
      <p className="text-gray-500 font-medium max-w-md">We are currently curating the comprehensive guide for this program.</p>
      <button onClick={() => navigate('/contact')} className="mt-8 px-8 py-4 bg-brand-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-gold transition-all">Contact Us</button>
    </div>
  );

  const heroImg = data.heroImage || "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=1600";

  return (
    <div className="bg-white dark:bg-slate-900 pb-20 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} className="w-full h-full object-cover" alt={data.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/60 to-brand-blue/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 mt-16 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-sm">{data.title}</h1>
          {data.tagline && <p className="text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-sm">{data.tagline}</p>}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Content Area */}
        <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700 mb-16">
           <div 
             className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 font-medium leading-loose
             prose-headings:text-brand-blue dark:prose-headings:text-white prose-headings:font-black
             prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-10 first:prose-h3:mt-0
             prose-ul:list-disc prose-li:marker:text-brand-gold
             prose-strong:text-brand-blue dark:prose-strong:text-white"
             dangerouslySetInnerHTML={{ __html: data.content || data.about || data.overview || '' }}
           />
        </div>

        {/* FAQs */}
        {data.faqs && data.faqs.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-10 text-center">
              Frequently Asked <span className="text-brand-gold">Questions</span>
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <details className="group">
                    <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-brand-blue dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors select-none">
                      <span className="text-sm md:text-base pr-4">{faq.question}</span>
                      <span className="transition-transform duration-300 group-open:rotate-180 flex-shrink-0 w-6 h-6 flex items-center justify-center bg-brand-light dark:bg-slate-700 rounded-full text-brand-gold">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </span>
                    </summary>
                    <div className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed p-6 pt-0 animate-fade-in">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inline Contact Form */}
        <div id="page-contact" className="bg-brand-blue p-8 md:p-12 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-black mb-4">Still have questions?</h3>
                <p className="text-white/80 font-medium mb-8">Our counselors are ready to help you with personalized advice for {data.title}.</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white"><i className="fa-solid fa-phone"></i></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Call Us</p><p className="font-bold">+91 97738 47799</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white"><i className="fa-solid fa-envelope"></i></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Email Us</p><p className="font-bold">info@iexplaineducation.in</p></div>
                    </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <ContactForm />
              </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProgramDetailPage;
