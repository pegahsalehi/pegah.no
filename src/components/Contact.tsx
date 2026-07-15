import React, { useState } from 'react';
import { Download, ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { profileContact } from '@/data/profileContact';

const ContactInfoBox = () => {
  const { t } = useLanguage();

  const cvLinks = [
    {
      label: t.contact.cvEnglish,
      href: profileContact.cvEnglish,
    },
    {
      label: t.contact.cvNorwegian,
      href: profileContact.cvNorwegian,
    },
  ];

  const contactItems = [
    {
      id: 'email',
      label: t.contact.email,
      value: profileContact.email,
      href: `mailto:${profileContact.email}`,
      icon: Mail,
    },
    {
      id: 'location',
      label: t.contact.location,
      value: profileContact.location,
      icon: MapPin,
    },
  ];

  const profileLinks = [
    {
      label: t.contact.github,
      href: profileContact.github,
      icon: Github,
    },
    {
      label: t.contact.linkedin,
      href: profileContact.linkedin,
      icon: Linkedin,
    },
    {
      label: t.contact.googleScholar,
      href: profileContact.scholar,
      icon: GraduationCap,
      className: 'sm:col-span-2',
    },
  ];

  return (
    <motion.aside
      className="contact-card contact-info-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative space-y-6">
        <motion.section
          className="rounded-2xl border border-cyan-300/15 bg-white/[0.035] p-4 shadow-[0_0_24px_rgba(34,211,238,0.08)]"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            {t.contact.cvSectionTitle}
          </h3>
          <motion.div
            className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {cvLinks.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-3 text-center text-sm font-semibold leading-snug text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-200/60 hover:bg-gradient-to-br hover:from-cyan-400/15 hover:via-blue-500/10 hover:to-purple-500/15 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition-all duration-300 group-hover:border-cyan-200/50 group-hover:bg-cyan-300/20 group-hover:text-cyan-100">
                  <Download className="h-4 w-4" />
                </span>
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-200">
            {t.contact.contactInfoTitle}
          </h3>
          <motion.div
            className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition-all duration-300 group-hover:border-cyan-200/50 group-hover:bg-cyan-300/20 group-hover:text-cyan-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                      {item.label}
                    </span>
                    <span className="block break-words text-sm font-medium leading-snug text-gray-100">
                      {item.value}
                    </span>
                  </span>
                </>
              );

              if (item.href) {
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    className={`group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-300/45 hover:bg-gradient-to-br hover:from-cyan-400/10 hover:via-blue-500/10 hover:to-purple-500/10 hover:shadow-[0_0_22px_rgba(59,130,246,0.16)] ${item.className ?? ''}`}
                  >
                    {content}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={item.id}
                  className={`group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-300/45 hover:bg-gradient-to-br hover:from-cyan-400/10 hover:via-blue-500/10 hover:to-purple-500/10 hover:shadow-[0_0_22px_rgba(59,130,246,0.16)] ${item.className ?? ''}`}
                >
                  {content}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          className="rounded-2xl border border-purple-300/15 bg-gradient-to-br from-purple-500/[0.07] via-white/[0.025] to-cyan-400/[0.05] p-4 shadow-[0_0_24px_rgba(168,85,247,0.08)]"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-100">
            {t.contact.followTitle}
          </h3>
          <motion.div
            className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {profileLinks.map((item) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-purple-300/50 hover:bg-gradient-to-br hover:from-purple-500/15 hover:via-blue-500/10 hover:to-cyan-400/10 hover:shadow-[0_0_24px_rgba(168,85,247,0.18)] ${item.className ?? ''}`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-300/20 bg-purple-300/10 text-purple-200 transition-all duration-300 group-hover:border-purple-200/50 group-hover:bg-purple-300/20 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="break-words text-sm font-semibold leading-snug text-gray-100">
                      {item.label}
                    </span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-500 transition-colors duration-300 group-hover:text-purple-100" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.section>
      </div>
    </motion.aside>
  );
};

const ContactForm = () => {
  const { t } = useLanguage();
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    collaborationType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.collaborationType) {
      setSubmitStatus({
        type: 'error',
        message: t.contact.selectTypeError,
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      if (!web3FormsAccessKey) {
        throw new Error('Missing Web3Forms access key');
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          subject: 'New message from Pegah Salehi portfolio website',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          collaborationType: formData.collaborationType,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: t.contact.successMessage,
        });
        setFormData({ firstName: '', lastName: '', email: '', collaborationType: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: t.contact.failureMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const collaborationOptions = [
    { value: 'collaboration', label: t.contact.collaboration },
    { value: 'Freelance', label: t.contact.freelance },
    { value: 'project', label: t.contact.project },
  ];

  return (
    <div className="form-container">
      <h2 className="text-2xl font-bold text-white mb-4">{t.contact.formTitle}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="form-group flex-1">
            <label htmlFor="firstName">{t.contact.firstName}</label>
            <input 
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t.contact.firstNamePlaceholder}
              required
            />
          </div>
          
          <div className="form-group flex-1">
            <label htmlFor="lastName">{t.contact.lastName}</label>
            <input 
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t.contact.lastNamePlaceholder}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">{t.contact.email}</label>
          <input 
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.contact.emailPlaceholder}
            required
          />
        </div>
        
        <div className="form-group">
          <label>{t.contact.collaborationType}</label>
          <div className="flex flex-col gap-3 mt-2 sm:flex-row">
            {collaborationOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, collaborationType: option.value }))}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 ${
                  formData.collaborationType === option.value
                    ? 'border-cyan-300/50 bg-cyan-400/10 text-white shadow-[0_0_16px_rgba(34,211,238,0.12)]'
                    : 'border-white/10 bg-black/20 text-gray-300 hover:border-cyan-300/40 hover:bg-blue-950/25 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="message">{t.contact.message}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.contact.messagePlaceholder}
            required
          />
        </div>
        
        {submitStatus.type && (
          <div className={`p-4 rounded-lg ${
            submitStatus.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="form-submit-btn"
        >
          {isSubmitting ? t.contact.sending : t.contact.sendMessage} <Send size={16} />
        </button>
      </form>
    </div>
  );
};

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-container">
      <div className="text-center mb-12">
        <h2 className="section-title !mb-3">{t.contact.sectionTitle}</h2>
        <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
          {t.contact.sectionSubtitle}
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <ContactForm />
        <ContactInfoBox />
      </div>
    </section>
  );
};

export default Contact;
