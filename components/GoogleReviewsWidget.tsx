
import React, { useEffect } from 'react';

interface GoogleReviewsWidgetProps {
  instanceId: string;
}

const GoogleReviewsWidget: React.FC<GoogleReviewsWidgetProps> = ({ instanceId }) => {
  useEffect(() => {
    // Ensuring the script is added once
    const scriptId = 'beaver-codes-reviews-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://reviews.beaver.codes/widget/web-google-reviews.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full py-12 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
           <h2 className="text-3xl font-black text-brand-blue dark:text-white uppercase tracking-tight">Trust of <span className="text-brand-gold">thousands</span></h2>
           <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Verified Google Reviews</p>
        </div>
        <div data-instance-id={instanceId}></div>
      </div>
    </div>
  );
};

export default GoogleReviewsWidget;
