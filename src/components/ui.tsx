'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function Badge({
  children,
  color = 'blue',
}: {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'red';
}) {
  const colors = {
    blue: 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20',
    green: 'bg-brand-green/10 text-brand-green border border-brand-green/20',
    red: 'bg-brand-red/10 text-brand-red border border-brand-red/20',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase font-body ${colors[color]}`}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-light text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_24px_rgba(31,111,235,0.45)] active:scale-95 font-body text-sm ${className}`}
    >
      {children}
      <ArrowRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-2 bg-transparent border border-ink-300/30 hover:border-ink-300/60 text-ink-200 hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 font-body text-sm ${className}`}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="h-px w-6 bg-brand-blue" />
      <span className="text-brand-blue text-xs font-semibold tracking-widest uppercase font-body">
        {children}
      </span>
      <div className="h-px w-6 bg-brand-blue" />
    </div>
  );
}

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
