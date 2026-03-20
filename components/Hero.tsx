
import React from 'react';
import { HERO_IMG_URL } from '../data.ts';
import * as Flags from 'country-flag-icons/react/3x2';
import { Link } from 'react-router-dom';

interface HeroProps {
  onBookSession: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookSession }) => {
  return (
    <section className="relative h-[80vh] min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/20/cambridge.JPG?q=80&w=1920" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center w-full">
          
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 animate-fade-in-up">
            <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
            <span className="text-brand-gold font-black text-[10px] uppercase tracking-[0.3em]">Opening Doors To Success</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight animate-fade-in-up delay-100">
            Unlock global opportunities with <br />
            <span
              className="text-brand-gold inline-block pt-2"
              style={{ WebkitTextStroke: "0.5px rgba(255,255,255,0.7)" }}
            >
              iExplain Education.
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-200 font-medium mb-10 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
            We specialize in MBBS India, MBBS Abroad, and Study Abroad programs, guiding students toward the best universities worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
            <button 
              onClick={onBookSession}
              className="px-8 py-4 bg-brand-gold text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-blue transition-all shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-3 group"
            >
              <i className="fa-solid fa-star group-hover:rotate-12 transition-transform"></i>
              Free Counseling Session
            </button>
            <Link 
              to="/services"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-black text-xs uppercase tracking-widest border border-white/20 hover:bg-white hover:text-brand-blue transition-all flex items-center justify-center gap-3"
            >
              Explore Verticals
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
