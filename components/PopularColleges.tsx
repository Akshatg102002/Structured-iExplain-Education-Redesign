
import React, { useState, useEffect, useRef } from 'react';
import { POPULAR_COLLEGES, COUNTRY_ICONS } from '../data.ts';
import * as Flags from 'country-flag-icons/react/3x2';
import { 
  db, 
  collection, 
  getDocs, 
  query 
} from '../firebase.ts';

const PopularColleges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MBBS Abroad' | 'Study Abroad'>('MBBS Abroad');
  const [selectedCountry, setSelectedCountry] = useState('Russia');
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scrollRef.current && window.innerWidth < 768) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [activeTab, colleges.length]);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'colleges'));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        
        if (fetched.length > 0) {
          setColleges(fetched);
        } else {
          try {
            const saved = JSON.parse(localStorage.getItem('iexplain_colleges') || '[]');
            setColleges(saved.length > 0 ? saved : POPULAR_COLLEGES);
          } catch (e) {
            setColleges(POPULAR_COLLEGES);
          }
        }
      } catch (error) {
        console.error("Colleges fetch error:", error);
        try {
          const saved = JSON.parse(localStorage.getItem('iexplain_colleges') || '[]');
          setColleges(saved.length > 0 ? saved : POPULAR_COLLEGES);
        } catch (e) {
          setColleges(POPULAR_COLLEGES);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  // When tab changes, auto-select the first country that has colleges for that tab
  useEffect(() => {
    if (colleges.length === 0) return;

    const countriesForTab = Object.keys(COUNTRY_ICONS).filter(countryName =>
      colleges.some(c => c.category === activeTab && c.country === countryName)
    );

    if (countriesForTab.length > 0 && !countriesForTab.includes(selectedCountry)) {
      setSelectedCountry(countriesForTab[0]);
    }
  }, [activeTab, colleges]);

  // Only show countries that have at least one college for the active tab
  const availableCountries = Object.entries(COUNTRY_ICONS).filter(([countryName]) =>
    colleges.some(c => c.category === activeTab && c.country === countryName)
  );

  const filteredColleges = colleges.filter(c =>
    c.category === activeTab && c.country === selectedCountry
  );

  const hasContent = availableCountries.length > 0;

  return (
    <section className="py-12 bg-white dark:bg-slate-900 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading + Tabs — always visible */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-6 tracking-tight">
            Our <span className="text-brand-gold">Partners</span>
          </h2>
          <div className="w-16 h-1 bg-brand-gold mb-8 mx-auto rounded-full"></div>

          <div className="flex justify-center space-x-12 border-b border-gray-100 dark:border-slate-800 pb-4">
            {(['MBBS Abroad', 'Study Abroad'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-lg font-bold pb-4 relative transition-colors ${
                  activeTab === tab
                    ? 'text-brand-gold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-gold'
                    : 'text-gray-400 hover:text-brand-blue dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-brand-gold"></i>
          </div>
        ) : hasContent ? (
          <>
            {/* Country Selector — only shows countries that have data for the active tab */}
            <div className="relative mb-12">
              <div ref={scrollRef} className="flex items-center justify-start md:justify-center space-x-8 overflow-x-auto no-scrollbar pb-6 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {availableCountries.map(([countryName, flagCode]) => {
                  const FlagComponent = Flags[flagCode as keyof typeof Flags];
                  const isSelected = selectedCountry === countryName;
                  return (
                    <button
                      key={countryName}
                      onClick={() => setSelectedCountry(countryName)}
                      className={`flex flex-col items-center shrink-0 group transition-all snap-center ${
                        isSelected ? 'scale-110' : 'hover:scale-105'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all overflow-hidden ${
                        isSelected
                          ? 'bg-brand-gold shadow-xl shadow-brand-gold/20'
                          : 'bg-gray-100 dark:bg-slate-800 group-hover:grayscale'
                      }`}>
                        {FlagComponent
                          ? <FlagComponent className="w-8 h-8" />
                          : <span className="text-xs font-bold">{flagCode}</span>
                        }
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                        isSelected ? 'text-brand-gold' : 'text-gray-500 group-hover:text-gray-400'
                      }`}>
                        {countryName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* College Cards */}
            {filteredColleges.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
                {filteredColleges.map((college, i) => (
                  <div
                    key={college.id ?? i}
                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 dark:border-slate-700 flex flex-col mx-auto w-full max-w-[300px]"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1200";
                        }}
                      />
                    </div>
                    <div className="p-3 sm:p-5 text-center bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 mt-auto min-h-[60px] sm:min-h-[80px] flex items-center justify-center">
                      <h3 className="text-xs sm:text-sm font-bold text-brand-blue dark:text-white line-clamp-2">
                        {college.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}

      </div>
    </section>
  );
};

export default PopularColleges;
