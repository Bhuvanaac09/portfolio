import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vero_cookie_consent');
    if (!consent) {
      // Show after a brief delay for natural experience
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (choice: string) => {
    localStorage.setItem('vero_cookie_consent', choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie Consent"
      className="fixed bottom-4 right-4 max-w-sm md:max-w-md bg-white rounded-xl shadow-2xl p-5 border border-slate-200 z-50 text-slate-800 text-xs leading-relaxed animate-fade-in"
    >
      <p className="mb-4 text-slate-600 text-[13px]">
        We use cookies to improve your experience and understand how you use our site.
        You can review your choices at any time.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          onClick={() => handleAction('accept_all')}
          className="px-3 py-1.5 bg-[#2c541d] hover:bg-[#224216] text-white font-medium rounded-md text-xs cursor-pointer transition-colors"
        >
          Accept All
        </button>
        <button
          onClick={() => handleAction('essential')}
          className="px-3 py-1.5 bg-[#2c541d] hover:bg-[#224216] text-white font-medium rounded-md text-xs cursor-pointer transition-colors"
        >
          Only Essential
        </button>
        <button
          onClick={() => handleAction('preferences')}
          className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-md text-xs cursor-pointer transition-colors"
        >
          Preferences
        </button>
        <button
          onClick={() => handleAction('decline')}
          className="px-3 py-1.5 bg-[#2c541d] hover:bg-[#224216] text-white font-medium rounded-md text-xs cursor-pointer transition-colors"
        >
          Decline
        </button>
      </div>

      <div className="flex justify-end text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          Powered by{' '}
          <span className="font-semibold text-slate-600">SureCookie</span>
        </span>
      </div>
    </div>
  );
};
