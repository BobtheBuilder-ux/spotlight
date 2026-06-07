'use client';

import { BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PrimaryButton, SectionLabel, useInView } from './ui';
import { useKybModal } from './KybModalContext';

const SCORES = [90, 75, 82, 60, 88, 70];

function ScoreBar({
  label,
  score,
  inView,
}: {
  label: string;
  score: number;
  inView: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-ink-200 text-sm font-body font-medium">{label}</span>
        <span className="text-white font-heading font-bold text-sm">{score}</span>
      </div>
      <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-full transition-all duration-1000 ease-out"
          style={{ width: inView ? `${score}%` : '0%', transitionDelay: '300ms' }}
        />
      </div>
    </div>
  );
}

export default function ScoringSection() {
  const { ref, inView } = useInView();
  const { openKybModal } = useKybModal();
  const t = useTranslations('scoring');
  const criteriaLabels = (t.raw('criteria') as string[]);

  const totalScore = Math.round(SCORES.reduce((s, v) => s + v, 0) / SCORES.length);

  return (
    <section ref={ref} className="bg-navy-900 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionLabel>{t('sectionLabel')}</SectionLabel>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-white leading-tight">
              {t('title')}{' '}
              <span className="text-ink-400 font-normal text-2xl">{t('titleSuffix')}</span>
            </h2>
            <p className="text-ink-300 text-lg font-body leading-relaxed">{t('body')}</p>
            <div className="bg-navy-800/40 border border-white/6 rounded-xl p-5">
              <p className="text-ink-400 text-sm font-body">{t('note')}</p>
            </div>
            <PrimaryButton onClick={openKybModal}>{t('cta')}</PrimaryButton>
          </div>

          {/* Right: Score visualization */}
          <div
            className={`transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-navy-800/60 border border-white/8 rounded-2xl p-7">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-ink-400 text-xs font-body uppercase tracking-widest font-semibold mb-1">
                    {t('overallLabel')}
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-white font-heading font-black text-5xl">{totalScore}</span>
                    <span className="text-ink-400 font-body text-lg mb-1">{t('outOf')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-brand-blue/30 flex items-center justify-center relative">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-brand-blue border-r-transparent transition-all duration-1000"
                    style={{
                      transform: `rotate(${inView ? totalScore * 3.6 : 0}deg)`,
                      transitionDelay: '200ms',
                    }}
                  />
                  <BarChart3 size={20} className="text-brand-blue" />
                </div>
              </div>

              <div className="space-y-4">
                {criteriaLabels.map((label, i) => (
                  <ScoreBar key={label} label={label} score={SCORES[i]} inView={inView} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
