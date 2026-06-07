import React from 'react';

interface Props {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function KybFormRow({ label, required, hint, children, className = '' }: Props) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-[280px_1fr] gap-x-6 gap-y-2 py-4 border-b border-gray-100 last:border-b-0 ${className}`}>
      <div className="pt-1">
        <span className="text-sm font-medium text-gray-700 leading-snug">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        {hint && <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{hint}</p>}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
