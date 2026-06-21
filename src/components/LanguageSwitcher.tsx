import React from 'react';
import { Language, translations } from '@/i18n/translations';
import { useLanguage } from '@/i18n/LanguageContext';

const languageLabels: Record<Language, string> = {
  en: 'EN',
  no: 'NO',
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="inline-flex rounded-full border border-white/10 bg-black/35 p-1 shadow-[0_0_18px_rgba(59,130,246,0.12)] backdrop-blur-md"
      aria-label="Language switcher"
    >
      {(Object.keys(translations) as Language[]).map((item) => {
        const isActive = language === item;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setLanguage(item)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-blue-500/80 text-white shadow-[0_0_16px_rgba(59,130,246,0.35)]'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-pressed={isActive}
          >
            {languageLabels[item]}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
