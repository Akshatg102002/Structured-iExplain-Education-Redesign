
import React from 'react';
import { StudyIndiaDetailData } from '../types.ts';
import ContactForm from './ContactForm.tsx';

import { useNavigate } from 'react-router-dom';

interface StudyIndiaDetailPageProps {
  data: StudyIndiaDetailData;
}

const StudyIndiaDetailPage: React.FC<StudyIndiaDetailPageProps> = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900">
      <div className="w-24 h-24 bg-brand-light dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <i className="fa-solid fa-graduation-cap text-4xl text-brand-gold"></i>
      </div>
      <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-4">Content Updating</h2>
      <p className="text-gray-500 font-medium max-w-md">We are curating the details for this program.</p>
      <button onClick={() => navigate('/contact')} className="mt-8 px-8 py-4 bg-brand-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-gold transition-all">Contact Us</button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 font-sans pb-20 animate-fade-in">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.heroImage} className="w-full h-full object-cover" alt={data.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 mt-20">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-lg uppercase">{data.title.split(' ')[0]}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Intro */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-brand-blue dark:text-white mb-6 leading-tight">{data.title}</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 font-medium leading-loose text-justify">
             <p>{data.intro}</p>
          </div>
          <div className="fixed bottom-6 left-6 z-50">
             {/* WhatsApp already handled by FloatingActions globally, or can be specific here */}
          </div>
        </div>

        {/* Why Section */}
        <div className="bg-[#022c4a] rounded-[2rem] p-10 md:p-16 text-white shadow-xl relative overflow-hidden">
           <h3 className="text-2xl font-black mb-8 text-center">{data.why.title}</h3>
           <div className="space-y-4 relative z-10">
              {data.why.points.map((point, idx) => (
                <div key={idx} className="flex items-start">
                   <i className="fa-solid fa-check text-brand-gold mt-1.5 mr-4 text-sm"></i>
                   <p className="text-sm font-medium leading-relaxed opacity-90">{point}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Duration Cards */}
        <div>
           <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-10 text-center">{data.duration.title}</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.duration.cards.map((text, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex items-center text-center justify-center min-h-[160px] hover:-translate-y-2 transition-transform">
                   <p className="text-sm font-bold text-gray-700 dark:text-gray-200 leading-relaxed">{text}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Eligibility */}
        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-[2rem] p-10">
           <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-8">{data.eligibility.title}</h3>
           <ul className="space-y-4">
              {data.eligibility.points.map((point, idx) => (
                <li key={idx} className="flex items-start">
                   <div className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-4 shrink-0 mt-0.5 text-[10px]">
                     <i className="fa-solid fa-chevron-right"></i>
                   </div>
                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">{point}</span>
                </li>
              ))}
           </ul>
        </div>

        {/* Documents */}
        <div>
           <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-2 text-center">{data.documents.title}</h3>
           <p className="text-center text-gray-500 text-sm mb-10">{data.documents.subtitle}</p>
           <div className="space-y-3 max-w-4xl mx-auto">
              {data.documents.points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-4">
                   <i className="fa-solid fa-angles-right text-brand-gold text-sm"></i>
                   <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{point}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Admission Process */}
        <div className="border border-brand-gold rounded-[2rem] p-10 relative">
           <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-8 text-center bg-white dark:bg-slate-900 absolute -top-5 left-1/2 -translate-x-1/2 px-6">
             {data.process.title}
           </h3>
           <div className="space-y-4">
              {data.process.steps.map((step, idx) => (
                <div key={idx} className="border border-brand-gold/30 p-4 rounded-xl flex items-center bg-white dark:bg-slate-800">
                   <i className="fa-solid fa-arrow-right text-brand-blue dark:text-white mr-4"></i>
                   <span className="text-sm font-bold text-brand-blue dark:text-white">{step}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Comparison Section (Economical vs Advantages) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Economical */}
           <div className="bg-[#EAE2CF] dark:bg-[#3a352a] p-8 rounded-3xl border-4 border-[#D4C5A9] dark:border-[#524b3b]">
              <h3 className="text-xl font-black text-brand-blue dark:text-white mb-6 text-center">{data.economical.title}</h3>
              <ol className="list-decimal pl-5 space-y-3 text-sm font-medium text-gray-800 dark:text-gray-200 marker:font-bold marker:text-brand-blue">
                 {data.economical.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ol>
           </div>
           
           {/* Advantages */}
           <div className="bg-[#EAE2CF] dark:bg-[#3a352a] p-8 rounded-3xl border-4 border-[#D4C5A9] dark:border-[#524b3b]">
              <h3 className="text-xl font-black text-brand-blue dark:text-white mb-6 text-center">{data.advantages.title}</h3>
              <ol className="list-decimal pl-5 space-y-3 text-sm font-medium text-gray-800 dark:text-gray-200 marker:font-bold marker:text-brand-blue">
                 {data.advantages.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ol>
           </div>
        </div>

        {/* International Applicants */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700">
           <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6">{data.international.title}</h3>
           <ol className="list-decimal pl-5 space-y-3 text-sm font-medium text-gray-600 dark:text-gray-300">
              {data.international.points.map((pt, i) => <li key={i}>{pt}</li>)}
           </ol>
        </div>

        {/* Dates & Govt Universities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="border-2 border-black dark:border-white p-8 rounded-xl">
              <h3 className="text-xl font-black text-brand-blue dark:text-white mb-6 text-center">{data.dates.title}</h3>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-6">For pursuing MBBS in India, the bodies which conduct the entrance exams are as follows:</p>
              <ul className="space-y-4">
                 {data.dates.points.map((pt, i) => (
                   <li key={i} className="flex items-start">
                      <span className="w-3 h-3 bg-[#A0522D] rounded-full mt-1 mr-3 shrink-0"></span>
                      <span className="text-sm font-bold text-gray-800 dark:text-white">{pt}</span>
                   </li>
                 ))}
              </ul>
           </div>

           <div className="border-2 border-black dark:border-white p-8 rounded-xl">
              <h3 className="text-xl font-black text-brand-blue dark:text-white mb-6 text-center">{data.govt.title}</h3>
              <ul className="space-y-4">
                 {data.govt.points.map((pt, i) => (
                   <li key={i} className="flex items-start">
                      <span className="w-3 h-3 bg-[#DAA520] rounded-full mt-1 mr-3 shrink-0"></span>
                      <span className="text-sm font-bold text-gray-800 dark:text-white">{pt}</span>
                   </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* Explore India */}
        <div className="bg-[#F2F2F2] dark:bg-slate-800 p-10 rounded-[2rem]">
           <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6">{data.explore.title}</h3>
           <ol className="list-decimal pl-5 space-y-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {data.explore.points.map((pt, i) => <li key={i}>{pt}</li>)}
           </ol>
        </div>

        {/* Inline Contact Form */}
        <div className="bg-brand-blue p-10 rounded-[2.5rem] shadow-xl text-white">
            <h3 className="text-2xl font-black mb-6 text-center">Get Free Counseling for {data.title}</h3>
            <div className="bg-white rounded-3xl p-6 shadow-lg max-w-3xl mx-auto">
                <ContactForm />
            </div>
        </div>

      </div>
    </div>
  );
};

export default StudyIndiaDetailPage;
