import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { CloudDownload } from './CloudDownload';
import { LayoutGrid } from './LayoutGrid';
import { FileChartColumn } from './FileChartColumn';
import { Github, GraduationCap, Linkedin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { profileContact } from '@/data/profileContact';

const Hero = () => {
  const { t, language } = useLanguage();
  const heroName = 'Pegah Salehi';
  const heroGreetingPrefix = t.hero.greeting.replace(heroName, '').trim();
  const isNorwegian = language === 'no';
  const headlineSizeClass = isNorwegian
    ? 'lg:text-[clamp(2.5rem,3.55vw,4.1rem)] xl:text-[clamp(3.4rem,3.65vw,4.4rem)]'
    : 'lg:text-[clamp(2.65rem,3.85vw,4.4rem)] xl:text-[clamp(3.65rem,3.9vw,4.7rem)]';
  const portraitSizeClass = isNorwegian
    ? 'lg:w-[336px] lg:max-w-[336px] lg:translate-x-4 xl:w-[374px] xl:max-w-[374px] xl:translate-x-6 2xl:w-[404px] 2xl:max-w-[404px]'
    : 'lg:w-[350px] lg:max-w-[350px] lg:translate-x-4 xl:w-[390px] xl:max-w-[390px] xl:translate-x-6 2xl:w-[420px] 2xl:max-w-[420px]';

  const resumeHref = language === 'no' ? profileContact.cvNorwegian : profileContact.cvEnglish;

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center overflow-hidden pt-32 pb-16 lg:pt-24 lg:pb-0">
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.28fr)_minmax(350px,0.72fr)] xl:grid-cols-[minmax(0,1.28fr)_minmax(390px,0.72fr)] 2xl:grid-cols-[minmax(0,1.28fr)_minmax(420px,0.72fr)] items-center gap-14 lg:gap-10 xl:gap-12 px-4">
          <div className="max-w-3xl min-w-0 mx-auto lg:mx-0 lg:max-w-none text-center lg:text-left">
          <motion.h1
            className={`mb-4 break-words text-[clamp(3.1rem,12vw,5.45rem)] font-black leading-[0.9] tracking-tight drop-shadow-[0_0_28px_rgba(59,130,246,0.2)] sm:text-[clamp(4rem,10vw,6rem)] lg:whitespace-nowrap ${headlineSizeClass}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white">{heroGreetingPrefix}</span>{' '}
            <span className="bg-[linear-gradient(90deg,#8b8cf6_0%,#5f8ff7_45%,#27c8ea_100%)] bg-clip-text text-transparent">
              {heroName}
            </span>
          </motion.h1>

          <motion.p
            className="mt-10 mb-6 max-w-xl mx-auto text-base font-semibold leading-relaxed text-gray-100 sm:text-lg md:text-xl lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t.hero.supportingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>

          <motion.div
            className="mb-4 min-h-[4.5rem] text-[1.05rem] font-bold leading-tight text-white sm:min-h-[2.75rem] sm:text-[1.25rem] md:text-[1.5rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
          >
            <AnimatedText
              text={t.hero.roles}
              className="max-w-full whitespace-normal break-words bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            />
          </motion.div>
          
          <motion.p 
            className="mb-9 max-w-xl mx-auto text-sm leading-relaxed text-gray-400 sm:text-base lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
           {t.hero.description}
          </motion.p>
          
          {/* Social Icons above buttons */}
          <motion.div 
            className="flex justify-center lg:justify-start gap-6 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <a href={profileContact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="group">
              <div className="relative p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100"></div>
                <Github className="w-6 h-6 relative z-10 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </div>
            </a>
            <a href={profileContact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="group">
              <div className="relative p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100"></div>
                <Linkedin className="w-6 h-6 relative z-10 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </div>
            </a>
              <a
                href={profileContact.scholar}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar profile"
                className="group"
              >
              <div className="relative p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100"></div>
                <GraduationCap className="w-6 h-6 relative z-10 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              </a>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <a href="#projects" className="gradient-border-button hero-work-button">
              <LayoutGrid width={20} height={20} stroke="#ffffff" />
              {t.hero.workButton}
            </a>
            <div className="flex items-center gap-2">
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-border-button"
              >
                <FileChartColumn width={20} height={20} stroke="#ffffff" />
                {t.hero.resumeButton}
              </a>
              <a
                href={resumeHref}
                download
                className="gradient-border-button download-btn"
                title={t.hero.downloadResume}
              >
                <CloudDownload width={20} height={20} stroke="#ffffff" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-16 flex justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="animate-bounce p-2 bg-blue-900/30 rounded-full border border-blue-500/20">
              <a href="#technologies" aria-label={t.nav.skills} className="text-blue-400">
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </a>
            </div>
          </motion.div>
          </div>

          <motion.div
            className={`relative mx-auto w-full max-w-[260px] sm:max-w-[310px] lg:ml-0 lg:mr-auto ${portraitSizeClass}`}
            initial={{ opacity: 0, scale: 0.94, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/25 via-purple-500/20 to-pink-500/25 blur-3xl" />
            <div className="relative rounded-[2rem] border border-blue-400/20 bg-black/35 p-2.5 shadow-[0_0_45px_rgba(59,130,246,0.18)] backdrop-blur-xl sm:p-3">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-blue-500/10" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-gray-950">
                <img
                  src="/pegah.png"
                  alt={t.hero.portraitAlt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
