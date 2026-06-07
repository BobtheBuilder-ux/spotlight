'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import KybFormModal from './KybFormModal';

interface KybModalContextValue {
  openKybModal: () => void;
}

const KybModalContext = createContext<KybModalContextValue>({ openKybModal: () => {} });

export function KybModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openKybModal = useCallback(() => setOpen(true), []);

  return (
    <KybModalContext.Provider value={{ openKybModal }}>
      {children}
      <KybFormModal open={open} onClose={() => setOpen(false)} />
    </KybModalContext.Provider>
  );
}

export function useKybModal() {
  return useContext(KybModalContext);
}
