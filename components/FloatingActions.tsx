
import React from 'react';

const FloatingActions: React.FC = () => {
  return (
    <>
      {/* LHS: WhatsApp Button */}
      <a 
        href="https://wa.me/919773847799" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-green-500/40 transition-all duration-300 animate-fade-in group"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-3xl group-hover:rotate-12 transition-transform"></i>
        <span className="absolute left-16 bg-white text-[#25D366] px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
          Chat with us
        </span>
      </a>

      {/* RHS: Call Button */}
      <a 
        href="tel:+919773847799"
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-brand-blue border-2 border-white/10 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-blue-500/40 transition-all duration-300 animate-fade-in group"
        aria-label="Call Us"
      >
        <i className="fa-solid fa-phone text-2xl group-hover:shake"></i>
        <span className="absolute right-16 bg-white text-brand-blue px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
          Call Now
        </span>
      </a>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .group:hover .group-hover\\:shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default FloatingActions;
