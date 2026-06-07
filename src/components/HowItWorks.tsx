'use client';

import { Eye, Filter, MessageSquare, Mic, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge, SectionLabel, useInView } from './ui';

const STEP_ICONS = [
  <Filter size={20} key="filter" />,
  <Eye size={20} key="eye" />,
  <Mic size={20} key="mic" />,
  <MessageSquare size={20} key="msg" />,
];

const STEP_NUMS = ['01', '02', '03', '04'];

export default function HowItWorks() {
  const { ref, inView } = useInView();
  const t = useTranslations('howItWorks');
  const steps = (t.raw('steps') as { tag: string; title: string; desc: string }[]);

  return (
    <section ref={ref} className="bg-navy-900 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionLabel>{t('sectionLabel')}</SectionLabel>
          <h2 className="font-heading font-black text-4xl lg:text-5xl text-white mt-2 mb-4">
            {t('title')}
          </h2>
          <p className="text-ink-300 font-body max-w-xl mx-auto text-lg">{t('subtitle')}</p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ tag, title, desc }, i) => (
              <div
                key={i}
                className={`relative group transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="bg-navy-800/60 border border-white/6 hover:border-brand-blue/25 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(31,111,235,0.08)] hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/15 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/20 transition-colors">
                      {STEP_ICONS[i]}
                    </div>
                    <span className="text-brand-blue/30 font-heading font-black text-3xl">
                      {STEP_NUMS[i]}
                    </span>
                  </div>
                  <div className="mb-2">
                    <Badge color="blue">{tag}</Badge>
                  </div>
                  <h3 className="text-white font-heading font-bold text-xl mt-3 mb-2">{title}</h3>
                  <p className="text-ink-300 text-sm font-body leading-relaxed">{desc}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-12 -right-3 z-10 items-center justify-center">
                    <ChevronRight size={16} className="text-brand-blue/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
