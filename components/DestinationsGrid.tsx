
import React from 'react';
import { DESTINATIONS } from '../data.ts';

const DestinationsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {DESTINATIONS.map((dest) => (
        <div key={dest.id} className="group relative overflow-hidden rounded-[2rem] shadow-lg aspect-[4/5] cursor-pointer border border-gray-100 dark:border-slate-800">
          <img 
            src={dest.image} 
            alt={dest.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-2xl font-black text-white mb-2">{dest.name}</h3>
            <p className="text-gray-200 text-xs mb-6 opacity-0 group-hover:opacity-100 transition-opacity font-medium line-clamp-2">
              {dest.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {dest.popularCourses.slice(0, 2).map((course, i) => (
                <span key={i} className="text-[9px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-lg">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationsGrid;
