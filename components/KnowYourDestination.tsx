
import React from 'react';
import { Link } from 'react-router-dom';
import { KNOW_YOUR_DESTINATIONS } from '../data.ts';
import { createSlug } from '../utils.ts';

const KnowYourDestination: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-6 tracking-tight">
            Know Your <span className="text-brand-gold">Destination</span>
          </h2>
          <div className="w-16 h-1 bg-brand-gold mb-8 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Begin an exciting academic journey in these varied and welcoming study locations!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-4">
          {KNOW_YOUR_DESTINATIONS.map((dest, i) => (
            <Link 
              key={i} 
              to={`/study-abroad/${createSlug(dest.name)}`}
              className="group relative h-48 md:h-64 rounded-[1.5rem] overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-[1.02]"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-black tracking-tight">{dest.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowYourDestination;
