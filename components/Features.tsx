
import React from 'react';

const FEATURE_LIST = [
  {
    title: "University Selection",
    description: "Expert guidance in choosing the right university based on budget, ranking, and career goals.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    ),
    color: "gold"
  },
  {
    title: "Admission Support",
    description: "End-to-end documentation assistance, application filling, and getting your offer letters quickly.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    color: "gold"
  },
  {
    title: "Visa Assistance",
    description: "Comprehensive visa interview preparation and documentation to ensure maximum success rates.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
    ),
    color: "gold"
  },
  {
    title: "Travel & Forex",
    description: "Forex assistance and flight bookings at student-friendly rates with post-landing airport pickup.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    color: "gold"
  }
];

const Features: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {FEATURE_LIST.map((feature, idx) => (
        <div key={idx} className="group p-10 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-3xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 shadow-sm">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 transform group-hover:rotate-6`}>
            {feature.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Features;
