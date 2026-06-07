'use client';

import { Users, DollarSign, TrendingUp, Award, Globe, Star, Mic, Target } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ICONS = [
  <Users size={14} key="users" />,
  <DollarSign size={14} key="dollar" />,
  <TrendingUp size={14} key="trend" />,
  <Award size={14} key="award" />,
  <Globe size={14} key="globe" />,
  <Star size={14} key="star" />,
  <Mic size={14} key="mic" />,
  <Target size={14} key="target" />,
];

export default function SocialProof() {
  const t = useTranslations('socialProof');
  const items = t.raw('items') as string[];
  const doubled = [...items, ...items];
  const doubledIcons = [...ICONS, ...ICONS];

  return (
    <div className="relative bg-navy-900 border-y border-white/5 py-4 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-navy-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-navy-900 to-transparent z-10 pointer-events-none" />

      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {doubled.map((label, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-ink-400 text-sm font-body shrink-0"
          >
            <span className="text-brand-blue/60">{doubledIcons[i]}</span>
            <span>{label}</span>
            {i !== doubled.length - 1 && (
              <span className="ml-4 text-white/10">·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
