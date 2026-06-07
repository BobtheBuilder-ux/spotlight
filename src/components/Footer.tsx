'use client';

import { Tv2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const links = (t.raw('links') as string[]);

  return (
    <footer className="bg-navy-900 border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-brand-blue flex items-center justify-center">
              <Tv2 size={15} className="text-white" />
            </div>
            <span className="font-heading font-800 text-white text-sm">
              Seed Stage <span className="text-brand-blue">Spotlight</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {links.map((item) => (
              <a
                key={item}
                href="#"
                className="text-ink-400 hover:text-ink-200 text-xs font-body transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>

          <p className="text-ink-500 text-xs font-body text-center">
            &copy; {new Date().getFullYear()} Seed Stage Spotlight. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
