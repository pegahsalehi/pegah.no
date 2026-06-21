import React, { useEffect, useState } from 'react';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative">
      <div className="bg-gray-900/80 py-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/e9810342-de6a-4f13-9171-0077afe8c75a.png" 
                alt={t.nav.logoAlt}
                className="h-10 w-10"
              />
              <div>
                <p className="text-gray-400 text-sm">
                  © {currentYear} Pegah Salehi. {t.footer.rights}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {t.footer.builtWith} <Heart className="inline w-3 h-3 text-red-500" /> {t.footer.and} <Code2 className="inline w-3 h-3 text-blue-500" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 p-3 rounded-full bg-gray-800/80 hover:bg-gray-800 text-white shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
          aria-label={t.footer.backToTop}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
