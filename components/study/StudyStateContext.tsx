// StudyStateContext.tsx
import { createContext, useContext } from 'react';
import useStudyState from './useStudyState';

interface IStudyState {
    page: string;
    setPage: (page: string) => void;
}

const StudyStateContext = createContext<IStudyState | null>(null);

export function StudyStateProvider({ children }: any) {
    const studyState = useStudyState();

    return (
        <StudyStateContext.Provider value={studyState}>
            {children}
        </StudyStateContext.Provider>
    );
}

export function useStudyStateContext() {
    const context = useContext(StudyStateContext);
    if (!context) {
        throw new Error('useStudyStateContext must be used within a StudyStateProvider');
    }
    return context;
}