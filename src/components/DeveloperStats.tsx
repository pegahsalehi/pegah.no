import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const DeveloperStats = () => {
  const { t } = useLanguage();

  const stats = [
    {
      value: '5+',
      label: t.contact.stats[0],
      className: 'from-blue-500/10 via-blue-500/5 to-purple-500/10 border-blue-400/20',
      valueClass: 'text-blue-300',
    },
    {
      value: '10+',
      label: t.contact.stats[1],
      className: 'from-cyan-500/10 via-cyan-500/5 to-blue-500/10 border-cyan-400/20',
      valueClass: 'text-cyan-300',
    },
    {
      value: '20',
      label: t.contact.stats[2],
      className: 'from-purple-500/10 via-purple-500/5 to-pink-500/10 border-purple-400/20',
      valueClass: 'text-purple-300',
    },
    {
      value: '780',
      label: t.contact.stats[3],
      className: 'from-indigo-500/10 via-blue-500/5 to-cyan-500/10 border-indigo-300/20',
      valueClass: 'text-indigo-200',
    },
  ];

  return (
    <section className="relative z-10 px-4 pb-10 sm:px-6 lg:px-8" aria-labelledby="developer-stats-title">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-950/45 shadow-[0_0_30px_rgba(59,130,246,0.08)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10" />
          <div className="pointer-events-none absolute -inset-x-16 -top-24 h-36 bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center">
            <div className="text-center lg:w-64 lg:shrink-0 lg:text-left">
              <h2 id="developer-stats-title" className="text-xl font-bold text-white sm:text-2xl">
                {t.contact.statsTitle}
              </h2>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl border bg-gradient-to-br px-4 py-3 ${stat.className}`}
                >
                  <div className={`text-2xl font-black leading-none ${stat.valueClass}`}>
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperStats;
