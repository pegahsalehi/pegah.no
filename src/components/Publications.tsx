import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { researchStats as scholarStats } from '@/data/researchStats';
import { profileContact } from '@/data/profileContact';

const scholarCitationUrl = (citationId: string) =>
  `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=0Y4lkuwAAAAJ&citation_for_view=0Y4lkuwAAAAJ:${citationId}`;

const selectedPublicationOrder = [
  'Comparative Analysis of Audio Feature Extraction for Real-Time Talking Portrait Synthesis',
  'A Theoretical and Empirical Analysis of 2D and 3D Virtual Environments in Training for Child Interview Skills',
  'Synthesizing a Talking Child Avatar to Train Interviewers Working with Maltreated Children',
  'SinGAN-Seg: Synthetic training data generation for medical image segmentation',
  'Pix2Pix-based Stain-to-Stain Translation: A Solution for Robust Stain Normalization in Histopathology Images Analysis',
].map((title, index) => [title.toLowerCase(), index] as const);

const selectedPublicationRank = new Map(selectedPublicationOrder);

const publicationYear = (year: string) => Number.parseInt(year, 10) || 0;

const Publications = () => {
  const { t, language } = useLanguage();
  const statCards = [
    { label: t.publications.statLabels.publications, value: scholarStats.publications },
    { label: t.publications.statLabels.citations, value: scholarStats.citations },
    { label: t.publications.statLabels.hIndex, value: scholarStats.hIndex },
    { label: t.publications.statLabels.i10Index, value: scholarStats.i10Index },
  ];
  const publications = [...t.publications.items].sort((a, b) => {
    const yearDifference = publicationYear(b.year) - publicationYear(a.year);

    if (yearDifference !== 0) {
      return yearDifference;
    }

    const aRank = selectedPublicationRank.get(a.title.toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
    const bRank = selectedPublicationRank.get(b.title.toLowerCase()) ?? Number.MAX_SAFE_INTEGER;

    return aRank - bRank;
  });

  return (
    <section id="publications" className="section-container relative">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="section-title mb-4">{t.publications.title}</h2>
        <p className="text-base leading-relaxed text-gray-400 md:text-lg">
          {t.publications.description}
        </p>
      </div>

      <div className="mx-auto mb-12 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/45 p-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 flex justify-center">
        <a
          href={profileContact.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-black/35 px-5 py-3 text-sm font-semibold text-blue-200 shadow-[0_0_24px_rgba(59,130,246,0.14)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/50 hover:text-white"
        >
          <BookOpen className="h-4 w-4" />
          {t.publications.scholarButton}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3">
        {language === 'no' && t.publications.originalTitleNote && (
          <p className="mb-1 text-sm leading-relaxed text-cyan-100/60">
            {t.publications.originalTitleNote}
          </p>
        )}
        {publications.map((publication) => (
          <a
            key={`${publication.title}-${publication.year}`}
            href={publication.url || scholarCitationUrl(publication.citationId)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/45 px-4 py-3 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-gray-900/65 hover:shadow-[0_0_24px_rgba(59,130,246,0.14)] sm:px-5"
            aria-label={`${t.publications.openPublication}: ${publication.title}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 text-sm font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-blue-300 sm:text-base">
                  {publication.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                  {publication.authors}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="line-clamp-1 max-w-full text-purple-300">{publication.venue}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-gray-600 sm:inline-block" />
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-semibold text-gray-300">
                    {publication.year}
                  </span>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300 transition-all duration-300 group-hover:border-blue-300/50 group-hover:bg-blue-500/20 group-hover:text-white md:self-center">
                {t.publications.readMore}
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Publications;
