"use client"
// PageStateContext.tsx
import { createContext, useContext } from 'react';
import usePageState from './usePageState';

const PageStateContext = createContext(null);

export function PageStateProvider({ children }) {
  const pageState = usePageState();

  return (
    <PageStateContext.Provider value={pageState}>
      {children}
    </PageStateContext.Provider>
  );
}

export function usePageStateContext() {
  const context = useContext(PageStateContext);
  if (!context) {
    throw new Error('usePageStateContext must be used within a PageStateProvider');
  }
  return context;
}
