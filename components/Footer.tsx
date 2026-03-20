
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LOGO_URL, 
  FOOTER_COLLEGES,
  OFFICE_ADDRESSES 
} from '../data.ts';
import { createSlug } from '../utils.ts';

interface FooterProps {
  logoUrl?: string;
  helpline?: string;
  email?: string;
}

const Footer: React.FC<FooterProps> = ({ logoUrl, helpline, email }) => {
  const mbbsCountries = FOOTER_COLLEGES.mbbs.map(c => c.country);
  const studyCountries = FOOTER_COLLEGES.study.map(c => c.country);

  return (
    <footer className="font-sans border-t border-gray-100 dark:border-slate-800 transition-colors">
      
      {/* PART 1: Links & Colleges (White Background) */}
      <div className="bg-white dark:bg-slate-900 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Row: Brand, Top Countries, Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16 border-b border-gray-100 dark:border-slate-800 pb-12">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-6">
                <img src={logoUrl || LOGO_URL} alt="iExplain" className="h-10 w-auto dark:brightness-125" />
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-xs">
                iExplain Education is a trusted source for authentic educational guidance. From admission-related help to e-learning resources, it ensures that students receive all the help they need.
                </p>
                <div className="space-y-3 pt-2">
                <div className="flex items-center text-xs font-bold text-brand-blue dark:text-white group cursor-pointer">
                    <i className="fa-solid fa-envelope text-brand-gold w-6"></i>
                    <span className="group-hover:text-brand-gold transition-colors">{email || 'info@iexplaineducation.in'}</span>
                </div>
                <div className="flex items-center text-xs font-bold text-brand-blue dark:text-white group cursor-pointer">
                    <i className="fa-solid fa-phone text-brand-gold w-6"></i>
                    <span className="group-hover:text-brand-gold transition-colors">{helpline || '+91-9311431007'}</span>
                </div>
                </div>
            </div>

            {/* Column 2: Top MBBS Countries */}
            <div>
                <h4 className="font-black text-sm text-brand-blue dark:text-white mb-6 border-b-2 border-brand-gold inline-block pb-1">Top MBBS Abroad Countries</h4>
                <ul className="space-y-3">
                {mbbsCountries.map((country) => (
                    <li key={country}>
                    <Link to={`/mbbs-abroad/${createSlug(country)}`} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white hover:pl-1 transition-all block">
                        {country}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            {/* Column 3: Top Study Abroad Countries */}
            <div>
                <h4 className="font-black text-sm text-brand-blue dark:text-white mb-6 border-b-2 border-brand-gold inline-block pb-1">Top Study Abroad Countries</h4>
                <ul className="space-y-3">
                {studyCountries.map((country) => (
                    <li key={country}>
                    <Link to={`/study-abroad/${createSlug(country)}`} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white hover:pl-1 transition-all block">
                        {country}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            {/* Column 4: Map */}
            <div className="bg-gray-50 dark:bg-slate-800 p-2 rounded-[2rem] border border-gray-100 dark:border-slate-700 h-64 overflow-hidden relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827184275!2d77.2065322!3d28.6289017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1689613765239!5m2!1sen!2sin" 
                  className="w-full h-full rounded-[1.5rem] grayscale hover:grayscale-0 transition-all duration-700" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold text-brand-blue shadow-sm pointer-events-none">
                   Head Office
                </div>
            </div>
            </div>

            {/* MBBS Colleges Grid */}
            <div className="mb-16">
            <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-10">Top MBBS Abroad Colleges</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12">
                {FOOTER_COLLEGES.mbbs.map((section, idx) => (
                    <div key={idx}>
                    <h5 className="text-xs font-black uppercase text-brand-gold tracking-[0.2em] mb-4">{section.country}</h5>
                    <ul className="space-y-2.5">
                        {section.names.map((name, i) => (
                        <li key={i}>
                            <Link to={`/college/${createSlug(name)}`} className="text-[11px] font-bold text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white transition-colors leading-tight block">
                            {name}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
            </div>

            {/* Study Abroad Colleges Grid */}
            <div>
            <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-10">Top Study Abroad Colleges</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12">
                {FOOTER_COLLEGES.study.map((section, idx) => (
                    <div key={idx}>
                    <h5 className="text-xs font-black uppercase text-brand-gold tracking-[0.2em] mb-4">{section.country}</h5>
                    <ul className="space-y-2.5">
                        {section.names.map((name, i) => (
                        <li key={i}>
                            <Link to={`/college/${createSlug(name)}`} className="text-[11px] font-bold text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white transition-colors leading-tight block">
                            {name}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
            </div>
        </div>
      </div>

      {/* PART 2: Global Presence (Dark Blue Background) */}
      <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
          {/* Background Map/Icon decor */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-6">
                <h2 className="text-3xl font-black tracking-tight">Our Global Presence</h2>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold"><i className="fa-solid fa-location-dot"></i></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                {OFFICE_ADDRESSES.map((off, i) => (
                  <div key={i}>
                     <h4 className="text-brand-gold font-black text-lg mb-4">{off.city} Office</h4>
                     <div className="flex items-start mb-6">
                        <i className="fa-solid fa-location-dot mt-1.5 mr-3 text-brand-gold text-xs"></i>
                        <p className="text-sm font-medium text-white/80 leading-relaxed min-h-[40px]">{off.address}</p>
                     </div>
                     <div className="flex space-x-3">
                        <Link to={`/office/${off.slug}`} className="px-4 py-2 bg-white/10 border border-white/20 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all">Details</Link>
                        <a href={`tel:${off.phone}`} className="px-4 py-2 bg-white/10 border border-white/20 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all">Call</a>
                     </div>
                  </div>
                ))}

                {/* Central Helpline Card */}
                <div className="lg:col-span-1 bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col justify-center">
                   <h4 className="text-brand-gold font-black text-[10px] uppercase tracking-[0.2em] mb-2">Central Helpline</h4>
                   <p className="text-3xl font-black text-white mb-2">{helpline || '+91-9311338511'}</p>
                   <p className="text-sm text-white/60">{email || 'info@iexplaineducation.in'}</p>
                </div>
             </div>
          </div>
       </section>

      {/* Copyright */}
       <div className="bg-[#011e33] py-8 text-center border-t border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">© 2025 iExplain Education. Shaping Global Futures.</p>
       </div>
    </footer>
  );
};

export default Footer;
