'use client';

import { useEffect, useState } from 'react';
import { Tv2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { PrimaryButton, SecondaryButton } from './ui';
import { useKybModal } from './KybModalContext';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openKybModal } = useKybModal();
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const switchLocale = (next: 'en' | 'fr') => {
    router.replace(pathname, { locale: next });
  };

  const navLinks = [
    { label: t('howItWorks') },
    { label: t('forFounders') },
    { label: t('forInvestors') },
    { label: t('episodes') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/95 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-brand-blue flex items-center justify-center">
            <Tv2 size={18} className="text-white" />
          </div>
          <span className="font-heading font-800 text-white text-sm tracking-tight">
            Seed Stage <span className="text-brand-blue">Spotlight</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label }) => (
            <a
              key={label}
              href="#"
              className="text-ink-300 hover:text-white text-sm font-medium transition-colors duration-150 font-body"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center bg-navy-800/60 border border-white/8 rounded-lg overflow-hidden">
            {(['en', 'fr'] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`px-3 py-1.5 text-xs font-semibold font-body transition-colors duration-150 ${
                  locale === loc
                    ? 'bg-brand-blue text-white'
                    : 'text-ink-400 hover:text-white'
                }`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <SecondaryButton className="!px-4 !py-2 text-xs" onClick={() => window.open('https://youtube.com/@9qctradeplatform', '_blank')}>
            {t('watchEpisodes')}
          </SecondaryButton>
          <PrimaryButton className="!px-4 !py-2 text-xs" onClick={openKybModal}>
            {t('applyToPitch')}
          </PrimaryButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-ink-300 hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/5 px-5 py-4 space-y-4">
          {navLinks.map(({ label }) => (
            <a
              key={label}
              href="#"
              className="block text-ink-300 hover:text-white text-sm font-medium transition-colors font-body py-1"
            >
              {label}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-1">
            {(['en', 'fr'] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`px-4 py-1.5 text-xs font-semibold font-body rounded-md border transition-colors ${
                  locale === loc
                    ? 'bg-brand-blue border-brand-blue text-white'
                    : 'border-white/20 text-ink-400 hover:text-white'
                }`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="pt-1 flex flex-col gap-2">
            <SecondaryButton className="w-full justify-center !py-2.5" onClick={() => window.open('https://youtube.com/@9qctradeplatform', '_blank')}>
              {t('watchEpisodes')}
            </SecondaryButton>
            <PrimaryButton className="w-full justify-center !py-2.5" onClick={openKybModal}>
              {t('applyToPitch')}
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}
