
import React, { useState } from 'react';
import { AIRPORT_DIARIES } from '../home_content.ts';

const AirportDiaries: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % AIRPORT_DIARIES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + AIRPORT_DIARIES.length) % AIRPORT_DIARIES.length);
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Memories
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-6 tracking-tight">
            Airport <span className="text-brand-gold">Diaries</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Capturing the smiles and excitement as our students embark on their global journey.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-slate-800 aspect-video">
            {AIRPORT_DIARIES.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
                  <p className="text-xl lg:text-2xl font-black mb-2 drop-shadow-md">{item.caption}</p>
                </div>
              </div>
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md transition-colors z-20"
              aria-label="Previous Slide"
            >
              <i className="fa-solid fa-chevron-left text-xl"></i>
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md transition-colors z-20"
              aria-label="Next Slide"
            >
              <i className="fa-solid fa-chevron-right text-xl"></i>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {AIRPORT_DIARIES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeSlide ? 'bg-brand-gold' : 'bg-gray-300 dark:bg-slate-700 hover:bg-brand-blue'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirportDiaries;
