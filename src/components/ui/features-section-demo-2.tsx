import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  BotMessageSquare,
  CloudCog,
  DatabaseZap,
  ScanFace,
  ScanSearch,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

const featureIcons: LucideIcon[] = [
  Sparkles,
  ScanSearch,
  ScanFace,
  DatabaseZap,
  BotMessageSquare,
  CloudCog,
];

const cardAccents = [
  {
    border: 'from-cyan-300/80 via-blue-400/45 to-purple-400/25',
    surface: 'from-cyan-500/[0.18] via-blue-500/[0.10] to-purple-500/[0.14]',
    glow: 'bg-cyan-400/20',
    icon: 'border-cyan-200/45 bg-gradient-to-br from-cyan-300/25 via-blue-400/15 to-purple-400/20 text-cyan-100 shadow-cyan-500/20',
  },
  {
    border: 'from-blue-300/80 via-cyan-400/45 to-indigo-400/25',
    surface: 'from-blue-500/[0.18] via-cyan-500/[0.10] to-indigo-500/[0.14]',
    glow: 'bg-blue-400/20',
    icon: 'border-blue-200/45 bg-gradient-to-br from-blue-300/25 via-cyan-400/15 to-indigo-400/20 text-blue-100 shadow-blue-500/20',
  },
  {
    border: 'from-purple-300/80 via-fuchsia-400/40 to-cyan-400/25',
    surface: 'from-purple-500/[0.18] via-fuchsia-500/[0.08] to-cyan-500/[0.14]',
    glow: 'bg-purple-400/20',
    icon: 'border-purple-200/45 bg-gradient-to-br from-purple-300/25 via-fuchsia-400/15 to-cyan-400/20 text-purple-100 shadow-purple-500/20',
  },
  {
    border: 'from-sky-300/80 via-blue-400/45 to-cyan-400/25',
    surface: 'from-sky-500/[0.18] via-blue-500/[0.10] to-cyan-500/[0.14]',
    glow: 'bg-sky-400/20',
    icon: 'border-sky-200/45 bg-gradient-to-br from-sky-300/25 via-blue-400/15 to-cyan-400/20 text-sky-100 shadow-sky-500/20',
  },
  {
    border: 'from-indigo-300/80 via-purple-400/45 to-blue-400/25',
    surface: 'from-indigo-500/[0.18] via-purple-500/[0.10] to-blue-500/[0.14]',
    glow: 'bg-indigo-400/20',
    icon: 'border-indigo-200/45 bg-gradient-to-br from-indigo-300/25 via-purple-400/15 to-blue-400/20 text-indigo-100 shadow-indigo-500/20',
  },
  {
    border: 'from-blue-300/80 via-purple-400/45 to-cyan-400/25',
    surface: 'from-blue-500/[0.18] via-purple-500/[0.10] to-cyan-500/[0.14]',
    glow: 'bg-blue-400/20',
    icon: 'border-blue-200/45 bg-gradient-to-br from-blue-300/25 via-purple-400/15 to-cyan-400/20 text-blue-100 shadow-blue-500/20',
  },
];

export default function FeaturesSectionDemo() {
  const { t } = useLanguage();
  const features = t.features.cards;

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const FeatureCard = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => {
  const Icon = featureIcons[index % featureIcons.length];
  const accent = cardAccents[index % cardAccents.length];

  return (
    <article
      className={`group relative flex min-h-[300px] overflow-hidden rounded-2xl bg-gradient-to-br ${accent.border} p-[1px] shadow-[0_0_26px_rgba(59,130,246,0.10)] backdrop-blur-xl transition-all duration-500 animate-fade-in hover:-translate-y-1.5 hover:shadow-[0_0_42px_rgba(34,211,238,0.18),0_18px_48px_rgba(15,23,42,0.34)]`}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className={`absolute -right-20 -top-20 h-44 w-44 rounded-full ${accent.glow} opacity-70 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100`} />
      <div className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[15px] border border-white/10 bg-slate-950/[0.82] p-6 transition-colors duration-500 group-hover:border-white/20">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent.surface} opacity-80 transition-opacity duration-500 group-hover:opacity-100`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.10),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.10),transparent_28%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <div className={`relative mb-5 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl border shadow-lg shadow-black/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl ${accent.icon}`}>
          <Icon className="h-5 w-5 drop-shadow-[0_0_10px_rgba(125,211,252,0.35)] transition-transform duration-300 group-hover:scale-110" />
        </div>

        <h3 className="relative text-lg font-bold leading-snug text-white">
          {title}
        </h3>
        <p className="relative mt-3 text-sm leading-7 text-slate-200">
          {description}
        </p>

        <div className="relative mt-auto pt-6">
          <div className={`h-px w-full bg-gradient-to-r ${accent.border} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
        </div>
      </div>
    </article>
  );
}; 
