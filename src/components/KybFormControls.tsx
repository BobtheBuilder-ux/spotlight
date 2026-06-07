import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function KybInput({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>}
      <input
        {...props}
        className={`w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors disabled:bg-gray-50 disabled:text-gray-400 ${className}`}
      />
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function KybTextarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>}
      <textarea
        {...props}
        rows={3}
        className={`w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors resize-none ${className}`}
      />
    </div>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function KybCheckbox({ label, checked, onChange, className = '' }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-2.5 cursor-pointer group ${className}`}>
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-4 h-4 rounded border transition-all ${
            checked
              ? 'bg-blue-600 border-blue-600'
              : 'bg-white border-gray-300 group-hover:border-blue-400'
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="none" viewBox="0 0 12 12">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
