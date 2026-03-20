
import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, serverTimestamp } from '../firebase.ts';
import { User, Phone, Mail } from 'lucide-react';

const COURSES = ["Masters", "Bachelors", "MBA", "MBBS", "B.Tech", "Engineering", "Medical", "Other"];
const COUNTRIES = ["USA", "UK", "Canada", "Australia", "Germany", "Ireland", "Russia", "Georgia", "India", "Other"];

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    targetCountry: ''
  });

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
        source: 'Website Contact Form'
      });

      const payload = {
        ...formData,
        source: 'Website Contact Form',
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
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', course: '', targetCountry: '' });
      }, 5000);
    } catch (error: any) {
      console.error("Error saving lead:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-slate-700">
      {submitted ? (
        <div className="text-center py-10 animate-fade-in">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-check text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-brand-blue dark:text-white mb-2">Application Received!</h3>
          <p className="text-gray-500 text-base font-medium">An expert advisor will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-black text-brand-blue dark:text-white mb-2 leading-tight">
              Take the 1st step towards your study abroad journey
            </h3>
          </div>

          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                required 
                disabled={loading}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all font-medium text-sm" 
                placeholder="Name*" 
              />
            </div>
            
            {/* Phone Input */}
            <div className="flex gap-2">
              <div className="flex items-center justify-center px-3 py-3.5 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 bg-gray-50 dark:text-white font-medium text-sm shrink-0">
                <span className="mr-2">🇮🇳</span> +91
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="tel" 
                  required 
                  disabled={loading}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all font-medium text-sm" 
                  placeholder="Mobile*" 
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="email" 
                required 
                disabled={loading}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all font-medium text-sm" 
                placeholder="Email*" 
              />
            </div>

            {/* Course/Degree Selection */}
            <div className="pt-2">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Which Degree do you want to pursue?*</p>
              <div className="flex flex-wrap gap-2">
                {COURSES.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({...formData, course: c})}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
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

            {/* Country Selection */}
            <div className="pt-2">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Which country are you planning to study in?*</p>
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({...formData, targetCountry: c})}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
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

          <div className="pt-4">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-4">
              By submitting this form, you agree to the <a href="#" className="underline hover:text-brand-blue">Terms of Use</a> and <a href="#" className="underline hover:text-brand-blue">Privacy Policy</a>
            </p>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#104264] text-white rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center disabled:bg-gray-400"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : null}
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
