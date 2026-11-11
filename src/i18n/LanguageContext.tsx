import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Language, translations } from './translations';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof translations.en;
};

const STORAGE_KEY = 'portfolio-language';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // The first client render must match the English static HTML, even for returning visitors.
  const [language, setLanguage] = useState<Language>('en');
  const [preferenceLoaded, setPreferenceLoaded] = useState(false);

  useEffect(() => {
    try {
      setLanguage(window.localStorage.getItem(STORAGE_KEY) === 'no' ? 'no' : 'en');
    } catch {
      // Language switching also works when browser storage is unavailable.
    }
    setPreferenceLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferenceLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // A blocked storage API should not prevent rendering the portfolio.
    }
    document.documentElement.lang = language === 'no' ? 'nb' : 'en';
  }, [language, preferenceLoaded]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
