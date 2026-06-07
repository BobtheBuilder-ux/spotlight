'use client';

import { BarChart3, CheckCircle, Eye, MessageSquare, Target, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PrimaryButton, SectionLabel, useInView } from './ui';

const CRITERIA_ICONS = [
  <Target size={16} key="target" />,
  <TrendingUp size={16} key="trend" />,
  <BarChart3 size={16} key="bar" />,
  <TrendingUp size={16} key="trend2" />,
];

const ACTION_STYLES = [
  { icon: <CheckCircle size={16} key="check" />, color: 'text-brand-green', bg: 'bg-brand-green/10 border-brand-green/20' },
  { icon: <MessageSquare size={16} key="msg" />, color: 'text-brand-blue', bg: 'bg-brand-blue/10 border-brand-blue/20' },
  { icon: <Eye size={16} key="eye" />, color: 'text-ink-300', bg: 'bg-white/5 border-white/10' },
];

export default function InvestorSection() {
  const { ref, inView } = useInView();
  const t = useTranslations('investorSection');
  const criteria = (t.raw('criteria') as string[]);
  const actions = (t.raw('actions') as string[]);
  const benefits = (t.raw('benefits') as string[]);

  return (
    <section ref={ref} className="bg-navy-950 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual panel */}
          <div
            className={`space-y-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-navy-800/60 border border-white/8 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D'].map((l) => (
                    <div
                      key={l}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue/40 to-brand-blue/10 border-2 border-navy-800 flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-bold font-body">{l}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold font-body">
                    {t('panelTitle')}
                  </div>
                  <div className="text-ink-400 text-xs font-body">{t('panelSubtitle')}</div>
                </div>
                <div className="ml-auto">
                  <span className="flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/20 px-2.5 py-1 rounded-md text-brand-red text-xs font-semibold font-body">
                    <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                    LIVE
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {criteria.map((label, i) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-navy-900/60 rounded-lg px-4 py-3"
                  >
                    <span className="text-brand-blue">{CRITERIA_ICONS[i % CRITERIA_ICONS.length]}</span>
                    <span className="text-ink-200 text-sm font-body font-medium">{label}</span>
                    <div className="ml-auto flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <div
                          key={j}
                          className={`w-2 h-2 rounded-full ${j < 4 ? 'bg-brand-blue' : 'bg-white/10'}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {actions.map((label, i) => {
                const { icon, color, bg } = ACTION_STYLES[i];
                return (
                  <div
                    key={label}
                    className={`${bg} border rounded-xl p-3.5 text-center transition-colors hover:opacity-90`}
                  >
                    <div className={`flex justify-center mb-2 ${color}`}>{icon}</div>
                    <div className={`text-xs font-semibold font-body ${color}`}>{label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Copy */}
          <div
            className={`space-y-6 transition-all duration-700 delay-150 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionLabel>{t('sectionLabel')}</SectionLabel>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-white leading-tight">
              {t('title')}{' '}
              <span className="text-brand-blue">{t('titleHighlight')}</span>{' '}
              {t('titleSuffix')}
            </h2>
            <p className="text-ink-300 text-lg font-body leading-relaxed">{t('body')}</p>
            <div className="bg-navy-800/40 border border-white/6 rounded-xl p-5 space-y-4">
              <div className="text-xs text-ink-400 font-body uppercase tracking-widest font-semibold">
                {t('benefitsTitle')}
              </div>
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-brand-green mt-0.5 flex-shrink-0" />
                  <span className="text-ink-200 text-sm font-body">{item}</span>
                </div>
              ))}
            </div>
            <PrimaryButton>{t('cta')}</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
