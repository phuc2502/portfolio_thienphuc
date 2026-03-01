/// <reference types="vite/client" />

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../contexts/LanguageContext';

// EmailJS configuration - update these values with your own
// Get from https://dashboard.emailjs.com/admin
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_a7ixd56';
// Template auto-reply (sent to the form submitter)
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_17nvhcr';
// Template notification sent to your email (owner) - optional
const EMAILJS_OWNER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID || 'template_7lzk2dd';
// Public key found in Account → API keys → Public Key
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '5qmo2FFCXbyrB0jfQ';

// Initialize EmailJS with public key
if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [emailCopied, setEmailCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Your primary email address to receive notifications
  const targetEmail = "thiephuc.ba@gmail.com";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 80,
          clipPath: 'inset(100% 0% 0% 0%)'
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Description animation
    if (descRef.current) {
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    // Form animation
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('.form-element');
      gsap.fromTo(formElements,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }
  }, []);

  const handleEmailClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Try to copy email to clipboard
    try {
      // Use Clipboard API if available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(targetEmail);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 3000);
        console.log('✅ Email copied:', targetEmail);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = targetEmail;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 3000);
            console.log('✅ Email copied (fallback):', targetEmail);
          } else {
            console.error('❌ Copy failed');
          }
        } catch (err) {
          console.error('❌ Fallback copy failed:', err);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('❌ Failed to copy email:', err);
      // Still show notification so the user knows
      alert(`Email: ${targetEmail}\n\nAutomatically copied to clipboard (if browser supports).`);
    }

    // Delay briefly before opening mailto: to ensure copy has completed
    setTimeout(() => {
      window.location.href = `mailto:${targetEmail}`;
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Debug: Log EmailJS configuration
    console.log('=== EmailJS Configuration Debug ===');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', EMAILJS_TEMPLATE_ID);
    console.log('Public Key:', EMAILJS_PUBLIC_KEY ? `${EMAILJS_PUBLIC_KEY.substring(0, 10)}...` : 'NOT SET');
    console.log('Target Email:', targetEmail);
    console.log('Form Data:', formData);

    // Check if EmailJS has been configured
    const isEmailJSConfigured =
      EMAILJS_SERVICE_ID &&
      EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      EMAILJS_TEMPLATE_ID &&
      EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      EMAILJS_PUBLIC_KEY &&
      EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

    if (isEmailJSConfigured) {
      // Send email via EmailJS
      try {
        // 1) Send auto-reply email to the user (current Auto-Reply template)
        const templateParams = {
          // Variables for "Auto-Reply" template (sends email to the address user entered in form)
          // To Email - MUST have one of these variables in the EmailJS template
          email: formData.email,        // {{email}} -> To Email (recommended)
          to_email: formData.email,     // {{to_email}} -> To Email (fallback)

          // Information displayed in auto-reply email
          name: formData.name,          // {{name}}
          from_name: formData.name,     // {{from_name}}
          message: formData.message,    // {{message}} - message content
          title: formData.message,      // {{title}} - fallback if template uses title

          // Email of the sender (form submitter)
          from_email: formData.email,   // {{from_email}}

          // Owner email for replies
          reply_to: targetEmail,        // {{reply_to}} - when recipient clicks Reply, it goes to your email
          owner_email: targetEmail,     // {{owner_email}} - fallback
        };

        console.log('Sending auto-reply with params:', templateParams);

        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );

        console.log('✅ EmailJS auto-reply success:', result);
        console.log('Status:', result.status);
        console.log('Text:', result.text);

        // 2) Additionally send a notification email to your personal email (owner), if template is configured
        if (EMAILJS_OWNER_TEMPLATE_ID && EMAILJS_OWNER_TEMPLATE_ID !== 'YOUR_OWNER_TEMPLATE_ID' && EMAILJS_OWNER_TEMPLATE_ID !== 'template_7lzk2dd') {
          const ownerParams = {
            // Variables for "To Email" - MUST have one of these in the EmailJS template
            // Owner template must have "To Email" = {{email}}, {{to_email}}, or {{owner_email}}
            email: targetEmail,              // {{email}} -> To Email (recommended)
            to_email: targetEmail,           // {{to_email}} -> To Email (fallback)
            owner_email: targetEmail,        // {{owner_email}} -> To Email (fallback)

            // Form submitter information
            from_name: formData.name,        // {{from_name}} - form submitter name
            from_email: formData.email,      // {{from_email}} - form submitter email
            name: formData.name,             // {{name}} - fallback
            message: formData.message,       // {{message}} - message content
            title: formData.message,         // {{title}} - fallback

            // Email for replying to the form submitter
            reply_to: formData.email,        // {{reply_to}} - when you click Reply, it goes to the form submitter
          };

          console.log('📧 Sending owner notification with params:', ownerParams);
          console.log('📧 Owner Template ID:', EMAILJS_OWNER_TEMPLATE_ID);
          console.log('📧 Target Email (Owner):', targetEmail);

          try {
            const ownerResult = await emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_OWNER_TEMPLATE_ID,
              ownerParams,
              EMAILJS_PUBLIC_KEY
            );
            console.log('✅ EmailJS owner notification success:', ownerResult);
            console.log('✅ Owner email sent to:', targetEmail);
            console.log('✅ Status:', ownerResult.status);
            console.log('✅ Text:', ownerResult.text);
          } catch (ownerError: any) {
            console.error('❌ Owner notification email failed:', ownerError);
            console.error('❌ Error details:', {
              status: ownerError.status,
              text: ownerError.text,
              message: ownerError.message
            });

            // Display warning for owner notification error
            if (ownerError.text) {
              if (ownerError.text.includes('recipients address is empty') || ownerError.text.includes('recipient') && ownerError.text.includes('empty')) {
                console.error('❌ ERROR: Owner Template does not have "To Email" configured correctly!');
                console.error('❌ Check the template in EmailJS Dashboard and ensure "To Email" has value: {{email}}, {{to_email}}, or', targetEmail);
              } else if (ownerError.text.includes('Template not found')) {
                console.error('❌ ERROR: Owner Template ID does not exist:', EMAILJS_OWNER_TEMPLATE_ID);
                console.error('❌ Please check VITE_EMAILJS_OWNER_TEMPLATE_ID in .env file');
              }
            }
            // Don't break user experience if notification email fails
            // But log details for debugging
          }
        } else {
          if (EMAILJS_OWNER_TEMPLATE_ID === 'template_7lzk2dd') {
            console.warn('⚠️ Owner template ID is using default value. This template may not have been created in EmailJS.');
            console.warn('⚠️ Create a new Owner Notification template in EmailJS Dashboard and update VITE_EMAILJS_OWNER_TEMPLATE_ID in .env');
          } else {
            console.warn('⚠️ Owner template ID not configured. Skipping owner notification email.');
            console.warn('⚠️ To receive notification emails, create a template in EmailJS and add VITE_EMAILJS_OWNER_TEMPLATE_ID to .env');
          }
        }

        setSubmitStatus('success');
        setFormSubmitted(true);
        // Reset form
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => {
          setFormSubmitted(false);
          setSubmitStatus('idle');
        }, 5000);
      } catch (error: any) {
        console.error('❌ EmailJS Error Details:', error);
        console.error('Error Status:', error.status);
        console.error('Error Text:', error.text);
        console.error('Full Error Object:', JSON.stringify(error, null, 2));

        // Handle different error types
        let errorMsg = 'An error occurred while sending the email. Please try again.';

        if (error.text) {
          errorMsg = error.text;
        } else if (error.message) {
          errorMsg = error.message;
        } else if (typeof error === 'string') {
          errorMsg = error;
        }

        // Check common errors
        if (errorMsg.includes('recipients address is empty') || errorMsg.includes('recipient') && errorMsg.includes('empty')) {
          errorMsg = 'Error: Recipient email address is empty. Please check the template in EmailJS Dashboard - "To Email" must have {{email}}, {{to_email}} or a specific email address';
        } else if (errorMsg.includes('Account not found') || errorMsg.includes('Invalid public key')) {
          errorMsg = 'EmailJS configuration is incorrect. Please check the API keys in .env file';
        } else if (errorMsg.includes('Service not found')) {
          errorMsg = 'Service ID is incorrect. Please check in EmailJS dashboard';
        } else if (errorMsg.includes('Template not found')) {
          errorMsg = 'Template ID is incorrect. Please check in EmailJS dashboard';
        } else if (error.status === 400) {
          errorMsg = `Error 400: ${error.text || 'Invalid data. Check template variables in EmailJS'}`;
        } else if (error.status === 403) {
          errorMsg = 'Error 403: Access denied. Check your Public Key';
        } else if (error.status === 404) {
          errorMsg = 'Error 404: Service or Template not found';
        }

        setSubmitStatus('error');
        setErrorMessage(errorMsg);

        // Fallback: copy to clipboard and try mailto
        fallbackToMailto();
      }
    } else {
      console.warn('⚠️ EmailJS not configured, using fallback');
      // Fallback: use mailto: and clipboard
      fallbackToMailto();
    }

    setIsSending(false);
  };

  const fallbackToMailto = async () => {
    const subject = `Portfolio Inquiry from ${formData.name}`;
    const emailContent = `To: ${targetEmail}\nSubject: ${subject}\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(emailContent);
      setFormSubmitted(true);
      setSubmitStatus('success');
      setTimeout(() => {
        setFormSubmitted(false);
        setSubmitStatus('idle');
      }, 5000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }

    // Try to open mailto: link
    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
  };

  return (
    <div ref={containerRef} className="px-6 md:px-12 py-24 md:py-48 max-w-screen-xl mx-auto border-t border-white/5 relative z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">

        {/* Left Side: Info */}
        <div className="lg:col-span-5 space-y-12 relative z-20">
          <div className="space-y-6">
            <h2 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] opacity-0" style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
              {t('contact.title')} <br /> {t('contact.titleLine2')}
            </h2>
            <p ref={descRef} className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-sm opacity-0">
              {t('contact.description')}{' '}
              <span className="inline-flex items-center gap-2">
                <a
                  href={`mailto:${targetEmail}`}
                  className="text-white underline decoration-white/20 hover:decoration-white transition-all underline-offset-4 font-bold cursor-pointer pointer-events-auto relative z-30"
                >
                  {targetEmail}
                </a>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    try {
                      if (navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(targetEmail);
                        setEmailCopied(true);
                        setTimeout(() => setEmailCopied(false), 3000);
                        console.log('✅ Email copied:', targetEmail);
                      } else {
                        // Fallback
                        const textArea = document.createElement('textarea');
                        textArea.value = targetEmail;
                        textArea.style.position = 'fixed';
                        textArea.style.left = '-999999px';
                        textArea.style.top = '-999999px';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        const successful = document.execCommand('copy');
                        document.body.removeChild(textArea);
                        if (successful) {
                          setEmailCopied(true);
                          setTimeout(() => setEmailCopied(false), 3000);
                        }
                      }
                    } catch (err) {
                      console.error('❌ Failed to copy:', err);
                      alert(`Email: ${targetEmail}`);
                    }
                  }}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer pointer-events-auto relative z-30"
                  title={t('contact.copyEmail')}
                  aria-label={t('contact.copyToClipboard')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </span>
              {' '}{t('contact.orDropInfo')}
              {emailCopied && (
                <span className="block mt-2 text-green-400 text-sm font-medium animate-pulse">
                  {t('contact.emailCopied')}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 relative z-20">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3 form-element opacity-0">
                <label className="mono text-[9px] uppercase tracking-[0.4em] opacity-60 font-bold">{t('contact.fullName')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full bg-white/[0.05] border border-white/10 p-5 rounded-md focus:outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all duration-300 text-sm placeholder:text-white/20"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-3 form-element opacity-0">
                <label className="mono text-[9px] uppercase tracking-[0.4em] opacity-60 font-bold">{t('contact.emailAddress')}</label>
                <input
                  type="email"
                  required
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full bg-white/[0.05] border border-white/10 p-5 rounded-md focus:outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all duration-300 text-sm placeholder:text-white/20"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3 form-element opacity-0">
              <label className="mono text-[9px] uppercase tracking-[0.4em] opacity-60 font-bold">{t('contact.yourMessage')}</label>
              <textarea
                required
                rows={5}
                placeholder={t('contact.messagePlaceholder')}
                className="w-full bg-white/[0.05] border border-white/10 p-5 rounded-md focus:outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all duration-300 text-sm resize-none placeholder:text-white/20"
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <p className="text-sm opacity-80 font-medium tracking-tight form-element opacity-0">
              {t('contact.privacyNote')}
            </p>

            <motion.button
              type="submit"
              disabled={isSending}
              className="form-element opacity-0 w-full bg-[#111] border border-white/10 text-white py-6 rounded-md font-bold text-base uppercase flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {isSending ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="relative z-10">{t('contact.sending')}</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">{t('contact.sendMessage')}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </motion.button>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' && formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-4 p-6 bg-green-500/10 border border-green-500/20 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm font-semibold">{t('contact.successTitle')}</p>
                      <p className="text-green-300/60 text-xs mt-1">{t('contact.successDesc')}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-4 p-6 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-red-400 text-sm font-semibold">{t('contact.errorTitle')}</p>
                      <p className="text-red-300/60 text-xs mt-1">{errorMessage || t('contact.errorDesc')}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Contact;
