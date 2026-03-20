import React from 'react';
import { WHO_WE_ARE_CONTENT } from '../home_content.ts';
import { Link } from 'react-router-dom';

const WhoWeAre: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="mb-4 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                About Us
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-4 tracking-tight">
                {WHO_WE_ARE_CONTENT.title}
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-medium text-justify lg:text-left">
              {WHO_WE_ARE_CONTENT.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 text-center lg:text-left">
              <Link to="/about" className="inline-flex items-center text-brand-gold font-black uppercase tracking-widest text-xs hover:underline">
                Read More About Us <i className="fa-solid fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img 
                src="https://socialfoundationindia.org/wp-content/uploads/2026/03/Abroad.jpeg" 
                alt="Who We Are" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-2xl font-black mb-2">Building Global Careers</p>
                <p className="text-sm font-medium opacity-90">Trusted by thousands of students worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
