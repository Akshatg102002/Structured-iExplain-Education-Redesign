
import React from 'react';
import { INDIA_COURSES } from '../data.ts';

const IndiaSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-4xl font-black text-brand-blue dark:text-white mb-6 tracking-tight">Study in India</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Get comprehensive information about Medical, Management, and Engineering courses in India's top colleges.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {INDIA_COURSES.map((course, i) => (
            <div key={i} className="group bg-white dark:bg-slate-800 p-4 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-700 hover:border-brand-gold transition-all shadow-sm hover:shadow-xl">
              <div className="text-3xl sm:text-5xl mb-4 sm:mb-6 text-brand-gold group-hover:scale-110 transition-transform">
                <i className={course.icon}></i>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-brand-blue dark:text-white mb-2 sm:mb-4">{course.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-base leading-relaxed mb-4 sm:mb-6 font-medium">
                {course.desc}
              </p>
              <a href={`#/study-india/${course.id}`} className="text-brand-gold font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center group/link">
                View Details
                <i className="fa-solid fa-arrow-right ml-2 transition-transform group-hover/link:translate-x-2"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndiaSection;
