
import React from 'react';
import { MBBSDetailData } from '../types.ts';
import ContactForm from './ContactForm.tsx';
import { useNavigate } from 'react-router-dom';

interface MBBSDetailPageProps {
  data: MBBSDetailData;
}

const MBBSDetailPage: React.FC<MBBSDetailPageProps> = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-fade-in bg-white dark:bg-slate-900">
      <div className="w-24 h-24 bg-brand-light dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <i className="fa-solid fa-user-doctor text-4xl text-brand-gold"></i>
      </div>
      <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-4">Program Details Updating</h2>
      <p className="text-gray-500 font-medium max-w-md">We are currently curating the comprehensive guide for this program.</p>
      <button onClick={() => navigate('/contact')} className="mt-8 px-8 py-4 bg-brand-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-gold transition-all">Contact Us</button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 pb-20 animate-fade-in font-sans">
      {/* 1. Page Title Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.heroImage} className="w-full h-full object-cover" alt={data.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight drop-shadow-lg">
            {data.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-lg lg:text-xl text-gray-700 font-medium leading-relaxed mb-8">
          {data.intro.text}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-brand-gold text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-blue transition-all shadow-lg"
          >
            Apply Now
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-brand-blue text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-gold transition-all"
          >
            Get Free Counseling
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* 2. Quick Facts & 3. Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-700">
            <h2 className="text-2xl font-black text-brand-blue dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">Quick Facts About {data.quickFacts.country}</h2>
            <div className="space-y-4">
              {Object.entries(data.quickFacts).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-700/50 last:border-0">
                  <span className="text-gray-500 dark:text-gray-400 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-brand-blue dark:text-white font-bold text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-blue rounded-3xl p-8 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <h2 className="text-2xl font-black mb-6 border-b border-white/10 pb-4 relative z-10">Quick Overview of MBBS in {data.quickFacts.country}</h2>
            <div className="space-y-4 relative z-10">
              {Object.entries(data.quickOverview).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                  <span className="text-white/70 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-white font-bold text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. MBBS for Indian Students & 5. Benefits */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-3/5">
            <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-6">MBBS in {data.quickFacts.country} for Indian Students</h2>
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 font-medium leading-loose whitespace-pre-line text-justify mb-10">
              {data.forIndianStudents}
            </div>
          </div>
          <div className="lg:w-2/5 bg-[#fcf8ed] dark:bg-slate-800/50 p-8 rounded-3xl border border-brand-gold/20">
            <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6">Benefits of Studying MBBS in {data.quickFacts.country}</h3>
            <ul className="space-y-4">
              {data.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <i className="fa-solid fa-check-circle text-brand-gold mt-1 mr-3"></i>
                  <span className="text-gray-700 dark:text-gray-300 font-bold">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 6. Duration & 7. Eligibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6">Duration of MBBS in {data.quickFacts.country}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                <span className="font-bold text-gray-700 dark:text-gray-300">MBBS Course</span>
                <span className="text-brand-blue dark:text-brand-gold font-black">{data.duration.mbbs}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                <span className="font-bold text-gray-700 dark:text-gray-300">Internship</span>
                <span className="text-brand-blue dark:text-brand-gold font-black">{data.duration.internship}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6">Eligibility Criteria</h3>
            <div className="space-y-3">
              {Object.entries(data.eligibility).map(([key, value]) => (
                <div key={key} className="flex flex-col border-b border-gray-100 dark:border-slate-700 pb-3 last:border-0">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-1">{key}</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8. Documents Required */}
        <div>
          <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-8 text-center">Documents Required</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.documents.map((doc, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 px-6 py-4 rounded-full shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-3 hover:-translate-y-1 transition-transform">
                <i className="fa-solid fa-file-circle-check text-brand-gold"></i>
                <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 9. India vs Country */}
        <div>
          <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-8 text-center">MBBS in India vs MBBS in {data.quickFacts.country}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 bg-brand-blue text-white font-black rounded-tl-2xl">Feature</th>
                  <th className="p-4 bg-brand-blue/90 text-white font-black">MBBS in India</th>
                  <th className="p-4 bg-brand-gold text-white font-black rounded-tr-2xl">MBBS in {data.quickFacts.country}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.indiaVsCountry).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-900'}>
                    <td className="p-4 border-b border-gray-100 dark:border-slate-700 font-bold text-brand-blue dark:text-white capitalize">{key}</td>
                    <td className="p-4 border-b border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 font-medium">{value.india}</td>
                    <td className="p-4 border-b border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 font-medium">{value.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 10. Top Medical Universities */}
        <div>
          <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-8 text-center">Top Medical Universities in {data.quickFacts.country}</h2>
          <div className="space-y-8">
            {data.topUniversities.map((uni, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-md border border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-2">{uni.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-6">{uni.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Established</p>
                    <p className="font-bold text-brand-blue dark:text-white">{uni.established}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Location</p>
                    <p className="font-bold text-brand-blue dark:text-white">{uni.location}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Tuition Fees</p>
                    <p className="font-bold text-brand-blue dark:text-white">{uni.tuitionFees}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Recognition</p>
                    <p className="font-bold text-brand-blue dark:text-white">{uni.recognition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 11. Why Choose Us & 12. Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-brand-blue text-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-black mb-6">Why Choose iExplain Education</h3>
            <ul className="space-y-4">
              {data.whyChooseUs.map((reason, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-star text-xs"></i>
                  </div>
                  <span className="font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6">Quick Checklist Before Applying</h3>
            <ul className="space-y-3">
              {data.checklist.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center p-3 border-b border-gray-50 dark:border-slate-700/50 last:border-0">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{item.item}</span>
                  {item.required ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">YES</span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">NO</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 13. Hostel Facilities */}
        <div className="bg-[#fcf8ed] dark:bg-slate-800/50 rounded-3xl p-8 lg:p-12 border border-brand-gold/20">
          <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-6">Hostel Facilities in {data.quickFacts.country}</h2>
          <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-8 max-w-4xl">{data.hostelFacilities.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.hostelFacilities.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                <i className="fa-solid fa-bed text-brand-gold"></i>
                <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 14. Career Opportunities */}
        <div>
          <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-8 text-center">Career Opportunities After MBBS in {data.quickFacts.country}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(data.careerOpportunities).map(([key, value]) => (
              <div key={key} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h4 className="text-lg font-black text-brand-blue dark:text-white mb-3 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 15. FAQ */}
        <div>
          <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
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
        </div>

        {/* Final CTA Section */}
        <div className="bg-brand-blue p-8 md:p-16 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-4xl font-black mb-6">Start Your MBBS Journey in {data.quickFacts.country}</h3>
              <p className="text-white/80 font-medium mb-10 text-lg">Get free counseling and admission guidance from our experts. We'll help you secure your seat in top universities.</p>
              <button onClick={() => navigate('/contact')} className="px-10 py-5 bg-brand-gold text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-brand-blue transition-all shadow-lg hover:-translate-y-1">
                Apply Now
              </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default MBBSDetailPage;
