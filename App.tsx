import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import AboutSection from './components/AboutSection.tsx';
import Roadmap from './components/Roadmap.tsx';
import IndiaSection from './components/IndiaSection.tsx';
import AICounselor from './components/AICounselor.tsx';
import StatsSection from './components/StatsSection.tsx';
import Testimonials from './components/Testimonials.tsx';
import BlogSection from './components/BlogSection.tsx';
import BlogDetailPage from './components/BlogDetailPage.tsx';
import ContactForm from './components/ContactForm.tsx';
import PopularColleges from './components/PopularColleges.tsx';
import KnowYourDestination from './components/KnowYourDestination.tsx';
import Footer from './components/Footer.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import GoogleReviewsWidget from './components/GoogleReviewsWidget.tsx';
import GlobalCallToAction from './components/GlobalCallToAction.tsx';
import FloatingActions from './components/FloatingActions.tsx';
import ContactModal from './components/ContactModal.tsx';
import ExpertCounselorsCTA from './components/ExpertCounselorsCTA.tsx';
import CollegeDetailPage from './components/CollegeDetailPage.tsx';
import ProgramDetailPage from './components/ProgramDetailPage.tsx';
import StudyIndiaDetailPage from './components/StudyIndiaDetailPage.tsx';
import StudyAbroadDetailPage from './components/StudyAbroadDetailPage.tsx';
import MBBSDetailPage from './components/MBBSDetailPage.tsx';
import WhoWeAre from './components/WhoWeAre.tsx';
import AirportDiaries from './components/AirportDiaries.tsx';
import StudentReviews from './components/StudentReviews.tsx';
import AwardsAchievements from './components/AwardsAchievements.tsx';
import * as Flags from 'country-flag-icons/react/3x2';
import { 
  STUDENT_SERVICES_DATA,
  COLLEGE_DETAILS,
  OFFICE_ADDRESSES,
  BLOG_POSTS,
  INDIA_COURSES_DETAILED,
  STUDY_ABROAD_DETAILED,
  MBBS_ABROAD_DETAILED,
  EXAMS_DETAILED,
  HERO_IMG_URL,
  PRIVACY_POLICY_CONTENT,
  TERMS_CONTENT
} from './data.ts';
import { RouteState, SiteSettings } from './types.ts';
import { db, collection, getDocs, doc, getDoc, query, orderBy, where } from './firebase.ts';
import { Routes, Route, useLocation, Link, useNavigate, useParams } from 'react-router-dom';

import { createSlug } from './utils.ts';

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[1000] bg-white dark:bg-slate-900 flex items-center justify-center animate-fade-in transition-all">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin mb-4"></div>
      <p className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">Loading iExplain...</p>
    </div>
  </div>
);

// --- SHARED COMPONENTS ---
const ContactMapSection = () => {
  const hq = OFFICE_ADDRESSES[0];
  return (
    <section id="contact-section" className="py-12 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-800 rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-700 flex flex-col lg:flex-row">
          {/* LHS: Company Info */}
          <div className="lg:w-1/2 bg-brand-blue text-white p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold rounded-full blur-[100px] opacity-20"></div>
            
            <div className="relative z-10">
              <div className="mb-10">
                 <img src="https://socialfoundationindia.org/wp-content/uploads/2026/03/Contact.jpeg" alt="Office" className="w-full h-64 object-cover rounded-3xl mb-8 shadow-lg border-4 border-white/10" />
                 <h3 className="text-3xl font-black mb-2">Get In Touch</h3>
                 <p className="text-white/70 font-medium">We are here to help you shape your future.</p>
              </div>

              <div className="space-y-8">
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold text-xl shrink-0">
                       <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Call Us</p>
                       <p className="text-xl font-bold">{hq.phone}</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold text-xl shrink-0">
                       <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Email Us</p>
                       <p className="text-xl font-bold break-all sm:break-normal">{email || 'info@iexplaineducation.in'}</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold text-xl shrink-0">
                       <i className="fa-solid fa-clock"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Working Hours</p>
                       <p className="text-lg font-bold">Mon - Sat: 10:00 AM - 7:00 PM</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* RHS: Contact Form */}
          <div className="lg:w-1/2 p-12 lg:p-16">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- POLICY PAGE ---
const PolicyPage = ({ title, content }: { title: string, content: string }) => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-slate-900 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-black text-brand-blue dark:text-white mb-8 text-center">{title}</h1>
        <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700">
           <div 
             className="prose prose-lg dark:prose-invert max-w-none font-medium text-gray-600 dark:text-gray-300"
             dangerouslySetInnerHTML={{ __html: content }}
           />
        </div>
      </div>
    </div>
  );
};

// --- SERVICES LIST PAGE ---
const ServicesPage = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">What We Do</span>
          <h1 className="text-4xl lg:text-5xl font-black text-brand-blue dark:text-white mb-6 tracking-tight">
            Our Premium <span className="text-brand-gold">Services</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed text-justify md:text-center">
            From initial counseling to landing in your dream destination, we are with you at every step of your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STUDENT_SERVICES_DATA.map((service, idx) => (
            <Link 
              key={idx}
              to={`/service-detail/${service.id}`}
              className="group bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-brand-blue dark:text-white text-2xl mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <i className={service.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-3 text-center md:text-left">{service.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6 flex-grow text-justify md:text-left">
                {service.fullDesc || service.desc}
              </p>
              <div className="flex items-center text-brand-gold font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                Read More <i className="fa-solid fa-arrow-right ml-2"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SERVICE DETAIL PAGE ---
const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const service = STUDENT_SERVICES_DATA.find(s => s.id === id);

  if (!service) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-slate-900">
       <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
         <i className="fa-solid fa-triangle-exclamation text-3xl"></i>
       </div>
       <h2 className="text-2xl font-black text-brand-blue dark:text-white mb-4">Service Not Found</h2>
       <Link to="/services" className="px-6 py-3 bg-brand-gold text-white rounded-xl font-bold text-xs uppercase tracking-widest">Back to Services</Link>
    </div>
  );

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-slate-900 pb-20">
       {/* Hero Banner */}
       <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.image || HERO_IMG_URL} className="w-full h-full object-cover" alt={service.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/80 to-brand-blue/40"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 mt-10">
          <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-brand-gold text-3xl mb-8">
             <i className={service.icon}></i>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-sm">{service.title}</h1>
          <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {service.desc}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-10">
               {/* Overview */}
               <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700">
                  <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6 flex items-center">
                    Overview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-loose text-lg font-medium">
                    {service.longDescription || service.fullDesc}
                  </p>
               </div>

               {/* Benefits */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits && service.benefits.map((benefit: string, i: number) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 flex items-start">
                       <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center shrink-0 mr-4 text-sm">
                         <i className="fa-solid fa-check"></i>
                       </div>
                       <div>
                          <h4 className="font-bold text-brand-blue dark:text-white text-lg mb-1">Benefit {i+1}</h4>
                          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">{benefit}</p>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Process */}
               <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-700">
                 <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-8">How It Works</h3>
                 <div className="space-y-8 relative">
                    <div className="absolute top-4 bottom-4 left-[21px] w-0.5 bg-gray-100 dark:bg-slate-700"></div>
                    {service.process && service.process.map((step: string, i: number) => (
                      <div key={i} className="relative pl-16">
                        <div className="absolute left-0 top-1 w-11 h-11 bg-brand-gold text-white rounded-full flex items-center justify-center font-black text-sm shadow-lg z-10 border-4 border-white dark:border-slate-800">
                          {i+1}
                        </div>
                        <h4 className="font-bold text-xl text-brand-blue dark:text-white mb-2">{step}</h4>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">We ensure this step is handled with utmost care and precision.</p>
                      </div>
                    ))}
                 </div>
               </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-lg border border-gray-100 dark:border-slate-700 sticky top-24">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-black text-brand-blue dark:text-white mb-2">Get Expert Help</h3>
                    <p className="text-sm text-gray-500 font-medium">Fill the form to start your {service.title} journey.</p>
                  </div>
                  <ContactForm />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- OFFICE DETAIL PAGE ---
const OfficeDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const office = OFFICE_ADDRESSES.find(o => o.slug === slug);

  if (!office) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-slate-900">
      <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
        <i className="fa-solid fa-location-slash text-3xl"></i>
      </div>
      <h2 className="text-2xl font-black text-brand-blue dark:text-white mb-4">Location Not Found</h2>
      <Link to="/" className="px-6 py-3 bg-brand-gold text-white rounded-xl font-bold text-xs uppercase tracking-widest">Back to Home</Link>
    </div>
  );

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-slate-900 pb-20">
      <div className="bg-brand-blue py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">
             Visit Us
          </span>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">{office.city} Office</h1>
          <p className="text-xl text-white/80 font-medium">{office.state}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row">
           <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-2xl font-black text-brand-blue dark:text-white mb-8 border-l-4 border-brand-gold pl-4">Contact Information</h2>
              
              <div className="space-y-8">
                 <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-brand-blue dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0 mr-6 text-xl">
                       <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Address</p>
                       <p className="text-lg font-bold text-gray-800 dark:text-white leading-relaxed">{office.address}</p>
                    </div>
                 </div>

                 <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center shrink-0 mr-6 text-xl">
                       <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Phone</p>
                       <a href={`tel:${office.phone}`} className="text-lg font-bold text-gray-800 dark:text-white hover:text-brand-gold transition-colors">{office.phone}</a>
                    </div>
                 </div>

                 <div className="pt-6">
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-8 py-4 bg-brand-gold text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-blue transition-all shadow-lg"
                    >
                      <i className="fa-solid fa-diamond-turn-right mr-3"></i> Get Directions
                    </a>
                 </div>
              </div>
           </div>

           <div className="md:w-1/2 min-h-[400px] relative bg-gray-100">
              {office.mapEmbed ? (
                 <iframe 
                   src={office.mapEmbed} 
                   className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                 ></iframe>
              ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">Map Unavailable</div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

const ExamPage = () => {
   const { subPath } = useParams<{ subPath: string }>();
   const data = EXAMS_DETAILED[subPath || 'neet-ug'];

   if (!data) return <div className="py-20 text-center font-bold text-gray-500">Exam information not available.</div>;

   // Mapping legacy exam data to new ProgramDetailPage format
   // If data.content is present (like in neet-ug), use it.
   // Otherwise construct it from legacy fields.
   const contentHtml = data.content || `
     ${data.overview ? `<h3>About</h3><p>${data.overview}</p>` : ''}
     ${data.eligibility && data.eligibility.length > 0 ? `<h3>Eligibility</h3><ul>${data.eligibility.map((e: string) => `<li>${e}</li>`).join('')}</ul>` : ''}
     ${data.syllabus && data.syllabus.length > 0 ? `<h3>Syllabus</h3><ul>${data.syllabus.map((s: string) => `<li>${s}</li>`).join('')}</ul>` : ''}
     ${data.prepTips && data.prepTips.length > 0 ? `<h3>Preparation Tips</h3><ul>${data.prepTips.map((t: string) => `<li>${t}</li>`).join('')}</ul>` : ''}
   `;

   const adaptedData = {
     title: data.title,
     tagline: data.tagline,
     heroImage: data.heroImage || HERO_IMG_URL,
     content: contentHtml,
     faqs: data.faqs ? data.faqs.map((f:any) => ({ question: f.q, answer: f.a })) : []
   };
   
   return <ProgramDetailPage data={adaptedData} type="course" />;
};

const AboutPage = () => <div className="py-20 text-center"><h1 className="text-4xl font-bold">About Us</h1><AboutSection compact={false} /></div>;
const BlogListPage = () => <BlogSection />;
const ContactPage = () => <div className="py-20 text-center"><h1 className="text-4xl font-bold">Contact</h1><ContactMapSection /></div>;

// --- DYNAMIC COLLEGE PAGE WRAPPER ---
const CollegeDetailWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Try fetching from Firestore by slug field
        const q = query(collection(db, 'colleges'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setData(querySnapshot.docs[0].data());
        } else {
          // Fallback to local constants
          if (slug && COLLEGE_DETAILS[slug]) {
            setData(COLLEGE_DETAILS[slug]);
          } else {
            setData(null);
          }
        }
      } catch (e) {
        console.error("College fetch failed", e);
        // Fallback on error
        if (slug) setData(COLLEGE_DETAILS[slug] || null);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) fetchData();
    else setLoading(false);
  }, [slug]);

  if (loading) return <LoadingOverlay />;
  
  return <CollegeDetailPage data={data} />;
};

const StudyIndiaWrapper = () => {
  const { subPath } = useParams<{ subPath: string }>();
  return <StudyIndiaDetailPage data={INDIA_COURSES_DETAILED[subPath || 'mbbs']} />;
};

const StudyAbroadWrapper = () => {
  const { subPath } = useParams<{ subPath: string }>();
  return <StudyAbroadDetailPage data={STUDY_ABROAD_DETAILED[subPath || 'usa']} />;
};

const MBBSAbroadWrapper = () => {
  const { subPath } = useParams<{ subPath: string }>();
  return <MBBSDetailPage data={MBBS_ABROAD_DETAILED[subPath || 'russia']} />;
};

const BlogDetailWrapper = () => {
  const { category, slug } = useParams<{ category: string, slug: string }>();
  // Handle both /blog/:slug and /blog/:category/:slug
  // If only slug is present, it might be in the first param if route is defined differently
  // But we will define routes clearly.
  return <BlogDetailPage slug={slug || ''} />;
};


const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAICounselorOpen, setIsAICounselorOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [hasTriggeredPopup, setHasTriggeredPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Reset popup trigger on route change
  useEffect(() => {
    setHasTriggeredPopup(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Trigger contact modal on 40-50% scroll
  useEffect(() => {
    if (location.pathname === '/contact') return;
    if (hasTriggeredPopup) return; // Don't add listener if already triggered

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

      if (scrollPercentage >= 40 && scrollPercentage <= 50) {
        if (!isContactModalOpen && !hasTriggeredPopup) {
            setIsContactModalOpen(true);
            setHasTriggeredPopup(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isContactModalOpen, hasTriggeredPopup]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // Handle Admin Exit
  const handleAdminExit = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-300 font-sans bg-white dark:bg-slate-900 overflow-x-hidden">
      {isLoading && <LoadingOverlay />}
      
      {/* Conditionally render Navbar based on route if needed, but usually it's always there except maybe admin */}
      {location.pathname !== '/admin' && (
        <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
      )}
      
      <main className="flex-grow">
        <Routes location={location}>
          <Route path="/" element={
            <>
              <Hero onBookSession={() => setIsContactModalOpen(true)} />
              <StatsSection />
              <WhoWeAre />
              <IndiaSection />
              <PopularColleges />
              <Roadmap onBookSession={() => setIsContactModalOpen(true)} />
              <AirportDiaries />
              <KnowYourDestination />
              <StudentReviews />
              <AwardsAchievements />
              <ExpertCounselorsCTA />
              <BlogSection />
              <ContactMapSection />
            </>
          } />
          
          <Route path="/admin" element={<AdminPanel onExit={handleAdminExit} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service-detail/:id" element={<ServiceDetailPage />} />
          <Route path="/blog-list" element={<BlogListPage />} />
          <Route path="/blog/:category/:slug" element={<BlogDetailWrapper />} />
          <Route path="/blog/:slug" element={<BlogDetailWrapper />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/study-india/:subPath" element={<StudyIndiaWrapper />} />
          <Route path="/study-abroad/:subPath" element={<StudyAbroadWrapper />} />
          <Route path="/mbbs-abroad/:subPath" element={<MBBSAbroadWrapper />} />
          <Route path="/exams/:subPath" element={<ExamPage />} />
          <Route path="/office/:slug" element={<OfficeDetailPage />} />
          <Route path="/college/:slug" element={<CollegeDetailWrapper />} />
          <Route path="/privacy-policy" element={<PolicyPage title="Privacy Policy" content={PRIVACY_POLICY_CONTENT} />} />
          <Route path="/terms-conditions" element={<PolicyPage title="Terms & Conditions" content={TERMS_CONTENT} />} />
          <Route path="*" element={<div className="p-20 text-center">Page Not Found</div>} />
        </Routes>
        
        {/* Global CTA Strip on all pages except Home and Contact */}
        {location.pathname !== '/' && location.pathname !== '/contact' && location.pathname !== '/admin' && (
          <GlobalCallToAction onOpen={() => setIsContactModalOpen(true)} />
        )}
      </main>
      
      {location.pathname !== '/admin' && <Footer />}
      
      {/* Floating Buttons */}
      <FloatingActions />

      {/* Contact Modal */}
      {isContactModalOpen && <ContactModal onClose={() => setIsContactModalOpen(false)} />}

      {/* AI Counselor */}
      {isAICounselorOpen && <AICounselor onClose={() => setIsAICounselorOpen(false)} />}
    </div>
  );
};

export default App;
