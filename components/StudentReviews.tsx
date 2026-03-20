
import React, { useRef, useEffect } from 'react';
import { STUDENT_REVIEWS } from '../home_content.ts';

const StudentReviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const startAutoSlide = () => {
      if (window.innerWidth < 768) {
        interval = setInterval(() => {
          if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            // gap-6 is 24px
            if (scrollLeft + clientWidth >= scrollWidth - 24) {
              scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              scrollRef.current.scrollBy({ left: clientWidth + 24, behavior: 'smooth' });
            }
          }
        }, 4000);
      }
    };

    startAutoSlide();

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -(clientWidth + 24) : (clientWidth + 24), behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-6 tracking-tight">
            Student <span className="text-brand-gold">Reviews</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Hear from our students who have successfully embarked on their educational journeys.
          </p>
        </div>

        <div className="relative">
          <div ref={scrollRef} className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {STUDENT_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col w-full md:w-auto snap-center shrink-0"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-brand-gold"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-brand-blue dark:text-white">{review.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                      {review.course}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic mb-6 flex-grow">
                  "{review.review}"
                </p>
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-slate-700">
                  <p className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                    {review.university}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Navigation Arrows */}
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-14 rounded-2xl bg-white/30 backdrop-blur-md shadow-sm flex items-center justify-center text-white md:hidden z-10 active:scale-95 transition-transform"
            aria-label="Previous review"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-14 rounded-2xl bg-white/30 backdrop-blur-md shadow-sm flex items-center justify-center text-white md:hidden z-10 active:scale-95 transition-transform"
            aria-label="Next review"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentReviews;
