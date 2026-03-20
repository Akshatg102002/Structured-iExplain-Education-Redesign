
import React from 'react';

interface GlobalCallToActionProps {
  onOpen: () => void;
}

const GlobalCallToAction: React.FC<GlobalCallToActionProps> = ({ onOpen }) => {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1rem] bg-gradient-to-r from-brand-blue to-blue-700 shadow-2xl px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 group">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/20 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none"></div>
          
          {/* Text Content */}
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">
              Book Your <span className="text-[#BB962C]">FREE Consultation</span> with Our Experts
            </h2>
            <p className="text-blue-100 font-medium text-sm md:text-base max-w-2xl opacity-90">
              Get personalized guidance, visa support, and university selection help from industry leaders.
            </p>
          </div>

          {/* Action Button */}
          <div className="relative z-10 shrink-0">
            <button 
              onClick={onOpen}
              className="px-8 py-4 bg-[#BB962C] text-[#000] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_0_5px_rgba(74,222,128,0.4)] flex items-center gap-3"
            >
              Talk to Us
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalCallToAction;
