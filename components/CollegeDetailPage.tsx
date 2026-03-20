
import React from 'react';
import { CollegeDetailData } from '../types.ts';
import ContactForm from './ContactForm.tsx';

import { useNavigate } from 'react-router-dom';

interface CollegeDetailPageProps {
  data: CollegeDetailData;
}

const CollegeDetailPage: React.FC<CollegeDetailPageProps> = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-fade-in bg-white dark:bg-slate-900">
      <div className="w-24 h-24 bg-brand-light dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <i className="fa-solid fa-university text-4xl text-brand-gold"></i>
      </div>
      <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-4">College Details Updating</h2>
      <p className="text-gray-500 font-medium max-w-md">We are currently curating the latest details for this university. Please contact us for the official brochure.</p>
      <button onClick={() => navigate('/contact')} className="mt-8 px-8 py-4 bg-brand-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-gold transition-all">Request Brochure</button>
    </div>
  );

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-slate-900 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={data.image} 
            className="w-full h-full object-cover" 
            alt={data.name} 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.error("Image load failed:", data.image);
              // Fallback to a placeholder if it fails
              target.src = "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1200";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/70 to-brand-blue/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 mt-16 animate-fade-in">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-gold text-[10px] font-black uppercase tracking-[0.25em] mb-6 shadow-xl">
            {data.type} University
          </span>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-sm">{data.name}</h1>
          <p className="text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-sm flex items-center justify-center">
            <i className="fa-solid fa-location-dot mr-2 text-brand-gold"></i> {data.location}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Stats Bar */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-slate-700 flex flex-wrap gap-8 items-center justify-between backdrop-blur-xl">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center text-xl"><i className="fa-regular fa-building"></i></div>
                 <div>
                   <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Established</p>
                   <p className="text-lg font-black text-brand-blue dark:text-white">{data.established}</p>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center text-xl"><i className="fa-solid fa-award"></i></div>
                 <div>
                   <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Type</p>
                   <p className="text-lg font-black text-brand-blue dark:text-white">{data.type}</p>
                 </div>
               </div>
               <button onClick={() => document.getElementById('college-contact')?.scrollIntoView({behavior: 'smooth'})} className="hidden md:block px-8 py-4 bg-brand-gold text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all ml-auto">
                 Apply Now
               </button>
            </div>

            {/* Introduction */}
            <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700">
               <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6 flex items-center">
                 <span className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-500 flex items-center justify-center mr-4 text-lg"><i className="fa-solid fa-align-left"></i></span>
                 Introduction
               </h3>
               <p className="text-gray-600 dark:text-gray-300 leading-loose text-lg font-medium whitespace-pre-line">{data.intro}</p>
               
               {data.highlights && (
                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.highlights.map((adv: string, i: number) => (
                      <div key={i} className="flex items-start p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-800">
                        <i className="fa-solid fa-star text-brand-gold mt-1 mr-3 text-xs"></i>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{adv}</span>
                      </div>
                    ))}
                 </div>
               )}
            </div>

            {/* Fee Structure */}
            {data.fees && (
              <div className="bg-[#022c4a] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-gold/20 rounded-full blur-[100px] group-hover:bg-brand-gold/30 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <h3 className="text-2xl font-black mb-8 flex items-center relative z-10">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-4 text-lg text-brand-gold"><i className="fa-solid fa-coins"></i></span>
                  Fee Structure
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                   {data.fees.structure.map((fee, i) => (
                     <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">{fee.label}</p>
                        <p className="text-xl font-black tracking-tight">{fee.value}</p>
                     </div>
                   ))}
                </div>
                {data.fees.note && (
                  <p className="mt-6 text-xs text-white/60 italic relative z-10">* {data.fees.note}</p>
                )}
              </div>
            )}

            {/* Eligibility & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700 h-full">
                <h3 className="text-xl font-black text-brand-blue dark:text-white mb-6 flex items-center">
                  <i className="fa-solid fa-check-double text-green-500 mr-3"></i> Eligibility
                </h3>
                <ul className="space-y-4">
                  {data.eligibility.map((item, i) => (
                    <li key={i} className="flex items-start text-sm font-bold text-gray-600 dark:text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-500 flex items-center justify-center shrink-0 mr-3 mt-0.5 text-[10px]"><i className="fa-solid fa-check"></i></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700 h-full">
                <h3 className="text-xl font-black text-brand-blue dark:text-white mb-6 flex items-center">
                  <i className="fa-solid fa-file-lines text-blue-500 mr-3"></i> Documents
                </h3>
                <ul className="space-y-4">
                  {data.documents.map((item, i) => (
                    <li key={i} className="flex items-start text-sm font-bold text-gray-600 dark:text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center shrink-0 mr-3 mt-0.5 text-[10px]"><i className="fa-solid fa-paperclip"></i></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Admission Process */}
             <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700">
               <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-8 flex items-center">
                 <span className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center mr-4 text-lg"><i className="fa-solid fa-road"></i></span>
                 Admission Process
               </h3>
               <div className="space-y-6 relative">
                 <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-100 dark:bg-slate-700"></div>
                 {data.admissionProcess.map((step, i) => (
                   <div key={i} className="relative pl-16">
                     <div className="absolute left-0 top-0 w-12 h-12 bg-white dark:bg-slate-800 border-4 border-orange-50 dark:border-slate-700 rounded-full flex items-center justify-center font-black text-orange-500 z-10">{i+1}</div>
                     <h4 className="font-bold text-lg text-brand-blue dark:text-white mb-1">Step {i+1}</h4>
                     <p className="text-gray-600 dark:text-gray-400 font-medium">{step}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Student Life & Placements */}
            <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700">
               <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6 flex items-center">
                 <span className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-900/30 text-pink-500 flex items-center justify-center mr-4 text-lg"><i className="fa-solid fa-graduation-cap"></i></span>
                 Student Life & Career
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-black text-brand-blue dark:text-white mb-4 uppercase text-xs tracking-widest">Campus Life</h4>
                    <ul className="space-y-3">
                      {data.studentLife.map((item, i) => (
                        <li key={i} className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
                          <i className="fa-solid fa-circle text-[6px] text-pink-400 mr-3"></i> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-black text-brand-blue dark:text-white mb-4 uppercase text-xs tracking-widest">Career & Placements</h4>
                    <ul className="space-y-3">
                      {data.placements.map((item, i) => (
                        <li key={i} className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
                           <i className="fa-solid fa-briefcase text-xs text-brand-gold mr-3"></i> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>

            {/* Campus Gallery */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-8 flex items-center">
                  <span className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center mr-4 text-lg"><i className="fa-solid fa-images"></i></span>
                  Campus Gallery
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.gallery.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                      <img 
                        src={img} 
                        alt={`${data.name} Campus ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             <div id="college-contact" className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-lg border border-gray-100 dark:border-slate-700 sticky top-24">
                <div className="mb-6 text-center">
                   <div className="w-16 h-16 mx-auto bg-brand-light dark:bg-slate-700 rounded-full flex items-center justify-center text-brand-gold text-2xl mb-4">
                     <i className="fa-solid fa-user-graduate"></i>
                   </div>
                   <h3 className="text-xl font-black text-brand-blue dark:text-white mb-2">Interested in {data.name}?</h3>
                   <p className="text-sm text-gray-500 font-medium">Get a free consultation and brochure.</p>
                </div>
                <ContactForm />
             </div>
             
             <div className="bg-brand-blue p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl -mr-8 -mt-8"></div>
                <h3 className="font-black text-lg mb-4 relative z-10">Courses Offered</h3>
                <ul className="space-y-3 relative z-10">
                   {data.courses.map((c, i) => (
                     <li key={i} className="flex items-center text-sm font-bold text-white/80 border-b border-white/10 pb-2 last:border-0">
                       <i className="fa-solid fa-book-open mr-3 text-brand-gold text-xs"></i> {c}
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailPage;
