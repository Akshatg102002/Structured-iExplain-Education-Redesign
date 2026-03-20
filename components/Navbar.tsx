
import React, { useState, useEffect, useRef } from 'react';
import { LOGO_URL, MEGA_MENU_DATA, OFFICE_ADDRESSES, FOOTER_COLLEGES } from '../data.ts';
import { createSlug } from '../utils.ts';
import * as Flags from 'country-flag-icons/react/3x2';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  logoUrl?: string;
}

const FlagIcon = ({ code }: { code: string }) => {
  if (!code) return null;
  // Use flagcdn.com for reliable flag rendering
  // EU is supported by flagcdn
  const flagUrl = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
  
  return (
    <img 
      src={flagUrl} 
      alt={code} 
      className="w-6 h-4 rounded shadow-sm object-cover"
      onError={(e) => {
        // Fallback to library if image fails, or just hide
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};

// Helper for distance calculation
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const TopBar: React.FC = () => {
  const [showFindUs, setShowFindUs] = useState(false);
  const [offices, setOffices] = useState(OFFICE_ADDRESSES);
  const [locating, setLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFindUs(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocateMe = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Sort offices by distance
          const sorted = [...OFFICE_ADDRESSES].map(office => {
            const dist = getDistanceFromLatLonInKm(latitude, longitude, office.lat, office.lng);
            return { ...office, distance: dist };
          }).sort((a, b) => a.distance - b.distance);

          setOffices(sorted);
          setLocating(false);
        },
        (error) => {
          console.error("Error locating user", error);
          alert("Could not access location. Please enable permissions.");
          setLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLocating(false);
    }
  };

  return (
    <div className="bg-[#01304a] py-2 border-b border-white/5 block relative z-[201]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 items-center text-white text-[10px] font-bold h-full">
        {/* Left Side: Locate Office */}
        <div className="flex items-center justify-start relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowFindUs(!showFindUs)} 
              className="flex items-center space-x-2 hover:text-brand-gold transition-colors tracking-widest uppercase bg-transparent p-0 rounded-lg whitespace-nowrap"
            >
              <Flags.IN className="w-3.5 h-auto rounded-sm" />
              <span>Locate Office</span>
              <i className={`fa-solid fa-chevron-down text-[7px] transition-transform ${showFindUs ? 'rotate-180' : ''}`}></i>
            </button>
            
            {showFindUs && (
              <div className="absolute top-full left-0 mt-3 w-64 bg-white text-brand-blue rounded-xl shadow-2xl overflow-hidden z-[300] border border-gray-100 animate-fade-in text-left">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                  <button 
                    onClick={handleLocateMe}
                    disabled={locating}
                    className="w-full flex items-center justify-center space-x-2 bg-brand-blue text-white py-2 rounded-lg text-[9px] uppercase tracking-widest hover:bg-brand-gold transition-colors disabled:opacity-70"
                  >
                    {locating ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-location-crosshairs"></i>}
                    <span>{locating ? 'Locating...' : 'Use My Location'}</span>
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {offices.map((off: any) => (
                    <Link key={off.slug} to={`/office/${off.slug}`} onClick={() => setShowFindUs(false)} className="block px-4 py-3 hover:bg-brand-gold/10 hover:text-brand-gold transition-colors border-b border-gray-50 last:border-0">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue">{off.city}</span>
                        {off.distance && <span className="text-[8px] font-bold text-gray-400">{(off.distance).toFixed(1)} km</span>}
                      </div>
                      <p className="text-[9px] text-gray-500 mt-0.5 truncate">{off.address}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
        
        {/* Right Side: Socials & Phone */}
        <div className="flex items-center justify-end space-x-4">
          {/* Social Icons */}
          <div className="flex items-center space-x-3 text-white/80">
            <a href="https://www.facebook.com/iexplainedu" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors hover:scale-110"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/iexplain.education/" target="https://www.instagram.com/iexplain.education/" rel="noreferrer" className="hover:text-brand-gold transition-colors hover:scale-110"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.linkedin.com/company/92837677/admin/page-posts/published/1" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors hover:scale-110"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.youtube.com/@iExplainEducation" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors hover:scale-110"><i className="fa-brands fa-youtube"></i></a>
          </div>

          <div className="h-3 w-px bg-white/10 hidden sm:block"></div>

          {/* Phone Link - Icon Only on Mobile, Full on Desktop */}
          <a href="tel:+919773847799" className="flex items-center space-x-2 hover:text-brand-gold transition-colors shrink-0">
            <i className="fa-solid fa-phone text-brand-gold text-[10px]"></i>
            <span className="tracking-widest hidden sm:inline">+91 97738 47799</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, logoUrl }) => {
  const [activeTab, setActiveTab] = useState<keyof typeof MEGA_MENU_DATA>("STUDY ABROAD");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeCollegeTab, setActiveCollegeTab] = useState<'MBBS' | 'STUDY' | 'INDIA'>('MBBS');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCollegeOpen, setMobileCollegeOpen] = useState<{mbbs: boolean, study: boolean, india: boolean}>({ mbbs: false, study: false, india: false });
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (menuName: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timerRef.current = window.setTimeout(() => setActiveMenu(null), 200);
  };

  const sidebarIcons: Record<string, string> = {
    "STUDY ABROAD": "fa-solid fa-earth-americas",
    "MBBS ABROAD": "fa-solid fa-stethoscope",
    "STUDY IN INDIA": "fa-solid fa-building-columns",
    "ENTRANCE EXAMS": "fa-solid fa-file-signature"
  };

  const navLinks = ['HOME', 'ABOUT', 'PROGRAMS', 'COLLEGES', 'SERVICES', 'BLOGS', 'CONTACT'];

  const getCollegeData = () => {
    if (activeCollegeTab === 'MBBS') return FOOTER_COLLEGES.mbbs;
    if (activeCollegeTab === 'STUDY') return FOOTER_COLLEGES.study;
    if (activeCollegeTab === 'INDIA') return FOOTER_COLLEGES.mbbs_india;
    return [];
  };

  return (
    <div className="sticky top-0 z-[200] w-full bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800">
      <TopBar />
      <nav className="relative h-20 w-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer w-[140px] md:w-[180px]" onClick={() => navigate('/')}>
            <img src={logoUrl || LOGO_URL} alt="iExplain" className="h-10 md:h-12 w-auto dark:brightness-110" />
          </div>

          <div className="hidden lg:flex flex-grow justify-center h-full items-center space-x-8 xl:space-x-10">
            {navLinks.map(name => (
              <div key={name} className="h-20 flex items-center" 
                onMouseEnter={(name === 'PROGRAMS' || name === 'COLLEGES') ? () => handleMouseEnter(name) : undefined} 
                onMouseLeave={(name === 'PROGRAMS' || name === 'COLLEGES') ? handleMouseLeave : undefined}>
                <Link to={(name === 'PROGRAMS' || name === 'COLLEGES') ? '#' : name === 'HOME' ? '/' : `/${name.toLowerCase()}`} 
                  className={`text-[11px] font-bold tracking-[0.15em] transition-all py-2 border-b-2 border-transparent hover:border-brand-gold ${(name === 'PROGRAMS' || name === 'COLLEGES') && activeMenu === name ? 'text-brand-gold border-brand-gold' : 'text-brand-blue dark:text-white hover:text-brand-gold'}`}>
                  {name} {(name === 'PROGRAMS' || name === 'COLLEGES') && <i className="fa-solid fa-chevron-down ml-1.5 text-[8px]"></i>}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4 w-auto lg:w-[180px] justify-end flex-shrink-0">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-brand-blue dark:text-brand-gold border border-gray-100 dark:border-slate-700">
              <i className={`fa-solid ${isDarkMode ? 'fa-sun text-sm' : 'fa-moon text-sm'}`}></i>
            </button>
            <Link to="/contact" className="hidden sm:inline-block px-5 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-brand-gold transition-all shadow-md active:scale-95">APPLY NOW</Link>
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-brand-blue dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu - PROGRAMS */}
        {activeMenu === 'PROGRAMS' && (
          <div onMouseEnter={() => handleMouseEnter('PROGRAMS')} onMouseLeave={handleMouseLeave} className="absolute top-full inset-x-0 w-full flex justify-center z-[300]">
            <div className="w-[95%] max-w-5xl bg-white dark:bg-slate-900 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-slate-800 rounded-[2rem] mt-3 overflow-hidden animate-fade-in flex flex-col">
              <div className="flex h-[360px]">
                <div className="w-64 bg-slate-50/60 dark:bg-slate-800/40 p-5 border-r border-gray-100 dark:border-slate-800 flex flex-col">
                  <div className="space-y-1">
                    {Object.keys(MEGA_MENU_DATA).map(tab => (
                      <button key={tab} onMouseEnter={() => setActiveTab(tab as any)} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-brand-gold shadow-md ring-1 ring-gray-100 dark:ring-slate-600 translate-x-1' : 'text-gray-400 hover:text-brand-blue hover:bg-white/50 dark:hover:bg-slate-800'}`}>
                        <div className="flex items-center space-x-3"><i className={`${sidebarIcons[tab]} text-xs opacity-70`}></i><span>{tab}</span></div>
                        <i className="fa-solid fa-chevron-right text-[7px]"></i>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-grow p-8 grid grid-cols-3 gap-4 overflow-y-auto no-scrollbar">
                  {MEGA_MENU_DATA[activeTab].map((item: any, i) => (
                    <Link key={i} to={item.link} onClick={() => setActiveMenu(null)} className="flex items-center p-4 rounded-2xl border border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-brand-gold/30 hover:shadow-xl transition-all group">
                      <div className="mr-4 shrink-0 transition-transform group-hover:scale-110">{item.code ? <FlagIcon code={item.code} /> : <i className={`${item.icon} text-brand-gold text-lg`}></i>}</div>
                      <div className="flex flex-col"><h4 className="font-bold text-[13px] text-brand-blue dark:text-white group-hover:text-brand-gold transition-colors leading-tight">{item.name}</h4><span className="text-[8px] font-black uppercase text-gray-400 tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Explore Country</span></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Mega Menu - COLLEGES */}
        {activeMenu === 'COLLEGES' && (
          <div onMouseEnter={() => handleMouseEnter('COLLEGES')} onMouseLeave={handleMouseLeave} className="absolute top-full inset-x-0 w-full flex justify-center z-[300]">
            <div className="w-[95%] max-w-6xl bg-white dark:bg-slate-900 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-slate-800 rounded-[2rem] mt-3 overflow-hidden animate-fade-in flex flex-col">
              <div className="flex h-[450px]">
                {/* Sidebar Tabs */}
                <div className="w-64 bg-slate-50/60 dark:bg-slate-800/40 p-5 border-r border-gray-100 dark:border-slate-800 flex flex-col">
                  <div className="space-y-1">
                    <button onMouseEnter={() => setActiveCollegeTab('MBBS')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all ${activeCollegeTab === 'MBBS' ? 'bg-white dark:bg-slate-700 text-brand-gold shadow-md ring-1 ring-gray-100 dark:ring-slate-600 translate-x-1' : 'text-gray-400 hover:text-brand-blue hover:bg-white/50 dark:hover:bg-slate-800'}`}>
                      <div className="flex items-center space-x-3"><i className="fa-solid fa-stethoscope text-xs opacity-70"></i><span>MBBS ABROAD</span></div>
                      <i className="fa-solid fa-chevron-right text-[7px]"></i>
                    </button>
                    <button onMouseEnter={() => setActiveCollegeTab('STUDY')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all ${activeCollegeTab === 'STUDY' ? 'bg-white dark:bg-slate-700 text-brand-gold shadow-md ring-1 ring-gray-100 dark:ring-slate-600 translate-x-1' : 'text-gray-400 hover:text-brand-blue hover:bg-white/50 dark:hover:bg-slate-800'}`}>
                      <div className="flex items-center space-x-3"><i className="fa-solid fa-earth-americas text-xs opacity-70"></i><span>STUDY ABROAD</span></div>
                      <i className="fa-solid fa-chevron-right text-[7px]"></i>
                    </button>
                    <button onMouseEnter={() => setActiveCollegeTab('INDIA')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all ${activeCollegeTab === 'INDIA' ? 'bg-white dark:bg-slate-700 text-brand-gold shadow-md ring-1 ring-gray-100 dark:ring-slate-600 translate-x-1' : 'text-gray-400 hover:text-brand-blue hover:bg-white/50 dark:hover:bg-slate-800'}`}>
                      <div className="flex items-center space-x-3"><i className="fa-solid fa-building-columns text-xs opacity-70"></i><span>MBBS INDIA</span></div>
                      <i className="fa-solid fa-chevron-right text-[7px]"></i>
                    </button>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="flex-grow p-8 overflow-y-auto no-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {getCollegeData().map((countryData: any, idx: number) => (
                      <div key={idx} className="space-y-3">
                        <h4 className="font-black text-xs text-brand-blue dark:text-white uppercase tracking-widest border-b border-gray-100 dark:border-slate-700 pb-2 flex items-center">
                          {countryData.code ? <span className="mr-2"><FlagIcon code={countryData.code} /></span> : <i className="fa-solid fa-flag text-brand-gold mr-2"></i>} 
                          {countryData.country}
                        </h4>
                        <ul className="space-y-2">
                          {countryData.names.map((college: string, cIdx: number) => {
                            let link = `/college/${createSlug(college)}`;
                            if (activeCollegeTab === 'INDIA') {
                              link = `/mbbs-india/${createSlug(college)}`;
                            } else if (countryData.country === 'Europe Top Destinations') {
                              link = `/study-abroad/${createSlug(college)}`;
                            }
                            
                            return (
                              <li key={cIdx}>
                                <Link to={link} onClick={() => setActiveMenu(null)} className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white hover:translate-x-1 transition-all truncate">
                                  {college}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[400] bg-white dark:bg-slate-900 overflow-y-auto lg:hidden animate-fade-in">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
               <div className="w-[140px]">
                 <img src={logoUrl || LOGO_URL} alt="Logo" className="w-full h-auto dark:brightness-110" />
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                 <i className="fa-solid fa-xmark text-xl"></i>
               </button>
            </div>
            
            <div className="space-y-2">
              {navLinks.map(item => {
                const isExpanded = mobileExpandedMenu === item;
                
                if (item === 'PROGRAMS') {
                  return (
                    <div key={item} className="border-b border-gray-50 dark:border-slate-800">
                      <button 
                        onClick={() => setMobileExpandedMenu(isExpanded ? null : item)}
                        className={`w-full flex items-center justify-between py-4 text-lg font-black uppercase tracking-tight hover:text-brand-gold transition-colors ${isExpanded ? 'text-brand-gold' : 'text-brand-blue dark:text-white'}`}
                      >
                        <span>{item}</span>
                        <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}></i>
                      </button>
                      
                      {isExpanded && (
                        <div className="pb-4 animate-fade-in">
                           <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Educational Programs</p>
                           <div className="space-y-4 pl-2">
                             {Object.keys(MEGA_MENU_DATA).map(key => (
                               <div key={key}>
                                 <button 
                                   onClick={() => setMobileProgramsOpen(prev => prev === key ? null : key)}
                                   className="w-full flex items-center justify-between font-black text-brand-gold text-sm uppercase tracking-widest mb-3"
                                 >
                                   <span className="flex items-center"><i className={`${sidebarIcons[key]} mr-2`}></i> {key}</span>
                                   <i className={`fa-solid fa-chevron-down text-xs transition-transform ${mobileProgramsOpen === key ? 'rotate-180' : ''}`}></i>
                                 </button>
                                 
                                 {mobileProgramsOpen === key && (
                                   <div className="pl-6 space-y-3 border-l-2 border-gray-100 dark:border-slate-800 animate-fade-in">
                                     {MEGA_MENU_DATA[key as keyof typeof MEGA_MENU_DATA].slice(0, 5).map((subItem: any, i: number) => (
                                       <Link key={i} to={subItem.link} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white transition-colors">
                                         {subItem.name}
                                       </Link>
                                     ))}
                                   </div>
                                 )}
                               </div>
                             ))}
                           </div>
                        </div>
                      )}
                    </div>
                  );
                }
                
                if (item === 'COLLEGES') {
                  return (
                    <div key={item} className="border-b border-gray-50 dark:border-slate-800">
                      <button 
                        onClick={() => setMobileExpandedMenu(isExpanded ? null : item)}
                        className={`w-full flex items-center justify-between py-4 text-lg font-black uppercase tracking-tight hover:text-brand-gold transition-colors ${isExpanded ? 'text-brand-gold' : 'text-brand-blue dark:text-white'}`}
                      >
                        <span>{item}</span>
                        <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}></i>
                      </button>
                      
                      {isExpanded && (
                        <div className="pb-4 animate-fade-in">
                           <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Top Colleges</p>
                           
                           {/* Mobile Colleges Dropdown */}
                           {/* MBBS Dropdown */}
                           <div className="mb-4">
                             <button onClick={() => setMobileCollegeOpen(prev => ({...prev, mbbs: !prev.mbbs}))} className="w-full flex items-center justify-between font-black text-brand-blue dark:text-white text-sm uppercase tracking-widest mb-3">
                               <span className="flex items-center"><i className="fa-solid fa-stethoscope mr-2 text-brand-gold"></i> MBBS Abroad</span>
                               <i className={`fa-solid fa-chevron-down text-xs transition-transform ${mobileCollegeOpen.mbbs ? 'rotate-180' : ''}`}></i>
                             </button>
                             
                             {mobileCollegeOpen.mbbs && (
                               <div className="pl-6 space-y-4 border-l-2 border-gray-100 dark:border-slate-800 animate-fade-in">
                                 {FOOTER_COLLEGES.mbbs.map((country, idx) => (
                                   <div key={idx}>
                                     <p className="font-bold text-gray-800 dark:text-gray-200 text-xs uppercase mb-2">{country.country}</p>
                                     <div className="pl-4 space-y-2">
                                       {country.names.map((college, cIdx) => (
                                         <Link key={cIdx} to={`/college/${createSlug(college)}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white">
                                           {college}
                                         </Link>
                                       ))}
                                     </div>
                                   </div>
                                 ))}
                               </div>
                             )}
                           </div>
    
                           {/* Study Abroad Dropdown */}
                           <div>
                             <button onClick={() => setMobileCollegeOpen(prev => ({...prev, study: !prev.study}))} className="w-full flex items-center justify-between font-black text-brand-blue dark:text-white text-sm uppercase tracking-widest mb-3">
                               <span className="flex items-center"><i className="fa-solid fa-earth-americas mr-2 text-brand-gold"></i> Study Abroad</span>
                               <i className={`fa-solid fa-chevron-down text-xs transition-transform ${mobileCollegeOpen.study ? 'rotate-180' : ''}`}></i>
                             </button>
                             
                             {mobileCollegeOpen.study && (
                               <div className="pl-6 space-y-4 border-l-2 border-gray-100 dark:border-slate-800 animate-fade-in">
                                 {FOOTER_COLLEGES.study.map((country, idx) => (
                                   <div key={idx}>
                                     <p className="font-bold text-gray-800 dark:text-gray-200 text-xs uppercase mb-2">{country.country}</p>
                                     <div className="pl-4 space-y-2">
                                       {country.names.map((college, cIdx) => (
                                         <Link key={cIdx} to={`/college/${createSlug(college)}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white">
                                           {college}
                                         </Link>
                                       ))}
                                     </div>
                                   </div>
                                 ))}
                               </div>
                             )}
                           </div>

                           {/* MBBS India Dropdown */}
                           <div>
                             <button onClick={() => setMobileCollegeOpen(prev => ({...prev, india: !prev.india}))} className="w-full flex items-center justify-between font-black text-brand-blue dark:text-white text-sm uppercase tracking-widest mb-3">
                               <span className="flex items-center"><i className="fa-solid fa-building-columns mr-2 text-brand-gold"></i> MBBS India</span>
                               <i className={`fa-solid fa-chevron-down text-xs transition-transform ${mobileCollegeOpen.india ? 'rotate-180' : ''}`}></i>
                             </button>
                             
                             {mobileCollegeOpen.india && (
                               <div className="pl-6 space-y-4 border-l-2 border-gray-100 dark:border-slate-800 animate-fade-in">
                                 {FOOTER_COLLEGES.mbbs_india.map((region, idx) => (
                                   <div key={idx}>
                                     <p className="font-bold text-gray-800 dark:text-gray-200 text-xs uppercase mb-2">{region.country}</p>
                                     <div className="pl-4 space-y-2">
                                       {region.names.map((state, cIdx) => (
                                         <Link key={cIdx} to={`/mbbs-india/${createSlug(state)}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-[11px] font-medium text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white">
                                           {state}
                                         </Link>
                                       ))}
                                     </div>
                                   </div>
                                 ))}
                               </div>
                             )}
                           </div>
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <Link 
                    key={item}
                    to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-lg font-black text-brand-blue dark:text-white uppercase tracking-tight border-b border-gray-50 dark:border-slate-800 hover:text-brand-gold transition-colors"
                  >
                    {item}
                  </Link>
                );
              })}
              
              <div className="pb-8 pt-8">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-5 bg-brand-blue text-white text-center rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-blue/20">
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
