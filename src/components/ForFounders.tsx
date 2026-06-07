'use client';

import { CheckCircle, Star, TrendingUp, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PrimaryButton, SectionLabel, useInView } from './ui';
import { useKybModal } from './KybModalContext';

const CRITERIA_ICONS = [
  <Zap size={16} key="zap" />,
  <CheckCircle size={16} key="check" />,
  <TrendingUp size={16} key="trend" />,
  <Star size={16} key="star" />,
];

export default function ForFounders() {
  const { ref, inView } = useInView();
  const { openKybModal } = useKybModal();
  const t = useTranslations('forFounders');
  const criteria = (t.raw('criteria') as { label: string; desc: string }[]);

  return (
    <section ref={ref} className="bg-navy-950 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div
          className={`max-w-3xl mx-auto text-center space-y-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionLabel>{t('sectionLabel')}</SectionLabel>
          <h2 className="font-heading font-black text-4xl lg:text-5xl text-white leading-tight">
            {t('title')}
          </h2>
          <p className="text-ink-300 text-lg font-body leading-relaxed">{t('body')}</p>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {criteria.map(({ label, desc }, i) => (
              <div
                key={label}
                className="flex items-start gap-3 bg-navy-800/40 border border-white/6 rounded-xl p-4 hover:border-brand-blue/20 transition-colors duration-300"
              >
                <span className="text-brand-blue mt-0.5 flex-shrink-0">
                  {CRITERIA_ICONS[i]}
                </span>
                <div>
                  <div className="text-white font-semibold text-sm font-body">{label}</div>
                  <div className="text-ink-400 text-xs font-body mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <PrimaryButton className="!px-10 !py-4 !text-base" onClick={openKybModal}>{t('cta')}</PrimaryButton>
            <p className="text-ink-400 text-sm font-body">{t('subtext')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
