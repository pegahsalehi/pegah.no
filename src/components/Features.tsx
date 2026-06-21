import React from 'react';
import FeaturesSectionDemo from '@/components/ui/features-section-demo-2';
import { useLanguage } from '@/i18n/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="section-container">
      <h2 className="section-title">{t.features.title}</h2>
      <FeaturesSectionDemo />
    </section>
  );
};

export default Features; 
