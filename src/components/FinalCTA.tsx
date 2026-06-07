'use client';

import { CheckCircle, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge, PrimaryButton, SecondaryButton, useInView } from './ui';
import { useKybModal } from './KybModalContext';

export default function FinalCTA() {
  const { ref, inView } = useInView();
  const { openKybModal } = useKybModal();
  const t = useTranslations('finalCTA');
  const features = (t.raw('features') as string[]);

  return (
    <section ref={ref} className="bg-navy-950 py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-blue/8 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <div
          className={`space-y-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Badge color="blue">
            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full inline-block animate-pulse" />
            {t('badge')}
          </Badge>

          <h2 className="font-heading font-black text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05]">
            {t('title')}{' '}
            <span className="text-brand-blue">{t('titleHighlight')}</span>
          </h2>

          <p className="text-ink-300 text-xl font-body max-w-xl mx-auto leading-relaxed">
            {t('body')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <PrimaryButton className="!px-10 !py-4 !text-base sm:w-auto w-full justify-center" onClick={openKybModal}>
              {t('ctaPrimary')}
            </PrimaryButton>
            <SecondaryButton className="!px-10 !py-4 !text-base sm:w-auto w-full justify-center" onClick={() => window.open('https://youtube.com/@9qctradeplatform', '_blank')}>
              <Play size={16} />
              {t('ctaSecondary')}
            </SecondaryButton>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {features.map((label) => (
              <div key={label} className="flex items-center gap-2 text-ink-300 text-sm font-body">
                <CheckCircle size={14} className="text-brand-green" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
