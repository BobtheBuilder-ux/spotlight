'use client';

import { DollarSign, TrendingUp, Tv2, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PrimaryButton, SectionLabel, useInView } from './ui';

const STAT_ICONS = [
  <Tv2 size={22} key="tv" />,
  <Users size={22} key="users" />,
  <DollarSign size={22} key="dollar" />,
  <TrendingUp size={22} key="trend" />,
];

const STAT_COLORS = ['blue', 'green', 'blue', 'green'] as const;

export default function WhatThisIs() {
  const { ref, inView } = useInView();
  const t = useTranslations('whatThisIs');

  const steps = (t.raw('steps') as { step: string; desc: string }[]);

  const stats = [
    { val: t('stats.episodes.val'), label: t('stats.episodes.label') },
    { val: t('stats.startups.val'), label: t('stats.startups.label') },
    { val: t('stats.funding.val'), label: t('stats.funding.label') },
    { val: t('stats.feedback.val'), label: t('stats.feedback.label') },
  ];

  return (
    <section ref={ref} className="relative bg-navy-950 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-blue/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionLabel>{t('sectionLabel')}</SectionLabel>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-white leading-tight">
              {t('titleStart')}{' '}
              <span className="text-brand-blue">{t('titleHighlight')}</span>
              {t('titleEnd') ? ` ${t('titleEnd')}` : ''}
            </h2>
            <p className="text-ink-300 text-lg font-body leading-relaxed">{t('body')}</p>

            <div className="space-y-2 pt-2">
              <div className="text-ink-400 text-sm font-body uppercase tracking-widest font-semibold mb-3">
                {t('progressLabel')}
              </div>
              {steps.map(({ step, desc }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mt-0.5">
                    <span className="text-brand-blue text-xs font-bold font-body">{i + 1}</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold font-body text-sm">{step}</span>
                    <span className="text-ink-400 text-sm font-body"> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <PrimaryButton>{t('cta')}</PrimaryButton>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {stats.map(({ val, label }, i) => (
              <div
                key={label}
                className="bg-navy-800/50 border border-white/6 rounded-2xl p-6 hover:border-brand-blue/20 transition-colors duration-300 group"
              >
                <div
                  className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center transition-colors ${
                    STAT_COLORS[i] === 'blue'
                      ? 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue/20'
                      : 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green/20'
                  }`}
                >
                  {STAT_ICONS[i]}
                </div>
                <div className="text-white font-heading font-black text-3xl">{val}</div>
                <div className="text-ink-400 text-sm font-body mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
