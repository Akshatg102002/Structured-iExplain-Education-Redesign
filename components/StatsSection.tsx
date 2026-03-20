
import React from 'react';
import { STATS } from '../data.ts';

const StatsSection: React.FC = () => {
  return (
    <div className="bg-brand-blue py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-black text-white mb-0.5">
                {stat.value}
              </div>
              <div className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
