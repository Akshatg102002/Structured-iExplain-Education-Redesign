
import React from 'react';
import { EntranceExamData } from '../types.ts';
import ContactForm from './ContactForm.tsx';

import { useNavigate } from 'react-router-dom';

interface EntranceExamDetailPageProps {
  data: EntranceExamData;
}

const EntranceExamDetailPage: React.FC<EntranceExamDetailPageProps> = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900 animate-fade-in">
      <div className="w-24 h-24 bg-brand-light dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <i className="fa-solid fa-file-signature text-4xl text-brand-gold"></i>
      </div>
      <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-4">Exam Details Updating</h2>
      <p className="text-gray-500 font-medium max-w-md">We are currently curating the latest syllabus and patterns for this exam.</p>
      <button onClick={() => navigate('/contact')} className="mt-8 px-8 py-4 bg-brand-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-gold transition-all">Contact Us</button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 font-sans pb-20 animate-fade-in">
      
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.heroImage} className="w-full h-full object-cover" alt={data.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 mt-20">
          <span className="inline-block px-4 py-2 bg-brand-gold/20 backdrop-blur-md border border-brand-gold/40 text-brand-gold rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Entrance Examination
          </span>
          <h1 className="text-4xl lg:text-7xl font-black text-white mb-6 drop-shadow-xl">{data.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 space-y-16">
        
        {/* Intro */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700">
           <h2 className="text-2xl font-black text-brand-blue dark:text-white mb-6 flex items-center">
             <i className="fa-solid fa-circle-info text-brand-gold mr-3"></i> Overview
           </h2>
           <p className="text-gray-600 dark:text-gray-300 text-lg leading-loose font-medium mb-8">
             {data.intro}
           </p>
           {data.examParts && (
             <div className="flex flex-wrap gap-4 mb-8">
               {data.examParts.map((part, i) => (
                 <span key={i} className="px-6 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl font-black text-brand-blue dark:text-white uppercase tracking-wider text-sm border border-gray-100 dark:border-slate-600">
                   {i+1}. {part}
                 </span>
               ))}
             </div>
           )}
           {data.additionalNote && (
             <p className="text-sm text-gray-500 dark:text-gray-400 italic border-l-4 border-brand-gold pl-4">
               {data.additionalNote}
             </p>
           )}
        </div>

        {/* Eligibility Card - Dark Blue */}
        <div className="bg-[#02385A] text-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
           <h2 className="text-3xl font-black mb-10 text-brand-gold relative z-10">{data.eligibility.title}</h2>
           <ul className="space-y-6 relative z-10">
             {data.eligibility.points.map((pt, i) => (
               <li key={i} className="flex items-start">
                 <div className="w-2 h-2 bg-brand-gold rounded-full mt-2.5 mr-4 shrink-0"></div>
                 <p className="text-lg font-medium leading-relaxed opacity-90">{pt}</p>
               </li>
             ))}
           </ul>
        </div>

        {/* Syllabus Section */}
        <div>
           <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-10 text-center">Comprehensive Syllabus</h2>
           
           <div className="space-y-12">
             
             {/* Maths - 2 Col Box */}
             {data.syllabus.maths && (
                <div className="bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-gray-100 dark:border-slate-700 overflow-hidden">
                   <div className="bg-gray-50 dark:bg-slate-700/50 p-6 border-b border-gray-100 dark:border-slate-700 text-center">
                      <h3 className="text-2xl font-black text-brand-blue dark:text-white">Mathematics Syllabus</h3>
                   </div>
                   <div className="p-8">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                         {data.syllabus.maths.map((topic, i) => (
                           <li key={i} className="flex items-center text-sm font-bold text-gray-600 dark:text-gray-300">
                              <i className="fa-solid fa-square-root-variable text-brand-gold w-6"></i> {topic}
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>
             )}

             {/* Physics - Section A / B */}
             {data.syllabus.physics && (
                <div className="bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-gray-100 dark:border-slate-700 overflow-hidden">
                   <div className="bg-gray-50 dark:bg-slate-700/50 p-6 border-b border-gray-100 dark:border-slate-700 text-center">
                      <h3 className="text-2xl font-black text-brand-blue dark:text-white">Physics Syllabus</h3>
                   </div>
                   <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                         <h4 className="text-brand-gold font-black uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Section A</h4>
                         <ul className="space-y-3">
                            {data.syllabus.physics.sectionA.map((topic, i) => (
                               <li key={i} className="flex items-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                  <i className="fa-solid fa-atom mt-1 mr-3 text-brand-blue/40 dark:text-white/40 text-xs"></i> {topic}
                               </li>
                            ))}
                         </ul>
                      </div>
                      <div>
                         <h4 className="text-brand-gold font-black uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Section B (Experimental)</h4>
                         <ul className="space-y-4">
                            {data.syllabus.physics.sectionB.map((exp, i) => (
                               <li key={i} className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg">
                                  <span className="font-bold mr-2 text-brand-blue dark:text-white">{i+1}.</span> {exp}
                               </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                </div>
             )}

             {/* Chemistry - 3 Col */}
             {data.syllabus.chemistry && (
                <div>
                   <h3 className="text-2xl font-black text-brand-blue dark:text-white text-center mb-8">Chemistry Syllabus</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#fffbeb] dark:bg-yellow-900/10 p-8 rounded-[2rem] border border-yellow-100 dark:border-yellow-900/30">
                         <h4 className="font-black text-brand-blue dark:text-white mb-6 uppercase text-sm tracking-widest text-center text-[#d97706]">Physical Chemistry</h4>
                         <ul className="space-y-3">
                            {data.syllabus.chemistry.physical.map((t, i) => (
                               <li key={i} className="text-xs font-bold text-gray-700 dark:text-gray-300 list-disc ml-4">{t}</li>
                            ))}
                         </ul>
                      </div>
                      <div className="bg-[#f0f9ff] dark:bg-sky-900/10 p-8 rounded-[2rem] border border-sky-100 dark:border-sky-900/30">
                         <h4 className="font-black text-brand-blue dark:text-white mb-6 uppercase text-sm tracking-widest text-center text-[#0284c7]">Inorganic Chemistry</h4>
                         <ul className="space-y-3">
                            {data.syllabus.chemistry.inorganic.map((t, i) => (
                               <li key={i} className="text-xs font-bold text-gray-700 dark:text-gray-300 list-disc ml-4">{t}</li>
                            ))}
                         </ul>
                      </div>
                      <div className="bg-[#f0fdf4] dark:bg-green-900/10 p-8 rounded-[2rem] border border-green-100 dark:border-green-900/30">
                         <h4 className="font-black text-brand-blue dark:text-white mb-6 uppercase text-sm tracking-widest text-center text-[#16a34a]">Organic Chemistry</h4>
                         <ul className="space-y-3">
                            {data.syllabus.chemistry.organic.map((t, i) => (
                               <li key={i} className="text-xs font-bold text-gray-700 dark:text-gray-300 list-disc ml-4">{t}</li>
                            ))}
                         </ul>
                      </div>
                   </div>
                </div>
             )}
           </div>
        </div>

        {/* Preparation Tips */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 text-center">
           <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-8">{data.title} Preparation Tips</h2>
           <p className="text-gray-500 mb-8 font-medium">Candidates preparing for {data.title} must follow a strategic study plan to ensure a good score in the exam</p>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {data.preparationTips.map((tip, i) => (
                 <div key={i} className="flex items-start p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl hover:bg-brand-light transition-colors">
                    <div className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold text-sm mr-4 shrink-0">{i+1}</div>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mt-1">{tip}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-brand-blue p-10 rounded-[2.5rem] text-white">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-black mb-4">Need Guidance for {data.title}?</h2>
                 <p className="text-white/80 font-medium mb-8">Our expert counselors can help you with exam strategy, college selection, and application processes.</p>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
                       <i className="fa-solid fa-phone"></i> <span>+91 97738 47799</span>
                    </div>
                 </div>
              </div>
              <div className="bg-white rounded-3xl p-6">
                 <ContactForm />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default EntranceExamDetailPage;
