'use client';

import React, { useEffect, useCallback } from 'react';
import KybForm from '@/components/KybForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function KybFormModal({ open, onClose }: Props) {
  // Close on Escape key
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, handleKey]);

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-0 sm:p-6"
      style={{ background: 'rgba(7, 12, 30, 0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="KYB Application Form"
    >
      {/* Modal panel — full height scrollable */}
      <div
        className="relative w-full sm:max-w-4xl sm:rounded-2xl overflow-hidden shadow-2xl"
        style={{
          maxHeight: '100vh',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          <KybForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
