import React from 'react';

const ExpertCounselorsCTA: React.FC = () => {
  return (
    <section className="py-12 bg-brand-blue relative overflow-hidden font-sans">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-[100px] opacity-10 -ml-20 -mb-20 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
          <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
          <span className="text-brand-gold font-black text-[10px] uppercase tracking-[0.3em]">We Are Here To Help</span>
        </div>

        <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
          Chat with our <span className="text-brand-gold">Expert Counsellors</span>
        </h2>
        
        <p className="text-lg lg:text-xl text-white/80 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          Get personalized guidance for your medical education journey. Our experts are available to answer all your queries regarding university selection, admission process, and visa assistance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="https://wa.me/919773847799" 
            target="_blank" 
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-[#25D366] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#20bd5a] hover:-translate-y-1 transition-all shadow-xl shadow-[#25D366]/30 flex items-center justify-center gap-3 group"
          >
            <i className="fa-brands fa-whatsapp text-xl group-hover:scale-110 transition-transform"></i>
            WhatsApp Us
          </a>
          
          <a 
            href="tel:+919773847799"
            className="w-full sm:w-auto px-6 py-3 bg-white text-brand-blue rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 hover:-translate-y-1 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 group"
          >
            <i className="fa-solid fa-phone text-lg text-brand-gold group-hover:scale-110 transition-transform"></i>
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExpertCounselorsCTA;
