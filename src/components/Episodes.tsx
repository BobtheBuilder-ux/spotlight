'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SecondaryButton, SectionLabel, useInView } from './ui';

const THUMBNAILS = [
  'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const OUTCOME_STYLES: Record<string, string> = {
  INVEST: 'text-brand-green border-brand-green/30 bg-brand-green/10',
  INVESTIR: 'text-brand-green border-brand-green/30 bg-brand-green/10',
  'FOLLOW-UP': 'text-brand-blue border-brand-blue/30 bg-brand-blue/10',
  SUIVI: 'text-brand-blue border-brand-blue/30 bg-brand-blue/10',
  PASS: 'text-brand-red border-brand-red/30 bg-brand-red/10',
  PASSER: 'text-brand-red border-brand-red/30 bg-brand-red/10',
};

type EpisodeItem = {
  ep: string;
  title: string;
  outcome: string;
  sector: string;
  ask: string;
};

function EpisodeCard({
  ep,
  title,
  outcome,
  sector,
  ask,
  thumbnail,
  askLabel,
}: EpisodeItem & { thumbnail: string; askLabel: string }) {
  const outcomeStyle =
    OUTCOME_STYLES[outcome] ?? 'text-ink-300 border-white/20 bg-white/5';

  return (
    <div 
      onClick={() => window.open('https://youtube.com/@9qctradeplatform', '_blank')}
      className="group bg-navy-800/50 border border-white/6 hover:border-white/12 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <div className="relative aspect-video w-full">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-navy-950/80 backdrop-blur-sm text-ink-300 text-xs font-semibold font-body px-2.5 py-1 rounded-md">
            {ep}
          </span>
          <span className="bg-navy-950/80 backdrop-blur-sm text-ink-300 text-xs font-semibold font-body px-2.5 py-1 rounded-md">
            {sector}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play size={14} className="text-white ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-ink-200 text-sm font-body leading-snug line-clamp-2">{title}</p>
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-bold font-body border px-2.5 py-1 rounded-md ${outcomeStyle}`}
          >
            {outcome}
          </span>
          <span className="text-ink-400 text-xs font-body">
            {askLabel} <span className="text-ink-200 font-semibold">{ask}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Episodes() {
  const { ref, inView } = useInView();
  const t = useTranslations('episodes');
  const items = (t.raw('items') as EpisodeItem[]);

  return (
    <section ref={ref} className="bg-navy-900 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <SectionLabel>{t('sectionLabel')}</SectionLabel>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-white mt-2">
              {t('title')}
            </h2>
          </div>
          <SecondaryButton onClick={() => window.open('https://youtube.com/@9qctradeplatform', '_blank')}>
            <Play size={14} />
            {t('viewAll')}
          </SecondaryButton>
        </div>

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {items.map((item, i) => (
            <EpisodeCard
              key={item.ep}
              {...item}
              thumbnail={THUMBNAILS[i]}
              askLabel={t('askLabel')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
