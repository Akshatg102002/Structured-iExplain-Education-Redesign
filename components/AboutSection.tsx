
import React from 'react';
import { ABOUT_US_CONTENT, CORE_VALUES_FULL, TEAM_MEMBERS } from '../data.ts';

interface AboutSectionProps {
  compact?: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ compact = false }) => {
  return (
    <div className="bg-white dark:bg-slate-900 font-sans">
      {/* Introduction */}
      <section id="about" className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-start">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                Who We Are
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-8 uppercase tracking-tight">
                Transforming Dreams <span className="text-brand-gold">Into Reality</span>
              </h2>
              <div className="prose prose-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed whitespace-pre-line">
                {ABOUT_US_CONTENT.intro}
              </div>
            </div>
            
            <div className="mt-16 lg:mt-0 relative">
               <div className="aspect-[4/5] overflow-hidden rounded-[3rem] bg-gray-100 relative shadow-2xl border-8 border-white dark:border-slate-800">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
                    alt="iExplain Team" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent flex flex-col justify-end p-10">
                    <p className="text-white text-lg font-bold italic">"Authentic insights, Accurate information, and Comprehensive guidance."</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {!compact && (
        <>
          {/* Vision & Mission */}
          <section className="py-12 bg-brand-light dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Vision */}
                <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-all"></div>
                  <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6 uppercase tracking-tight flex items-center">
                    <i className="fa-solid fa-eye text-brand-gold mr-4"></i> Our Vision
                  </h3>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">{ABOUT_US_CONTENT.vision.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {ABOUT_US_CONTENT.vision.text}
                  </p>
                </div>

                {/* Mission */}
                <div className="bg-brand-blue p-10 rounded-[2.5rem] shadow-xl border border-brand-blue/50 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                   <h3 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center">
                    <i className="fa-solid fa-bullseye text-brand-gold mr-4"></i> Our Mission
                  </h3>
                  <h4 className="text-lg font-bold mb-6">{ABOUT_US_CONTENT.mission.title}</h4>
                  <div className="space-y-6">
                    {ABOUT_US_CONTENT.mission.points.map((point, idx) => (
                      <div key={idx}>
                        <h5 className="font-black text-brand-gold text-sm uppercase tracking-widest mb-2">{point.title}</h5>
                        <p className="text-white/80 text-sm leading-relaxed">{point.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-6 uppercase tracking-tight">Core <span className="text-brand-gold">Values</span></h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CORE_VALUES_FULL.map((val, idx) => (
                <div key={idx} className="p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold text-xl mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                    <i className={`fa-solid ${idx % 2 === 0 ? 'fa-star' : 'fa-heart'}`}></i>
                  </div>
                  <h4 className="text-lg font-black text-brand-blue dark:text-white uppercase tracking-tight mb-3">{val.title}</h4>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-6 uppercase tracking-tight">Leadership <span className="text-brand-gold">Team</span></h2>
                <p className="text-gray-500 dark:text-gray-400 font-bold max-w-2xl mx-auto">
                  "Meet Our Dynamic Team of Experts: Driving Success Through Collaboration and Innovation"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {TEAM_MEMBERS.map((member, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700 text-center group hover:shadow-2xl transition-all">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg mb-6 group-hover:scale-110 transition-transform">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-black text-brand-blue dark:text-white mb-1">{member.name}</h3>
                    <p className="text-brand-gold font-bold text-xs uppercase tracking-widest">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AboutSection;
