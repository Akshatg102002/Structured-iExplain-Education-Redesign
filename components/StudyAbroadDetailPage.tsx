import React from 'react';
import { MBBSDetailData } from '../types.ts';
import { useNavigate } from 'react-router-dom';

interface StudyAbroadDetailPageProps {
  data: MBBSDetailData;
}

const StudyAbroadDetailPage: React.FC<StudyAbroadDetailPageProps> = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-fade-in bg-white dark:bg-slate-900">
      <div className="w-24 h-24 bg-brand-light dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <i className="fa-solid fa-plane-departure text-4xl text-brand-gold"></i>
      </div>
      <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-4">Destination Details Updating</h2>
      <p className="text-gray-500 font-medium max-w-md">We are currently curating the comprehensive guide for this destination.</p>
      <button onClick={() => navigate('/contact')} className="mt-8 px-8 py-4 bg-brand-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-gold transition-all">Contact Us</button>
    </div>
  );

  const destinationName = data.quickFacts.country;

  return (
    <div className="bg-white dark:bg-slate-900 pb-20 animate-fade-in font-sans">
      {/* 1. Hero Section */}
      <div className="relative bg-brand-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Study Abroad
            </span>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
              Study in <span className="text-brand-gold">{destinationName}</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 font-medium leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              {data.intro.text}
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-brand-gold text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-brand-blue transition-all shadow-lg"
            >
              Get Free Counseling
            </button>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-brand-gold rounded-[3rem] rotate-3 scale-105 opacity-20 blur-lg"></div>
            <img src={data.heroImage} alt={`Study in ${destinationName}`} className="relative rounded-[3rem] shadow-2xl border-4 border-white/10 object-cover h-[400px] w-full" />
          </div>
        </div>
        
        {/* Ticker */}
        <div className="bg-brand-gold/10 border-y border-brand-gold/20 overflow-hidden relative z-10 flex items-center h-12">
          <div className="flex whitespace-nowrap animate-marquee items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center mx-4">
                <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mx-4">Popular Cities:</span>
                <span className="text-white font-medium text-sm">{data.quickFacts.popularCities}</span>
                <span className="mx-8 text-brand-gold/50">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        
        {/* 2. Why Study in [Destination]? */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-brand-blue dark:text-white mb-4">Why Study in {destinationName}?</h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">Discover the unique advantages and world-class opportunities that make {destinationName} a top choice for international students.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-brand-blue dark:text-brand-gold text-2xl mb-6">
                  <i className="fa-solid fa-star"></i>
                </div>
                <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-3">Advantage {idx + 1}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Top Course Streams */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-brand-blue dark:text-white mb-4">Top Course Streams to Study in {destinationName}</h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">Explore the most sought-after academic fields and their career prospects.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { stream: "Engineering & Technology", courses: "Computer Science, Mechanical, Data Science", opps: "Software Developer, Data Analyst, Engineer" },
              { stream: "Business & Management", courses: "MBA, Finance, Marketing, International Business", opps: "Business Analyst, Marketing Manager, Consultant" },
              { stream: "Healthcare & Medicine", courses: "Public Health, Nursing, Biotechnology", opps: "Healthcare Administrator, Researcher, Nurse" },
              { stream: "Arts & Humanities", courses: "Psychology, Sociology, International Relations", opps: "Counselor, HR Specialist, Diplomat" }
            ].map((course, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-slate-800 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-black text-brand-blue dark:text-white mb-4">{course.stream}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block mb-1">Popular Courses</span>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{course.courses}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block mb-1">Career Opportunities</span>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{course.opps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Top Universities */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-brand-blue dark:text-white mb-4">Top Universities in {destinationName} for International Students</h2>
          </div>
          <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-6 bg-gray-50 dark:bg-slate-900/50 text-brand-blue dark:text-white font-black border-b border-gray-100 dark:border-slate-700">University Name</th>
                  <th className="p-6 bg-gray-50 dark:bg-slate-900/50 text-brand-blue dark:text-white font-black border-b border-gray-100 dark:border-slate-700">Location</th>
                  <th className="p-6 bg-gray-50 dark:bg-slate-900/50 text-brand-blue dark:text-white font-black border-b border-gray-100 dark:border-slate-700">Established</th>
                  <th className="p-6 bg-gray-50 dark:bg-slate-900/50 text-brand-blue dark:text-white font-black border-b border-gray-100 dark:border-slate-700">Average Tuition Fees/Year</th>
                </tr>
              </thead>
              <tbody>
                {data.topUniversities.map((uni, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-6 border-b border-gray-100 dark:border-slate-700 font-bold text-brand-blue dark:text-white">{uni.name}</td>
                    <td className="p-6 border-b border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 font-medium">{uni.location}</td>
                    <td className="p-6 border-b border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 font-medium">{uni.established}</td>
                    <td className="p-6 border-b border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 font-medium">{uni.tuitionFees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Documents Required */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-brand-blue dark:text-white mb-4">Documents Required to Study in {destinationName}</h2>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 bg-brand-blue text-white font-black w-1/2">Document</th>
                  <th className="p-6 bg-brand-blue/90 text-white font-black w-1/2">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {data.documents.map((doc, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-900'}>
                    <td className="p-6 border-b border-gray-100 dark:border-slate-700 font-bold text-brand-blue dark:text-white flex items-center gap-3">
                      <i className="fa-solid fa-file-lines text-brand-gold"></i> {doc}
                    </td>
                    <td className="p-6 border-b border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 font-medium">
                      Required for university admission and visa processing.
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Part-Time Work While You Study */}
        <section className="bg-[#fcf8ed] dark:bg-slate-800/50 rounded-[3rem] p-8 lg:p-16 border border-brand-gold/20 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-black text-brand-blue dark:text-white mb-6">Part-Time Work While You Study in {destinationName}</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
              <p>
                International students in {destinationName} generally have the opportunity to work part-time during their studies. This not only helps in managing living expenses but also provides valuable international work experience.
              </p>
              <p>
                Typically, students are allowed to work up to 20 hours per week during academic sessions and full-time during scheduled breaks and holidays.
              </p>
              <p>
                Popular part-time job sectors include retail, hospitality, customer service, and on-campus roles like research assistants or library staff. These roles help build professional networks and improve communication skills.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Part time work" className="rounded-[2rem] shadow-lg border-4 border-white dark:border-slate-700 object-cover h-[400px] w-full" />
          </div>
        </section>

        {/* 7. Cost to Study */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-brand-blue dark:text-white mb-4">Cost to Study in {destinationName}</h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">Understanding the financial requirements is crucial for planning your education abroad. Here is an estimated breakdown of expenses.</p>
          </div>
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 bg-gray-50 dark:bg-slate-900/50 text-brand-blue dark:text-white font-black border-b border-gray-100 dark:border-slate-700">Expense Category</th>
                  <th className="p-6 bg-gray-50 dark:bg-slate-900/50 text-brand-blue dark:text-white font-black border-b border-gray-100 dark:border-slate-700 text-right">Average Cost / Year</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-6 border-b border-gray-100 dark:border-slate-700 font-bold text-gray-700 dark:text-gray-300">Tuition Fees</td>
                  <td className="p-6 border-b border-gray-100 dark:border-slate-700 font-bold text-brand-blue dark:text-white text-right">{data.quickOverview.tuitionFees}</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-6 border-b border-gray-100 dark:border-slate-700 font-bold text-gray-700 dark:text-gray-300">Living Costs (Accommodation, Food, Transport)</td>
                  <td className="p-6 border-b border-gray-100 dark:border-slate-700 font-bold text-brand-blue dark:text-white text-right">{data.quickOverview.livingCost}</td>
                </tr>
              </tbody>
            </table>
            <div className="p-6 bg-blue-50 dark:bg-slate-900/80 border-t border-gray-100 dark:border-slate-700">
              <p className="text-sm text-brand-blue dark:text-gray-300 font-medium flex items-start gap-2">
                <i className="fa-solid fa-circle-info mt-1 text-brand-gold"></i>
                Note: You will be required to show proof of sufficient funds to cover your tuition and living expenses for at least the first year to obtain your student visa.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Why Choose Us */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-brand-blue dark:text-white mb-4">Why Choose iExplain Education to Study in {destinationName}</h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">We provide end-to-end support to ensure your study abroad journey is smooth and successful.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: "fa-user-tie", title: "Career Counseling", desc: "Expert guidance to choose the right course and career path." },
              { icon: "fa-building-columns", title: "University Selection", desc: "Shortlisting universities based on your profile and budget." },
              { icon: "fa-file-signature", title: "Application Support", desc: "Assistance with SOPs, LORs, and flawless applications." },
              { icon: "fa-passport", title: "Visa Guidance", desc: "Comprehensive support for visa documentation and interviews." },
              { icon: "fa-plane-arrival", title: "End-to-End Support", desc: "From test prep to pre-departure and post-arrival assistance." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 mx-auto bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold text-xl mb-4">
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <h3 className="font-bold text-brand-blue dark:text-white mb-2 text-sm">{service.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Life and Career After Study */}
        <section className="bg-brand-blue text-white rounded-[3rem] p-8 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-black mb-8">Life and Career After Study in {destinationName}</h2>
            <div className="space-y-6 text-white/80 font-medium leading-relaxed text-lg max-w-4xl">
              <p>
                Graduating from a university in {destinationName} opens doors to global career opportunities. Degrees from {destinationName} are highly respected by employers worldwide, giving you a competitive edge in the international job market.
              </p>
              <p>
                {data.careerOpportunities.postStudyWork} This allows you to gain practical experience, network with industry professionals, and potentially transition to a long-term work visa or permanent residency.
              </p>
              <p>
                Major economic hubs in the country offer thriving job markets in sectors like {data.careerOpportunities.industries}. The high quality of life, excellent healthcare, and multicultural environment make it an ideal place to build your career and future.
              </p>
            </div>
          </div>
        </section>

        {/* 10. FAQ Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-brand-blue dark:text-white mb-4">FAQs – Study in {destinationName}</h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
                <details className="group">
                  <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-brand-blue dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors select-none">
                    <span className="pr-4">{faq.question}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-brand-light dark:bg-slate-700 rounded-full text-brand-gold">
                      <i className="fa-solid fa-chevron-down text-sm"></i>
                    </span>
                  </summary>
                  <div className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed p-6 pt-0 border-t border-gray-50 dark:border-slate-700/50 mt-2">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default StudyAbroadDetailPage;
