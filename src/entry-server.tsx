import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { translations } from './i18n/translations';
import { profileContact } from './data/profileContact';

const siteUrl = 'https://pegah.no/';

// Derived from the same public data displayed by the portfolio.
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name: 'Pegah Salehi',
      url: siteUrl,
      image: `${siteUrl}pegah.png`,
      jobTitle: translations.en.hero.roles[0],
      description: translations.en.hero.description,
      sameAs: [profileContact.github, profileContact.linkedin, profileContact.scholar],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: translations.en.about.education.university,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: 'Pegah Salehi - AI Engineer',
      inLanguage: ['en', 'nb'],
      about: { '@id': `${siteUrl}#person` },
    },
  ],
};

export function render(url: string) {
  return renderToString(<StaticRouter location={url}><App /></StaticRouter>);
}
