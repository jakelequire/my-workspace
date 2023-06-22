"use client"
// PageStateContext.tsx
import { createContext, useContext } from 'react';
import usePageState from './usePageState';

const PageStateContext = createContext(null);

export function PageStateProvider({ children }: any) {
  const pageState = usePageState();

  return (
    // @ts-ignore
    <PageStateContext.Provider value={pageState.page}>
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
