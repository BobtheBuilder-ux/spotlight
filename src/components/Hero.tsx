'use client';

import { useState } from 'react';
import { BarChart3, CheckCircle, Play, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PrimaryButton, SecondaryButton, Badge } from './ui';
import KybFormModal from './KybFormModal';

function HeroVerdictBadge({ label, color }: { label: string; color: string }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold font-body ${color}`}
    >
      {label}
    </div>
  );
}

export default function Hero() {
  const [kybOpen, setKybOpen] = useState(false);
  const t = useTranslations('hero');

  const STATS = [
    { val: '200+', label: t('stats.startups') },
    { val: '50+', label: t('stats.investors') },
    { val: '$4M+', label: t('stats.funding') },
  ];

  return (
    <>
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-950">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-blue/8 rounded-full blur-[80px] animate-pulse-glow pointer-events-none"
        style={{ animationDelay: '1.5s' }}
      />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-7">
            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <Badge color="blue">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full inline-block animate-pulse" />
                {t('badge')}
              </Badge>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-heading font-black text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight">
                {t('title').split(' ').slice(0, 2).join(' ')}{' '}
                <span className="relative inline-block">
                  <span className="text-brand-blue">
                    {t('title').split(' ').slice(2).join(' ')}
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-transparent rounded-full" />
                </span>
              </h1>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-ink-200 text-xl lg:text-2xl font-medium leading-snug font-body max-w-lg">
                {t('subtitle')}{' '}
                <span className="text-white font-semibold">{t('subtitleHighlight')}</span>
              </p>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <p className="text-ink-300 text-base font-body">{t('supportLine')}</p>
            </div>

            <div
              className="animate-fade-up flex flex-wrap gap-3 pt-1"
              style={{ animationDelay: '0.45s' }}
            >
              <PrimaryButton
                className="!py-4 !px-8 !text-base"
                onClick={() => setKybOpen(true)}
              >
                {t('ctaPrimary')}
              </PrimaryButton>
              <SecondaryButton className="!py-4 !px-8 !text-base" onClick={() => window.open('https://youtube.com/@9qctradeplatform', '_blank')}>
                <Play size={16} />
                {t('ctaSecondary')}
              </SecondaryButton>
            </div>

            <div
              className="animate-fade-up flex items-center gap-5 pt-2"
              style={{ animationDelay: '0.55s' }}
            >
              {STATS.map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="text-white font-heading font-black text-xl">{val}</div>
                  <div className="text-ink-400 text-xs font-body mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pitch Card Visual */}
          <div
            className="relative flex justify-center lg:justify-end animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div className="absolute inset-0 bg-brand-blue/10 rounded-3xl blur-2xl scale-110" />

              <div className="relative bg-navy-800/80 backdrop-blur-md border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
                {/* Video frame */}
                <div className="relative bg-gradient-to-br from-navy-700 to-navy-950 aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
                  <div className="relative flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors group">
                      <Play
                        size={24}
                        className="text-white ml-1 group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-white text-sm font-semibold font-body">
                        {t('card.episodeTitle')}
                      </div>
                      <div className="text-ink-400 text-xs font-body mt-0.5">
                        {t('card.episodeSubtitle')}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1.5 bg-brand-red/90 px-2.5 py-1 rounded-md text-white text-xs font-semibold font-body">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Verdict panel */}
                <div className="p-4 space-y-3">
                  <div className="text-xs text-ink-400 font-body uppercase tracking-widest font-semibold">
                    {t('card.verdict')}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <HeroVerdictBadge
                      label={t('card.invest')}
                      color="bg-brand-green/10 border border-brand-green/30 text-brand-green"
                    />
                    <HeroVerdictBadge
                      label={t('card.followUp')}
                      color="bg-brand-blue/10 border border-brand-blue/30 text-brand-blue"
                    />
                    <HeroVerdictBadge
                      label={t('card.pass')}
                      color="bg-brand-red/10 border border-brand-red/30 text-brand-red"
                    />
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full border-2 border-navy-800 bg-gradient-to-br from-brand-blue/60 to-brand-blue/20 flex items-center justify-center"
                          >
                            <Users size={10} className="text-white" />
                          </div>
                        ))}
                      </div>
                      <span className="text-ink-300 text-xs font-body">
                        4 {t('card.watching')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                      <span className="text-brand-green text-xs font-body font-semibold">
                        {t('card.liveQA')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating score card */}
              <div className="absolute -bottom-5 -right-4 bg-navy-800/95 border border-white/10 rounded-xl p-3.5 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                    <BarChart3 size={18} className="text-brand-blue" />
                  </div>
                  <div>
                    <div className="text-white font-heading font-black text-lg leading-none">
                      82
                    </div>
                    <div className="text-ink-400 text-xs font-body mt-0.5">
                      {t('scoreCard.label')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating interest badge */}
              <div className="absolute -top-4 -left-4 bg-navy-800/95 border border-brand-green/20 rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-brand-green" />
                  <span className="text-brand-green text-xs font-semibold font-body">
                    Interest expressed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* KYB Application Modal */}
    <KybFormModal open={kybOpen} onClose={() => setKybOpen(false)} />
  </>);
}
