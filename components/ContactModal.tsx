
import React, { useEffect, useState } from 'react';
import { db, collection, addDoc, serverTimestamp } from '../firebase.ts';
import { LOGO_URL } from '../data.ts';
import { Link } from 'react-router-dom';
import { User, Phone, Mail } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

const COURSES = ["Masters", "Bachelors", "MBA", "MBBS", "B.Tech", "Engineering", "Medical", "Other"];
const COUNTRIES = ["USA", "UK", "Canada", "Australia", "Germany", "Ireland", "Russia", "Georgia", "India", "Other"];

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    targetCountry: ''
  });

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.course) {
      alert("Please select a course/degree.");
      return;
    }
    if (!formData.targetCountry) {
      alert("Please select a target country.");
      return;
    }

    setLoading(true);

    try {
      // Save to Firebase
      await addDoc(collection(db, 'leads'), {
        ...formData,
        timestamp: serverTimestamp(),
        source: 'Popup Modal'
      });

      const payload = {
        ...formData,
        source: 'Popup Modal',
        _subject: `New Lead: ${formData.name}`,
        _template: 'table',
        _captcha: 'false'
      };

      // Send email via FormSubmit (No backend required, works on any static host)
      const response = await fetch('https://formsubmit.co/ajax/iexplaineducation.online@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false); // Reset if reopened quickly
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col max-h-[95vh]">
        
        {/* Compact Header */}
        <div className="bg-brand-blue p-5 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-4">
              <img src={LOGO_URL} alt="Logo" className="h-8 w-auto brightness-100" />
              <div className="h-6 w-px bg-white/20"></div>
              <div>
                 <h2 className="text-lg font-black text-white leading-none mb-1">Unlock Your College Journey</h2>
                 <p className="text-[10px] text-white/70 font-medium uppercase tracking-wider">Free Counselling & Support</p>
              </div>
           </div>
           <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <i className="fa-solid fa-check text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-1">Thank You!</h3>
              <p className="text-gray-500 font-medium text-sm">We will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
               
              {/* Inputs Grid - Compact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Full Name*" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm font-medium focus:ring-1 focus:ring-[#BB962C] focus:border-[#BB962C] outline-none"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Email Address*" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm font-medium focus:ring-1 focus:ring-[#BB962C] focus:border-[#BB962C] outline-none"
                    />
                  </div>
                  
                  <div className="flex gap-2 sm:col-span-2">
                    <div className="flex items-center justify-center px-3 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm font-medium shrink-0">
                      <span className="mr-1.5">🇮🇳</span> +91
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <input 
                        type="tel" 
                        placeholder="Phone Number*" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm font-medium focus:ring-1 focus:ring-[#BB962C] focus:border-[#BB962C] outline-none"
                      />
                    </div>
                  </div>
              </div>

              {/* Options as Pills */}
              <div className="space-y-3 mt-4">
                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Select Course*</p>
                  <div className="flex flex-wrap gap-1.5">
                    {COURSES.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFormData({...formData, course: c})}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          formData.course === c 
                          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-white' 
                          : 'border-gray-200 text-gray-600 hover:border-brand-blue/50 dark:border-slate-600 dark:text-gray-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Select Country*</p>
                  <div className="flex flex-wrap gap-1.5">
                    {COUNTRIES.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFormData({...formData, targetCountry: c})}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          formData.targetCountry === c 
                          ? 'border-brand-blue bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-white' 
                          : 'border-gray-200 text-gray-600 hover:border-brand-blue/50 dark:border-slate-600 dark:text-gray-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 bg-[#104264] hover:bg-opacity-90 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center disabled:bg-gray-400 mt-4"
              >
                {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : null}
                {loading ? 'Processing...' : 'Submit'}
              </button>

              {/* Footer Text */}
              <div className="text-[10px] text-center text-gray-400 dark:text-gray-500 leading-relaxed pt-2">
                By submitting, you agree to our <Link to="/terms-conditions" onClick={onClose} className="underline hover:text-brand-blue dark:hover:text-white">Terms</Link> & <Link to="/privacy-policy" onClick={onClose} className="underline hover:text-brand-blue dark:hover:text-white">Privacy Policy</Link>.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
