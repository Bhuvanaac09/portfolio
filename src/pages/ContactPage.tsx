import React, { useState, useEffect } from 'react';
import { ContactFormData, FormValidationResult } from '../types';
import { validateContactForm } from '../utils/siteLogic';
import { PROFILE, SOCIAL_LINKS } from '../data/siteData';

interface MessageRecord {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [validation, setValidation] = useState<FormValidationResult>({
    isValid: true,
    errors: {}
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ id?: number; timestamp?: string; message?: string } | null>(null);

  // Python backend message log drawer / toggle
  const [showLog, setShowLog] = useState(false);
  const [savedMessages, setSavedMessages] = useState<MessageRecord[]>([]);
  const [loadingLog, setLoadingLog] = useState(false);
  const [pythonVersion, setPythonVersion] = useState<string>('Python 3.10');

  // Fetch backend status and messages
  const fetchMessages = async () => {
    try {
      setLoadingLog(true);
      const res = await fetch('/api/contact/messages');
      if (res.ok) {
        const json = await res.json();
        setSavedMessages(json.data || []);
      }
    } catch {
      // Ignore background fetch error
    } finally {
      setLoadingLog(false);
    }
  };

  useEffect(() => {
    // Check Python backend health
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => {
        if (data.pythonBackend?.python_version) {
          const v = data.pythonBackend.python_version.split(' ')[0];
          setPythonVersion(`Python ${v}`);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Client-side quick check
    const clientValidation = validateContactForm(formData);
    setValidation(clientValidation);

    if (!clientValidation.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Real API call to Python backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setValidation({ isValid: false, errors: data.errors });
        }
        setSubmitError(data.error || data.message || 'Python backend encountered a validation error.');
        setIsSubmitting(false);
        return;
      }

      setSuccessInfo({
        id: data.data?.id,
        timestamp: data.data?.created_at,
        message: data.message,
      });
      setSubmitted(true);
      setIsSubmitting(false);
      // Refresh messages log
      fetchMessages();
    } catch (err: unknown) {
      setSubmitError((err as Error).message || 'Unable to connect to Python backend server.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Banner with Artwork and Header (Original Layout) */}
      <section className="relative w-full max-w-5xl mx-auto px-6 pt-4 pb-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-start mb-6">
          <div className="w-36 sm:w-48 md:w-64 select-none">
            <img
              src="/assets/VG967-site-sayhell8.gif"
              alt="Pixel art city scene"
              className="w-full h-auto pixelated object-contain"
            />
          </div>
          <div className="pt-6 sm:pt-10 text-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] text-[#7b1300] uppercase">
              CONTACT ME
            </h1>
          </div>
        </div>
      </section>

      {/* Main 2-Column Responsive Layout */}
      <section className="w-full max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Say Hello Form */}
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-medium text-[#7b1300] tracking-wide">
              Say Hello
            </h2>
            {/* Python Backend Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#2b4c3f]/10 border border-[#2b4c3f]/25 text-[#2b4c3f] text-xs font-semibold rounded-md tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#48796a] animate-pulse" />
              {pythonVersion} • SQLite Backend
            </span>
          </div>

          <div className="bg-[#f0eada] border border-[#d8d0bc] rounded-2xl p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-8 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 mx-auto bg-[#48796a] text-white rounded-full flex items-center justify-center text-xl font-bold shadow-xs">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#7b1300]">
                  Thank you for reaching out!
                </h3>
                <p className="text-sm text-[#444] leading-relaxed">
                  {successInfo?.message || `Your message has been saved in the Python backend database for ${PROFILE.shortName}.`}
                </p>
                {successInfo?.id && (
                  <div className="text-xs font-mono text-[#666] bg-[#e5dec9]/60 border border-[#d8d0bc] py-1.5 px-3 rounded inline-block">
                    Reference ID: #{successInfo.id}
                  </div>
                )}
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                      setSuccessInfo(null);
                    }}
                    className="mt-3 px-6 py-2 bg-[#7b1300] hover:bg-[#600f00] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {submitError && (
                  <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-xs text-red-700 font-medium">
                    {submitError}
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    id="contact-name"
                    aria-label="Your Name *"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (validation.errors.name) {
                        setValidation({
                          ...validation,
                          errors: { ...validation.errors, name: undefined }
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-[#faf7ef] border rounded-lg text-sm text-[#333] placeholder-[#888] focus:outline-none focus:ring-1 focus:ring-[#7b1300] transition-colors ${
                      validation.errors.name
                        ? 'border-red-500'
                        : 'border-[#cfc5b0]'
                    }`}
                  />
                  {validation.errors.name && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {validation.errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    id="contact-email"
                    aria-label="Email *"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (validation.errors.email) {
                        setValidation({
                          ...validation,
                          errors: { ...validation.errors, email: undefined }
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-[#faf7ef] border rounded-lg text-sm text-[#333] placeholder-[#888] focus:outline-none focus:ring-1 focus:ring-[#7b1300] transition-colors ${
                      validation.errors.email
                        ? 'border-red-500'
                        : 'border-[#cfc5b0]'
                    }`}
                  />
                  {validation.errors.email && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {validation.errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    id="contact-message"
                    aria-label="Message"
                    rows={5}
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#faf7ef] border border-[#cfc5b0] rounded-lg text-sm text-[#333] placeholder-[#888] focus:outline-none focus:ring-1 focus:ring-[#7b1300] transition-colors resize-y"
                  />
                  {validation.errors.message && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {validation.errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button & Python Status */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-[#7b1300] hover:bg-[#620f00] text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase rounded transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'PROCESSING IN PYTHON...' : 'SEND NOW'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!showLog) fetchMessages();
                      setShowLog(!showLog);
                    }}
                    className="text-xs text-[#7b1300] hover:underline font-medium cursor-pointer"
                  >
                    {showLog ? 'Hide DB Log' : 'View DB Log'}
                  </button>
                </div>
              </form>
            )}

            {/* Collapsible SQLite Database Log Viewer */}
            {showLog && (
              <div className="mt-6 pt-5 border-t border-[#d8d0bc]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-[#7b1300] uppercase tracking-wider">
                    SQLite Database ({savedMessages.length} Messages Saved via Python)
                  </h4>
                  <button
                    type="button"
                    onClick={fetchMessages}
                    className="text-[11px] text-[#48796a] font-semibold hover:underline cursor-pointer"
                  >
                    {loadingLog ? 'Refreshing...' : '↻ Refresh'}
                  </button>
                </div>

                {savedMessages.length === 0 ? (
                  <p className="text-xs text-[#777] italic">No messages saved yet.</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {savedMessages.slice(0, 5).map((msg) => (
                      <div
                        key={msg.id}
                        className="p-2.5 bg-[#faf7ef] border border-[#d8d0bc] rounded-md text-xs space-y-1"
                      >
                        <div className="flex justify-between items-center text-[#7b1300] font-semibold">
                          <span>{msg.name}</span>
                          <span className="text-[10px] text-[#888] font-mono">
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[#555] line-clamp-2 text-[11px]">{msg.message || '(No message)'}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Get In Touch */}
        <div className="w-full flex flex-col pt-2">
          <h2 className="text-2xl sm:text-3xl font-medium text-[#7b1300] tracking-wide mb-6">
            Get In Touch
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#404040] leading-relaxed mb-6">
            <p>Got a question or want to say hello?</p>
            <p>
              Fill this form or drop me a message at{' '}
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="text-[#7b1300] underline hover:text-[#530c00] font-medium"
              >
                {SOCIAL_LINKS.email}
              </a>
              .
            </p>
            <p>You also can connect with me on social media.</p>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-3 mb-10 text-[#7b1300]">
            {/* Instagram */}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 flex items-center justify-center border-2 border-[#7b1300] rounded-md hover:bg-[#7b1300] hover:text-[#e5dec9] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 flex items-center justify-center border-2 border-[#7b1300] rounded-md hover:bg-[#7b1300] hover:text-[#e5dec9] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 flex items-center justify-center border-2 border-[#7b1300] rounded-md hover:bg-[#7b1300] hover:text-[#e5dec9] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Duck Plane Animation Sprite (Original site asset) */}
          <div className="w-full max-w-sm select-none flex justify-center md:justify-start">
            <img
              src="/assets/VG968-bird.gif"
              alt="Animated duck airplane car with pilot and little chick"
              className="w-56 sm:w-64 md:w-72 h-auto pixelated"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

